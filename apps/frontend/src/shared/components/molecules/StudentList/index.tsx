import type { FC } from "react";
import type { StudentData } from "../../../../mock/students-data";
import { StudentItem } from "../StudentItem";

type StudentsListProps = {
  students: StudentData[];
};

export const StudentsList: FC<StudentsListProps> = ({ students }) => {
  return (
    <ol className="flex flex-col gap-3">
      {students.map((student) => (
        <StudentItem {...student} key={student.id} />
      ))}
    </ol>
  );
};
