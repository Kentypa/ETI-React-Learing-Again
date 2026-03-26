import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AuthContext } from "../shared/context/AuthContext";
import { Route as SignInRoute } from "./sign-in";

const mockUseQuery = vi.fn();
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: (args: unknown) => mockUseQuery(args),
  };
});

describe("SignIn Page", () => {
  it("allows user to input email and submit the form", async () => {
    const mockLogin = vi.fn();
    const user = userEvent.setup();

    mockUseQuery.mockReturnValue({
      data: { data: { id: 1, name: "Test User" } },
      isSuccess: true,
      isError: false,
      isLoading: false,
    });

    const rootRoute = createRootRoute();
    const testRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/sign-in",
      component: SignInRoute.options.component,
      validateSearch: () => ({ redirect: "" }),
    });

    const routeTree = rootRoute.addChildren([testRoute]);
    const history = createMemoryHistory({ initialEntries: ["/sign-in"] });
    const router = createRouter({ routeTree, history });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            isAuthenticated: false,
            user: null,
            login: mockLogin,
            logout: vi.fn(),
          }}
        >
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    const emailInput = await screen.findByPlaceholderText(/email/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({ email: "test@example.com", id: 1 }),
      );
    });
  });
});
