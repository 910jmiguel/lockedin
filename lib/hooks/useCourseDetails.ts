import { useState } from "react";

type UserCourseDetails = {
    staticCourseId: string; // links to Course.id from courses.ts - REQUIRED for creating
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

// Separate type for updates (doesn't need staticCourseId)
type UpdateCourseDetails = {
    professorName?: string;
    professorEmail?: string;
    description?: string;
    classWebsite?: string;
    location?: string;
    officeHours?: string;
    semester?: string;
}

export const useCourseDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCourseDetails = async (details: UserCourseDetails) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/course-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });

      if(!response.ok) {
        if(response.status === 401) {
          throw new Error("Please log in to create courses");
        }
        throw new Error("Failed to create course");
      }
      return response.json();
  }  catch (error) {
    console.error("Error creating course:", error);
    throw error;
  } finally {
    setLoading(false);
  }
  };

  const updateCourseDetails = async (courseId: string, details: UpdateCourseDetails) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/course-details/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });

      if(!response.ok) {
        if(response.status === 401) {
          throw new Error("Please log in to update courses");
        }
        throw new Error("Failed to update course");
      }
      return response.json();
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // GET individual courses
  const getCourseDetails = async(courseId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/course-details/${courseId}`);

      if(!response.ok) {
        if(response.status === 401) {
          throw new Error("Please log in to view courses");
        }
        throw new Error("Failed to fetch course");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // GET all courses
  const getAllCourseDetails = async() => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/course-details`);

      if(!response.ok) {
        if(response.status === 401) {
          throw new Error("Please log in to view courses");
        }
        throw new Error("Failed to fetch courses");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteCourseDetails = async(courseId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/course-details/${courseId}`, {
        method: 'DELETE'
      });

      if(!response.ok) {
        if(response.status === 401) {
          throw new Error("Please log in to delete courses");
        }
        throw new Error("Failed to delete course");
      }
      return response.json();
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCourseDetails,
    updateCourseDetails,
    getCourseDetails,
    getAllCourseDetails,
    deleteCourseDetails,
    loading,
    error
  }
};
