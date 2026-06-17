import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import StatusPage, { metadata } from "./page";

vi.mock("@/components/status-panel", () => ({
  StatusPanel: () => <div data-testid="status-panel">status panel</div>,
}));

describe("Status page", () => {
  it("renders heading and status panel", () => {
    render(<StatusPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "System Status" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("status-panel")).toBeInTheDocument();
  });

  it("exports page metadata", () => {
    expect(metadata.title).toBe("System Status");
    expect(metadata.description).toBeTruthy();
  });
});
