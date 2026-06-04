# WBS Index — Design Modernization

Quick lookup table for all Design Modernization tasks.
Load this when you need to identify what a task number refers to without fetching from Notion.

> **Source of truth:** Notion → Streams → MVP → Personal Portfolio → Roadmap → 4. Design Modernization
> This file is a local cache — always verify against Notion for full acceptance criteria and code snippets.

---

## Phase 1 — Foundation & Design System Setup

| Task | Title | Type | Files |
|---|---|---|---|
| 1.1.1 | Establish CSS custom properties (design tokens) | Automated | `assets/css/main.css` |
| 1.1.2 | Set up dark mode base via `prefers-color-scheme` | Automated | `assets/css/main.css` |
| 1.1.3 | Self-host Segoe UI / system font stack | Automated | `_includes/head.html`, `assets/css/main.css` |
| 1.1.4 | Define spacing scale and apply globally | Automated | `assets/css/main.css` |
| 1.2.1 | Redesign hero section — layout, headline, CTA | Automated | `index.html`, `assets/css/main.css` |
| 1.2.2 | Update navigation bar — sticky, minimal | Automated | `_includes/header.html`, `assets/css/main.css` |
| 1.2.3 | Redesign footer — compact, branded | Automated | `_includes/footer.html`, `assets/css/main.css` |

---

## Phase 2 — Component Modernization

| Task | Title | Type | Files |
|---|---|---|---|
| 2.1.1 | Redesign project cards — modern card layout | Automated | `projects.html`, `assets/css/main.css` |
| 2.1.2 | Redesign certification cards — badge style | Automated | `certifications.html`, `assets/css/main.css` |
| 2.1.3 | Redesign experience timeline | Automated | `experience.html`, `assets/css/main.css` |
| 2.2.1 | Add hover animations to cards | Automated | `assets/css/main.css` |
| 2.2.2 | Add scroll-reveal animation to sections | Automated | `assets/js/animations.js`, `assets/css/main.css` |
| 2.2.3 | Add page load skeleton/fade-in | Automated | `assets/css/main.css`, `_layouts/default.html` |
| 2.3.1 | Modernize skill/tech stack section | Automated | `index.html` or `skills.html`, `assets/css/main.css` |
| 2.3.2 | Add icon system (SVG-based, inline) | Mixed | `_includes/icons/`, various `.html` files |

---

## Phase 3 — Responsive & Accessibility

| Task | Title | Type | Files |
|---|---|---|---|
| 3.1.1 | Audit and fix mobile layout (375px, 480px) | Automated | `assets/css/main.css` |
| 3.1.2 | Fix tablet layout (768px) — navigation collapse | Automated | `assets/css/main.css`, `_includes/header.html` |
| 3.1.3 | Add hamburger menu for mobile nav | Automated | `_includes/header.html`, `assets/js/nav.js`, `assets/css/main.css` |
| 3.2.1 | Audit and fix color contrast (WCAG AA) | Automated | `assets/css/main.css` |
| 3.2.2 | Add visible focus states to all interactive elements | Automated | `assets/css/main.css` |
| 3.2.3 | Add ARIA labels to icon-only buttons | Automated | Various `.html` files |
| 3.2.4 | Add skip-to-content link | Automated | `_layouts/default.html`, `assets/css/main.css` |

---

## Phase 4 — Polish & Performance

| Task | Title | Type | Files |
|---|---|---|---|
| 4.1.1 | Audit and optimize image sizes | Mixed | `assets/images/`, various `.html` files |
| 4.1.2 | Add lazy loading to below-fold images | Automated | Various `.html` files |
| 4.1.3 | Minify and defer non-critical JS | Automated | `_includes/head.html`, `_layouts/default.html` |
| 4.2.1 | Create custom 404 page — on-brand design | Automated | `404.html`, `assets/css/main.css` |
| 4.2.2 | Add print stylesheet | Automated | `assets/css/print.css`, `_includes/head.html` |
| 4.3.1 | Run Lighthouse audit — target 90+ all categories | Manual | N/A — user runs in browser |
| 4.3.2 | Fix remaining Lighthouse issues from audit | Automated | Varies per audit result |

---

## Notes

- **Type "Mixed"** = Claude writes the code, but asset sourcing (icons, images) may require manual steps
- **Phase ordering matters** — complete Phase 1 (design system) before Phase 2 (components); components must use the tokens
- Always check Notion for the most current task status before starting