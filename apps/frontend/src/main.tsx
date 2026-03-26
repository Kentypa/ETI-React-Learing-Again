import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./shared/context/AuthContext";
import { AuthProvider } from "./shared/context/AuthProvider";
import "./styles.css";

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  history: hashHistory,
  basepath: "/",
  context: { auth: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

const queryClient = new QueryClient();

if (!rootElement.innerHTML) {
  function App() {
    const auth = useAuth();
    return <RouterProvider router={router} context={{ auth }} />;
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
