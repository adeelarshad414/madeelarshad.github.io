# Design Tokens Reference — abubakarriaz.com.pk

This file defines the canonical design system for the portfolio site.
Claude should read this file whenever a task involves color, typography, or spacing.

> **Note:** If you're starting a new design modernization sprint and these tokens don't yet
> match the current site, ask the user to review and confirm before implementing.

---

## Color Palette

### Primary Brand Colors

| Token | CSS Variable | Default (Light) | Dark Mode |
|---|---|---|---|
| Brand Blue | `--color-primary` | `#0078D4` | `#2B88D8` |
| Brand Dark | `--color-primary-dark` | `#005A9E` | `#106EBE` |
| Brand Light | `--color-primary-light` | `#C7E0F4` | `#243A5E` |

> Microsoft Azure blue (`#0078D4`) is the primary brand color — aligns with MCT and Azure expertise.

### Neutral Scale

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| Background | `--color-bg` | `#FFFFFF` | `#1A1A1A` |
| Surface | `--color-surface` | `#F5F5F5` | `#242424` |
| Border | `--color-border` | `#E0E0E0` | `#333333` |
| Text Primary | `--color-text` | `#1A1A1A` | `#F0F0F0` |
| Text Secondary | `--color-text-muted` | `#555555` | `#AAAAAA` |
| Text Disabled | `--color-text-disabled` | `#999999` | `#555555` |

### Semantic Colors

| Token | CSS Variable | Value |
|---|---|---|
| Success | `--color-success` | `#107C10` |
| Warning | `--color-warning` | `#D83B01` |
| Info | `--color-info` | `#0078D4` |
| Error | `--color-error` | `#A80000` |

---

## Typography Scale

### Font Families

| Token | CSS Variable | Value |
|---|---|---|
| Sans (UI) | `--font-sans` | `'Segoe UI', system-ui, -apple-system, sans-serif` |
| Mono (Code) | `--font-mono` | `'Cascadia Code', 'Fira Code', monospace` |

> Segoe UI first — aligns with Microsoft Fluent aesthetics. Falls back to system-ui for non-Windows.

### Font Size Scale (rem-based, 1rem = 16px)

| Token | CSS Variable | Value | Use |
|---|---|---|---|
| xs | `--text-xs` | `0.75rem` | Labels, captions |
| sm | `--text-sm` | `0.875rem` | Secondary text, meta |
| base | `--text-base` | `1rem` | Body text |
| md | `--text-md` | `1.125rem` | Lead text |
| lg | `--text-lg` | `1.25rem` | Section subtitles |
| xl | `--text-xl` | `1.5rem` | H3 |
| 2xl | `--text-2xl` | `2rem` | H2 |
| 3xl | `--text-3xl` | `2.5rem` | H1 (desktop) |
| 4xl | `--text-4xl` | `3rem` | Hero headline |

### Font Weight

| Token | CSS Variable | Value |
|---|---|---|
| Regular | `--font-normal` | `400` |
| Medium | `--font-medium` | `500` |
| Semibold | `--font-semibold` | `600` |
| Bold | `--font-bold` | `700` |

### Line Height

| Token | CSS Variable | Value |
|---|---|---|
| Tight | `--leading-tight` | `1.2` |
| Normal | `--leading-normal` | `1.5` |
| Relaxed | `--leading-relaxed` | `1.75` |

---

## Spacing Scale

All spacing uses a base-4 scale (4px = 0.25rem):

| Token | CSS Variable | Value | Use |
|---|---|---|---|
| 1 | `--space-1` | `0.25rem` | Micro gap |
| 2 | `--space-2` | `0.5rem` | Icon padding |
| 3 | `--space-3` | `0.75rem` | Tight padding |
| 4 | `--space-4` | `1rem` | Default gap |
| 6 | `--space-6` | `1.5rem` | Card padding |
| 8 | `--space-8` | `2rem` | Section gap |
| 12 | `--space-12` | `3rem` | Component gap |
| 16 | `--space-16` | `4rem` | Section padding |
| 24 | `--space-24` | `6rem` | Page section gap |

---

## Breakpoints

| Name | Min-width | Target Devices |
|---|---|---|
| `mobile` | `0px` | All phones |
| `tablet` | `768px` | Tablets, large phones |
| `desktop` | `1024px` | Laptops, small monitors |
| `wide` | `1280px` | Large monitors |

Always write CSS mobile-first, then use `min-width` media queries for larger breakpoints.

---

## Shadows

| Token | CSS Variable | Value |
|---|---|---|
| sm | `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` |
| md | `--shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` |
| lg | `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` |
| xl | `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.14)` |

Dark mode shadows use slightly lower opacity (reduce by 0.02–0.04).

---

## Border Radius

| Token | CSS Variable | Value |
|---|---|---|
| sm | `--radius-sm` | `4px` |
| md | `--radius-md` | `8px` |
| lg | `--radius-lg` | `12px` |
| xl | `--radius-xl` | `16px` |
| full | `--radius-full` | `9999px` |

---

## Animation

| Token | CSS Variable | Value |
|---|---|---|
| Fast | `--duration-fast` | `150ms` |
| Normal | `--duration-normal` | `250ms` |
| Slow | `--duration-slow` | `400ms` |
| Easing | `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Always wrap in `@media (prefers-reduced-motion: no-preference)`.

---

## CSS Custom Properties Bootstrap

The root block below should exist in `assets/css/main.css`.
Claude should verify these tokens are present before implementing any design task.

```css
:root {
  /* Colors */
  --color-primary: #0078D4;
  --color-primary-dark: #005A9E;
  --color-primary-light: #C7E0F4;
  --color-bg: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-border: #E0E0E0;
  --color-text: #1A1A1A;
  --color-text-muted: #555555;
  --color-text-disabled: #999999;
  --color-success: #107C10;
  --color-warning: #D83B01;
  --color-info: #0078D4;
  --color-error: #A80000;

  /* Typography */
  --font-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'Cascadia Code', 'Fira Code', monospace;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.5rem;
  --text-4xl: 3rem;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.14);

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #2B88D8;
    --color-primary-dark: #106EBE;
    --color-primary-light: #243A5E;
    --color-bg: #1A1A1A;
    --color-surface: #242424;
    --color-border: #333333;
    --color-text: #F0F0F0;
    --color-text-muted: #AAAAAA;
    --color-text-disabled: #555555;
  }
}
```