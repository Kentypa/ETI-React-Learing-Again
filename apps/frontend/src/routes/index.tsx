import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="flex h-dvh justify-center items-center text-9xl">
      Main page
    </main>
  );
}
