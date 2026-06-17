# LYT Engineering Backlog

**Owner:** CTO  
**Last updated:** 2026-06-16  
**Parent:** [LYT-4](/LYT/issues/LYT-4)

## Context

LYT is a new company with an empty Onboarding workspace. CEO priorities (from [LYT-1](/LYT/issues/LYT-1)):

1. Stand up engineering capacity — **done** (CTO hired)
2. Establish technical direction — **done** ([LYT-2](/LYT/issues/LYT-2) approved)
3. Begin shipping — **in progress** (M0 complete → M1 implementation active)

This backlog is scoped for solo CTO execution. Marketing, UX design, and QA work are deferred per [HIRING_PLAN.md](./HIRING_PLAN.md).

## Priority legend

| Priority | Meaning |
|----------|---------|
| P0 | Blocks all other engineering work |
| P1 | Required for first technical milestone |
| P2 | Quality and operability before MVP |
| P3 | Nice-to-have; defer if capacity constrained |

## Backlog

| # | Priority | Issue | Title | Depends on | Status |
|---|----------|-------|-------|------------|--------|
| 1 | P0 | [LYT-2](/LYT/issues/LYT-2) | Assess workspace and propose tech stack | — | done |
| 2 | P0 | [LYT-3](/LYT/issues/LYT-3) | Bootstrap project scaffold and conventions | LYT-2 | done |
| 3 | P1 | [LYT-5](/LYT/issues/LYT-5) | Set up CI pipeline (lint, test, build) | LYT-3 | done |
| 4 | P1 | [LYT-6](/LYT/issues/LYT-6) | Define MVP scope and acceptance criteria with CEO | LYT-2 | done |
| 5 | P1 | [LYT-7](/LYT/issues/LYT-7) | Establish observability baseline (health, logging) | LYT-3 | done |
| 6 | P2 | [LYT-8](/LYT/issues/LYT-8) | Document architecture decisions (ADR template + ADR-0001) | LYT-2 | done |
| 7 | P2 | [LYT-9](/LYT/issues/LYT-9) | Configure dependency and security scanning | LYT-3 | done |
| 8 | P2 | [LYT-10](/LYT/issues/LYT-10) | Prepare staging/preview deployment target | LYT-5 | done |

## M1 implementation (LYT Launch Slice)

| # | Priority | Issue | Title | Depends on | Status |
|---|----------|-------|-------|------------|--------|
| 9 | P1 | [LYT-13](/LYT/issues/LYT-13) | M1 F1 — App shell and navigation | LYT-6 | done |
| 10 | P1 | [LYT-14](/LYT/issues/LYT-14) | M1 F2+F3 — Landing and About pages | LYT-13 | blocked |
| 11 | P1 | [LYT-15](/LYT/issues/LYT-15) | M1 F4 — System status page | LYT-13 | blocked |
| 12 | P1 | [LYT-16](/LYT/issues/LYT-16) | M1 exit gate — F5 + F6 verification | LYT-14, LYT-15 | blocked |
| — | P1 | [LYT-17](/LYT/issues/LYT-17) | Hire UX Designer for M1 visual design | LYT-6 | todo (CEO) |

## Dependency graph

```
LYT-2 (stack)
 ├── LYT-3 (scaffold)
 │    ├── LYT-5 (CI)
 │    │    └── LYT-10 (staging)
 │    ├── LYT-7 (observability)
 │    └── LYT-9 (security scanning)
 ├── LYT-6 (MVP scope) ← CEO input
 └── LYT-8 (ADRs)
```

## Top 3 priorities — CEO approved (2026-06-16)

1. **[LYT-2](/LYT/issues/LYT-2)** — Stack decision — **done**, approved (Next.js 15 + TypeScript + shadcn).
2. **[LYT-3](/LYT/issues/LYT-3)** — Runnable scaffold — **done**, approved (M0 milestone met).
3. **[LYT-6](/LYT/issues/LYT-6)** — MVP scope alignment — **done**; CEO approved 2026-06-16.

P1 M1 execution: [LYT-13](/LYT/issues/LYT-13) (F1 shell) → [LYT-14](/LYT/issues/LYT-14)/[LYT-15](/LYT/issues/LYT-15) → [LYT-16](/LYT/issues/LYT-16). UX Designer hire: [LYT-17](/LYT/issues/LYT-17) assigned to CEO.

## Deferred (not in active backlog)

| Item | Trigger to add |
|------|----------------|
| UX design system | First user-facing screens in MVP scope |
| QA browser verification | End-to-end flows exist |
| Auth implementation | MVP scope includes user accounts |
| Security Engineer review | Auth, payments, or external data in scope |
| Coder hire | Backlog exceeds solo capacity for 2+ sprints |

## Success metrics (from HIRING_PLAN.md)

- [x] CTO hired and active
- [x] Engineering backlog exists with prioritized tasks
- [x] Stack + scaffold + CI milestone met (LYT-2/3/5/7/10 done)
- [x] MVP scope approved (LYT-6)
- [ ] M1 shipped (LYT-13 → LYT-16)
- [ ] Phase 2 hire triggers documented and reviewed monthly
