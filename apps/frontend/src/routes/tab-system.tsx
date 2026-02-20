import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";
import { Button } from "../shared/components/atoms/Button/Button";

export const Route = createFileRoute("/tab-system")({
  component: RouteComponent,
});

type AvailableTabs = "list" | "stats" | "about";

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<AvailableTabs>("about");

  const tabs: AvailableTabs[] = ["list", "stats", "about"];

  const contentMap: Record<AvailableTabs, ReactElement> = {
    list: <div>List</div>,
    stats: <div>Stats</div>,
    about: <div>About</div>,
  };

  return (
    <main className="flex flex-col justify-center items-center p-10 bg-[#f0f2f5]">
      <nav className="flex gap-3 mb-3">
        {tabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant={"primary"}
            style={{ backgroundColor: tab === activeTab ? "green" : "blue" }}
          >
            {tab.toUpperCase()}
          </Button>
        ))}
      </nav>
      {contentMap[activeTab]}
    </main>
  );
}
