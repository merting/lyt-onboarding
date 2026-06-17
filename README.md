# LYT Onboarding

Minimal Next.js scaffold for LYT engineering. See [docs/adr/](./docs/adr/) for architecture decision records and [TECH_STACK.md](./TECH_STACK.md) for the full stack proposal.

## Prerequisites

- Node.js 20+ (LTS recommended)
- [pnpm](https://pnpm.io/) 10+

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Auto-fix ESLint issues |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm typecheck` | TypeScript type check |
| `pnpm test` | Run Vitest unit tests |
| `pnpm audit` | Dependency audit (blocks on high/critical; same as CI) |
| `pnpm audit:report` | Full audit report including moderate/low |
| `pnpm check` | Lint + typecheck + test (CI equivalent locally) |
| `pnpm check:ci` | Audit + check + build (full CI locally) |

## Health check

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "lyt-onboarding",
  "ready": true,
  "timestamp": "...",
  "version": "0.1.0"
}
```

Structured logging conventions are documented in [docs/CONVENTIONS.md](./docs/CONVENTIONS.md#observability).

## Project structure

```
src/
  app/          # Next.js App Router pages and API routes
  lib/          # Shared utilities and domain logic
docs/
  adr/            # Architecture decision records (see docs/adr/README.md)
  CONVENTIONS.md  # Engineering conventions
```

## Conventions

See [docs/CONVENTIONS.md](./docs/CONVENTIONS.md) for naming, commits, and PR expectations.

## CI

GitHub Actions runs dependency audit, lint, typecheck, tests, and build on push/PR to `main`. See `.github/workflows/ci.yml`.

Dependabot opens weekly dependency update PRs. See [docs/DEPENDENCY_MANAGEMENT.md](./docs/DEPENDENCY_MANAGEMENT.md) for the security and update process.

## Preview deployment

**Target:** Vercel preview/staging (see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)).

| Item | Value |
|------|-------|
| Preview URL | *Pending first Vercel import — update after Path A setup in DEPLOYMENT.md* |
| Health check | `curl https://<preview-url>/api/health` |
| Post-deploy verify | `node scripts/verify-preview.mjs https://<preview-url>` |

Three deploy paths are documented:

1. **Vercel Git integration** (recommended) — import repo in Vercel; auto-deploy on push
2. **Vercel CLI** — `npx vercel deploy` from a linked checkout
3. **GitHub Actions** — optional `.github/workflows/preview-deploy.yml` when `VERCEL_*` secrets are set

Environment variables: copy `.env.example` to `.env.local` for local dev. Secrets live in Vercel project settings, never in the repo.
