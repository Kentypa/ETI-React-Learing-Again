import type { FC } from "react";
import type { StudentData } from "../../../../mock/students-data";
import { StudentItem } from "../StudentItem";

type StudentsListProps = {
  students: StudentData[];
};

export const StudentsFilteredList: FC<
  StudentsListProps & { cb: (student: StudentData) => boolean }
> = ({ students }) => {
  return (
    <ol className="flex flex-col gap-3">
      {students
        .filter((student) => student.score >= 60)
        .map((student) => (
          <StudentItem {...student} key={student.id} />
        ))}
    </ol>
  );
};
