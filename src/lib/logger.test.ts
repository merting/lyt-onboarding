import { describe, expect, it } from "vitest";

import { createLogger, logError } from "@/lib/logger";

describe("createLogger", () => {
  it("writes structured JSON with required fields", () => {
    const lines: string[] = [];
    const logger = createLogger(
      { component: "test" },
      { minLevel: "debug", write: (line) => lines.push(line) },
    );

    logger.info("hello", { requestId: "req-1" });

    expect(lines).toHaveLength(1);
    const entry = JSON.parse(lines[0]!) as Record<string, unknown>;
    expect(entry.level).toBe("info");
    expect(entry.message).toBe("hello");
    expect(entry.service).toBe("lyt-onboarding");
    expect(entry.component).toBe("test");
    expect(entry.requestId).toBe("req-1");
    expect(typeof entry.timestamp).toBe("string");
  });

  it("respects minimum log level", () => {
    const lines: string[] = [];
    const logger = createLogger({}, { minLevel: "warn", write: (line) => lines.push(line) });

    logger.info("hidden");
    logger.warn("visible");

    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]!).message).toBe("visible");
  });

  it("merges child logger context", () => {
    const lines: string[] = [];
    const parent = createLogger(
      { route: "/api/health" },
      { minLevel: "info", write: (line) => lines.push(line) },
    );
    const child = parent.child({ requestId: "abc" });

    child.error("failed");

    const entry = JSON.parse(lines[0]!) as Record<string, unknown>;
    expect(entry.route).toBe("/api/health");
    expect(entry.requestId).toBe("abc");
    expect(entry.level).toBe("error");
  });
});

describe("logError", () => {
  it("includes error name, message, and stack", () => {
    const lines: string[] = [];
    const logger = createLogger({}, { minLevel: "error", write: (line) => lines.push(line) });
    const error = new Error("boom");

    logError(logger, error, "operation failed", { operation: "health-check" });

    const entry = JSON.parse(lines[0]!) as Record<string, unknown>;
    expect(entry.message).toBe("operation failed");
    expect(entry.operation).toBe("health-check");
    expect(entry.errorName).toBe("Error");
    expect(entry.errorMessage).toBe("boom");
    expect(typeof entry.stack).toBe("string");
  });
});
