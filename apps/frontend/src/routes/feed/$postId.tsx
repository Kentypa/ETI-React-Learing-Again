import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { postsData } from "../../mock/mock-data";
import { Button } from "../../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/feed/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const post = postsData.find((p) => p.id === Number(postId));

  if (!post) {
    return <div className="p-10 font-bold text-red-500">Post not found</div>;
  }

  return (
    <article className="p-10 flex flex-col gap-4 max-w-2xl mx-auto">
      <Button onClick={() => navigate({ to: "/feed" })} variant="secondary">
        Back
      </Button>
      <header className="flex items-center gap-4 mt-6">
        <img
          src={post.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="font-bold text-xl">{post.author}</h1>
          <span className="text-sm text-neutral-500">{post.date}</span>
        </div>
      </header>
      <p className="text-lg mt-4">{post.content}</p>
    </article>
  );
}
