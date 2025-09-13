type CourseProps = {
    params: {
        courseSlug: string;
    }
}

export default function CoursePage({ params }: CourseProps) {

    return (
        <div>
            <h1 className="text-4xl font-bold text-white">Course: {params.courseSlug.replace(/-/g, ' ').toUpperCase()}</h1>
        </div>
    )
}