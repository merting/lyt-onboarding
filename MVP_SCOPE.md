# LYT MVP Scope

**Owner:** CTO (draft) · **Approver:** CEO  
**Last updated:** 2026-06-16  
**Status:** Approved — CEO sign-off 2026-06-16 via [LYT-6](/LYT/issues/LYT-6) confirmation  
**Stack context:** [TECH_STACK.md](./TECH_STACK.md) · **Depends on:** M0 scaffold ([LYT-3](/LYT/issues/LYT-3))

## Executive summary

**MVP name:** LYT Launch Slice (M1)

**Goal:** Ship the smallest deployable, user-facing web product that proves end-to-end delivery (design → code → preview deploy → observability) and establishes the foundation for future product features.

**Default assumption (CEO may override):** LYT has no product-specific features defined yet. M1 is a **public company presence** — landing, about, and live status — not a full product. Product-specific features (accounts, data, workflows) are explicitly deferred to M2 after CEO defines product direction.

**Success definition:** A visitor can load the deployed site, navigate three pages, and see live system health — with structured logging on the server and a preview URL shareable for demos.

## Features in scope

| ID | Feature | Description |
|----|---------|-------------|
| F1 | App shell & navigation | Shared layout with header, footer, responsive container, and client-side nav between pages |
| F2 | Landing page | Home route with company name, one-line value prop, and primary CTA (placeholder copy until CEO/CMO provides final) |
| F3 | About page | Static route describing LYT mission and link to engineering status |
| F4 | System status page | `/status` page that fetches `GET /api/health` and displays service name, status, and timestamp |
| F5 | Error handling & logging | Global error boundary for UI failures; structured JSON logging on API routes |
| F6 | Preview deployment | Vercel preview deploy from `main`; public HTTPS URL documented in README |

## Features out of scope (M1)

| Item | Rationale | Revisit when |
|------|-----------|--------------|
| User authentication | No account requirement in M1 | CEO adds accounts to M2 scope |
| Database / persistence | All M1 content is static | First feature needs stored data |
| Payments / billing | No monetization in M1 | Revenue model defined |
| Admin dashboard | No authenticated users | Admin workflows in M2 |
| Custom domain | Preview URL sufficient for first demo | Pre-public launch |
| Marketing campaign / SEO | CMO not hired; placeholder copy only | CMO hired + positioning defined |
| Mobile native app | Web-responsive only | Explicit mobile requirement |
| i18n / localization | English only | International audience confirmed |
| Auth.js / PostgreSQL / Drizzle | Stack deferred per TECH_STACK.md | M2 scope includes accounts or data |

## Acceptance criteria (measurable)

### F1 — App shell & navigation

| # | Criterion | Verification |
|---|-----------|--------------|
| F1.1 | Shared layout wraps all M1 routes | Code review: single layout component used by `/`, `/about`, `/status` |
| F1.2 | Header nav links to Home, About, Status | Manual: click each link from any page; URL and active state correct |
| F1.3 | Layout is usable at 375px and 1280px widths | Manual: resize browser; no horizontal scroll; nav remains accessible |
| F1.4 | Footer includes link to `/api/health` or status page | Manual: footer link present and resolves |

### F2 — Landing page

| # | Criterion | Verification |
|---|-----------|--------------|
| F2.1 | `/` renders company name "LYT" and value prop text | Manual: page load shows both elements |
| F2.2 | Primary CTA button is visible above the fold on desktop | Manual: CTA visible without scroll at 1280×800 |
| F2.3 | CTA navigates to About or Status (CTO choice, documented) | Manual: click CTA → expected route loads |
| F2.4 | Page has `<title>` and meta description | Automated: HTML contains non-empty `<title>` and `meta name="description"` |

### F3 — About page

| # | Criterion | Verification |
|---|-----------|--------------|
| F3.1 | `/about` renders mission paragraph (≥2 sentences) | Manual: content visible |
| F3.2 | Page links to Status page | Manual: link click → `/status` loads |
| F3.3 | Page accessible from nav on all routes | Manual: nav link works from Home and Status |

### F4 — System status page

| # | Criterion | Verification |
|---|-----------|--------------|
| F4.1 | `/status` fetches `/api/health` client-side or server-side | Network tab or SSR: health endpoint called |
| F4.2 | Displays `status`, `service`, and `timestamp` from response | Manual: all three fields visible when API returns 200 |
| F4.3 | Shows user-visible error state when health endpoint fails | Manual: simulate failure (stop server or mock 500); error message shown, no blank page |
| F4.4 | Health API returns 200 with expected JSON schema | Automated: existing health test passes; `curl` returns `{ "status": "ok", "service": "lyt-onboarding", "timestamp": "..." }` |

### F5 — Error handling & logging

| # | Criterion | Verification |
|---|-----------|--------------|
| F5.1 | React error boundary catches render errors and shows fallback UI | Manual or test: throw in test component → fallback renders, app does not white-screen |
| F5.2 | API routes log structured JSON (level, message, timestamp) | Manual: hit `/api/health`; server log line is parseable JSON |
| F5.3 | Unhandled API errors return 500 with safe message (no stack trace to client) | Manual or test: trigger error route → 500 JSON without stack |

### F6 — Preview deployment

| # | Criterion | Verification |
|---|-----------|--------------|
| F6.1 | Vercel project connected to repo; preview deploy on push to `main` | Deploy log: build succeeds |
| F6.2 | Preview URL documented in README | Doc review: README contains deploy URL or setup steps |
| F6.3 | `/api/health` returns 200 on preview URL | `curl https://<preview-url>/api/health` → 200 |
| F6.4 | All three pages load on preview URL | Manual: `/`, `/about`, `/status` return 200 |

## M1 exit gate

M1 is **done** when all F1–F6 criteria pass on the preview deployment URL with evidence recorded in the closing issue comment.

## M2 placeholder (not in M1 — CEO defines next)

After M1 ships and CEO defines product direction, M2 may include:

- User accounts (Auth.js + PostgreSQL)
- First domain-specific workflow
- Custom domain + production deploy
- CMO-driven positioning and copy

M2 scope is a separate issue; do not start M2 work until CEO approves M1 and provides product direction.

## Hiring triggers (updated for M1)

Per [HIRING_PLAN.md](./HIRING_PLAN.md):

| Role | Trigger for M1 | Action on approval |
|------|----------------|-------------------|
| **UX Designer** | **Before F2/F3 visual design pass** — once CEO approves this scope, hire UX to own layout, typography, component polish, and design system seed (replace placeholder UI) | CEO hires UX Designer; CTO provides F1 shell + acceptance criteria |
| **QA** | **After F1–F4 implemented locally** — once navigable Home → About → Status flow exists, hire QA to own Playwright E2E suite and release sign-off | CEO hires QA; CTO provides preview URL + AC checklist |
| **CMO** | Unchanged — defer until MVP is demoable and positioning is defined (post-M1) | — |
| **Security Engineer** | Unchanged — not until auth, payments, or external PII in scope | — |
| **Coder** | Unchanged — backlog exceeds solo CTO capacity for 2+ sprints | — |

## Dependencies

```
LYT-2 (stack) ✓ → LYT-3 (M0 scaffold) → LYT-5 (CI) → LYT-10 (preview deploy)
                                      ↘ LYT-7 (observability) → F5
LYT-6 (MVP scope) ✓ CEO sign-off → M1 implementation ([LYT-13](/LYT/issues/LYT-13) → [LYT-14](/LYT/issues/LYT-14)/[LYT-15](/LYT/issues/LYT-15) → [LYT-16](/LYT/issues/LYT-16))
                                      ↘ [LYT-17](/LYT/issues/LYT-17) UX hire (CEO)
```

## One-way doors (CEO awareness)

1. **Three-page IA** — adding major nav sections after UX design starts creates rework
2. **Vercel hosting** — migration possible but env/CI changes required
3. **Placeholder copy → final copy** — low cost if UX owns design system before final content

## Open questions for CEO (answer via scope confirmation or comment)

1. Is "public company presence" the right M1 product, or should M1 target a specific product workflow instead?
2. Any must-have copy, audience, or branding constraints for F2/F3?
3. Accept placeholder UI for first deploy, with UX Designer hired immediately after scope approval?
