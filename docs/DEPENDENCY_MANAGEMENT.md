# Dependency and Security Management

**Owner:** CTO  
**Last updated:** 2026-06-16

## Automated scanning

| Mechanism | When | Blocks merge? |
|-----------|------|---------------|
| `pnpm audit --audit-level=high` in CI | Every push/PR to `main` | Yes — high/critical findings fail the job |
| Dependabot | Weekly (Mondays) | No — opens PRs for review |
| Local `pnpm audit` | Before push (recommended) | No — developer feedback |

Run the full CI-equivalent check locally:

```bash
pnpm check:ci
```

Audit only (same gate as CI):

```bash
pnpm audit
```

Full vulnerability report including moderate/low:

```bash
pnpm audit:report
```

## Severity policy

- **Critical / High:** Must be resolved or explicitly mitigated before merge. CI enforces this via `--audit-level=high`.
- **Moderate / Low:** Tracked but do not block CI. Address in the next dependency update cycle or when upstream fixes land.

Document any accepted risk in the PR or issue comment with: advisory ID, why it is not exploitable in our context, and planned remediation date.

## Periodic updates

1. **Weekly (automated):** Dependabot opens grouped PRs for dev and production dependencies.
2. **On demand:** Run `pnpm update --latest` for a specific package when a security advisory requires it.
3. **Before release:** Run `pnpm audit:report` and review Dependabot backlog.

### Review checklist for dependency PRs

- CI green (lint, typecheck, test, build, audit)
- Changelog reviewed for breaking changes
- Lockfile changes are intentional (`pnpm-lock.yaml` only from `pnpm install` / `pnpm update`)

## Overrides

When upstream has not yet released a patched transitive dependency, use `pnpm.overrides` in `package.json` (see [pnpm docs](https://pnpm.io/package_json#pnpmoverrides)). Remove overrides once upstream catches up.

Current overrides are documented inline in `package.json` under `"pnpm": { "overrides": ... }`.

## Escalation

| Situation | Action |
|-----------|--------|
| No upstream fix available | Document mitigation; create follow-up issue with advisory link |
| Fix requires major version bump | CTO review; run full test suite + manual smoke check |
| Production runtime vulnerability | Priority bump; notify CEO if customer-facing impact |
