import { createFileRoute } from "@tanstack/react-router";
import { Card } from "../shared/components/molecules/Card/Card";
import { Input } from "../shared/components/atoms/Input/Input";
import { Button } from "../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const handleLogin = () => {
    alert("Logic of logic be later");
  };

  return (
    <main className="flex justify-center items-center h-dvh bg-[#f0f2f5]">
      <Card>
        <h2 className="mb-5 text-center">Welcome master</h2>
        <div className="mb-3">
          <Input
            className="border-2 border-gray-500 rounded-md p-2"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <Input
            className="border-2 border-gray-500 rounded-md p-2"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={handleLogin} variant={"primary"}>
            Увійти
          </Button>
          <Button variant={"secondary"}>Реєстрація</Button>
        </div>
      </Card>
    </main>
  );
}
