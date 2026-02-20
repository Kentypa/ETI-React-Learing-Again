import type { FC } from "react";
import type { StudentData } from "../../../../mock/students-data";

type StudentsListProps = {
  students: StudentData[];
};

export const StudentsAvarageList: FC<StudentsListProps> = ({ students }) => {
  const activeStudents = students.filter(
    (student) => (student.score || 0) >= 60,
  );
  const avgScoreActiveStudents =
    activeStudents.reduce((acc, current) => (acc += current.score || 0), 0) /
    activeStudents.length;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="p-3 bg-neutral-800 text-neutral-50">
        Average students score: {avgScoreActiveStudents}
      </h3>
    </div>
  );
};
