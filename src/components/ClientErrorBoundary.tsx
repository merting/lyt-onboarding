"use client";

import type { ReactNode } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export function ClientErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
