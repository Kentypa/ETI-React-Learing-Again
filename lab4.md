# Звіт з лабораторної роботи №4

**1. Репозиторій:** [Repo](https://github.com/Kentypa/ETI-React-Learing-Again)

**2. Деплой:** [Deploy](https://kentypa.github.io/ETI-React-Learing-Again/)

### 3. Структура маршрутів

Використано TanStack Router.

- `__root` — кореневий роут. Містить спільний `Layout` та `Outlet`.
- `/feed/index` — стрічка новин.
- `/feed/$postId` — сторінка поста. Динамічний параметр. Ізольований роут для заміни контенту стрічки.
- `/profile` — Layout профілю з `Outlet`. Вкладені роути: `/profile/index` (дані) та `/profile/settings` (налаштування).
  Вкладеність дозволяє перевикористовувати UI-компоненти.

### 4. Фрагменти коду

**Конфігурація Router:**

```tsx
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

export function App() {
  return <RouterProvider router={router} />;
}
```

**Layout та Outlet (`__root.tsx`):**

```tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "../shared/components/molecules/Layout/Layout";

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  ),
  notFoundComponent: () => <div className="p-10 text-xl font-bold">404</div>,
});
```

**Параметри URL (`feed/$postId.tsx`):**

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  return <div>Post ID: {postId}</div>;
}
```

**Програмна навігація (`profile/settings.tsx`):**

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/profile/settings")({
  component: ProfileSettings,
});

function ProfileSettings() {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate({ to: "/" });
  };

  return <Button onClick={handleSave}>Зберегти та вийти</Button>;
}
```

### 5. Відповіді на запитання

1. **SSR vs CSR**: SSR генерує HTML на сервері (повне перезавантаження). CSR (SPA) маніпулює DOM через JS без перезавантаження.
2. **index роут**: Дефолтний дочірній маршрут. Рендериться у батьківському `Outlet`, якщо шлях точно збігається.
3. **useNavigate vs Link**: `Link` — для декларативної навігації (кліки). `useNavigate` — для імперативної JS-логіки (наприклад, після збереження форми).
4. **Підсвічування лінків**: У TanStack Router передавай `activeProps` з CSS-класами в компонент `<Link>`.
5. **Catch-all (\*)**: Обробник помилок 404. У TanStack Router реалізується через `notFoundComponent` у конфігурації кореневого роута.
