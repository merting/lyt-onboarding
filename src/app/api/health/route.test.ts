import { describe, expect, it, vi } from "vitest";

import * as healthModule from "@/lib/health";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns 200 with health payload", async () => {
    const response = GET();
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.ready).toBe(true);
    expect(body.service).toBe("lyt-onboarding");
    expect(body.version).toBe("0.1.0");
  });

  it("returns 503 and logs when health check throws", async () => {
    vi.spyOn(healthModule, "getHealthPayload").mockImplementation(() => {
      throw new Error("dependency unavailable");
    });

    const response = GET();
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(503);
    expect(body.status).toBe("degraded");
    expect(body.ready).toBe(false);

    vi.restoreAllMocks();
  });
});
