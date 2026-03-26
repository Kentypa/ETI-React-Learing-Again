# Чому уникати тестування імплементації?

Тести повинні бути стійкими до рефакторингу. Якщо ми тестуємо внутрішній стан (useState), то зміна назви змінної зламає тест, хоча UI для користувача працюватиме так само. Тестування за атрибутами доступності (ролі, тексти) гарантує, що ми перевіряємо те, що реально бачить і з чим взаємодіє користувач.

# Різниця між jsdom та реальним браузером:

jsdom — це лише JavaScript-імітація (реалізація специфікацій DOM та HTML) середовища браузера всередині Node.js. У ньому немає реального движка рендерингу (Layout Engine). Він не обчислює CSS-стилі (margin, flexbox), не має реальних розмірів вікна (ширина/висота завжди 0 або дефолтні), і не малює пікселі на екрані.

# Чому userEvent.type() краще за fireEvent.change()?

```tsx
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
```

fireEvent.change() просто синхронно змінює значення інпуту і викликає подію change. user-event симулює повний цикл реальної взаємодії користувача: фокусування на елементі, натискання клавіші вниз (keydown), зміна значення (input), підняття клавіші (keyup). Це дозволяє виловити баги, пов'язані з фокусом або специфічними подіями клавіатури.

# Що таке Mocking і чому заборонені реальні HTTP-запити в Юніт-тестах?

```tsx
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
```

Mocking — це створення штучних "заглушок" (функцій чи об'єктів), які імітують поведінку реальних залежностей. Реальні HTTP-запити заборонені, тому що:

Тести стають повільними.

Вони стають нестабільними (Flaky) — тест може впасти через проблеми з Інтернетом або сервером, а не через баг у коді компонента.

Мета юніт-тесту — перевірити ізольовану логіку конкретного файлу, а не доступність зовнішнього API.

# Навіщо обгортки (AuthContext.Provider) у тесті Login?

Компонент використовує хук useAuth, який звертається до контексту за допомогою useContext(AuthContext). Якщо відрендерити Login без AuthProvider, хук викине помилку (throw Error), оскільки контекст буде null. Ми обгортаємо його у фіктивний провайдер, щоб надати тестові значення (замокану функцію login) і уникнути падіння.
