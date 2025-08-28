import CourseCard from "@/app/components/CourseCard";
import { courses } from "@/app/props/courses";

export default function Courses() {
  return (
    <div className="min-h-screen text-white font-inter mx-30 mt-20">
      <h1 className="text-4xl font-bold">Courses</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {courses.map((course) => (
          <div>
          <CourseCard 
            key={course.id} 
            title={course.courseCode} 
            description={course.name} 
          />
          </div>
        ))}
      </div>
    </div>
  )
}