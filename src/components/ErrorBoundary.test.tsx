import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "@/components/ErrorBoundary";

function ThrowingChild(): never {
  throw new Error("render failed");
}

describe("ErrorBoundary", () => {
  it("renders fallback UI when a child throws", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <p>content ok</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("content ok")).toBeInTheDocument();
  });
});
