import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
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
      </header>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
