import CourseCard from "@/app/components/CourseCard";
import { courses } from "@/app/props/courses";

export default function Courses() {
  return (
    <div className="min-h-screen text-white font-inter mx-30 mt-20">
      <h1 className="text-4xl font-bold">Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            courseCode={course.courseCode} 
            name={course.name} 
            bannerColor={course.bannerColor}
            bannerImage={course.bannerImage}
          />
        ))}
      </div>
    </div>
  )
}