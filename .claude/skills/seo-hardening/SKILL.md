---
name: seo-hardening
description: >
  Execute SEO hardening tasks for the personal portfolio site abubakarriaz.com.pk (Jekyll + GitHub Pages).
  Use this skill whenever Abubakar mentions an SEO task number (e.g. 1.1.1, 2.3.2), says "work on SEO", references
  the SEO Hardening WBS, or asks to implement sitemap, robots.txt, canonical tags, JSON-LD, Open Graph, Twitter Cards,
  Core Web Vitals, or any structured data for the portfolio site.
  Also trigger when asked to create a branch, open a PR, or implement any SEO sprint task on the portfolio repo.
---

# SEO Hardening Skill — abubakarriaz.com.pk

## Context

- **Site:** `abubakarriaz.com.pk` — Jekyll + GitHub Pages, custom `.pk` domain
- **Repo:** `github.com/mabubakarriaz/mabubakarriaz.github.io` (or the portfolio repo — confirm with user if unsure)
- **Branch strategy:** Always create a new branch from `main` named after the task number
- **PR:** Open a PR from the task branch → `main` once work is complete
- **Notion WBS:** Streams → MVP → Personal Portfolio → Roadmap → 2. SEO Hardening

---

## Workflow (Always Follow This Order)

### Step 1 — Load the Task

1. Go to the Notion SEO Hardening page (fetch it via the Notion MCP if needed)
2. Locate the task number given by the user (e.g. `1.1.1`)
3. Read the task description, code snippets, and **acceptance criteria** carefully
4. If the task is unclear or has dependencies, mention them before starting

### Step 2 — Identify the Files to Change

Based on the task, determine which Jekyll files are affected. Common targets:

| Task Area | File(s) |
|---|---|
| Sitemap | `_config.yml`, `Gemfile` |
| Robots.txt | `robots.txt` (root) |
| Canonical tags | `_includes/head.html` |
| Title / meta description | `_includes/head.html`, front matter in `.md` / `.html` pages |
| JSON-LD (Person, WebSite) | `_includes/head.html` or a new `_includes/jsonld-person.html` |
| JSON-LD (BreadcrumbList) | `_layouts/default.html` or `_includes/head.html` |
| OG / Twitter Card tags | `_includes/head.html` |
| OG images | `/assets/images/` |
| Font self-hosting | `/assets/fonts/`, CSS files |
| Critical CSS / JS defer | `_includes/head.html`, `_layouts/default.html` |
| Image optimization | Any `.html` / `.md` page with `<img>` tags |
| Favicon / icons | `_includes/head.html`, root |
| 404 page | `404.html` (root) |
| Heading structure | Individual page `.html` / `.md` files |

### Step 3 — Create a Branch

```bash
git checkout main
git pull origin main
git checkout -b seo/task-<TASK_NUMBER>
# Example: git checkout -b seo/task-1.1.1
```

Branch naming convention: `seo/task-<TASK_NUMBER>` (e.g. `seo/task-1.1.1`, `seo/task-2.1.1`)

### Step 4 — Implement the Task

- Follow the code snippets in the Notion task exactly
- Use Jekyll Liquid syntax where needed (`{{ page.url | absolute_url }}`, etc.)
- Never break existing functionality — treat every file edit as surgical
- For `_includes/head.html` edits: place new tags **inside `<head>`**, in logical groupings (canonical → meta → OG → Twitter → JSON-LD)
- For JSON-LD blocks: wrap in `<script type="application/ld+json">...</script>`
- For front matter additions: add to the top YAML block of each page

### Step 5 — Self-Validate Against Acceptance Criteria

Before committing, mentally verify each acceptance criterion from the Notion task:
- Does the code change satisfy the stated acceptance criterion?
- Is the output valid (well-formed XML, valid JSON, valid HTML)?
- Are Jekyll Liquid variables used correctly?
- Are there any hardcoded values that should be dynamic?

### Step 5a — Test Locally (Before Committing)

Run a local Jekyll server and verify the change works before pushing:

```bash
/c/Ruby32-x64/bin/bundle exec jekyll serve --no-watch &
sleep 8
```

**What to test locally (use `curl` against `http://127.0.0.1:4000`):**

```bash
# Check HTTP status of affected pages
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" http://127.0.0.1:4000/
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" http://127.0.0.1:4000/certifications/
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" http://127.0.0.1:4000/certifications/yearly/
# ... etc. for affected pages

# Verify a specific tag is present in page source
curl -s http://127.0.0.1:4000/ | grep -i "canonical\|og:title\|json-ld\|description"

# Verify sitemap/robots.txt content
curl -s http://127.0.0.1:4000/sitemap.xml | head -20
curl -s http://127.0.0.1:4000/robots.txt
```

**Also verify Jekyll _site output structure:**
```bash
ls _site/<affected-dir>/
# e.g. a page at /section/yearly/ should have _site/section/yearly/index.html
# NOT _site/section/yearly.html (flat file won't serve with trailing slash on GitHub Pages)
```

> **Key rule:** If a page needs a trailing-slash URL on GitHub Pages, it must be `section/page/index.html` — not `section/page.html`. GitHub Pages is a static file server and cannot redirect flat `.html` files to trailing-slash URLs.

### Step 6 — Commit and Push

```bash
git add <changed files>
git commit -m "SEO: <task number> — <short description>"
# Example: git commit -m "SEO: 1.1.1 — Add jekyll-sitemap plugin and verify sitemap.xml"
git push origin seo/task-<TASK_NUMBER>
```

Commit message format: `SEO: <task number> — <short description of what was done>`

### Step 7 — Open a Pull Request

Create the PR with this template:

```
Title: SEO <task number> — <short description>

## What this PR does
<1–3 sentence summary of the change>

## Files changed
- `<file1>` — <why>
- `<file2>` — <why>

## Acceptance criteria (from Notion WBS)
- [ ] <criterion 1>
- [ ] <criterion 2>

## How to verify
<step-by-step validation instructions matching the Notion task>

## Notion task
Streams → MVP → Personal Portfolio → Roadmap → 2. SEO Hardening → <task number>
```

### Step 8 — Report Back

Tell the user:
- What branch was created
- What files were changed and why
- How to verify the acceptance criteria
- That they should review the PR and merge it — once merged, inform you so you can run post-merge verification
- That they should mark the task done in Notion only after post-merge verification passes

### Step 9 — Post-Merge Verification (After User Confirms Merge)

**Wait for the user to say the PR is merged before running these steps.**

Once merged, verify the live site at `https://abubakarriaz.com.pk` using the methods below. GitHub Pages usually deploys within 1–2 minutes of a merge — check the Actions tab if unsure.

#### Method 1 — curl (fast, for HTTP status + tag presence)

```bash
# Check all affected pages return 200
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" https://abubakarriaz.com.pk/
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" https://abubakarriaz.com.pk/<affected-page>/

# Verify specific tags in page source
curl -s https://abubakarriaz.com.pk/ | grep -i "<tag-to-verify>"
# e.g. canonical: grep -i "canonical"
# e.g. OG tags:   grep -i "og:title\|og:description\|og:image"
# e.g. JSON-LD:   grep -i "application/ld+json"
# e.g. sitemap:   curl -s https://abubakarriaz.com.pk/sitemap.xml | head -30
# e.g. robots:    curl -s https://abubakarriaz.com.pk/robots.txt
```

#### Method 2 — Playwright MCP (for browser-rendered validation)

Use Playwright MCP when the task involves:
- Tags injected by JavaScript (rare for Jekyll but possible)
- Visual rendering checks (OG image, layout, 404 page appearance)
- Clicking links and verifying navigation (e.g. trailing slash redirects)
- Any task where view-source alone is insufficient

```
# Example Playwright steps:
1. Navigate to https://abubakarriaz.com.pk/<page>/
2. Check page title matches expected value
3. Inspect <head> for canonical / OG / JSON-LD tags
4. Click internal links and verify no 404s
5. Take a screenshot for visual confirmation
```

#### What counts as "verified"

| Task type | Verification method |
|---|---|
| HTTP status (no 404s) | curl → 200 on all affected URLs |
| Tag present in `<head>` | curl + grep on page source |
| Sitemap / robots.txt | curl the file, check content |
| JSON-LD valid | curl + grep for script tag; paste into Rich Results Test if uncertain |
| Internal links work | curl each href; or Playwright click-through |
| Visual / layout | Playwright screenshot |

Once all checks pass, tell the user they can mark the task done in Notion.

---

## Quick Reference — Task Number Index

- See `references/wbs-index.md` for the full task list with brief descriptions. Load it when you need to quickly look up what a task number refers to.
- and overview why these tasks matter from Notion pages > Streams > MVP
- you can get the context of work areas from Notion pages > Streams > MVP > Personal Portfolio 
- A detailed roadmap from Notion pages > Streams > MVP > Personal Portfolio > Roadmap
- and SEO hardening WBS tasks from Notion pages > Streams > MVP > Personal Portfolio > Roadmap > 2. SEO Hardening

---

## Important Notes

- **Never push directly to `main`** — always use a task branch
- **Never mark tasks done in Notion** — the user confirms the merge, you run post-merge verification, then they mark it done
- **Jekyll Liquid syntax matters** — test mentally that filters like `| absolute_url` and `| default:` work correctly
- **JSON-LD must be valid JSON** — double-check bracket/brace matching and quote escaping
- **The blog subdomain (blog.abubakarriaz.com.pk) is out of scope** — don't touch it
- **If the GitHub repo URL is uncertain**, ask the user before creating the branch
- **For image tasks (3.3, 4.2)**, describe what the image/change should look like and provide the code — actual image file generation may need a separate tool or manual step
- **Flat files vs directory indexes on GitHub Pages:** Any page that should be served at `/section/page/` (trailing slash) **must** be `section/page/index.html`, NOT `section/page.html`. GitHub Pages is a static file server — `page.html` only serves at `/section/page` or `/section/page.html`. Always check `ls _site/<dir>/` after building to confirm the output structure matches the expected URL.
- **Local server command:** Use `/c/Ruby32-x64/bin/bundle exec jekyll serve --no-watch` (the system `bundle` shim is broken — always use the full path)