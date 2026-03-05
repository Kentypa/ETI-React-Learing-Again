import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../../shared/components/atoms/Button/Button";
import { Post } from "../../shared/components/molecules/Post/Post";
import { SearchBar } from "../../shared/components/molecules/SearchBar";
import { feedKeys } from "../../shared/keys/feed-keys";
import { feedService } from "../../shared/services/feed-service";

type FeedSearch = {
  query?: string;
  sort?: "asc" | "desc" | "none";
};

export const Route = createFileRoute("/feed/")({
  validateSearch: (search: Record<string, unknown>): FeedSearch => ({
    query: (search.query as string) || "",
    sort: (search.sort as FeedSearch["sort"]) || "none",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { query, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const {
    data: postsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: feedService.getAll,
    queryKey: feedKeys.all.queryKey,
  });

  if (isLoading) return <div>Feeds loading</div>;
  if (isError) return <div>{error.message}</div>;

  const handleSearch = (val: string) => {
    navigate({ search: (prev) => ({ ...prev, query: val }), replace: true });
  };

  const handleSort = (val: FeedSearch["sort"]) => {
    navigate({ search: (prev) => ({ ...prev, sort: val }), replace: true });
  };

  let processedPosts = postsData?.data || [];
  if (query) {
    const q = query.toLowerCase();
    processedPosts = processedPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q),
    );
  }

  if (sort === "asc") {
    processedPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "desc") {
    processedPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <main className="flex flex-col items-center p-10 bg-[#f0f2f5] min-h-screen">
      <Button onClick={() => setShowHelp(!showHelp)} variant="primary">
        {showHelp ? "Hide Instruction" : "Show instruction"}
      </Button>
      {showHelp && (
        <p className="mt-2">Tips: Use URL params for search & sort.</p>
      )}

      <h1 className="text-2xl font-bold my-6">News List</h1>

      <div className="flex gap-4 items-end mb-6 w-full max-w-xl">
        <div className="flex-1">
          <SearchBar
            name="search"
            value={query || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className="text-center mb-1">Sort (Title)</label>
          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value as FeedSearch["sort"])}
            className="rounded-md border-2 border-neutral-950 p-1 h-9"
          >
            <option value="none">Default</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      <ul className="flex flex-col gap-4 border-2 p-4 rounded-md w-full max-w-xl bg-white">
        {processedPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found 📭</p>
        ) : (
          processedPosts.slice(0, 10).map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
