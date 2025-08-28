export type Course = {
    id: string;
    courseCode: string;
    name: string;
}

export const courses: Course[] = [
  { id: "1", courseCode: "EECS 2030", name: "Advanced Object Oriented Programming" },
  { id: "2", courseCode: "MATH 2050", name: "Linear Algebra II" },
  { id: "3", courseCode: "PHIL 2070", name: "Logic and Argumentation" },
];