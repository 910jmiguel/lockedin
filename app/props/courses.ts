export type Course = {
    id: string;
    courseCode: string;
    slug: string;
    name: string;
    bannerColor?: string;
    bannerImage?: string;
}

export const courses: Course[] = [
  { 
    id: "1", 
    courseCode: "EECS 2030", 
    name: "Advanced Object Oriented Programming",
    slug: "eecs-2030",
    bannerColor: "bg-blue-500",
  },
  { 
    id: "2", 
    courseCode: "MATH 1019", 
    name: "Discrete Math", 
    slug: "math-1019",
    bannerColor: "bg-green-500"
  },
  { 
    id: "3", 
    courseCode: "PHIL 2070", 
    name: "Logic and Argumentation", 
    slug: "phil-2070",
    bannerImage: "https://picsum.photos/400/100" // some random image for now
  },
    { 
    id: "4", 
    courseCode: "MATH 1013", 
    name: "Calculus I", 
    slug: "math-1013",
    bannerColor: "bg-red-500"
  },
  { 
    id: "5", 
    courseCode: "DATT 2300", 
    name: "Game Development I", 
    slug: "datt-2300",
    bannerColor: "bg-yellow-500"
  },
  { 
    id: "6", 
    courseCode: "EECS 2031", 
    name: "Software Tools", 
    slug: "eecs-2031",
    bannerColor: "bg-purple-500"
  },
];