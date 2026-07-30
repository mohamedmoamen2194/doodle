import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { eq, ilike, and, desc, asc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '12')));
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';

    const conditions = [eq(schema.products.isActive, true)];

    if (category) {
      conditions.push(eq(schema.products.categoryId, category));
    }
    if (featured === 'true') {
      conditions.push(eq(schema.products.isFeatured, true));
    }
    if (search) {
      conditions.push(ilike(schema.products.name, `%${search}%`));
    }

    const orderBy = sort === 'price_asc'
      ? asc(schema.products.price)
      : sort === 'price_desc'
      ? desc(schema.products.price)
      : desc(schema.products.createdAt);

    const offset = (page - 1) * limit;

    const products = await db
      .select()
      .from(schema.products)
      .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(schema.products)
      .where(and(...conditions));

    const result = products.map((p) => ({
      ...p.products,
      category: p.categories ? { id: p.categories.id, name: p.categories.name, slug: p.categories.slug } : null,
    }));

    return NextResponse.json({
      products: result,
      pagination: {
        page,
        limit,
        total: parseInt(count as string),
        totalPages: Math.ceil(parseInt(count as string) / limit),
      },
    });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, comparePrice, images, categoryId, stock, isFeatured } = body;

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const slug = slugify(name);

    const [product] = await db
      .insert(schema.products)
      .values({
        name,
        slug,
        description,
        price,
        comparePrice,
        images: images || [],
        categoryId,
        stock: stock ?? 0,
        isFeatured: isFeatured ?? false,
      })
      .returning();

    return NextResponse.json(product, { status: 201 });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
