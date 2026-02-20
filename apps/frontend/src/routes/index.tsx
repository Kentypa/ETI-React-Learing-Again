import { createFileRoute } from "@tanstack/react-router";
import { postsData, type PostType } from "../mock/mock-data";
import { Post } from "../shared/components/molecules/Post/Post";
import { useState } from "react";
import { SearchBar } from "../shared/components/molecules/SearchBar";
import { Button } from "../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type CategoryStates = "All" | "React" | "JavaScript";

function HomeComponent() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<CategoryStates>("All");
  const [showHelp, setShowHelp] = useState(false);

  const filteredPosts: PostType[] = postsData.filter((post) => {
    const matchesText =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || post.tag === activeCategory;

    return matchesText && matchesCategory;
  });

  return (
    <main className="flex flex-col justify-center items-center p-10 bg-[#f0f2f5]">
      <Button onClick={() => setShowHelp((prev) => !prev)} variant={"primary"}>
        {showHelp ? "Hide Instuction" : "Show instruction"}
      </Button>

      {showHelp && <p>Tips: Can manage students list.</p>}

      <h1 className="text-2xl font-bold mb-6">News List</h1>

      <SearchBar
        onChange={(event) => setSearchQuery(event.target.value)}
        value={searchQuery}
        name="search"
      />

      <div className="flex gap-4 mb-6">
        {(["All", "React", "JavaScript"] as CategoryStates[]).map(
          (category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md border-2 ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {category}
            </button>
          ),
        )}
      </div>

      <ul className="flex flex-col gap-4 border-2 p-4 rounded-md w-full max-w-xl">
        {filteredPosts.length === 0 ? (
          <p>No posts found</p>
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
