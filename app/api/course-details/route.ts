import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";  // Your courses table
import { eq } from "drizzle-orm";

// GET: Fetch ALL course details for the logged-in user
// POST: Create NEW course details for a specific course

export async function GET(request: NextRequest) {
    /**
     * Extract user session from request headers to verify authentication
     * If no session exists, return 401 Unauthorized error
     * Query database to get all courses for the current user
     * Return successful response with course data
     * Catch and handle any database or other errors
     */
    try {
        // 1. Check if user is authenticated
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        // 2. If no session user isn't logged in
        if(!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 3. Query database for all courses belong to this user
        const userCourses = await db
            .select() // Select all columns
            .from(courses)  // From the courses table
            .where(eq(courses.userId, parseInt(session.user.id))) // Where userId matches current user 
            .orderBy(courses.createdAt);    // Order by creation date
        
        // 4. Return the courses as JSON
        return NextResponse.json({ courses: userCourses });

    } catch (error) {
        // 5. Handle any errors that occur during the process
        console.error("Error fetching course details:", error);
        return NextResponse.json(
            { error: "Failed to fetch course details" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // 1. Check if user is authenticated (same as GET)
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if(!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Extract data from request body
        const {
            staticCourseId, // ID from static course list, links to courses.ts data
            professorName,
            professorEmail,
            description,
            classWebsite,
            location,
            officeHours,
            semester,
        } = await request.json();

        // 3. Validate required fields
        if(!staticCourseId) {
            return NextResponse.json(
                { error: "staticCourseId is required" },
                { status: 400 }
            );
        }

        // 4. Check if user already has this course added
        const existingCourse = await db
            .select()
            .from(courses)
            .where(
                eq(courses.userId, parseInt(session.user.id)) &&
                eq(courses.staticCourseId, staticCourseId)
            )
            .limit(1)
        
            if(existingCourse.length > 0) {
                return NextResponse.json(
                    { error: "Course already exists" },
                    { status: 409 } // 409 = conflict
                )
            }
        
        // 5. Insert new course details into database
        const [newCourse] = await db
            .insert(courses)
            .values({
                id: parseInt(session.user.id),   // Current user's ID
                staticCourseId: staticCourseId.trim(),
                professorName: professorName?.trim() || null,
                professorEmail: professorEmail?.trim() || null,
                description: description?.trim() || null,
                location: location?.trim() || null,  // Optional field
                officeHours: officeHours?.trim() || null,  // Optional field
                semester: semester?.trim() || null,  // Optional field
                classWebsite: classWebsite?.trim() || null,  // Optional field
            })
            .returning(); // Return the inserted record

            // 6. Return success response with new course data
            return NextResponse.json({ course: newCourse }, { status: 201 }); // 201 = Created

    } catch (error) {
        console.error("Error creating course details:", error);
        return NextResponse.json(
            { error: "Failed to create course details" },
            { status: 500 }
        );
    }

    /**
     * Extract data from JSON request body
     * Validate that required fields are provided
     * Check if course details already exists (prevent duplicates)
     * Insert new record into database
     * Return the created course with 201 status (Created)
     */
}

/*
HTTP Status Codes Used:
200: Success (GET)
201: Created (POST success)
400: Bad Request (missing/invalid data)
401: Unauthorized (not logged in)
409: Conflict (duplicate course)
500: Internal Server Error (database/system error)
 */