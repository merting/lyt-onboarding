"use client";

import type { HealthPayload } from "@/lib/health";
import { useEffect, useState } from "react";

type LoadState =
  | { kind: "loading" }
  | {
      kind: "success";
      data: Pick<HealthPayload, "status" | "service" | "timestamp">;
    }
  | { kind: "error"; message: string };

export function StatusPanel(): React.ReactElement {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          if (!cancelled) {
            setState({
              kind: "error",
              message: `Health check returned ${response.status}. The service may be degraded.`,
            });
          }
          return;
        }

        const data = (await response.json()) as HealthPayload;
        if (!cancelled) {
          setState({
            kind: "success",
            data: {
              status: data.status,
              service: data.service,
              timestamp: data.timestamp,
            },
          });
        }
      } catch {
        if (!cancelled) {
          setState({
            kind: "error",
            message:
              "Unable to reach the health endpoint. Please try again later.",
          });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === "loading") {
    return (
      <p className="text-neutral-600 dark:text-neutral-400" aria-live="polite">
        Loading status…
      </p>
    );
  }

  if (state.kind === "error") {
    return (
      <div
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
      >
        <p className="font-medium text-red-800 dark:text-red-200">
          Status unavailable
        </p>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          {state.message}
        </p>
      </div>
    );
  }

  const { status, service, timestamp } = state.data;

  return (
    <dl
      className="space-y-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
      aria-label="Service health"
    >
      <div>
        <dt className="text-sm text-neutral-500 dark:text-neutral-400">
          Status
        </dt>
        <dd className="font-medium">{status}</dd>
      </div>
      <div>
        <dt className="text-sm text-neutral-500 dark:text-neutral-400">
          Service
        </dt>
        <dd className="font-medium">{service}</dd>
      </div>
      <div>
        <dt className="text-sm text-neutral-500 dark:text-neutral-400">
          Timestamp
        </dt>
        <dd className="font-mono text-sm">{timestamp}</dd>
      </div>
    </dl>
  );
}
