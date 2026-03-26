import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { studentsData } from "../mock/students-data";
import { Button } from "../shared/components/atoms/Button/Button";
import { AddStudentForm } from "../shared/components/molecules/AddStudentForm/AddStudentForm";
import { StudentItem } from "../shared/components/molecules/StudentItem";

export const Route = createFileRoute("/students")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filterActive, setFilterActive] = useState(false);
  const [students, setStudents] = useState(studentsData);

  // ✅ ОПТИМІЗАЦІЯ: useCallback запам'ятовує функцію.
  // Тепер React.memo в StudentItem працюватиме коректно.
  const handleDelete = useCallback((id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <main className="flex gap-10 justify-center items-start bg-[#f0f2f5] p-10 min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <Button
          onClick={() => setFilterActive((prev) => !prev)}
          variant="primary"
        >
          {filterActive ? "Show all students" : "Show active students"}
        </Button>

        <div className="flex flex-col gap-4 text-center bg-white p-4 rounded shadow">
          <h2 className="font-bold text-xl">
            {filterActive ? "Active Students" : "All students"}
          </h2>
          <ol className="flex flex-col gap-3 text-left">
            {students
              .filter((s) => (filterActive ? (s.score || 0) >= 60 : true))
              .map((student) => (
                <StudentItem
                  key={student.id}
                  {...student}
                  onDelete={handleDelete}
                />
              ))}
          </ol>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <h3 className="font-bold mb-4 text-center">Add new</h3>
        <AddStudentForm onAdd={(s) => setStudents((prev) => [...prev, s])} />
      </div>
    </main>
  );
}
