import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return (
    <div className="flex gap-10 p-10 bg-[#f0f2f5] min-h-screen">
      <aside className="flex flex-col gap-4 border-r-2 border-neutral-300 pr-6">
        <h3 className="font-bold text-lg">Account</h3>
        <Link to="/profile" className="[&.active]:font-bold text-blue-600">
          Information
        </Link>
        <Link
          to="/profile/settings"
          className="[&.active]:font-bold text-blue-600"
        >
          Settings
        </Link>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
