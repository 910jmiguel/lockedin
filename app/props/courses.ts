export type Course = {
    id: string;
    courseCode: string;
    name: string;
    bannerColor?: string;
    bannerImage?: string;
}

export const courses: Course[] = [
  { 
    id: "1", 
    courseCode: "EECS 2030", 
    name: "Advanced Object Oriented Programming",
    bannerColor: "bg-blue-500",
  },
  { 
    id: "2", 
    courseCode: "MATH 1019", 
    name: "Discrete Math", 
    bannerColor: "bg-green-500"
  },
  { 
    id: "3", 
    courseCode: "PHIL 2070", 
    name: "Logic and Argumentation", 
    bannerImage: "https://picsum.photos/400/100" // some random image for now
  },
    { 
    id: "4", 
    courseCode: "MATH 1013", 
    name: "Calculus I", 
    bannerColor: "bg-red-500"
  },
  { 
    id: "5", 
    courseCode: "DATT 2300", 
    name: "Game Development I", 
    bannerColor: "bg-yellow-500"
  },
  { 
    id: "6", 
    courseCode: "EECS 2031", 
    name: "Software Tools", 
    bannerColor: "bg-purple-500"
  },
];