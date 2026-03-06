import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import type { FC } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../atoms/Button/Button";

export const Layout: FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    await router.invalidate();
    navigate({ to: "/sign-in" });
  };

  return (
    <header className="p-2 flex justify-between text-lg bg-neutral-800 text-neutral-50">
      <div className="flex gap-6">
        <Link
          to="/"
          activeProps={{ className: "font-bold" }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/feed"
          activeProps={{ className: "font-bold" }}
          activeOptions={{ exact: true }}
        >
          Feed
        </Link>
        <Link
          to="/cocktails"
          activeProps={{ className: "font-bold" }}
          activeOptions={{ exact: true }}
        >
          Cocktails
        </Link>
        <Link to="/students" activeProps={{ className: "font-bold" }}>
          Students
        </Link>
        <Link to="/tab-system" activeProps={{ className: "font-bold" }}>
          Tab system
        </Link>
        <Link to="/product" activeProps={{ className: "font-bold" }}>
          Product page
        </Link>
        <Link to="/profile" activeProps={{ className: "font-bold" }}>
          Profile
        </Link>
      </div>
      {isAuthenticated ? (
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Link to="/sign-in">Sign in</Link>
      )}
    </header>
  );
};
