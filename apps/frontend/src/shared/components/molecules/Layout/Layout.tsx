import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { type FC } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useOnlineStatus } from "../../../hooks/useOnlineStatus";
import { Button } from "../../atoms/Button/Button";

export const Layout: FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const isOnline = useOnlineStatus();
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  const handleLogout = async () => {
    logout();
    await router.invalidate();
    navigate({ to: "/sign-in" });
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      {!isOnline && (
        <div className="bg-red-500 text-white text-center p-2 sticky top-0 z-50">
          Offline. Check connections.
        </div>
      )}
      <header
        className={`p-2 flex justify-between items-center text-lg transition-colors ${
          theme === "dark"
            ? "bg-neutral-900 text-white"
            : "bg-white text-black border-b"
        }`}
      >
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            activeProps={{ className: "font-bold" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link to="/feed" activeProps={{ className: "font-bold" }}>
            Feed
          </Link>
          <Link to="/cocktails" activeProps={{ className: "font-bold" }}>
            Cocktails
          </Link>
          <Link to="/students" activeProps={{ className: "font-bold" }}>
            Students
          </Link>
          <Link to="/profile" activeProps={{ className: "font-bold" }}>
            Profile
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <Button onClick={toggleTheme} variant="secondary">
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </Button>
          {isAuthenticated ? (
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/sign-in">Sign in</Link>
          )}
        </div>
      </header>
    </>
  );
};
