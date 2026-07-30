import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const [existing] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const [user] = await db
      .insert(schema.users)
      .values({ name, email, passwordHash })
      .returning();

    const token = await createToken({ userId: user.id, role: user.role });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
