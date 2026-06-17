# UX Spec — M1 F2 Landing & F3 About Pages

**Owner:** UX Designer · **Issue:** [LYT-18](/LYT/issues/LYT-18)  
**Implementation:** [LYT-14](/LYT/issues/LYT-14) placeholder → CTO polish child issue  
**Status:** Approved for implementation  
**Last updated:** 2026-06-16

## Visual audit summary (baseline)

Verified at **1440×900 desktop** and **390×844 mobile** against `http://localhost:3002` (2026-06-16). Screenshots in `docs/ux-screenshots/`.

| Surface | MVP AC | Visual verdict |
|---------|--------|----------------|
| `/` (F2) | F2.1–F2.4 pass functionally | **Placeholder UI** — meets AC but fails visual quality bar |
| `/about` (F3) | F3.1–F3.3 pass functionally | **Placeholder UI** — readable but unpolished |

### Key findings (design lenses cited)

1. **Hierarchy is weak** — H1 “LYT” in hero duplicates header wordmark; no clear primary/secondary/tertiary distinction beyond size (Cognitive Load, Gestalt Similarity).
2. **Spacing is accidental** — content hugging top-left with vast empty canvas; hero lacks vertical centering intent (Proximity, Whitespace as design element).
3. **CTA pattern inconsistent** — landing uses filled button; about uses underlined text link for equivalent secondary action (Similarity, Jakob's Law).
4. **No token system** — inline `neutral-*` Tailwind classes; one-off values throughout (design system violation).
5. **Mobile nav stacks under logo** — acceptable for M1 but nav indent misaligns with hero content (Alignment).
6. **Footer contrast risk** — `text-neutral-500` on white may fail WCAG AA for small text (Accessibility / POUR Perceivable).

**Verdict:** Ship-blocking for *demo polish*, not for MVP functional AC. CTO implements spec below before M1 exit gate visual review.

---

## Information architecture

No IA change for M1. Three-page nav (Home, About, Status) is correct per MVP_SCOPE one-way door.

| Route | Purpose | Primary action |
|-------|---------|----------------|
| `/` | Company intro + value prop | CTA → `/about` (confirmed; F2.3) |
| `/about` | Mission narrative | Link → `/status` (F3.2) |

---

## Design tokens (seed)

Tokens added to `src/app/globals.css` via Tailwind v4 `@theme`. **Do not introduce one-off values in page components** — use these semantic names.

### Color (semantic)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-background` | `#ffffff` | `#0a0a0a` | Page bg |
| `--color-foreground` | `#171717` | `#ededed` | Primary text |
| `--color-muted` | `#737373` | `#a3a3a3` | Secondary text (body subcopy) |
| `--color-muted-foreground` | `#525252` | `#d4d4d4` | Nav inactive, footer |
| `--color-primary` | `#171717` | `#fafafa` | CTA fill, active nav |
| `--color-primary-foreground` | `#fafafa` | `#171717` | CTA label |
| `--color-border` | `#e5e5e5` | `#262626` | Header/footer rules |
| `--color-ring` | `#171717` | `#fafafa` | Focus ring |

Tailwind usage: `bg-background`, `text-foreground`, `text-muted`, `border-border`, `bg-primary`, `text-primary-foreground`, `ring-ring`.

### Typography

| Token | Size / weight | Usage |
|-------|---------------|-------|
| Display | `text-4xl sm:text-5xl font-bold tracking-tight` | Landing H1 only |
| Heading | `text-3xl font-bold tracking-tight` | About H1, Status H1 |
| Body | `text-lg leading-relaxed` | Value prop, mission paragraphs |
| Body muted | `text-lg text-muted leading-relaxed` | Landing subcopy |
| Label | `text-sm font-medium` | Nav links, footer |
| Wordmark | `text-lg font-semibold tracking-tight` | Header logo |

**Type system rule:** Two weights (normal, semibold/bold). Three size tiers (display, heading, body). No per-component font-size picks.

### Spacing (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-page-x` | `1rem` / `1.5rem` sm | Horizontal page padding (matches shell) |
| `--spacing-section` | `2rem` sm:`3rem` | Hero top padding, section gaps |
| `--spacing-stack-sm` | `1rem` (gap-4) | Paragraph stack on About |
| `--spacing-stack-md` | `1.5rem` (gap-6) | Hero element stack |
| `--spacing-stack-lg` | `2rem` (gap-8) | Major section separation |

### Radius & motion

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-md` | `0.375rem` | Buttons, focusable controls |
| `--duration-fast` | `150ms` | Hover/focus transitions |
| `--ease-default` | `ease-out` | All UI transitions |

**Motion rule:** Respect `prefers-reduced-motion: reduce` — disable transitions (Inclusive Design).

---

## Component choices (shadcn/ui)

Initialize shadcn if not present: `pnpm dlx shadcn@latest init` (New York style, neutral base, CSS variables).

| Pattern | Component | Variant / props | Where |
|---------|-----------|-----------------|-------|
| Primary CTA | `<Button asChild>` | `size="default"` | Landing “Learn about LYT” |
| Secondary action | `<Button asChild variant="link">` | with `ArrowRight` icon optional | About “View system status” |
| Text link (footer) | plain `<Link>` | `text-sm text-muted-foreground hover:text-foreground` | Footer links |
| Page section wrapper | none (semantic HTML) | `<section>` / `<article>` | Hero, About body |
| Nav | existing `SiteHeader` | token swap only | F1 shell |

**Do not** create custom button styles inline. Extend shadcn `Button` if needed.

---

## Page specs

### F2 — Landing (`src/app/page.tsx`)

**Layout:** Hero section vertically centered in main content area on desktop (min-height: calc viewport minus header/footer). Mobile: top-aligned with generous top padding.

```
┌─────────────────────────────────────────────┐
│ [LYT wordmark]          Home  About  Status   │  ← F1 shell
├─────────────────────────────────────────────┤
│                                             │
│   LYT                          (display)    │
│   Building the foundation…     (body muted) │
│   [ Learn about LYT ]          (Button)     │
│                                             │
├─────────────────────────────────────────────┤
│ © 2026 LYT              System status · API │
└─────────────────────────────────────────────┘
```

**Hierarchy (Von Restorff):** CTA is the only filled control in hero — draws eye after headline.

**Copy (placeholder until CMO):** Keep existing strings. No copy change in this pass.

**Classes (target):**

```tsx
<section className="flex min-h-[50vh] flex-col justify-center gap-6 pt-4 sm:min-h-[60vh] sm:pt-0">
  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">LYT</h1>
  <p className="max-w-xl text-lg leading-relaxed text-muted">…</p>
  <div>
    <Button asChild>
      <Link href="/about">Learn about LYT</Link>
    </Button>
  </div>
</section>
```

**F2.2 verification:** CTA visible without scroll at 1280×800 — maintain with hero `justify-center` and constrained main padding.

### F3 — About (`src/app/about/page.tsx`)

**Layout:** Article with clear heading → body stack → secondary action. Max readable line length `max-w-prose` (~65ch).

```
About LYT                    (heading)
─────────────────────────
Paragraph 1                  (body)
Paragraph 2                  (body)

[ View system status → ]     (Button variant="link")
```

**Classes (target):**

```tsx
<article className="flex max-w-prose flex-col gap-6">
  <h1 className="text-3xl font-bold tracking-tight">About LYT</h1>
  <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground">
    …paragraphs…
  </div>
  <Button asChild variant="link" className="h-auto p-0">
    <Link href="/status">View system status →</Link>
  </Button>
</article>
```

**Recognition over Recall:** Keep arrow in status link label (already present).

---

## Accessibility notes

| Requirement | Spec | Verification |
|-------------|------|--------------|
| Color contrast | Muted text ≥ 4.5:1 on background; CTA label ≥ 4.5:1 on primary fill | axe or DevTools contrast check |
| Focus visible | All links/buttons: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Tab through nav, CTA, footer |
| Focus order | DOM order matches visual order | Keyboard-only walkthrough |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { * { transition: none } }` | OS setting test |
| Touch targets | Min 44×44px for nav links and CTA on mobile (Fitts's Law) | Mobile screenshot / measure |
| Landmarks | `<main>` from shell; page uses `<section>`/`<article>`; nav has `aria-label` | Already on header |
| Page titles | Keep existing metadata exports | Automated tests pass |

---

## Shell token alignment (F1 — no structural change)

Update `SiteHeader` / `SiteFooter` to use semantic tokens instead of `neutral-*`:

- Header border: `border-border`
- Nav inactive: `text-muted-foreground hover:text-foreground`
- Nav active: `text-foreground font-medium`
- Footer text: `text-muted-foreground`

---

## CEO / branding flags

No board input required for this pass. Placeholder copy per MVP_SCOPE open question #3 is accepted. **Flag for CEO when CMO hired:** final value prop, mission tone, and whether “LYT” display treatment needs a logomark vs wordmark.

---

## Implementation checklist (CTO)

- [ ] Run `pnpm dlx shadcn@latest init` + add `button` component
- [ ] Apply token seed in `globals.css` (UX has seeded base; wire `@theme` colors)
- [ ] Refactor `page.tsx` hero layout + `<Button>` CTA
- [ ] Refactor `about/page.tsx` body + link-style `<Button>`
- [ ] Swap `SiteHeader` / `SiteFooter` to semantic tokens
- [ ] Add focus-visible styles (shadcn default or explicit)
- [ ] Add reduced-motion guard in globals.css
- [ ] Verify F2.1–F2.4, F3.1–F3.3 still pass (existing tests)
- [ ] Re-screenshot at 1440×900 and 390×844 for UX sign-off

---

## Acceptance criteria (UX sign-off)

UX will approve implementation when:

1. Visual hierarchy readable in 2 seconds (display → body → CTA)
2. Spacing uses token scale only — no stray one-offs
3. CTA and secondary actions use shadcn Button
4. WCAG AA contrast on all text
5. Focus rings visible on keyboard navigation
6. Desktop + mobile screenshots match spec layout intent
