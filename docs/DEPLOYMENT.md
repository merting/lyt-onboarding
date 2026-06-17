# Deployment — Preview and Staging

**Owner:** CTO  
**Related:** [LYT-10](/LYT/issues/LYT-10), [ADR-0001](./adr/0001-initial-tech-stack.md), [MVP_SCOPE.md](../MVP_SCOPE.md)

## Overview

LYT hosts the onboarding app on **Vercel**. Preview deployments provide a public HTTPS URL for demos, QA handoff, and deploy verification without a custom domain.

| Environment | Trigger | URL pattern |
|-------------|---------|-------------|
| **Preview** | Push to any branch (or PR) | `https://<project>-<hash>.vercel.app` |
| **Production** | Push/merge to `main` (when enabled) | `https://<project>.vercel.app` or custom domain |

M0/M1 has no required secrets. Environment variables are optional until auth, database, or third-party APIs are added.

## Prerequisites

- GitHub repository with this codebase (CI green on `main` — see [LYT-5](/LYT/issues/LYT-5))
- [Vercel account](https://vercel.com/signup) with access to create/import projects
- Node.js 20+ and pnpm 10+ for local verification (see [README.md](../README.md))

## Path A — Vercel Git integration (recommended)

One-time setup; every push deploys automatically. No GitHub Actions secrets required.

1. **Import project** in [Vercel Dashboard](https://vercel.com/new) → Import Git Repository → select the LYT repo.
2. **Framework preset:** Next.js (auto-detected).
3. **Build settings** (pre-configured in `vercel.json`):
   - Install: `pnpm install --frozen-lockfile`
   - Build: `pnpm build`
   - Output: Next.js default (no override needed)
4. **Root directory:** repository root (`.`).
5. **Environment variables:** none required for M0/M1. Add vars under Project → Settings → Environment Variables when features need them (see [Secrets](#secrets-and-environment-variables)).
6. **Deploy.** Vercel runs the same build as CI. First successful deploy yields a preview URL.
7. **Record the URL** in the project README *Preview deployment* section (replace the placeholder).

### Branch behaviour

- **Preview:** each branch/PR gets a unique deployment URL.
- **Production:** assign the `main` branch as Production Branch in Vercel project settings when ready for a stable demo URL.

## Path B — Vercel CLI (manual / agent deploy)

Use when Git integration is not yet wired or for one-off preview deploys from a checkout.

```bash
pnpm install
pnpm check:ci          # local gate — same as CI
npx vercel login       # one-time browser auth
npx vercel link        # link checkout to Vercel project (creates .vercel/ — gitignored)
npx vercel deploy      # preview deployment
npx vercel deploy --prod   # production (main only, when approved)
```

After deploy, the CLI prints the preview URL. Verify with:

```bash
node scripts/verify-preview.mjs https://<preview-url>
```

## Path C — GitHub Actions (optional CI deploy)

`.github/workflows/preview-deploy.yml` deploys to Vercel when repository secrets are configured. Use this if the board prefers deploy orchestration in GitHub instead of Vercel Git hooks alone.

### Required GitHub Secrets

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel project `.vercel/project.json` after `vercel link`, or team settings |
| `VERCEL_PROJECT_ID` | Same as above |

The workflow is **skipped** when secrets are absent, so CI remains green without Vercel credentials.

## Secrets and environment variables

- **Never commit** `.env`, `.env.local`, or real credentials (see `.gitignore`).
- **Document** new vars in `.env.example` with placeholder comments only.
- **Store values** in Vercel → Project → Settings → Environment Variables, scoped to Preview / Production as appropriate.
- **Future CI secrets** (API keys for deploy hooks) go in GitHub → Settings → Secrets and variables → Actions.

Current M0/M1 app runs with zero env vars. When adding vars:

1. Update `.env.example`
2. Add to Vercel (Preview + Production scopes)
3. Document in this file under *Current variables*

### Current variables

| Variable | Required | Scopes | Purpose |
|----------|----------|--------|---------|
| *(none)* | — | — | M0/M1 scaffold needs no secrets |

## Post-deploy verification

Run after any preview or production deploy:

```bash
node scripts/verify-preview.mjs https://<your-preview-url>
```

Checks:

- `GET /api/health` → HTTP 200, JSON with `status: "ok"` and `ready: true`
- `GET /` → HTTP 200
- `GET /about` → HTTP 200 (M1)
- `GET /status` → HTTP 200 (M1)

Manual checks for M1 (when pages exist):

- `/about` and `/status` return 200 on the preview URL

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Build fails on Vercel, passes locally | Node/pnpm version mismatch | Vercel uses Node 20.x; `packageManager` in `package.json` pins pnpm |
| `pnpm install` fails | Lockfile out of sync | Run `pnpm install` locally, commit `pnpm-lock.yaml` |
| Health check 404 | Wrong base URL or deploy failed | Confirm deploy log; hit `/api/health` not `/health` |
| Missing env var at runtime | Var not set for Preview scope | Add in Vercel env settings for Preview |

## Rollback

- **Preview:** redeploy a previous commit from Vercel → Deployments → ⋮ → Redeploy.
- **Production:** promote a known-good preview deployment to Production in the Vercel dashboard.

## Related docs

- [README.md](../README.md) — local dev and CI commands
- [docs/CONVENTIONS.md](./CONVENTIONS.md#secrets-and-environment) — secrets policy
- [MVP_SCOPE.md](../MVP_SCOPE.md) — F6 preview deployment acceptance criteria
