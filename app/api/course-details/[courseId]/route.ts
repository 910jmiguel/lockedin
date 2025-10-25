import { NextRequest, NextResponse } from "next/server";
import { createServerActionClient } from "@/lib/supabase-server";
import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// GET: fetch a specific course's details
// PUT: update existing course details
// DELETE: remove course details

export async function GET(request: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    /**
     * contains URL parameters (courseId from [courseId])
     * params is now a Promise in newer Next.js
     * convert string ID to number for database query
     * Use and() to combine multiple conditions
     * Check if the course exists and belongs to the user
     */
    try {
        // 1. Check if user is authenticated
        const supabase = await createServerActionClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        // 2. If no session user isn't logged in
        if(authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 3. Extract courseId from URL parameters
        const { courseId } = await params;
        const courseIdNumber = parseInt(courseId); // convert string to number

        // 4. Query database for specific course belong to this user
        const [course] = await db
            .select() // Select all columns
            .from(courses)  // From the courses table
            .where(
                and(
                    eq(courses.id, courseIdNumber), // Where course ID matches
                    eq(courses.userId, user.id) // And userId matches current user (no parseInt needed)
                )
            )
            .limit(1); // We only expect one result 
        
        // 5. Handle case where course doesn't exist
        if(!course) {
            return NextResponse.json(
                { error: "Course not found" }, 
                { status: 404 }
            );
        }

        // 6. Return the course data as JSON
        return NextResponse.json({ course });

    } catch(error) {
        // 7. Handle any errors that occur during the process
        console.error("Error fetching course details:", error);
        return NextResponse.json(
            { error: "Failed to fetch course details" },
            { status: 500 }
        );
    }
}

export async function PUT(
/**
 * Extract data from request body (what user wants to change)
 * Build update object with only fields that were provided
 * Update only records that match both ID and user ownership
 * Check if any record was actually updated
 */

  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // 1: Authentication check (same pattern)
    const supabase = await createServerActionClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2: Extract courseId from URL
    const { courseId } = await params;
    const courseIdNumber = parseInt(courseId);

    // 3: Extract update data from request body
    const { 
      professorName, 
      professorEmail, 
      description, 
      classWebsite,
      location,
      officeHours,
      semester
    } = await request.json();

    // 4: Build update object with only provided fields
    const updateData: any = {};
    if (professorName !== undefined) updateData.professorName = professorName?.trim() || null;
    if (professorEmail !== undefined) updateData.professorEmail = professorEmail?.trim() || null;
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (classWebsite !== undefined) updateData.classWebsite = classWebsite?.trim() || null;
    if (location !== undefined) updateData.location = location?.trim() || null;
    if (officeHours !== undefined) updateData.officeHours = officeHours?.trim() || null;
    if (semester !== undefined) updateData.semester = semester?.trim() || null;

    // 5: Perform the update
    const [updatedCourse] = await db
      .update(courses)                          // Update courses table
      .set(updateData)                         // Set new values
      .where(
        and(
          eq(courses.id, courseIdNumber),       // Match course ID
          eq(courses.userId, user.id)   // Ensure user owns it (no parseInt needed)
        )
      )
      .returning();                            // Return updated record

    // 6: Check if course was found and updated
    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Course not found" }, 
        { status: 404 }
      );
    }

    // 7: Return updated course
    return NextResponse.json({ course: updatedCourse });

  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // 1: Authentication check
    const supabase = await createServerActionClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2: Extract courseId from URL
    const { courseId } = await params;
    const courseIdNumber = parseInt(courseId);

    // 3: Delete the course
    const [deletedCourse] = await db
      .delete(courses)                         // Delete from courses table
      .where(
        and(
          eq(courses.id, courseIdNumber),      // Match course ID
          eq(courses.userId, user.id)  // Ensure user owns it (no parseInt needed)
        )
      )
      .returning();                           // Return deleted record (for confirmation)

    // 4: Check if course was found and deleted
    if (!deletedCourse) {
      return NextResponse.json(
        { error: "Course not found" }, 
        { status: 404 }
      );
    }

    // 5: Return success confirmation
    return NextResponse.json({ 
      success: true, 
      message: "Course deleted successfully" 
    });

  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}

// After finished the routes.ts file, create the useCourseDetails.ts hook
// See if you can work on the frontend integration next