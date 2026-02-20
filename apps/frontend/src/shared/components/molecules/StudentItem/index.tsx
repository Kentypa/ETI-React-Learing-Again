import type { FC } from "react";
import type { StudentData } from "../../../../mock/students-data";

export const StudentItem: FC<StudentData> = ({ name, score }) => {
  if (score === undefined) {
    return (
      <li className="text-center p-3 text-neutral-50 bg-neutral-800 odd:bg-neutral-200 odd:text-neutral-950">
        {name}: <span className="text-neutral-500">No marks</span>
      </li>
    );
  }

  const isCredited = score >= 60;

  return (
    <li className="text-center p-3 text-neutral-50 bg-neutral-800 odd:bg-neutral-200 odd:text-neutral-950">
      {name}:
      <span
        className="flex gap-4"
        style={{ color: isCredited ? "green" : "red" }}
      >
        {`${score} ${isCredited ? "Credited" : "Not credited"}`}
      </span>
    </li>
  );
};
