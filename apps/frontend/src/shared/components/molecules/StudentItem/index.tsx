import { memo, type FC } from "react";
import type { StudentData } from "../../../../mock/students-data";

type Props = StudentData & {
  onDelete?: (id: number) => void;
};

export const StudentItem: FC<Props> = memo(({ id, name, score, onDelete }) => {
  // Цей лог допоможе побачити в консолі, чи рендериться компонент зайвий раз
  console.log(`Рендер студента: ${name}`);

  if (score === undefined) {
    return (
      <li className="flex justify-between items-center p-3 text-neutral-50 bg-neutral-800 odd:bg-neutral-200 odd:text-neutral-950">
        <span>
          {name}: <span className="text-neutral-500">No marks</span>
        </span>
        {onDelete && <button onClick={() => onDelete(id)}>❌</button>}
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
        >
          {`${score} ${isCredited ? "Credited" : "Not credited"}`}
        </span>
      </span>
      {onDelete && <button onClick={() => onDelete(id)}>❌</button>}
    </li>
  );
});

// Додаємо displayName для кращого відображення в React DevTools
StudentItem.displayName = "StudentItem";
