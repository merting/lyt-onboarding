import { StatusPanel } from "@/components/status-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status",
  description: "LYT system health and service status.",
};

export default function StatusPage(): React.ReactElement {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        Live health data from the LYT onboarding service.
      </p>
      <StatusPanel />
    </section>
  );
}
