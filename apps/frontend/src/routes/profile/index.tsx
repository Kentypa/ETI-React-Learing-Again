import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  component: ProfileInfo,
});

function ProfileInfo() {
  return <h2 className="text-xl">Profile details</h2>;
}
