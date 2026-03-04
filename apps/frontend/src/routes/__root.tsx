import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "../shared/components/molecules/Layout/Layout";
import { NotFound } from "../shared/components/pages/NotFound";
import type { AuthContextType } from "../shared/context/AuthContext";

type RouterContext = { auth: AuthContextType };

export const Route = createRootRouteWithContext<RouterContext>()({
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
