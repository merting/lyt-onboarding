# Engineering Conventions

**Owner:** CTO  
**Last updated:** 2026-06-16

## Naming

| Area | Convention | Example |
|------|------------|---------|
| Files (components) | PascalCase | `UserMenu.tsx` |
| Files (utilities) | kebab-case or camelCase | `greeting.ts`, `format-date.ts` |
| React components | PascalCase | `function UserMenu()` |
| Functions/variables | camelCase | `getGreeting`, `isActive` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Types/interfaces | PascalCase | `UserProfile` |
| API routes | kebab-case segments | `/api/health`, `/api/user-profile` |
| Test files | co-located `*.test.ts(x)` | `greeting.test.ts` |

## TypeScript

- `strict` mode is enabled — do not disable without CTO review
- Prefer explicit return types on exported functions
- Avoid `any`; use `unknown` and narrow when needed
- Use path alias `@/*` for imports from `src/`

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

**Examples:**

```
feat(auth): add login form validation
fix(api): return 404 for missing resources
docs: update README setup steps
```

- Keep subject line ≤ 72 characters
- Use imperative mood ("add" not "added")
- One logical change per commit when possible

## Pull requests

- Link the Paperclip issue (e.g. `LYT-3`) in the PR description
- Include verification evidence: test output, screenshot, or manual check steps
- Require CI green before merge
- Prefer small, reviewable PRs (< 400 lines changed when possible)
- Request review from CTO for architecture or cross-cutting changes

## Code quality gates

All changes must pass locally before push:

```bash
pnpm check
```

For the full CI pipeline including dependency audit and build:

```bash
pnpm check:ci
```

CI runs the same checks on every PR. High/critical vulnerabilities block merge — see [DEPENDENCY_MANAGEMENT.md](./DEPENDENCY_MANAGEMENT.md).

## Secrets and environment

- Never commit `.env`, credentials, or API keys
- Use `.env.example` for documented env vars (no real values)
- Secrets belong in deployment platform config (Vercel, GitHub Secrets)

## Testing

- Unit tests with Vitest for business logic and utilities
- Co-locate tests next to source files
- E2E tests (Playwright) deferred until QA hire and first user flows exist

## Observability

### Health and readiness

- **Endpoint:** `GET /api/health`
- **Success (200):** `{ status, service, ready, timestamp, version }`
- **Failure (503):** `{ status: "degraded", service, ready: false, timestamp }` when readiness checks fail
- Use for load balancer probes and deploy verification (`curl localhost:3000/api/health`)

### Structured logging

Use `@/lib/logger` for all server-side logging. Do not use raw `console.log` in API routes or server utilities.

**Log shape (JSON, one object per line):**

```json
{
  "timestamp": "2026-06-16T10:00:00.000Z",
  "level": "info",
  "message": "health check succeeded",
  "service": "lyt-onboarding",
  "route": "/api/health",
  "requestId": "optional-correlation-id"
}
```

**Levels:** `debug`, `info`, `warn`, `error` (filtered by `LOG_LEVEL` env var; default `info` in production, `debug` in development).

**Patterns:**

```typescript
import { createLogger, logError } from "@/lib/logger";

const logger = createLogger({ route: "/api/example" });

logger.info("request handled", { requestId, statusCode: 200 });

try {
  // ...
} catch (error) {
  logError(logger, error, "request failed", { requestId, operation: "fetch-user" });
  throw error; // or return error response
}
```

**Error context requirements:** always include `errorName`, `errorMessage`, and `stack` (via `logError`), plus domain fields such as `route`, `operation`, or `requestId` that help reproduce the failure.

**Child loggers:** use `logger.child({ requestId })` to bind correlation IDs for a request scope.

**Deferred:** external log aggregation (Datadog, Axiom, etc.) — stdout JSON is sufficient until production traffic warrants a provider.

## Debt visibility

Shortcuts are acceptable when:

1. Named explicitly in code or issue comment
2. Scoped to a single feature/PR
3. Tracked as a follow-up issue with acceptance criteria

## Escalation

| Topic | Escalate to |
|-------|-------------|
| Product scope conflicts | CEO |
| Auth, crypto, permissions design | Security Engineer (when hired) |
| UX-facing changes | UX Designer (when hired) |
| Browser/E2E verification | QA (when hired) |
