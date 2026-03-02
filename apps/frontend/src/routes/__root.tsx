import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "../shared/components/molecules/Layout/Layout";
import { NotFound } from "../shared/components/pages/NotFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
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
