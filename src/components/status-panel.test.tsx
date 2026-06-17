import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StatusPanel } from "@/components/status-panel";

describe("StatusPanel", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays status, service, and timestamp when health API succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: "ok",
          service: "lyt-onboarding",
          timestamp: "2026-06-16T10:00:00.000Z",
          ready: true,
          version: "0.1.0",
        }),
      }),
    );

    render(<StatusPanel />);

    expect(await screen.findByText("ok")).toBeInTheDocument();
    expect(screen.getByText("lyt-onboarding")).toBeInTheDocument();
    expect(screen.getByText("2026-06-16T10:00:00.000Z")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("/api/health");
  });

  it("shows an error alert when health API returns non-OK status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      }),
    );

    render(<StatusPanel />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Status unavailable");
    expect(alert).toHaveTextContent("503");
  });

  it("shows an error alert when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );

    render(<StatusPanel />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Unable to reach the health endpoint");
  });

  it("shows loading state before fetch resolves", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve;
          }),
      ),
    );

    render(<StatusPanel />);

    expect(screen.getByText("Loading status…")).toBeInTheDocument();

    resolveFetch({
      ok: true,
      json: async () => ({
        status: "ok",
        service: "lyt-onboarding",
        timestamp: "2026-06-16T10:00:00.000Z",
      }),
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading status…")).not.toBeInTheDocument();
    });
  });
});
