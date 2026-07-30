import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { db, schema } from "@/lib/db"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const auth = await getAuthUser()
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const [user] = await db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        role: schema.users.role,
        image: schema.users.image,
      })
      .from(schema.users)
      .where(eq(schema.users.id, auth.userId))

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
