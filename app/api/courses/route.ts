import { db } from "@/db/drizzle";
import {courses} from "@/db/schema";

export async function POST(request: Request) {

    const { name } = await request.json();

    const [ course ] = await db.insert(courses).values({
        name // this is the only required field
    }).returning();

    return Response.json(course);
}