---
name: design-modernization
description: >
  Execute Design Modernization tasks for the personal portfolio site abubakarriaz.com.pk (Jekyll + GitHub Pages).
  Use this skill whenever Abubakar mentions a Design Modernization task number (e.g. 1.1.1, 2.2.3), says "work on design",
  references the Design Modernization WBS or roadmap, or asks to implement visual improvements, UI layout changes,
  component redesigns, typography upgrades, color palette updates, dark mode, animations, accessibility improvements,
  mobile responsiveness, or any frontend styling changes on the portfolio site.
  Also trigger when asked to create a branch, open a PR, or implement any Design Modernization sprint task on the portfolio repo.
  Always use the git-flow skill for branch/PR lifecycle management.
---

# Design Modernization Skill — abubakarriaz.com.pk

## Context

- **Site:** `abubakarriaz.com.pk` — Jekyll + GitHub Pages, custom `.pk` domain
- **Repo:** `github.com/mabubakarriaz/mabubakarriaz.github.io`
- **Branch strategy:** Always create a new branch from `main` named after the task number (via git-flow)
- **PR:** Open a PR from the task branch → `main` once work is complete
- **Notion WBS:** Streams → MVP → Personal Portfolio → Roadmap → 4. Design Modernization
- **Git Flow:** Always follow the `/git-flow` skill for branch creation, commits, PR creation, and post-merge validation

---

## Goal

Modernize the portfolio's visual identity and user experience — from a functional site into a polished, branded presence that reflects the professional caliber of a Principal DevOps Engineer and aspiring Solutions Architect. Every task should move the site closer to a clean, minimal, technically credible design.

---

## Design Principles (Apply to Every Task)

| Principle | Guidance |
|---|---|
| **Minimal over busy** | Prefer whitespace, clean grids, and clear hierarchy |
| **Microsoft-adjacent aesthetics** | Fluent Design cues: depth, motion, acrylic — without copying |
| **Mobile-first** | All changes must pass a mobile viewport check |
| **Brand consistent** | Stick to the established color palette — see `references/design-tokens.md` |
| **Accessible** | WCAG AA minimum: contrast ratios, alt text, focus states |
| **Performance-safe** | No change should regress Lighthouse performance score below 90 |

---

## Scope Boundaries

| In Scope | Out of Scope |
|---|---|
| `abubakarriaz.com.pk` (Jekyll + GitHub Pages) | Any other repo or site |
| CSS/SCSS, HTML layout, Liquid templates | Jekyll backend logic, `_config.yml` content fields |
| Typography, color, spacing, animations | Blog content on Hashnode |
| Responsive breakpoints, mobile layout | SEO meta tags (use SEO Hardening skill) |
| Accessibility (ARIA, contrast, focus) | Analytics scripts (use Audience Infrastructure skill) |
| Component-level redesigns | New pages not in the existing site structure |

---

## Workflow (Always Follow This Order)

### Step 1 — Load the Task

1. Fetch the Notion Design Modernization page via the Notion MCP if you need full task details
2. Locate the task number given by the user (e.g. `1.2.1`)
3. Read the task description, mockup references, and **acceptance criteria** carefully
4. Classify the task type — see Step 2
5. Load `references/design-tokens.md` if the task involves colors, typography, or spacing

### Step 2 — Classify the Task

Tasks fall into two categories:

| Category | Examples | Action |
|---|---|---|
| **Automated** — code/config changes to Jekyll files | Hero section redesign, card layout, CSS variables, font swap, animation, dark mode toggle | Claude implements via branch + PR |
| **Manual** — external tools or assets needed | Exporting custom font files, sourcing new icons from a design tool, creating hero illustration in Figma/Canva | Claude writes step-by-step guide, user executes |

### Step 3 — Identify Files to Change (Automated Tasks Only)

Based on the task area, determine which files are affected:

| Task Area | File(s) |
|---|---|
| Global CSS variables / design tokens | `assets/css/main.css` or `_sass/_variables.scss` |
| Hero section layout | `index.html` or `_layouts/home.html` |
| Navigation bar | `_includes/header.html` or `_includes/nav.html` |
| Footer | `_includes/footer.html` |
| Typography (font family, size scale) | `assets/css/main.css`, `_includes/head.html` (font import) |
| Card components (projects, certs, posts) | `_includes/card.html`, `projects.html`, `certifications.html` |
| Color palette / dark mode | `assets/css/main.css` (CSS custom properties + `prefers-color-scheme`) |
| Animations / transitions | `assets/css/main.css` or `assets/js/animations.js` |
| Responsive breakpoints | `assets/css/main.css` (media queries) |
| Accessibility (focus, ARIA) | Whichever component file contains the affected element |
| Icon system | `_includes/icons/`, or SVG inline in `.html` files |
| Layout grid / spacing system | `assets/css/main.css` |

### Step 4 — Bootstrap the Git Flow

**Load the git-flow skill and follow it from Phase 1.** Branch naming for this skill:

```bash
git checkout main
git pull origin main
git checkout -b design/task-<TASK_NUMBER>
# Example: git checkout -b design/task-1.2.1
```

Branch naming convention: `design/task-<TASK_NUMBER>` (e.g. `design/task-1.2.1`, `design/task-3.1.2`)

### Step 5 — Implement the Task

Follow these implementation rules:

**CSS / SCSS**
- Use CSS custom properties (variables) for all colors, font sizes, and spacing — never hardcode values
- Place new variables in the `:root {}` block at the top of `main.css`
- Use `rem` for font sizes, `em` for component spacing, `px` only for borders/shadows
- Media query breakpoints: `480px` (mobile), `768px` (tablet), `1024px` (desktop), `1280px` (wide)

**HTML / Liquid**
- Never alter functionality while changing layout — surgical edits only
- Use semantic HTML (`<section>`, `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>`)
- All external links: `target="_blank" rel="noopener"`
- All images: `alt` attribute required, even if `alt=""`

**Animations**
- Use CSS transitions/animations over JS wherever possible
- Respect `prefers-reduced-motion` — wrap all animations in:
  ```css
  @media (prefers-reduced-motion: no-preference) { ... }
  ```

**Dark Mode**
- Implement via CSS custom properties with `@media (prefers-color-scheme: dark)`
- Test both light and dark explicitly

**Fonts**
- Self-host fonts (place in `assets/fonts/`) — no Google Fonts CDN for performance
- Use `font-display: swap` in `@font-face` declarations

### Step 6 — Self-Validate Against Acceptance Criteria

Before committing, verify each acceptance criterion from the Notion task:

- [ ] Does the change satisfy every stated acceptance criterion?
- [ ] Passes mobile viewport check (≤480px, 768px)
- [ ] No existing functionality broken — test navigation, links, and interactive elements mentally
- [ ] CSS custom properties used — no hardcoded color/size values
- [ ] All images have `alt` attributes
- [ ] Animations wrapped in `prefers-reduced-motion` guard
- [ ] External links have `target="_blank" rel="noopener"`
- [ ] No TODO/FIXME/debug comments left in code

### Step 7 — Commit (via git-flow Phase 2 commit conventions)

```bash
git add <changed files>
git commit -m "Design: <task number> — <short description>"
# Example: git commit -m "Design: 1.2.1 — Modernize hero section with gradient background and CTA button"
git push origin design/task-<TASK_NUMBER>
```

Commit message format: `Design: <task number> — <short description of what was done>`

### Step 8 — Open a Pull Request (Automated Tasks)

Use the git-flow PR template, adapted with this header structure:

```
Title: Design <task number> — <short description>

## What this PR does
<1–3 sentence summary of the visual/UX change and why it improves the site>

## Files changed
- `<file1>` — <why>
- `<file2>` — <why>

## Design decisions
- <Why a particular color/font/spacing was chosen>
- <Any trade-off made (e.g., animation disabled on mobile for performance)>

## Acceptance criteria (from Notion WBS)
- [ ] <criterion 1>
- [ ] <criterion 2>

## How to verify
<Step-by-step visual validation instructions>
1. Open https://abubakarriaz.com.pk in browser
2. Check <specific element> at mobile (375px) and desktop (1280px)
3. Toggle dark mode and verify color scheme switches correctly

## Screenshots
<!-- Attach before/after screenshots if applicable -->

## Notion task
Streams → MVP → Personal Portfolio → Roadmap → 4. Design Modernization → <task number>
```

### Step 8 (Manual Tasks) — Provide a Step-by-Step Guide

For tasks requiring external tools (Figma, Canva, icon sets, font downloads), output:

```
## Manual Task: <task number> — <task title>

**Tool required:** <Figma / Canva / Google Fonts / Iconify / etc.>
**Time required:** ~<X> minutes

### Steps:
1. Go to <URL or location>
2. <Exact action to take>
3. <Place the asset at: `assets/<path>`>
4. <Expected result>

### Acceptance criteria:
- [ ] <criterion 1>
- [ ] <criterion 2>

Let me know when the asset is ready and I'll continue with the implementation.
```

### Step 9 — Post-PR Validation (via git-flow Phase 6)

After the PR is merged, validate using the git-flow post-merge checklist, plus these design-specific checks:

| Task Area | Validation |
|---|---|
| Hero / layout | Open portfolio at 375px, 768px, 1280px — verify layout holds at all breakpoints |
| Typography | Check heading hierarchy — H1 visible, H2/H3 scale correct |
| Color / dark mode | Toggle OS dark mode — verify colors switch, no invisible text |
| Animations | Verify smooth on desktop; verify disabled or subtle on mobile |
| Accessibility | Run Lighthouse Accessibility audit — target 90+ score |
| Performance | Run Lighthouse Performance audit — must remain 90+ |
| Links | Click all modified links, verify `target="_blank"` opens new tab |

### Step 10 — Report Back

Tell the user:
- What branch was created (or that it was a manual task)
- What files were changed and why (or step-by-step guide for manual tasks)
- Key design decisions made and why
- How to verify the acceptance criteria visually
- Post-PR validation steps after merge
- Reminder to mark the task as done in Notion manually

---

## Quick Reference — Task Area Index

See `references/wbs-index.md` for the full task list with task numbers, brief descriptions, and file targets.
See `references/design-tokens.md` for the canonical color palette, typography scale, and spacing system.

---

## Important Notes

- **Never push directly to `main`** — always follow git-flow Phase 1 (new branch from updated main)
- **Never mark tasks done in Notion** — the user does this manually after reviewing and merging the PR
- **CSS custom properties are mandatory** — if a task touches color, size, or spacing, it must use variables
- **Mobile-first always** — write CSS for mobile first, then use `min-width` media queries for larger screens
- **Lighthouse score protection** — any animation, font, or image change must not regress performance below 90
- **Dark mode is additive** — when implementing any component, add its dark mode variant in the same commit
- **Accessibility is not optional** — every new or modified interactive element must have visible focus state and sufficient contrast
- **If design tokens file (`references/design-tokens.md`) doesn't exist yet** — ask the user to provide the color palette and font choices before starting any visual task
- **If the GitHub repo URL is uncertain** — confirm with the user before creating the branch