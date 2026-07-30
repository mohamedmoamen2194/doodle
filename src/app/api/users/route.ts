import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { eq, sql } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const users = await db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        role: schema.users.role,
        image: schema.users.image,
        createdAt: schema.users.createdAt,
        orderCount: sql<number>`(
          SELECT count(*)::int FROM ${schema.orders}
          WHERE ${schema.orders.userId} = ${schema.users.id}
        )`,
      })
      .from(schema.users)
      .orderBy(schema.users.createdAt);

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
