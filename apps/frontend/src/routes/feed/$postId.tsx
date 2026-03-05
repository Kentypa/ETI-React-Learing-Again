import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../../shared/components/atoms/Button/Button";
import { feedKeys } from "../../shared/keys/feed-keys";

export const Route = createFileRoute("/feed/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = useQuery(feedKeys.detail(+postId));

  if (isLoading) return <div>Post is loading</div>;

  if (isError) return <div>Post loading error</div>;

  if (!post?.data) {
    return <div className="p-10 font-bold text-red-500">Post not found</div>;
  }

  return (
    <article className="p-10 flex flex-col gap-4 max-w-2xl mx-auto">
      <Button onClick={() => navigate({ to: "/feed" })} variant="secondary">
        Back
      </Button>
      <header className="flex items-center gap-4 mt-6">
        <div>
          <h1 className="font-bold text-xl">{post.data.title}</h1>
        </div>
      </header>
      <p className="text-lg mt-4">{post.data.body}</p>
    </article>
  );
}
