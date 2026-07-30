import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [offer] = await db.select().from(schema.offers).where(eq(schema.offers.id, id));
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error) {
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

    const [existing] = await db.select().from(schema.offers).where(eq(schema.offers.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.code !== undefined) updateData.code = body.code.toUpperCase();
    if (body.description !== undefined) updateData.description = body.description;
    if (body.discountType !== undefined) updateData.discountType = body.discountType;
    if (body.discountValue !== undefined) updateData.discountValue = body.discountValue;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.maxUses !== undefined) updateData.maxUses = body.maxUses;
    if (body.startsAt !== undefined) updateData.startsAt = new Date(body.startsAt);
    if (body.endsAt !== undefined) updateData.endsAt = new Date(body.endsAt);

    const [offer] = await db
      .update(schema.offers)
      .set(updateData)
      .where(eq(schema.offers.id, id))
      .returning();

    return NextResponse.json(offer);
  } catch (error) {
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

    const [existing] = await db.select().from(schema.offers).where(eq(schema.offers.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    await db.delete(schema.offers).where(eq(schema.offers.id, id));

    return NextResponse.json({ message: 'Offer deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
