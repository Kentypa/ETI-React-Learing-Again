import { createFileRoute } from "@tanstack/react-router";
import { postsData } from "../mock/mock-data";
import { Post } from "../shared/components/molecules/Post/Post";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [currentTag, setCurrentTag] = useState<string>("");

  return (
    <main className="flex flex-col justify-center items-center p-10 bg-[#f0f2f5]">
      <h1 className="text-2xl font-bold mb-12">News List</h1>
      <label className="flex flex-col text-center">
        Search by tag
        <input
          name="tag"
          value={currentTag}
          onChange={(event) => setCurrentTag(event.target.value)}
          className="rounded-md border-2 border-neutral-950 p-1 mb-5"
        />
      </label>

      <ul className="flex flex-col gap-4 border-2 p-4 rounded-md">
        {postsData
          .filter((post) =>
            post.tag.toLowerCase().includes(currentTag.toLowerCase()),
          )
          .map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
      </ul>
    </main>
  );
}
