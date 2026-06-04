# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static personal portfolio site hosted on GitHub Pages. It uses Jekyll 4.4 with a custom layout — no remote theme. Update `_config.yml` and add `CNAME` only when the final deployment domain is known.

For local development, run `/c/Ruby32-x64/bin/bundle exec jekyll serve --no-watch` (requires Ruby + Bundler). **Do not use the bare `bundle` shim** — the system shim is broken on this machine and will fail silently or error out.

## Site Configuration

- [`_config.yml`](_config.yml): Jekyll site metadata (title, description, url, author). CLAUDE.md and README.md are in the `exclude` list so they don't get built.
- `CNAME`: Not present by default. Add it only if a custom domain is configured in GitHub Pages.
- [`Gemfile`](Gemfile): Jekyll 4.4 + `jekyll-feed` + `jekyll-seo-tag` plugins.

## Content Architecture

All pages are Jekyll HTML files (`.html`) with YAML front matter. The site uses a flat section-directory structure, each with its own `index.html`:

- [`index.html`](index.html) — Main landing page (hero, summarized experience, education, certifications, projects, awards). Links out to full-list pages in each section.
- [`certifications/index.html`](certifications/index.html) — Full certifications list grouped by skill category. Also has [`certifications/yearly.html`](certifications/yearly.html) for a chronological view.
- [`experience/index.html`](experience/index.html) — Full work history (timeline layout).
- [`education/index.html`](education/index.html) — Full education history.
- [`projects/index.html`](projects/index.html) — Full projects list.
- [`awards/index.html`](awards/index.html) — Full awards list.

## Layout System

**[`_layouts/default.html`](_layouts/default.html)** is the single shared layout, applied via `layout: default` in each page's front matter. It provides:

- Navbar with anchor links (About, Experience, Certs, Projects, Education, Awards)
- Inter + JetBrains Mono fonts from Google Fonts
- `assets/css/main.css` and `assets/js/main.js`
- Footer with GitHub/LinkedIn icons

If analytics are added later, keep them centralized in the shared layout rather than individual pages.

## Content Conventions

**Page front matter** structure:

```html
---
layout: default
title: Page Title
description: Page meta description for SEO.
---
```

**External links** use standard HTML with `target="_blank" rel="noopener noreferrer"`:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link text</a>
```

**Certifications** use card components (`cert-card` class) grouped under `cert-category` headers. Each card has:

- `cert-issuer-bar` with an issuer class (e.g., `aws`, `azure`, `gcp`, `cncf`)
- `cert-icon` (emoji), `cert-name`, `cert-issuer-label`

**Experience** uses a `timeline` layout with `timeline-item` → `timeline-card` → `timeline-header` + `timeline-bullets`.

**Awards** use `award-full-item` with icon, title, issuer, and date.

**Date format** used in content: `Mon YYYY` (e.g., `Mar 2025`) for certifications; `Mon YYYY – Present` or `Mon YYYY – Mon YYYY` for employment periods.

**Animation class**: Add `animate-on-scroll` to any card/item that should fade in on scroll.

**Resume assets** live at `assets/resume.pdf` and `assets/resume.docx`. Certificate proof images are not currently included.

**Internal links** use Jekyll's `relative_url` filter:

```html
<a href="{{ '/' | relative_url }}">Home</a>
<a href="{{ '/certifications/yearly' | relative_url }}">By Year</a>
```

## Git Workflow

**Date format** used in content: `` `Mon YYYY` `` for certification dates, `` `Mon YYYY – Mon YYYY (duration)` `` for employment periods.

- **New branch per session**: At the start of each working session, create a new branch from `main` with a short descriptive name (e.g., `update-experience-titles`, `add-certifications`).
- **Create a PR after final changes**: Once all changes in the session are complete, create a pull request from the session branch to `main`.
- **Update the same PR if the session continues**: If the conversation continues with more changes, push additional commits to the same branch — do not create a new PR. Always update the existing PR's title and body to reflect the full set of changes made, whether the PR was just created or already existed.
- **Never push directly to `main`**.

## Local Environment Quirks

These commands **fail on this machine** — use the alternatives instead:

| Broken | Use instead | Why |
| --- | --- | --- |
| `bundle exec jekyll serve` | `/c/Ruby32-x64/bin/bundle exec jekyll serve --no-watch` | System `bundle` shim is broken |
| `python3 -c "..."` | `node -e "..."` | Python is not installed |
| `gh pr edit --body "..."` | `gh api repos/adeelarshad414/madeelarshad.github.io/pulls/{N} -X PATCH -f body="..."` | `gh pr edit` fails with GitHub Projects (classic) deprecation GraphQL error |

## Design Context

Strategy and visual system for any design work live in two root files (read both before touching UI):

- [`PRODUCT.md`](PRODUCT.md) — register (`brand`), audience, purpose, brand personality, anti-references, and design principles. The strategic "who/what/why".
- [`DESIGN.md`](DESIGN.md) — the visual system in Google Stitch format: tokens, color/type/elevation, components, and Do's/Don'ts. Its sidecar [`.impeccable/design.json`](.impeccable/design.json) carries tonal ramps, motion, and component snippets.

**North Star: "The Control Plane".** The live brand is the dark indigo→cyan "space" theme (`--accent: #6366f1`, `--accent-cyan: #22d3ee`, Inter + JetBrains Mono, near-black `#050810`). Core rules: the 135° gradient spine is never inverted; cyan marks telemetry only (dates, metadata, logo), never a fill or body text; depth comes from glow/blur, not drop shadows.

**Token drift to retire, not the brand:** the canonical Azure-blue (`#0078D4`) + Segoe UI + GitHub-dark token layer in [`main.css`](assets/css/main.css)/[`critical.css`](_includes/critical.css) is in-progress migration scaffolding the components have NOT adopted. It reads as the generic Microsoft/Fluent look, which is an explicit anti-reference. Build against the space theme.

The `impeccable` skill (`/impeccable <command>`) reads these files before any design task.
