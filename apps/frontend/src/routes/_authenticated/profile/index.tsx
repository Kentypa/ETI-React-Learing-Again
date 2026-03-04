import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../shared/context/AuthContext";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: ProfileInfo,
});

function ProfileInfo() {
  const { user } = useAuth();

  return <h2 className="text-xl">Profile details: {user?.email}</h2>;
}
