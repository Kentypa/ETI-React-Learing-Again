import { createFileRoute } from "@tanstack/react-router";
import { StudentsList } from "../shared/components/molecules/StudentList";
import { studentsData } from "../mock/students-data";
import { StudentsFilteredList } from "../shared/components/molecules/StudentFilteredList";
import { StudentsAvarageList } from "../shared/components/molecules/StudentAvarageScoreList";

export const Route = createFileRoute("/students")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex gap-10 justify-center items-center bg-[#f0f2f5] p-10">
      <div className="flex flex-col gap-6 text-center">
        <h2>All students</h2>
        <StudentsList students={studentsData} />
      </div>
      <div className="flex flex-col gap-6 text-center">
        <h3>Filtered students</h3>
        <StudentsFilteredList
          students={studentsData}
          cb={(student) => student.score >= 60}
        />
      </div>
      <StudentsAvarageList students={studentsData} />
    </main>
  );
}
