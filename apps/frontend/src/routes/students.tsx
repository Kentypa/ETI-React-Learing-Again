import { createFileRoute } from "@tanstack/react-router";
import { StudentsList } from "../shared/components/molecules/StudentList";
import { studentsData } from "../mock/students-data";
import { StudentsFilteredList } from "../shared/components/molecules/StudentFilteredList";
import { StudentsAvarageList } from "../shared/components/molecules/StudentAvarageScoreList";
import { useState } from "react";
import { Button } from "../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/students")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filterActive, setFilterActive] = useState(false);

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
            students={studentsData}
            cb={(student) => (student.score || 0) >= 60}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-center">
          <h2>All students</h2>
          <StudentsList students={studentsData} />
        </div>
      )}
      <StudentsAvarageList students={studentsData} />
    </main>
  );
}
