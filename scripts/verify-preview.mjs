#!/usr/bin/env node
/**
 * Post-deploy smoke check for preview/staging URLs.
 * Usage: node scripts/verify-preview.mjs https://your-preview-url.vercel.app
 */

const baseUrl = process.argv[2]?.replace(/\/$/, "");

if (!baseUrl) {
  console.error("Usage: node scripts/verify-preview.mjs <preview-base-url>");
  process.exit(1);
}

const checks = [
  {
    name: "health endpoint",
    path: "/api/health",
    validate: async (res, body) => {
      if (res.status !== 200) return `expected 200, got ${res.status}`;
      const data = JSON.parse(body);
      if (data.status !== "ok") return `expected status ok, got ${data.status}`;
      if (data.ready !== true) return "expected ready: true";
      return null;
    },
  },
  {
    name: "home page",
    path: "/",
    validate: async (res) => (res.status === 200 ? null : `expected 200, got ${res.status}`),
  },
  {
    name: "about page",
    path: "/about",
    validate: async (res) => (res.status === 200 ? null : `expected 200, got ${res.status}`),
  },
  {
    name: "status page",
    path: "/status",
    validate: async (res) => (res.status === 200 ? null : `expected 200, got ${res.status}`),
  },
];

const FETCH_TIMEOUT_MS = 15_000;

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

let failed = 0;

for (const check of checks) {
  const url = `${baseUrl}${check.path}`;
  try {
    const res = await fetchWithTimeout(url);
    const body = await res.text();
    const error = await check.validate(res, body);
    if (error) {
      console.error(`FAIL ${check.name}: ${error} (${url})`);
      failed++;
    } else {
      console.log(`OK   ${check.name} (${url})`);
    }
  } catch (err) {
    console.error(`FAIL ${check.name}: ${err.message} (${url})`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log("\nAll preview checks passed");
