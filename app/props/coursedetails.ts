export type UserCourseDetails = {
    courseId: string; // links to Course.id
    userId?: string;

    professorName?: string;
    professorEmail?: string;

    description?: string;
    classWebsite?: string;
    location?: string;
    officeHours?: string;
    semester?: string;

    // metadata fields
    createdAt?: string;
    updatedAt?: string;
    
}