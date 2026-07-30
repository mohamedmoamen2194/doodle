import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const [order] = await db
      .select()
      .from(schema.orders)
      .where(eq(schema.orders.id, id));

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (user.role !== 'admin' && order.userId !== user.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const items = await db
      .select()
      .from(schema.orderItems)
      .leftJoin(schema.products, eq(schema.orderItems.productId, schema.products.id))
      .where(eq(schema.orderItems.orderId, id));

    const itemsWithProduct = items.map((i) => ({
      ...i.order_items,
      product: i.products ? { id: i.products.id, name: i.products.name, images: i.products.images } : null,
    }));

    return NextResponse.json({ ...order, items: itemsWithProduct });
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
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const [existing] = await db.select().from(schema.orders).where(eq(schema.orders.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const [order] = await db
      .update(schema.orders)
      .set({ status })
      .where(eq(schema.orders.id, id))
      .returning();

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
