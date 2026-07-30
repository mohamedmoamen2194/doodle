import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { eq, and, desc, sql } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getAuthUser();

    let offers;
    if (user?.role === 'admin') {
      offers = await db
        .select()
        .from(schema.offers)
        .orderBy(desc(schema.offers.createdAt));
    } else {
      offers = await db
        .select()
        .from(schema.offers)
        .where(
          and(
            eq(schema.offers.isActive, true),
            sql`${schema.offers.startsAt} <= now()`,
            sql`${schema.offers.endsAt} >= now()`
          )
        )
        .orderBy(desc(schema.offers.createdAt));
    }

    return NextResponse.json({ offers });
  } catch (error) {
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
    const { title, code, description, discountType, discountValue, maxUses, startsAt, endsAt } = body;

    if (!title || !code || !discountType || !discountValue || !startsAt || !endsAt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [offer] = await db
      .insert(schema.offers)
      .values({
        title,
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue,
        maxUses,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
      })
      .returning();

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
