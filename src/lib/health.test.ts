import { describe, expect, it } from "vitest";

import { getHealthPayload } from "@/lib/health";

describe("getHealthPayload", () => {
  it("returns a ready health payload", () => {
    const payload = getHealthPayload("0.1.0");

    expect(payload.status).toBe("ok");
    expect(payload.service).toBe("lyt-onboarding");
    expect(payload.ready).toBe(true);
    expect(payload.version).toBe("0.1.0");
    expect(() => new Date(payload.timestamp)).not.toThrow();
  });
});
