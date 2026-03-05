import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState, type SubmitEventHandler } from "react";
import { Button } from "../shared/components/atoms/Button/Button";
import { useAuth } from "../shared/context/AuthContext";
import { userKeys } from "../shared/keys/user-keys";

type LoginSearch = { redirect?: string };

export const Route = createFileRoute("/sign-in")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: search.redirect as string | undefined,
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const router = useRouter();

  const { data: userData, isError, isSuccess } = useQuery(userKeys.detail(1));

  if (isError) return <div>error</div>;

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();
    if (!email) return;

    if (isSuccess) login({ ...userData.data, email });

    await router.invalidate();

    if (redirect) {
      router.history.push(redirect);
    } else {
      navigate({ to: "/profile", replace: true });
    }
  };

  return (
    <main className="flex justify-center items-center h-[80vh] bg-[#f0f2f5]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-md shadow-md w-80"
      >
        <h2 className="text-xl font-bold text-center">Sign in</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-2 p-2 rounded-md"
        />
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </form>
    </main>
  );
}
