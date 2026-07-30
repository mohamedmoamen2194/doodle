import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const conditions = [];
    if (status) {
      conditions.push(eq(schema.orders.status, status));
    }

    if (user.role !== 'admin') {
      conditions.push(eq(schema.orders.userId, user.userId));
    }

    const orders = await db
      .select()
      .from(schema.orders)
      .where(and(...conditions))
      .orderBy(desc(schema.orders.createdAt));

    return NextResponse.json({ orders });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, shippingAddress, total } = await request.json();

    if (!items?.length || !shippingAddress || !total) {
      return NextResponse.json({ error: 'Items, shipping address, and total are required' }, { status: 400 });
    }

    const [order] = await db
      .insert(schema.orders)
      .values({
        userId: user.userId,
        total,
        shippingAddress,
        status: 'pending',
      })
      .returning();

    const orderItems = items.map((item: { productId: string; variantId?: string; quantity: number; price: number }) => ({
      orderId: order.id,
      productId: item.productId,
      variantId: item.variantId || null,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(schema.orderItems).values(orderItems);

    const createdOrder = await db
      .select()
      .from(schema.orders)
      .leftJoin(schema.orderItems, eq(schema.orders.id, schema.orderItems.orderId))
      .where(eq(schema.orders.id, order.id));

    return NextResponse.json({ order: createdOrder }, { status: 201 });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
