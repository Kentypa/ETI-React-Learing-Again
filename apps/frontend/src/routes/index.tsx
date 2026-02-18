import { createFileRoute } from "@tanstack/react-router";
import { postsData, type PostType } from "../mock/mock-data";
import { Post } from "../shared/components/molecules/Post/Post";
import { useState } from "react";
import { SearchBar } from "../shared/components/molecules/SearchBar";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [currentTag, setCurrentTag] = useState<string>("");

  const filteredPosts: PostType[] = postsData.filter((post) =>
    post.tag.toLowerCase().includes(currentTag.toLowerCase()),
  );

  return (
    <main className="flex flex-col justify-center items-center p-10 bg-[#f0f2f5]">
      <h1 className="text-2xl font-bold mb-12">News List</h1>
      <SearchBar
        onChange={(event) => setCurrentTag(event.target.value)}
        value={currentTag}
        name="tag"
      />

      <ul className="flex flex-col gap-4 border-2 p-4 rounded-md">
        {filteredPosts.length === 0 ? (
          <p>No posts by this tag</p>
        ) : (
          filteredPosts.map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
