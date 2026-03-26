import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Route as FeedRoute } from "./feed";

const mockUseQuery = vi.fn();
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: (args: unknown) => mockUseQuery(args),
  };
});

const setup = () => {
  const rootRoute = createRootRoute();
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/feed",
    component: FeedRoute.options.component,
    validateSearch: () => ({ query: "", sort: "none" }),
  });

  const routeTree = rootRoute.addChildren([testRoute]);
  const history = createMemoryHistory({ initialEntries: ["/feed"] });
  const router = createRouter({ routeTree, history });
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

describe("NewsFeed Component", () => {
  it("shows loading state initially", async () => {
    mockUseQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    setup();

    const loadingText = await screen.findByText(/Feeds loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("renders posts successfully", async () => {
    const mockPosts = [
      { id: 1, title: "First Post Title", body: "Body 1" },
      { id: 2, title: "Second Post Title", body: "Body 2" },
    ];

    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { data: mockPosts },
    });

    setup();

    const firstTitle = await screen.findByText("First Post Title");
    const secondTitle = screen.getByText("Second Post Title");

    expect(firstTitle).toBeInTheDocument();
    expect(secondTitle).toBeInTheDocument();
  });
});
