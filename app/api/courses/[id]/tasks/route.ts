import { db } from "@/db/drizzle";
import { courses, tasks } from "@/db/schema";

export async function POST(request: Request, { params }: { params: { id: string } }) {

  const courseId = parseInt(params.id, 10); // radix means numerical base - adamly
  const { title, description, dueDate } = await request.json();

  const [ task ] = await db.insert(tasks).values({
    courseId,
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : null,
    status: status ? status : "not started",
  }).returning();

  return Response.json(task);

}

export async function PUT(request: Request, { params }: { params: { id: string } }) {

  const taskId = parseInt(params.id, 10);
  const { title, description, dueDate, status } = await request.json();

  const [ task ] = await db.update(tasks).set({
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : null,
    status,
  }).where(tasks.id.equals(taskId)).returning();

  return Response.json(task);

}