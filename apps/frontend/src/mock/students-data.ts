export type StudentData = {
  id: number;
  name: string;
  score?: number;
};

export const studentsData: StudentData[] = [
  { id: 1, name: "Alice Johnson", score: 87 },
  { id: 2, name: "Bob Smith", score: 30 },
  { id: 3, name: "Charlie Brown", score: 76 },
  { id: 4, name: "Diana Prince", score: 53 },
  { id: 5, name: "Ethan Hunt", score: 44 },
  { id: 6, name: "Fiona Gallagher", score: 68 },
  { id: 7, name: "George Miller", score: 74 },
  { id: 8, name: "Hannah Davis", score: 89 },
  { id: 9, name: "Ian Wright", score: 93 },
  { id: 10, name: "Julia Roberts", score: 78 },
  { id: 11, name: "John Doe" },
];
