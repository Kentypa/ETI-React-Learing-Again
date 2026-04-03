import { memo, type FC } from "react";
import type { StudentData } from "../../../../mock/students-data";
import { useStudentsStore } from "../../../store/useStudentsScore";

export const StudentItem: FC<StudentData> = memo(({ id, name, score }) => {
  const deleteStudent = useStudentsStore((s) => s.deleteStudent);

  if (score === undefined) {
    return (
      <li className="flex justify-between items-center p-3 text-neutral-50 bg-neutral-800 odd:bg-neutral-200 odd:text-neutral-950">
        <span>
          {name}: <span className="text-neutral-500">No marks</span>
        </span>
        <button onClick={() => deleteStudent(id)}>❌</button>
      </li>
    );
  }

  const isCredited = score >= 60;

  return (
    <li className="flex justify-between items-center p-3 text-neutral-50 bg-neutral-800 odd:bg-neutral-200 odd:text-neutral-950">
      <span>
        {name}:{" "}
        <span
          style={{ color: isCredited ? "green" : "red" }}
          className="ml-2 font-bold"
        >{`${score} ${isCredited ? "Credited" : "Not credited"}`}</span>
      </span>
      <button onClick={() => deleteStudent(id)}>❌</button>
    </li>
  );
});

StudentItem.displayName = "StudentItem";
