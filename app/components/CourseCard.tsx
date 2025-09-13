import Link from "next/link"

type CourseCardProps = {
    courseSlug: string;
    courseCode: string;
    name: string;
    bannerColor?: string;
    bannerImage?: string;
    // make it so that if bannerImage exists, show the background image
    // else if bannerColor exists, show the background color
    // else show a default background color (which can be gray-500 for now)
}

// Utility function to generate slug from course code
const generateSlug = (courseCode: string) => {
  return courseCode.toLowerCase().replace(/\s+/g, '-')
}

const CourseCard = ({ courseSlug, courseCode, name, bannerColor, bannerImage }: CourseCardProps) => {
  return (
    <Link href={`/dashboard/courses/${generateSlug(courseCode)}`}>
    <div className="bg-gray-600 text-white rounded-xl shadow-md overflow-hidden hover:bg-gray-500 transition w-full max-w-sm">
      {/* Banner */}
      {bannerImage? (
        <div 
          className="h-27 w-full object-cover"
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      ) : (
        <div className={`h-27 w-full ${bannerColor ? bannerColor : 'bg-gray-800'}`} />
      )}
        <div className="p-3">
            <h2 className="text-md font-semibold">{courseCode}</h2>
            <p className="text-gray-300">{name}</p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard