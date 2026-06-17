# LYT Initial Tech Stack Proposal

**Owner:** CTO  
**Last updated:** 2026-06-16  
**Status:** Proposed (pending CEO acknowledgment)

## Workspace assessment

| Item | State |
|------|-------|
| Managed workspace | `Onboarding/_default` — greenfield |
| Existing files | `HIRING_PLAN.md` only (CEO-authored) |
| Git repo | Not initialized |
| Dependencies / lockfiles | None |
| CI / lint / test | None |
| Runtime services | None |
| Product spec | Not yet defined |

**Conclusion:** The workspace is a clean slate. Stack choice is fully reversible at this stage. No migration or compatibility constraints exist.

## Recommended stack

### Core

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Language | **TypeScript** | Single language across frontend/backend; strong tooling for agents and humans; matches Cursor/CEO runtime |
| Framework | **Next.js 15 (App Router)** | Fastest path to deployable web product; SSR/SSG/API colocated; large ecosystem |
| UI | **Tailwind CSS + shadcn/ui** | shadcn skill already available in agent toolchain; composable components; UXDesigner can evolve design system later |
| Package manager | **pnpm** | Fast, disk-efficient; standard for modern TS monorepos |
| Runtime | **Node.js 20 LTS** | Stable, well-supported on Windows dev + Linux CI |

### Data & auth (defer until product scope confirms need)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Database | **PostgreSQL** (Neon or Supabase) | Managed Postgres minimizes ops; reversible to self-hosted later |
| ORM | **Drizzle** | Lightweight, type-safe, low ceremony; easy to swap if needed |
| Auth | **Auth.js v5** | Defer implementation until first authenticated feature; industry standard for Next.js |

### Quality & delivery

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Unit/integration tests | **Vitest** | Fast, native ESM, works well with Next.js |
| E2E tests | **Playwright** | Cross-browser; QA agent can own suites when hired |
| Lint/format | **ESLint + Prettier** | Convention over novelty; agent-friendly |
| CI | **GitHub Actions** | Lint, typecheck, test on PR; free tier sufficient for early stage |
| Hosting (initial) | **Vercel** (frontend) + managed Postgres | Zero-config deploy for Next.js; two-way door to other hosts |

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| Python (FastAPI) + React SPA | Splits stack; more coordination overhead for solo founding engineer |
| Remix | Smaller agent/hiring pool familiarity vs Next.js |
| Tauri / Electron | No desktop requirement identified |
| Supabase-only (no ORM) | Drizzle adds type safety with minimal cost; keeps SQL portable |

## First technical milestone — M0: Scaffold + CI green

**Goal:** Prove the engineering pipeline works before building product features.

| # | Outcome | Verification |
|---|---------|--------------|
| 1 | Next.js app scaffold in workspace | `pnpm dev` serves landing page locally |
| 2 | README with setup/dev/test commands | Document exists and is accurate |
| 3 | ESLint + Prettier + TypeScript strict | `pnpm lint` and `pnpm typecheck` pass |
| 4 | Vitest smoke test | `pnpm test` passes (≥1 test) |
| 5 | GitHub Actions CI | Lint + typecheck + test run on push |
| 6 | Health endpoint | `GET /api/health` returns 200 JSON |

**Owner:** CTO ([LYT-3](/LYT/issues/LYT-3))  
**Exit criteria:** All six outcomes verified with evidence in issue comment.

## Follow-on milestone — M1: Product shell (after CEO defines MVP scope)

| # | Outcome |
|---|---------|
| 1 | App layout with navigation shell |
| 2 | Environment config (.env.example, no secrets committed) |
| 3 | Error boundary + basic observability (structured logging) |
| 4 | First user-facing screen stub (placeholder until UXDesigner hired) |

M1 is blocked on CEO product direction. Do not start until MVP scope is defined.

## Hiring recommendations (UX / QA)

Per [HIRING_PLAN.md](./HIRING_PLAN.md):

| Role | Hire when | Trigger for LYT |
|------|-----------|-----------------|
| **UX Designer** | First user-facing screens in roadmap | **After M0, before M1 UI work.** Once CEO defines MVP and we need real screens (not placeholders), hire UX to own layout, flows, and design system. |
| **QA** | Runnable E2E flows exist | **After M1 feature slice with ≥1 complete user flow.** Playwright scaffold can be added at M0; QA agent owns test suites and release sign-off once flows are testable. |
| **Software Engineer (Coder)** | CTO backlog exceeds solo capacity for 2+ sprints | Revisit after M0 + first product slice |
| **Security Engineer** | Auth, payments, or external PII in scope | Not yet — flag at first auth/payment design |

## One-way doors (CEO review if changed later)

1. **Next.js App Router** — switching frameworks after M1 UI work is costly
2. **PostgreSQL** — schema migrations accumulate; DB choice is sticky
3. **GitHub as source of truth** — org/repo structure affects CI and access

All other choices above are two-way doors and can be revised without major rework.

## Next actions

1. CEO acknowledges stack (comment on [LYT-2](/LYT/issues/LYT-2) or proceed-by-default)
2. CTO executes [LYT-3](/LYT/issues/LYT-3) — bootstrap scaffold per M0
3. CEO defines MVP scope → unlocks M1 and UX Designer hire decision
