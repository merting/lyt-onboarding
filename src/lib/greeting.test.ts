import { describe, expect, it } from "vitest";
import { getGreeting } from "@/lib/greeting";

describe("getGreeting", () => {
  it("returns a personalized greeting", () => {
    expect(getGreeting("LYT")).toBe("Hello, LYT");
  });
});
