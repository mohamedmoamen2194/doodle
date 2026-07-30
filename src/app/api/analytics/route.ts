import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, page, metadata, session_id } = body;

    if (!event_type) {
      return NextResponse.json({ error: 'Event type is required' }, { status: 400 });
    }

    const user = await getAuthUser();

    if (!user && !session_id) {
      return NextResponse.json({ error: 'Session ID is required for anonymous users' }, { status: 400 });
    }

    const [event] = await db
      .insert(schema.analyticsEvents)
      .values({
        userId: user?.userId || null,
        sessionId: session_id || null,
        eventType: event_type,
        page: page || null,
        metadata: metadata || {},
      })
      .returning();

    return NextResponse.json(event, { status: 201 });
  }   catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
