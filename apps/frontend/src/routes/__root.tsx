import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "../shared/components/molecules/Layout/Layout";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="p-10 text-xl font-bold">Page not found 404</div>
  ),
});

function RootComponent() {
  return (
    <>
      <Layout />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
