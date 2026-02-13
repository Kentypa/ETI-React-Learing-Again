import { createFileRoute } from "@tanstack/react-router";
import { postsData } from "../mock/mock-data";
import { Post } from "../shared/components/molecules/Post/Post";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="flex flex-col justify-center items-center h-dvh bg-[#f0f2f5]">
      <h1 className="text-2xl font-bold mb-12">News List</h1>

      <ul className="flex flex-col gap-4 border-2 p-4 rounded-md">
        {postsData.map((post) => (
          <li key={post.id}>
            <Post {...post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
