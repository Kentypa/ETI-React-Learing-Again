import { Link } from "@tanstack/react-router";
import type { FC } from "react";

export const Layout: FC = () => {
  return (
    <header className="p-2 flex gap-6 text-lg bg-neutral-800 text-neutral-50">
      <Link
        to="/"
        activeProps={{
          className: "font-bold",
        }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>{" "}
      <Link
        to="/feed"
        activeProps={{
          className: "font-bold",
        }}
        activeOptions={{ exact: true }}
      >
        Feed
      </Link>{" "}
      <Link
        to="/students"
        activeProps={{
          className: "font-bold",
        }}
      >
        Students
      </Link>
      <Link
        to="/tab-system"
        activeProps={{
          className: "font-bold",
        }}
      >
        Tab system
      </Link>
      <Link to="/profile" activeProps={{ className: "font-bold" }}>
        Profile
      </Link>
    </header>
  );
};
