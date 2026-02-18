import type { FC } from "react";
import type { StudentData } from "../../../../mock/students-data";

export const StudentItem: FC<StudentData> = ({ name, score }) => {
  return (
    <li className="p-3 text-neutral-50 bg-neutral-800 odd:bg-neutral-200 odd:text-neutral-950">
      {name}:{score}
    </li>
  );
};
