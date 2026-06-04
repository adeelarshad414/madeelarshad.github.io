---
name: audience-infrastructure
description: >
  Execute Audience Infrastructure tasks for the personal portfolio site abubakarriaz.com.pk and Hashnode blog blog.abubakarriaz.com.pk.
  Use this skill whenever Abubakar mentions an Audience Infrastructure task number (e.g. 1.1.1, 2.2.3), says "work on audience",
  references the Audience Infrastructure WBS, or asks to implement newsletter CTAs, RSS feed integration, social sharing links,
  Hashnode comments/subscribers, portfolio analytics, or the "Latest from the Blog" section.
  Also trigger when asked to create a branch, open a PR, or implement any Audience Infrastructure sprint task on the portfolio repo.
---

# Audience Infrastructure Skill — abubakarriaz.com.pk

## Context

- **Portfolio site:** `abubakarriaz.com.pk` — Jekyll + GitHub Pages, custom `.pk` domain
- **Blog:** `blog.abubakarriaz.com.pk` — Hashnode, custom subdomain
- **Newsletter:** LinkedIn Newsletter — "Think you know DevOps?"
- **Repo:** `github.com/mabubakarriaz/mabubakarriaz.github.io`
- **Branch strategy:** Always create a new branch from `main` named after the task number
- **PR:** Open a PR from the task branch → `main` once work is complete
- **Notion WBS:** Streams → MVP → Personal Portfolio → Roadmap → 3. Audience Infrastructure

---

## Goal

Build the retention and engagement layer so visitors to both the portfolio site and Hashnode blog have clear paths to follow, subscribe, comment, and share — turning one-time traffic into a recurring audience.

---

## Scope Boundaries

| In Scope | Out of Scope |
|---|---|
| `abubakarriaz.com.pk` (Jekyll + GitHub Pages) | Any other repo or site |
| `blog.abubakarriaz.com.pk` (Hashnode config only) | Hashnode post content itself |
| Newsletter CTAs linking to LinkedIn newsletter | Creating a new newsletter platform |
| RSS surfacing (Hashnode generates it) | RSS hosting or feed generation from scratch |
| Analytics script injection | Paid analytics beyond the chosen platform |

---

## Workflow (Always Follow This Order)

### Step 1 — Load the Task

1. Fetch the Notion Audience Infrastructure page via the Notion MCP if you need full task details
2. Locate the task number given by the user (e.g. `1.2.1`)
3. Read the task description, code snippets, and **acceptance criteria** carefully
4. Identify whether the task is **automated** (Claude implements) or **manual** (user must do it)
5. If the task is manual, skip to Step 8 — provide a step-by-step guide

### Step 2 — Classify the Task

Check `references/wbs-index.md` for quick lookup. Tasks fall into two categories:

| Category | Examples | Action |
|---|---|---|
| **Automated** — code/config changes to the Jekyll repo | Newsletter CTAs, RSS link in footer, analytics script, blog cards section | Claude implements via branch + PR |
| **Manual** — platform actions on LinkedIn, Hashnode, or third-party sites | Getting LinkedIn newsletter URL, Hashnode dashboard settings, Feedly submission | Claude writes step-by-step guide, user executes |

### Step 3 — Identify the Files to Change (Automated Tasks Only)

Based on the task, determine which Jekyll files are affected. Common targets:

| Task Area | File(s) |
|---|---|
| Newsletter CTA in hero | `index.html` or `_layouts/home.html` |
| Newsletter CTA in footer | `_includes/footer.html` |
| Newsletter banner section on homepage | `index.html` or relevant homepage layout |
| RSS link in footer | `_includes/footer.html` |
| Social profile links in hero/footer | `index.html`, `_includes/footer.html` |
| Share buttons on inner pages | `experience.html`, `projects.html`, `certifications.html` |
| Analytics script | `_includes/head.html` or `_includes/analytics.html` |
| Latest blog posts section | `index.html`, `_data/latest_posts.yml` |
| GitHub Actions workflow | `.github/workflows/fetch-blog-posts.yml` |

### Step 4 — Create a Branch

```bash
git checkout main
git pull origin main
git checkout -b audience/task-<TASK_NUMBER>
# Example: git checkout -b audience/task-1.2.1
```

Branch naming convention: `audience/task-<TASK_NUMBER>` (e.g. `audience/task-1.2.1`, `audience/task-5.2.1`)

### Step 5 — Implement the Task

- Follow the code snippets and acceptance criteria from the Notion WBS exactly
- Use Jekyll Liquid syntax where needed (`{{ page.url | absolute_url }}`, etc.)
- Never break existing functionality — treat every file edit as surgical
- For button/CTA additions: use `target="_blank" rel="noopener"` on all external links
- For analytics scripts: use `defer` attribute, place in `_includes/head.html`
- For `_data/latest_posts.yml`: use YAML with `title`, `url`, `date`, `excerpt` fields
- For GitHub Actions workflows: follow the Option B pattern from the Notion WBS

### Step 6 — Self-Validate Against Acceptance Criteria

Before committing, verify each acceptance criterion from the Notion task:
- Does the code change satisfy the stated acceptance criterion?
- Are all external links using `target="_blank" rel="noopener"`?
- Are Jekyll Liquid variables used correctly?
- Are any hardcoded values that should be dynamic?
- For analytics: is the tracking script using `defer`?
- For YAML data files: is the YAML syntax valid?
- For GitHub Actions: is the YAML indentation correct?

### Step 7 — Commit and Push

```bash
git add <changed files>
git commit -m "Audience: <task number> — <short description>"
# Example: git commit -m "Audience: 1.2.1 — Add newsletter CTA to homepage hero section"
git push origin audience/task-<TASK_NUMBER>
```

Commit message format: `Audience: <task number> — <short description of what was done>`

### Step 8 — Open a Pull Request (Automated Tasks)

Create the PR with this template:

```
Title: Audience <task number> — <short description>

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
Streams → MVP → Personal Portfolio → Roadmap → 3. Audience Infrastructure → <task number>
```

### Step 8 (Manual Tasks) — Provide a Step-by-Step Guide

For manual tasks (LinkedIn, Hashnode dashboard, Feedly, etc.), output a numbered guide like:

```
## Manual Task: <task number> — <task title>

**Platform:** <LinkedIn / Hashnode / Feedly / etc.>
**Time required:** ~<X> minutes

### Steps:
1. Go to <URL or location>
2. <Exact action to take>
3. <Expected result / what to look for>

### Acceptance criteria:
- [ ] <criterion 1>
- [ ] <criterion 2>

Let me know when you're done and I'll continue with the next task.
```

### Step 9 — Post-PR Validation

After the PR is merged, run these validations based on task area:

| Task Area | Validation |
|---|---|
| Newsletter CTAs | Open portfolio in browser — verify CTA is visible and link opens LinkedIn newsletter in new tab |
| RSS link | Click RSS link → verify `blog.abubakarriaz.com.pk/rss.xml` loads valid XML |
| Social sharing links | Check all links open correct profiles in new tab, `rel="noopener"` present in source |
| Analytics script | Open DevTools → Network → verify tracking script loads; check analytics dashboard for live data |
| Blog cards section | Verify 3 cards render, links go to Hashnode blog, responsive on mobile |
| GitHub Actions workflow | Trigger manually via `workflow_dispatch`, verify it runs without errors |

### Step 10 — Report Back

Tell the user:
- What branch was created (or that it was a manual task)
- What files were changed and why (or the step-by-step guide for manual tasks)
- How to verify the acceptance criteria
- Post-PR validation steps to run after merge
- That they should mark the task as done in Notion manually

---

## Quick Reference — Task Number Index

See `references/wbs-index.md` for the full task list with brief descriptions and file targets.

---

## Important Notes

- **Never push directly to `main`** — always use a task branch
- **Never mark tasks done in Notion** — the user does this manually after reviewing and merging the PR
- **All external links MUST have `target="_blank" rel="noopener"`**
- **LinkedIn newsletter URL format:** `https://www.linkedin.com/newsletters/XXXXXX` — task 1.1.1 is manual (user must get this URL first)
- **The blog subdomain (Hashnode) is configuration only** — never touch Hashnode post content
- **Analytics choice (task 4.1.1) is user decision** — don't assume a platform, ask the user if they haven't decided
- **For the "Latest from the Blog" section**: recommend Option A (static `_data/latest_posts.yml`) first, migrate to Option B (GitHub Actions) separately
- **Dual newsletter strategy:** Hashnode built-in subscriber = auto post notifications; LinkedIn newsletter = curated thought leadership. Both run in parallel, neither replaces the other
- **If the GitHub repo URL is uncertain**, ask the user before creating the branch