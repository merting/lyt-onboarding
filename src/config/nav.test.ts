import { describe, expect, it } from "vitest";

import { isNavItemActive, primaryNavItems } from "@/config/nav";

describe("primaryNavItems", () => {
  it("includes Home, About, and Status routes", () => {
    expect(primaryNavItems.map((item) => item.href)).toEqual([
      "/",
      "/about",
      "/status",
    ]);
  });
});

describe("isNavItemActive", () => {
  it("marks home only on exact root path", () => {
    expect(isNavItemActive("/", "/")).toBe(true);
    expect(isNavItemActive("/about", "/")).toBe(false);
  });

  it("marks nested routes as active for their section", () => {
    expect(isNavItemActive("/status", "/status")).toBe(true);
    expect(isNavItemActive("/about", "/about")).toBe(true);
    expect(isNavItemActive("/status/details", "/status")).toBe(true);
  });
});
