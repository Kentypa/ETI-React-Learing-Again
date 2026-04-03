import { create } from "zustand";
import { type StudentData, studentsData } from "../../mock/students-data";

type StudentsStore = {
  students: StudentData[];
  addStudent: (student: StudentData) => void;
  deleteStudent: (id: number) => void;
};

export const useStudentsStore = create<StudentsStore>((set) => ({
  students: studentsData,
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
    })),
}));
