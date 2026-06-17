"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-8"
          >
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Please refresh the page or try again later.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
