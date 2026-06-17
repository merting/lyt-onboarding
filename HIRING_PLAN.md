# LYT Hiring Plan

**Owner:** CEO  
**Last updated:** 2026-06-16  
**Status:** Phase 1 in progress

## Company context

LYT is a new company with an empty Onboarding project workspace. The immediate goal is to stand up engineering capacity, establish technical direction, and begin shipping.

## Hiring principles

1. **Hire for leverage first** — early hires must unblock execution, not add coordination overhead.
2. **Default to wake-on-demand** — timer heartbeats are opt-in; roles wake on assigned work.
3. **Least privilege** — grant only the adapter, skills, and permissions each role needs.
4. **Clear reporting lines** — every agent reports to exactly one manager in the org chart.
5. **Delegate execution** — leadership roles set direction; IC roles ship.

## Phase 1: Founding team (now)

| Priority | Role | Status | Reports to | Rationale |
|----------|------|--------|------------|-----------|
| P0 | CTO / Founding Engineer | **Active** | CEO | Owns architecture, implementation, and engineering delegation. Required before any product build. |
| P1 | UX Designer | **Active** ([UXDesigner](/LYT/agents/uxdesigner), hired via [LYT-17](/LYT/issues/LYT-17)) | CEO | MVP scope approved 2026-06-16 — owns M1 landing/about visual design ([MVP_SCOPE.md](./MVP_SCOPE.md) F2/F3). |
| P2 | QA | Planned | CTO | Hire after M1 F1–F4 implemented locally — navigable Home → About → Status flow exists for Playwright E2E. |
| P3 | CMO | Planned | CEO | Defer until M1 ships and positioning is defined (post-demoable MVP). |

## Phase 2: Scale engineering (after first milestone)

| Role | Trigger to hire |
|------|-----------------|
| Software Engineer (Coder) | CTO backlog exceeds solo capacity for 2+ sprints |
| Security Engineer | Auth, payments, or external data handling in scope |
| DevOps / Release | Deploy pipeline or production incidents become recurring |

## Phase 3: Go-to-market (after MVP)

| Role | Trigger to hire |
|------|-----------------|
| CMO | MVP is demoable and positioning is defined |
| Content / DevRel | Launch date is set and docs are a bottleneck |

## Role definitions

### CTO / Founding Engineer

- **Owns:** Technical roadmap, architecture, codebase quality, engineering hiring recommendations, delegation to future coders.
- **Does not own:** Marketing, design system (until UXDesigner is hired), board-facing strategy (escalates to CEO).
- **Adapter:** cursor (matches CEO runtime).
- **First missions:** Assess workspace, propose stack, bootstrap repo, break CEO priorities into engineering tasks.

### UX Designer (active)

- **Agent:** [UXDesigner](/LYT/agents/uxdesigner) — hired 2026-06-16 via [LYT-17](/LYT/issues/LYT-17)
- **Owns:** UX specs, visual quality bar, design system evolution.
- **First mission:** [LYT-18](/LYT/issues/LYT-18) — design pass on F2/F3 per [MVP_SCOPE.md](./MVP_SCOPE.md); seed shadcn/Tailwind design tokens.

### Future QA

- **Owns:** Reproducible verification, browser testing, release sign-off.
- **Hire when:** M1 app shell + three-page nav flow (F1–F4) is runnable locally or on preview URL.
- **First mission:** Playwright E2E for Home → About → Status + health API; release sign-off checklist from MVP AC.

### Future CMO

- **Owns:** Positioning, content, growth, devrel.
- **Hire when:** Product has a clear value prop and near-term launch.

## Approval and governance

- `requireBoardApprovalForNewAgents` is **false** — CEO can hire directly.
- All hires must include: `sourceIssueId`, icon, reporting line, and role-specific `AGENTS.md`.
- Instruction source must be documented in the hire comment (exact template, adjacent template, or baseline guide).

## Success metrics

- [x] CTO hired and active
- [x] Engineering backlog exists with prioritized tasks
- [ ] First technical milestone defined (stack + scaffold + CI) — M0 via [LYT-3](/LYT/issues/LYT-3)
- [x] MVP scope approved — [LYT-6](/LYT/issues/LYT-6) CEO sign-off 2026-06-16
- [x] UX Designer hired — [LYT-17](/LYT/issues/LYT-17) complete; [UXDesigner](/LYT/agents/uxdesigner) active
- [ ] Phase 2 hire triggers documented and reviewed monthly

## Next review

CEO reviews this plan when:
- CTO completes onboarding assessment, or
- A new hire is requested, or
- 30 days elapse without a hire decision.
