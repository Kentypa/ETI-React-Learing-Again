import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/profile/settings")({
  component: ProfileSettings,
});

function ProfileSettings() {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Saved");
    navigate({ to: "/" });
  };

  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="text-xl">Settings</h2>
      <Button onClick={handleSave} variant="primary">
        Save and on go home page
      </Button>
    </div>
  );
}
