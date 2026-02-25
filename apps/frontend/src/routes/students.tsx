import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { studentsData } from "../mock/students-data";
import { Button } from "../shared/components/atoms/Button/Button";
import { AddStudentForm } from "../shared/components/molecules/AddStudentForm/AddStudentForm";
import { StudentsAverageList } from "../shared/components/molecules/StudentAverageScoreList";
import { StudentsFilteredList } from "../shared/components/molecules/StudentFilteredList";
import { StudentsList } from "../shared/components/molecules/StudentList";

export const Route = createFileRoute("/students")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filterActive, setFilterActive] = useState(false);
  const [students, setStudents] = useState(studentsData)

  return (
    <main className="flex gap-10 justify-center items-center bg-[#f0f2f5] p-10">
      <Button
        onClick={() => setFilterActive((prev) => !prev)}
        variant={"primary"}
      >
        {filterActive ? "Show all students" : "Show active students"}
      </Button>

      {filterActive ? (
        <div className="flex flex-col gap-6 text-center">
          <h3>Active Students</h3>
          <StudentsFilteredList
            students={students}
            cb={(student) => (student.score || 0) >= 60}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-center">
          <h2>All students</h2>
          <StudentsList students={students} />
        </div>
      )}
      <StudentsAverageList students={students} />
      <AddStudentForm
        onAdd={(s) => {
          console.log(s);
          setStudents([...students, s])
        }}
      />
    </main>
  );
}
