# ADR-0001: Initial Tech Stack

**Status:** Accepted  
**Date:** 2026-06-16  
**Deciders:** CTO  
**Related:** [LYT-2](/LYT/issues/LYT-2), [LYT-3](/LYT/issues/LYT-3), [TECH_STACK.md](../../TECH_STACK.md)

## Context

LYT's onboarding workspace was greenfield: no dependencies, CI, runtime services, or product spec. The founding engineer needed a stack that:

- Minimizes solo-engineer coordination overhead
- Matches existing agent tooling (Cursor, shadcn skill, TypeScript ecosystem)
- Reaches a deployable web product quickly
- Keeps most choices reversible until product scope is defined

M0 (scaffold + CI green) was completed under [LYT-3](/LYT/issues/LYT-3), validating the core toolchain.

## Decision

Adopt the following stack for LYT engineering:

| Layer | Choice |
|-------|--------|
| Language | TypeScript (strict mode) |
| Framework | Next.js 15 (App Router) |
| UI | Tailwind CSS + shadcn/ui |
| Package manager | pnpm |
| Runtime | Node.js 20 LTS |
| Unit/integration tests | Vitest |
| E2E tests | Playwright (deferred until QA hire) |
| Lint/format | ESLint + Prettier |
| CI | GitHub Actions |
| Hosting (initial) | Vercel |
| Database (deferred) | PostgreSQL + Drizzle ORM |
| Auth (deferred) | Auth.js v5 |

Deferred layers (database, auth) are documented here but not implemented until product scope requires them.

## Alternatives considered

| Alternative | Pros | Cons | Why not chosen |
|-------------|------|------|----------------|
| Python (FastAPI) + React SPA | Strong backend ecosystem | Two languages, split deploy, more coordination for solo engineer | Higher overhead without identified need |
| Remix | Modern React framework, good DX | Smaller hiring/agent familiarity vs Next.js | Ecosystem and tooling advantage goes to Next.js |
| Tauri / Electron | Native desktop apps | No desktop requirement identified | Out of scope for current web-first direction |
| Supabase-only (no ORM) | Fast prototyping | Less type-safe schema layer; SQL less portable in codebase | Drizzle adds type safety with minimal ceremony |
| npm / yarn | Widely used | Slower, less disk-efficient than pnpm for monorepos | pnpm is standard for modern TS projects |

## Consequences

### Positive

- Single language across frontend, API routes, and tooling
- Next.js + Vercel provides zero-config deploy path
- shadcn/ui integrates with existing agent skills and supports future UXDesigner ownership
- Vitest + GitHub Actions CI already proven green in M0
- Most choices remain two-way doors until M1 UI and schema work begin

### Negative / tradeoffs

- Next.js App Router has a learning curve for developers unfamiliar with RSC patterns
- Vercel coupling is convenient early but may need evaluation at scale
- Playwright and E2E suites deferred — manual verification only until QA hire

### Reversibility

**One-way doors (CEO review required before changing):**

1. **Next.js App Router** — switching frameworks after M1 UI work is costly (component model, routing, deployment assumptions)
2. **PostgreSQL** — schema migrations accumulate; database choice becomes sticky once data exists
3. **GitHub as source of truth** — org/repo structure affects CI, access control, and integrations

**Two-way doors (reversible with moderate effort):**

- Tailwind/shadcn, pnpm, Vitest, ESLint/Prettier, Vercel hosting, Drizzle ORM, Auth.js — can be swapped or removed before dependent features land

## Verification

M0 acceptance criteria met under [LYT-3](/LYT/issues/LYT-3):

```bash
pnpm check          # lint + typecheck + test pass
pnpm build          # production build succeeds
curl localhost:3000/api/health  # returns 200 JSON
```

## Follow-up

- [ ] CEO acknowledges one-way doors listed above (comment on [LYT-2](/LYT/issues/LYT-2) or this ADR)
- [ ] Add shadcn/ui components when first UI feature begins (M1)
- [ ] ADR-0002 for database schema when product scope confirms persistence needs
- [ ] ADR-0003 for auth approach when first authenticated feature is scoped
