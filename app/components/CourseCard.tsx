type CourseCardProps = {
    title: string;
    description: string;
}

const CourseCard = ({ title, description }: CourseCardProps) => {
  return (
    <div className="bg-gray-600 text-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-300">{description}</p>
        </div>
    </div>
  )
}

export default CourseCard