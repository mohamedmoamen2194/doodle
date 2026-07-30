import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [result] = await db
      .select()
      .from(schema.products)
      .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
      .where(eq(schema.products.id, id));

    if (!result) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const variants = await db
      .select()
      .from(schema.productVariants)
      .where(eq(schema.productVariants.productId, id));

    return NextResponse.json({
      ...result.products,
      category: result.categories ? { id: result.categories.id, name: result.categories.name, slug: result.categories.slug } : null,
      variants,
    });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const [existing] = await db.select().from(schema.products).where(eq(schema.products.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) {
      updateData.name = body.name;
      updateData.slug = slugify(body.name);
    }
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.comparePrice !== undefined) updateData.comparePrice = body.comparePrice;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.stock !== undefined) updateData.stock = body.stock;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    const [product] = await db
      .update(schema.products)
      .set(updateData)
      .where(eq(schema.products.id, id))
      .returning();

    return NextResponse.json(product);
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    const [existing] = await db.select().from(schema.products).where(eq(schema.products.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await db
      .update(schema.products)
      .set({ isActive: false })
      .where(eq(schema.products.id, id));

    return NextResponse.json({ message: 'Product deleted' });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
