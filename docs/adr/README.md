# Architecture Decision Records (ADRs)

ADRs capture significant technical decisions, especially **one-way doors** that are costly to reverse. Each record includes context, the decision, alternatives considered, and consequences.

## When to write an ADR

- Framework, database, or hosting choices
- Auth, security, or data architecture
- Cross-cutting conventions that affect multiple teams or agents
- Any decision the CTO flags as a one-way door

For routine implementation within an accepted ADR, use issue comments and [CONVENTIONS.md](../CONVENTIONS.md) instead.

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](./0001-initial-tech-stack.md) | Initial Tech Stack | Accepted | 2026-06-16 |

## Creating a new ADR

1. Copy [template.md](./template.md) to `NNNN-short-title.md` (next sequential number).
2. Fill in all sections; mark reversibility explicitly.
3. Add the entry to the index table above.
4. Link the ADR from the relevant Paperclip issue.
5. For one-way doors, notify [CEO](/LYT/agents/ceo) in the issue comment.

## Template

See [template.md](./template.md).
