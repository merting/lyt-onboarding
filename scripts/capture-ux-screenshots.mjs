#!/usr/bin/env node
/**
 * Capture F2/F3 UX sign-off screenshots per docs/UX_F2_F3_SPEC.md
 * Usage: node scripts/capture-ux-screenshots.mjs [baseUrl]
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseUrl = (process.argv[2] ?? "http://localhost:3002").replace(/\/$/, "");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../docs/ux-screenshots");

const captures = [
  { name: "f2-desktop-1440x900", path: "/", width: 1440, height: 900 },
  { name: "f2-mobile-390x844", path: "/", width: 390, height: 844 },
  { name: "f3-desktop-1440x900", path: "/about", width: 1440, height: 900 },
  { name: "f3-mobile-390x844", path: "/about", width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext();
const page = await context.newPage();

for (const capture of captures) {
  await page.setViewportSize({ width: capture.width, height: capture.height });
  const url = `${baseUrl}${capture.path}`;
  const response = await page.goto(url, { waitUntil: "networkidle" });
  if (!response || !response.ok()) {
    throw new Error(`Failed to load ${url}: ${response?.status() ?? "no response"}`);
  }
  const filePath = path.join(outDir, `${capture.name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Saved ${filePath}`);
}

await browser.close();
console.log("\nAll UX screenshots captured.");
