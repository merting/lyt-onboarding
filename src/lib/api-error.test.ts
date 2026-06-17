import { describe, expect, it } from "vitest";

import { internalErrorResponse, SAFE_ERROR_MESSAGE } from "@/lib/api-error";
import { createLogger } from "@/lib/logger";

describe("internalErrorResponse", () => {
  it("returns 500 with safe message and no stack trace", async () => {
    const lines: string[] = [];
    const logger = createLogger(
      { route: "/api/test" },
      { minLevel: "error", write: (line) => lines.push(line) },
    );

    const response = internalErrorResponse(logger, new Error("secret details"), "request failed", {
      operation: "test",
    });
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(500);
    expect(body.status).toBe("error");
    expect(body.message).toBe(SAFE_ERROR_MESSAGE);
    expect(body.stack).toBeUndefined();
    expect(body.errorMessage).toBeUndefined();

    expect(lines).toHaveLength(1);
    const entry = JSON.parse(lines[0]!) as Record<string, unknown>;
    expect(entry.level).toBe("error");
    expect(entry.errorMessage).toBe("secret details");
    expect(typeof entry.stack).toBe("string");
  });
});
