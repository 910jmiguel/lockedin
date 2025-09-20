import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { todoItems } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET - Fetch all todos for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await db
      .select()
      .from(todoItems)
      .where(eq(todoItems.userId, session.user.id))
      .orderBy(todoItems.createdAt);

    return NextResponse.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// POST - Create a new todo item
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { groupTitle, text, completed = false } = await request.json();

    // Basic validation to check required fields
    if (!text || !groupTitle) {
      return NextResponse.json(
        { error: "Group title and text are required" },
        { status: 400 }
      );
    }

    // Insert the new todo into the database
    const [newTodo] = await db
      .insert(todoItems)
      .values({
        userId: session.user.id,
        groupTitle: groupTitle.trim(),
        text: text.trim(),
        completed,
      })
      .returning();

    return NextResponse.json({ todo: newTodo }, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
