# Design Specification — abubakarriaz.com.pk

> **Purpose:** Machine-readable and human-readable acceptance criteria for every Design Modernization task.
> Each section maps 1-to-1 with the WBS task number. Use this file alongside `wbs-index.md` and `design-tokens.md`.

---

## How to Use This Document

- **Before starting a task:** Read the acceptance criteria and measurable thresholds.
- **Before committing:** Self-validate every criterion — check the corresponding test in `tests/design.spec.ts`.
- **Test map:** Each task lists the exact Playwright test tags (`[task-X.X.X]`) that verify it.

---

## Phase 1 — Foundation & Design System Setup

### Task 1.1.1 — Establish CSS Custom Properties (Design Tokens)

**Files:** `assets/css/main.css`

**What to implement:**
- Add a `:root {}` block containing all CSS custom properties from `design-tokens.md`.
- Group tokens by category: colors, typography, spacing, shadows, border-radius, animation.

**Measurable acceptance criteria:**

| Token category | Required CSS variables | Light mode values |
|---|---|---|
| Primary brand | `--color-primary` | `#0078D4` |
| Primary dark | `--color-primary-dark` | `#005A9E` |
| Primary light | `--color-primary-light` | `#C7E0F4` |
| Background | `--color-bg` | `#FFFFFF` |
| Surface | `--color-surface` | `#F5F5F5` |
| Border | `--color-border` | `#E0E0E0` |
| Text | `--color-text` | `#1A1A1A` |
| Text muted | `--color-text-muted` | `#555555` |
| Text disabled | `--color-text-disabled` | `#999999` |
| Success | `--color-success` | `#107C10` |
| Warning | `--color-warning` | `#D83B01` |
| Info | `--color-info` | `#0078D4` |
| Error | `--color-error` | `#A80000` |
| Font sans | `--font-sans` | `'Segoe UI', system-ui, -apple-system, sans-serif` |
| Font mono | `--font-mono` | `'Cascadia Code', 'Fira Code', monospace` |
| Text scale | `--text-xs` through `--text-4xl` | 0.75rem → 3rem |
| Font weights | `--font-normal` through `--font-bold` | 400 / 500 / 600 / 700 |
| Line heights | `--leading-tight/normal/relaxed` | 1.2 / 1.5 / 1.75 |
| Spacing | `--space-1` through `--space-24` | 0.25rem → 6rem |
| Shadows | `--shadow-sm` through `--shadow-xl` | see design-tokens.md |
| Radii | `--radius-sm` through `--radius-full` | 4px → 9999px |
| Durations | `--duration-fast/normal/slow` | 150ms / 250ms / 400ms |
| Easing | `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |

**Rules:**
- No hardcoded color, size, or spacing values anywhere in CSS — use variables only.
- All `font-size` declarations must use `rem` units.
- All spacing (padding, margin, gap) must use `em` or `rem` — no `px` for spacing.
- `px` is allowed only for `border-width` and `box-shadow` blur/spread.

**Tests:** `[task-1.1.1]` (15 assertions across color, typography, shadow, radius, animation tokens)

---

### Task 1.1.2 — Dark Mode Base via `prefers-color-scheme`

**Files:** `assets/css/main.css`

**What to implement:**
- Add `@media (prefers-color-scheme: dark) { :root { … } }` block overriding color tokens.

**Measurable acceptance criteria:**

| Token | Dark mode value |
|---|---|
| `--color-primary` | `#2B88D8` |
| `--color-primary-dark` | `#106EBE` |
| `--color-primary-light` | `#243A5E` |
| `--color-bg` | `#1A1A1A` |
| `--color-surface` | `#242424` |
| `--color-border` | `#333333` |
| `--color-text` | `#F0F0F0` |
| `--color-text-muted` | `#AAAAAA` |
| `--color-text-disabled` | `#555555` |

**Rules:**
- Shadow tokens: reduce opacity by 0.02–0.04 vs. light mode equivalents.
- Semantic colors (success, warning, info, error) remain unchanged in dark mode.
- No element should become invisible (white text on white, black on black) in dark mode.

**Tests:** `[task-1.1.2]` (4 assertions: primary, bg, text token values; media query presence)

---

### Task 1.1.3 — Self-Host Segoe UI / System Font Stack

**Files:** `_includes/head.html`, `assets/css/main.css`

**What to implement:**
- Remove all Google Fonts `<link>` tags from `_includes/head.html`.
- Set `--font-sans` to `'Segoe UI', system-ui, -apple-system, sans-serif`.
- Set `--font-mono` to `'Cascadia Code', 'Fira Code', monospace`.
- Apply `font-family: var(--font-sans)` to `body`.
- Apply `font-family: var(--font-mono)` to `code`, `pre`, `kbd`.

**Measurable acceptance criteria:**
- Zero requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
- Zero external font file downloads (no `.woff2` from CDN).
- Zero `<link rel="preload" as="font">` tags (system fonts need none).
- `--font-sans` computed value contains `Segoe UI` or `system-ui`.
- `body` computed `font-family` resolves to the system stack.

**Tests:** `[task-1.1.3]` (3 assertions: no Google Fonts, no external font downloads, font-sans value)

---

### Task 1.1.4 — Define Spacing Scale and Apply Globally

**Files:** `assets/css/main.css`

**What to implement:**
- Add all spacing variables (`--space-1` through `--space-24`) to the `:root` block.
- Replace all hardcoded `padding`, `margin`, and `gap` values in existing rules with spacing variables.

**Measurable acceptance criteria:**

| Variable | Value |
|---|---|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |
| `--space-24` | `6rem` |

**Tests:** `[task-1.1.4]` (2 assertions: all 9 vars exist; `--space-4` = 1rem, `--space-8` = 2rem, `--space-16` = 4rem)

---

### Task 1.2.1 — Redesign Hero Section

**Files:** `index.html`, `assets/css/main.css`

**What to implement:**
- A full-width hero section as the first `<section>` on the homepage.
- Centered or left-aligned headline using `--text-4xl` (3rem) on desktop, `--text-3xl` on mobile.
- Subtitle/tagline using `--text-md` or `--text-lg`.
- At least one CTA button/link with class `btn` or `cta` styled with `--color-primary`.
- Background: either `--color-primary` with white text, or `--color-bg` with `--color-text`.

**Measurable acceptance criteria:**
- Hero section is the first visible `<section>` on homepage.
- `<h1>` is inside the hero and contains the name "Abubakar Riaz".
- At least one `<a>` or `<button>` inside the hero acts as a CTA.
- Hero is visible at 375px, 768px, and 1280px viewports.
- CTA has a hover state with `transition` applied.

**Tests:** `[task-1.2.1]` (3 assertions: hero visible, H1 visible + non-empty, CTA visible)

---

### Task 1.2.2 — Update Navigation Bar

**Files:** `_includes/header.html` (or `_layouts/default.html`), `assets/css/main.css`

**What to implement:**
- Navigation with `position: sticky` or `position: fixed` and `top: 0`.
- Background: `--color-bg` with `box-shadow: var(--shadow-sm)` when scrolled.
- Links use `--color-text`; active link uses `--color-primary`.
- Minimum 4 navigation links: About / Experience / Certifications / Projects.
- `<nav>` landmark element wrapping the links.
- Dark mode: background switches to `--color-surface`.

**Measurable acceptance criteria:**
- `nav` or `header` computed `position` is `sticky` or `fixed`.
- Navigation contains at least 4 `<a>` elements.
- Navigation is visible at 375px, 768px, 1280px.
- Navigation does not overlap main content (adequate `padding-top` on `main`).

**Tests:** `[task-1.2.2]` (3 assertions: nav visible, position sticky/fixed, ≥4 links)

---

### Task 1.2.3 — Redesign Footer

**Files:** `_includes/footer.html` (or `_layouts/default.html`), `assets/css/main.css`

**What to implement:**
- Compact single-row or two-row footer.
- Background: `--color-surface`; text: `--color-text-muted`.
- Links: GitHub and LinkedIn icons (SVG, `aria-label` on each).
- Copyright line with current year (use Liquid `| date: '%Y'`).
- All external links: `target="_blank" rel="noopener noreferrer"`.

**Measurable acceptance criteria:**
- `<footer>` is visible on all 6 pages.
- Footer contains a link to `github.com`.
- Footer contains a link to `linkedin.com`.
- All footer external links have `target="_blank"` and `rel` containing `"noopener"`.

**Tests:** `[task-1.2.3]` (4 assertions: footer visible on all pages, GitHub link, LinkedIn link, link attributes)

---

## Phase 2 — Component Modernization

### Task 2.1.1 — Redesign Project Cards

**Files:** `projects/index.html`, `assets/css/main.css`

**What to implement:**
- Each project wrapped in a card `<article class="card">`.
- Card styles: `background: var(--color-surface)`, `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-sm)`.
- Card padding: `var(--space-6)`.
- Card header: project name as `<h3>`, followed by a short description.
- Card footer: tech tags and/or a link to the project.
- Dark mode: `background: var(--color-surface)` automatically switches via CSS variable.

**Measurable acceptance criteria:**
- At least 1 card component exists on `/projects/`.
- Card has a non-transparent computed background color.
- Card has a CSS `transition` property defined (for hover animation).
- Card heading (`h3`) is visible.

**Tests:** `[task-2.1.1]` (3 assertions: cards present, background non-transparent, transition defined)

---

### Task 2.1.2 — Redesign Certification Cards (Badge Style)

**Files:** `certifications/index.html`, `assets/css/main.css`

**What to implement:**
- Each certification in a `.cert-card` with issuer color accent on the left border or top stripe.
- Issuer color classes: `.azure`, `.github`, `.google`, etc. — each maps to a specific border/accent color.
- Card displays: cert name, issuer label, date, and optional verification link.
- Grid layout: 1 column on mobile, 2 on tablet, 3 on desktop.

**Measurable acceptance criteria:**
- At least 1 `.cert-card` or `[class*="cert-card"]` element exists on `/certifications/`.
- Cert name element (`.cert-name` or equivalent) is visible.
- Grid switches from 1→2→3 columns across breakpoints (no hardcoded widths).

**Tests:** `[task-2.1.2]` (2 assertions: cards present, cert-name visible)

---

### Task 2.1.3 — Redesign Experience Timeline

**Files:** `experience/index.html`, `assets/css/main.css`

**What to implement:**
- Vertical timeline: a `.timeline` wrapper with `.timeline-item` children.
- Each item: left dot/icon, date range label, company name as heading, bullet list of achievements.
- Timeline connector line: `border-left: 2px solid var(--color-border)` on the wrapper or items.
- Date label uses `--color-text-muted` and `--text-sm`.

**Measurable acceptance criteria:**
- `.timeline` or `[class*="timeline"]` wrapper is visible on `/experience/`.
- At least 1 timeline item exists.
- Each item has a visible date/period label.
- Timeline connector line is rendered (left border on wrapper or pseudo-element).

**Tests:** `[task-2.1.3]` (3 assertions: timeline visible, ≥1 item, date label visible)

---

### Task 2.2.1 — Add Hover Animations to Cards

**Files:** `assets/css/main.css`

**What to implement:**
- Add `transition: transform var(--duration-normal) var(--ease-default), box-shadow var(--duration-normal) var(--ease-default)` to `.card`, `.cert-card`, `.timeline-card`.
- On `:hover`: `transform: translateY(-2px)` and `box-shadow: var(--shadow-md)`.
- Wrap inside `@media (prefers-reduced-motion: no-preference)`.

**Measurable acceptance criteria:**
- CSS contains at least one `:hover` rule with `transition`.
- Cards have `transition` property set in computed styles.
- The transition is NOT applied when `prefers-reduced-motion: reduce` is emulated.
- `prefers-reduced-motion` guard is present in the CSS source.

**Tests:** `[task-2.2.1]` (4 assertions: hover rule present, transition defined, reduced-motion guard, no animation under reduced-motion)

---

### Task 2.2.2 — Add Scroll-Reveal Animation to Sections

**Files:** `assets/js/animations.js` (or `assets/js/main.js`), `assets/css/main.css`

**What to implement:**
- Add `class="animate-on-scroll"` to cards, timeline items, and section headings.
- JavaScript IntersectionObserver: when element enters viewport, add `.is-visible` class.
- CSS: `.animate-on-scroll` starts `opacity: 0; transform: translateY(16px)`.
- CSS: `.animate-on-scroll.is-visible` transitions to `opacity: 1; transform: translateY(0)`.
- Guard animation CSS with `@media (prefers-reduced-motion: no-preference)`.

**Measurable acceptance criteria:**
- At least 1 element carries `.animate-on-scroll` or `[data-aos]` on the homepage.
- After page load and scroll, elements transition to visible state.
- Under `prefers-reduced-motion: reduce`, animated elements have `animation-name: none`.

**Tests:** `[task-2.2.2]` (1 assertion: ≥1 animated element exists)

---

### Task 2.2.3 — Add Page Load Skeleton / Fade-In

**Files:** `assets/css/main.css`, `_layouts/default.html`

**What to implement:**
- Body starts with `opacity: 0` during load, transitions to `opacity: 1` on `DOMContentLoaded`.
- Or: use CSS `@keyframes fadeIn` applied to `body` with `animation-fill-mode: both`.
- Guard with `@media (prefers-reduced-motion: no-preference)`.
- After load completes, `body` must be fully visible (`opacity: 1`, `visibility: visible`).

**Measurable acceptance criteria:**
- After `networkidle`, `body` computed `opacity` is `1`.
- `body` computed `visibility` is `visible` (not `hidden`).
- `body` computed `display` is not `none`.

**Tests:** `[task-2.2.3]` (1 assertion: body fully visible after load)

---

### Task 2.3.1 — Modernize Skill / Tech Stack Section

**Files:** `index.html`, `assets/css/main.css`

**What to implement:**
- A dedicated section on the homepage listing core technologies.
- Display as a tag cloud, icon grid, or pill list.
- Section heading: `<h2>` with text matching "Skills", "Technologies", "Tech Stack", or "Tools".
- Pill/tag items: `background: var(--color-surface)`, `border-radius: var(--radius-full)`, `border: 1px solid var(--color-border)`.

**Measurable acceptance criteria:**
- A section with class `skills`, `tech-stack`, or a heading matching `/skill|tech|tool|stack|expertise/i` exists on homepage.
- Section is visible at all breakpoints.

**Tests:** `[task-2.3.1]` (1 assertion: skills/tech section present)

---

### Task 2.3.2 — Add SVG Icon System

**Files:** `_includes/icons/` (new directory), various `.html` files

**What to implement:**
- Create reusable SVG icon includes (e.g., `_includes/icons/github.html`, `_includes/icons/linkedin.html`).
- Use inline SVG (not `<img src="icon.svg">`) for colour inheritance via `currentColor`.
- All inline SVGs must be either:
  - Decorative: `aria-hidden="true"` (no accessible label needed)
  - Informative: `role="img"` + `<title>Icon description</title>` or `aria-label="..."`
- Apply `fill: currentColor` to path elements so icons inherit text colour in dark mode.

**Measurable acceptance criteria:**
- At least 1 `<svg>` element exists on the homepage.
- Every SVG is either `aria-hidden="true"` or has `aria-label`, `role`, or `<title>`.
- Icons in the footer/nav render correctly in both light and dark mode.

**Tests:** `[task-2.3.2]` (2 assertions: ≥1 SVG exists; every SVG is accessible or decorative)

---

## Phase 3 — Responsive & Accessibility

### Task 3.1.1 — Audit and Fix Mobile Layout (375px, 480px)

**Files:** `assets/css/main.css`

**What to implement:**
- Write all CSS mobile-first (min-width 0 first, then `@media (min-width: 768px)` etc.).
- Ensure no element causes horizontal overflow at 375px or 480px.
- Card grids: 1 column on mobile.
- Navigation: collapses to hamburger (implemented in 3.1.3).
- Text sizes: use `--text-base` for body on mobile, scale up on desktop.

**Measurable acceptance criteria:**
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth` at 375px and 480px on all 6 pages.
- `<main>` or `[role="main"]` is visible at 375px.
- No fixed-width elements wider than the viewport.

**Tests:** `[task-3.1.1]` (12 assertions: no-overflow at 375px and 480px per page + main visible)

---

### Task 3.1.2 — Fix Tablet Layout (768px) — Navigation Collapse

**Files:** `assets/css/main.css`, `_includes/header.html`

**What to implement:**
- At 768px, navigation may either remain fully expanded (if space allows) or show a compact version.
- No horizontal overflow at 768px on any page.
- Grid layouts: 2 columns at 768px where previously 1 (certs, projects).
- Font sizes may step up from mobile values.

**Measurable acceptance criteria:**
- No horizontal overflow at 768px on all 6 pages.
- Navigation is visible at 768px.

**Tests:** `[task-3.1.2]` (2 assertions: no overflow at 768px, nav visible)

---

### Task 3.1.3 — Add Hamburger Menu for Mobile Nav

**Files:** `_includes/header.html`, `assets/js/nav.js` (new), `assets/css/main.css`

**What to implement:**
- A `<button>` toggle visible only at mobile (hidden via `@media (min-width: 768px) { display: none }`).
- Button has `aria-expanded="false"` initially; toggles to `"true"` when menu is open.
- Button has `aria-controls` pointing to the nav menu ID.
- Button has `aria-label="Open navigation menu"` (or similar).
- When open, nav links slide/fade in; when closed, they are hidden (`display: none` or `height: 0`).
- Click outside or press Escape closes the menu.

**Measurable acceptance criteria:**
- A toggle button with `aria-expanded` exists and is visible at 375px.
- After clicking, `aria-expanded` changes from `"false"` to `"true"`.
- After clicking again, `aria-expanded` changes back to `"false"`.

**Tests:** `[task-3.1.3]` (2 assertions: toggle visible at 375px; aria-expanded toggles correctly)

---

### Task 3.2.1 — Audit and Fix Color Contrast (WCAG AA)

**Files:** `assets/css/main.css`

**What to implement:**
- Ensure all text-on-background combinations meet WCAG AA minimum:
  - Normal text (< 18pt / 14pt bold): contrast ratio ≥ 4.5:1
  - Large text (≥ 18pt / 14pt bold): contrast ratio ≥ 3:1
- Check and fix: `--color-text` on `--color-bg` (light + dark), `--color-primary` on `--color-bg`, muted text on surface.

**Measurable contrast ratios:**

| Combination | Required | Token pair |
|---|---|---|
| Body text on background (light) | ≥ 4.5:1 | `#1A1A1A` on `#FFFFFF` = **21:1** ✓ |
| Body text on background (dark) | ≥ 4.5:1 | `#F0F0F0` on `#1A1A1A` = **15.1:1** ✓ |
| Brand blue on white (large text) | ≥ 3:1 | `#0078D4` on `#FFFFFF` = **4.49:1** ✓ |
| Muted text on surface (light) | ≥ 4.5:1 | `#555555` on `#F5F5F5` = **5.07:1** ✓ |

**Tests:** `[task-3.2.1]` (3 assertions: body text light, body text dark, brand blue large text)

---

### Task 3.2.2 — Add Visible Focus States to All Interactive Elements

**Files:** `assets/css/main.css`

**What to implement:**
- Remove `outline: none` from ALL elements (or replace it with a visible custom outline).
- Global focus style: `outline: 2px solid var(--color-primary); outline-offset: 2px`.
- Apply using `:focus-visible` to avoid focus ring on mouse click.
- Test with keyboard Tab navigation — every focusable element must show a ring.

**Measurable acceptance criteria:**
- CSS contains `:focus` or `:focus-visible` rule with a non-zero `outline-width`.
- After pressing Tab, the first focused element has `outline-width !== "0px"` and `outline-style !== "none"`.

**Tests:** `[task-3.2.2]` (2 assertions: CSS contains :focus rule; Tab-focused element has visible outline)

---

### Task 3.2.3 — Add ARIA Labels to Icon-Only Buttons

**Files:** Various `.html` files (nav, footer, certifications, social links)

**What to implement:**
- Find every `<button>` and `<a role="button">` that has no visible text content.
- Add `aria-label="Descriptive action"` to each.
- Common targets: hamburger toggle, social icon links (GitHub, LinkedIn), scroll-to-top button.

**Measurable acceptance criteria:**
- Every `<button>` and `<a role="button">` with no visible text content has `aria-label`, `aria-labelledby`, or `title`.
- All `<img>` tags have an `alt` attribute (empty `alt=""` is acceptable for decorative images).

**Tests:** `[task-3.2.3]` (2 assertions: icon-only buttons have label; all images have alt)

---

### Task 3.2.4 — Add Skip-to-Content Link

**Files:** `_layouts/default.html`, `assets/css/main.css`

**What to implement:**
- First element inside `<body>`: `<a href="#main-content" class="skip-link">Skip to main content</a>`.
- Add `id="main-content"` to the `<main>` element.
- CSS: visually hide the skip link by default; show it on `:focus`.
  ```css
  .skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-4);
    z-index: 9999;
    background: var(--color-primary);
    color: #fff;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-sm);
    font-weight: var(--font-semibold);
    text-decoration: none;
  }
  .skip-link:focus {
    top: var(--space-4);
  }
  ```

**Measurable acceptance criteria:**
- At least 1 `<a href="#main-content">`, `<a href="#content">`, or `<a href="#main">` exists in the DOM.
- After pressing Tab once, the focused element's `href` matches `#main-content` (or `#content` / `#main`).

**Tests:** `[task-3.2.4]` (2 assertions: skip link exists; first Tab stop is the skip link)

---

## Phase 4 — Polish & Performance

### Task 4.1.1 — Audit and Optimize Image Sizes

**Files:** `assets/images/`, various `.html` files

**What to implement:**
- Convert all local JPEG/PNG images to `.webp` format.
- Resize images to the maximum displayed size × 2 (for HiDPI screens).
- Add `width` and `height` attributes to every `<img>` tag (prevents CLS).
- All `<img>` tags must have `alt` attribute.

**Measurable acceptance criteria:**
- No local `<img src="*.jpg">` or `<img src="*.png">` — only `.webp`, `.svg`, or external URLs.
- Every `<img>` has a non-null `alt` attribute.

**Tests:** `[task-4.1.1]` (2 assertions: all images have alt; local images use .webp)

---

### Task 4.1.2 — Add Lazy Loading to Below-Fold Images

**Files:** Various `.html` files

**What to implement:**
- Add `loading="lazy"` to all `<img>` tags that are not in the hero / above the fold.
- The first image on each page (likely the hero avatar or OG image) should NOT be lazy-loaded.
- No `loading="lazy"` on the first `<img>` per page.

**Measurable acceptance criteria:**
- For pages with more than 1 image, all images after the first have `loading="lazy"`.

**Tests:** `[task-4.1.2]` (1 assertion per page: subsequent images have loading="lazy")

---

### Task 4.1.3 — Minify and Defer Non-Critical JS

**Files:** `_includes/head.html`, `_layouts/default.html`

**What to implement:**
- All `<script src="...">` tags must have `defer` or `async` attribute.
- `type="module"` scripts are implicitly deferred — acceptable without explicit `defer`.
- No external CSS stylesheets that block rendering.
- Move non-critical `<script>` tags from `<head>` to just before `</body>`, or add `defer`.

**Measurable acceptance criteria:**
- Every `<script src="...">` (non-module) has `defer !== null || async !== null`.
- Zero external CSS `<link>` tags without `media` attribute targeting non-screen (i.e., no blocking external CSS).

**Tests:** `[task-4.1.3]` (2 assertions: all scripts deferred/async; no render-blocking external CSS)

---

### Task 4.2.1 — Create Custom 404 Page

**Files:** `404.html`, `assets/css/main.css`

**What to implement:**
- Jekyll `404.html` with front matter `layout: default` (picks up full site chrome).
- Heading: `<h1>404 — Page Not Found</h1>` or equivalent.
- Brief message and a link back to homepage: `<a href="{{ '/' | relative_url }}">Return home</a>`.
- Optional: illustration or animated element, search bar.
- Styled consistently with the design system — no custom one-off colors.

**Measurable acceptance criteria:**
- Requesting a non-existent URL returns HTTP 404.
- 404 page renders `<nav>` / `<header>` (site navigation).
- 404 page has an `<a href="/">` link back to homepage.
- 404 page has a non-empty `<h1>` or `<h2>` heading.

**Tests:** `[task-4.2.1]` (4 assertions: HTTP 404 status, nav visible, home link, heading present)

---

### Task 4.2.2 — Add Print Stylesheet

**Files:** `assets/css/print.css` (new), `_includes/head.html`

**What to implement:**
- Link print stylesheet in `<head>`:
  ```html
  <link rel="stylesheet" href="{{ '/assets/css/print.css' | relative_url }}" media="print">
  ```
- Print CSS rules:
  - `nav, header, footer, button, .skip-link { display: none; }` — hide chrome.
  - `body { font-size: 12pt; color: #000; background: #fff; }` — override dark mode.
  - `a::after { content: " (" attr(href) ")"; }` — show URLs inline.
  - `@page { margin: 2cm; }` — standard print margins.
  - `img { max-width: 100%; page-break-inside: avoid; }`.

**Measurable acceptance criteria:**
- A `<link media="print">` or `<link href="*print*">` exists in document `<head>`.
- CSS source contains `@media print` (either inline or in the linked file).
- The `@media print` block hides `nav`, `header`, `footer`, or `button`.

**Tests:** `[task-4.2.2]` (3 assertions: print link exists, @media print in CSS, chrome hidden in print)

---

### Task 4.3.1 — Run Lighthouse Audit (Manual)

**Type:** Manual — user runs this in Chrome DevTools

**What to do:**
1. Open `https://abubakarriaz.com.pk` in Chrome.
2. Open DevTools → Lighthouse tab.
3. Select: Performance, Accessibility, Best Practices, SEO.
4. Device: Mobile.
5. Run audit. Save the JSON report.

**Target scores:**

| Category | Minimum target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

**Note:** This task has no automated Playwright test. The CI pipeline checks proxy metrics (page weight, no blocking scripts) as a best-effort proxy.

---

### Task 4.3.2 — Fix Remaining Lighthouse Issues

**Files:** Varies per audit result

**What to implement:**
- Based on the Lighthouse report from 4.3.1, fix each flagged issue.
- Common fixes: image size, CLS-causing elements, ARIA violations, missing meta tags.
- Re-run Lighthouse after each fix to confirm score improvement.

**Measurable acceptance criteria:**
- Total page weight < 2 MB (all resources combined).
- Zero `<link rel="preload" as="font">` tags (system font stack needs none).
- All scripts deferred or async (no render-blocking JS).

**Tests:** `[task-4.3.2]` (2 assertions: page weight < 2 MB; font preloads = 0)

---

## Cross-Cutting Constraints (Apply to All Tasks)

| Constraint | Measurable criterion | Test tag |
|---|---|---|
| No hardcoded inline colors | `element.style.color` and `element.style.backgroundColor` are empty or `var(…)` | `[design-system]` |
| Semantic HTML | Every page has `<nav>`, `<main>`, `<footer>` | `[design-system]` |
| External link attributes | All `<a href="http…">` to external domains have `target="_blank"` and `rel` containing `"noopener"` | `[design-system]` |
| No horizontal overflow | `scrollWidth <= clientWidth` at 375px on every page | `[design-system]` |
| Sequential heading hierarchy | First heading is `<h1>`; no level is skipped | `[design-system]` |
| No leftover comments | No `<!-- TODO` or `<!-- FIXME` in HTML source | `[design-system]` |
| Dark mode body bg | `--color-bg` = `#1a1a1a` when `prefers-color-scheme: dark` | `[design-system]` |
| Body background non-transparent | `body` `backgroundColor` ≠ `rgba(0,0,0,0)` | `[design-system]` |

---

## Test Run Commands

```bash
# All design tests
npx playwright test design.spec.ts

# Run against local Jekyll server
BASE_URL=http://localhost:4000 npx playwright test design.spec.ts

# Run by phase
npx playwright test --grep "Phase 1"
npx playwright test --grep "Phase 2"
npx playwright test --grep "Phase 3"
npx playwright test --grep "Phase 4"

# Run a specific task
npx playwright test --grep "task-1.1.1"
npx playwright test --grep "task-3.2.4"

# Run cross-cutting checks only
npx playwright test --grep "design-system"

# Open HTML report after run
npx playwright show-report playwright-report
```

---

## Definition of Done (Per Task)

A task is complete when **all** of the following are true:

- [ ] Every acceptance criterion in this spec is met.
- [ ] All `[task-X.X.X]` Playwright assertions pass locally (`npm run test:design:local`).
- [ ] Mobile viewport (375px) has no horizontal overflow.
- [ ] Dark mode is tested: no invisible text, no broken colors.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] All new/modified interactive elements have visible focus states.
- [ ] All external links carry `target="_blank" rel="noopener noreferrer"`.
- [ ] No hardcoded colors or sizes — CSS custom properties only.
- [ ] PR is opened on branch `design/task-X.X.X` targeting `main`.
