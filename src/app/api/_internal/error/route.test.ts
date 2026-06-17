import { describe, expect, it } from "vitest";

import { GET } from "@/app/api/_internal/error/route";
import { SAFE_ERROR_MESSAGE } from "@/lib/api-error";

describe("GET /api/_internal/error", () => {
  it("returns safe 500 JSON without stack in non-production", async () => {
    const response = GET();
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(500);
    expect(body.status).toBe("error");
    expect(body.message).toBe(SAFE_ERROR_MESSAGE);
    expect(body.stack).toBeUndefined();
  });
});
