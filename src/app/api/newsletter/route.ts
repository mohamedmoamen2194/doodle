import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const [existing] = await db.select().from(schema.newsletters).where(eq(schema.newsletters.email, email));
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    await db.insert(schema.newsletters).values({ email });

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
