type UserCourseDetails = {
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

export const useCourseDetails = () => {
  const createCourseDetails = async (details: UserCourseDetails) => {
    const response = await fetch('/api/course-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    });
    return response.json();
  };

  const updateCourseDetails = async (courseId: string, details: UserCourseDetails) => {
    const response = await fetch(`/api/course-details/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    });
    return response.json();
  };

  // ... other CRUD operations
};