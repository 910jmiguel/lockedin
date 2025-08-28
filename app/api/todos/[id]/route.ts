import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { todoItems } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// PUT - Update a todo item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const todoId = parseInt(id);
    const { groupTitle, text, completed } = await request.json();

    // Build update object with only provided fields
    const updateData: any = {};
    if (groupTitle !== undefined) updateData.groupTitle = groupTitle.trim();
    if (text !== undefined) updateData.text = text.trim();
    if (completed !== undefined) updateData.completed = completed;

    const [updatedTodo] = await db
      .update(todoItems)
      .set(updateData)
      .where(
        and(
          eq(todoItems.id, todoId),
          eq(todoItems.userId, session.user.id)
        )
      )
      .returning();

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ todo: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a todo item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const todoId = parseInt(id);

    const [deletedTodo] = await db
      .delete(todoItems)
      .where(
        and(
          eq(todoItems.id, todoId),
          eq(todoItems.userId, session.user.id)
        )
      )
      .returning();

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
