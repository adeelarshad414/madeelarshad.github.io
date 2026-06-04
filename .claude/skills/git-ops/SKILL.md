---
name: git-ops
description: >
  Branch-and-PR lifecycle management for the portfolio repo (github.com/mabubakarriaz/mabubakarriaz.github.io).
  Use this skill whenever work begins on a new feature, fix, or task and needs its own branch, or when changes are
  complete and need a pull request. Trigger when the user says "start a new feature", "create a branch", "open a PR",
  "git-flow", "git ops", asks to close stale/outdated PRs, or asks to follow the branch/PR workflow. Always creates a
  fresh `claude/NNN-<slug>` branch off main for new work, then opens a PR to main with a proper summary via the gh CLI
  for the user to review and merge manually; labels each PR and records its project (Personal Portfolio); also closes
  superseded/outdated PRs (with confirmation + a reason comment).
  Other skills (design-modernization, seo-hardening, audience-infrastructure) defer to this skill
  for all branch and PR operations.
---

# git-ops — Branch & PR lifecycle

Owns the git branch/PR workflow for this repo. **Every new feature gets its own branch off `main`; finished work becomes a PR for manual review.** Never push directly to `main`; never merge — the user reviews and merges.

## Branch naming convention

```
claude/<NNN>-<short-kebab-slug>
```

- `claude/` — fixed prefix marking the branch as agent-created.
- `<NNN>` — zero-padded 3-digit **sequence number** (e.g. `001`, `002`, `017`). It increments across all `claude/*` branches, local and remote, so branches sort chronologically and never collide.
- `<short-kebab-slug>` — 2–5 word lowercase, hyphen-separated description of the feature (e.g. `dark-mode-toggle`, `fix-hero-overflow`, `add-blog-section`).

Examples: `claude/001-add-rss-feed`, `claude/002-fix-mobile-nav`, `claude/003-redesign-footer`.

## Workflow

### Step 1 — Start a new branch (new feature / task)

Always branch from a fresh `main`. Compute the next sequence number from existing `claude/*` branches (local + remote), then create the branch:

```bash
git checkout main
git pull origin main

# Find the highest existing claude/NNN sequence (local + remote), default to 0 if none
git fetch origin --prune
last=$(git branch -a --list '*claude/[0-9][0-9][0-9]-*' \
  | grep -oE 'claude/[0-9]{3}' | grep -oE '[0-9]{3}' | sort -n | tail -1)
next=$(printf "%03d" $(( 10#${last:-0} + 1 )))

git checkout -b "claude/${next}-<short-kebab-slug>"
```

> Windows note: run the snippet above with the Bash tool. If git ops must go through PowerShell, compute `next` the same way — list `claude/NNN-*` branches, take the max NNN, add 1, zero-pad to 3 digits.

Confirm to the user: the branch name created and the sequence number used.

**Rules:**
- One branch per feature/task. Do not pile unrelated changes onto an existing branch.
- If the user keeps iterating on the *same* feature, stay on the same branch and push more commits — do **not** open a second branch or PR.
- If the working tree has uncommitted changes when starting new work, stop and ask the user how to handle them before switching branches.

### Step 2 — Do the work

Implement the feature/fix. Commit in logical chunks with clear messages:

```bash
git add <files>
git commit -m "<concise summary of the change>"
```

Commit message: imperative mood, present tense, one line (e.g. `Add RSS feed link to blog section`). Add a body paragraph only when the *why* isn't obvious from the diff.

### Step 3 — Push the branch

```bash
git push -u origin "claude/${next}-<short-kebab-slug>"
```

### Step 4 — Open a PR (work complete)

Create the PR to `main` with the `gh` CLI and a proper summary:

```bash
gh pr create --base main --head "claude/${next}-<short-kebab-slug>" \
  --title "<concise title of the feature>" \
  --body "$(cat <<'EOF'
## Summary
<1–3 sentences: what this PR does and why>

**Project:** Personal Portfolio

## Changes
- `<file1>` — <what changed and why>
- `<file2>` — <what changed and why>

## How to verify
<step-by-step: what the user should check locally or on the live site>

## Notes
<anything the reviewer should know — follow-ups, trade-offs, deferred items. Omit if none.>
EOF
)"
```

The PR title should read as a plain summary of the feature (no `claude/` prefix needed in the title). Always keep the **`**Project:** Personal Portfolio`** line in the body — every PR in this repo belongs to the Personal Portfolio project.

### Step 5 — Label the PR (and project assignment)

Every PR gets **at least one label**. Pick the single best fit for the change, plus `automated-task` since agent PRs are automated via code/PR.

> ⚠️ **Do not use `gh pr edit --add-label`** — it fails on this repo with the same Projects-classic GraphQL error as `gh pr edit --body`. Set labels via the REST API instead:

```bash
gh api repos/mabubakarriaz/mabubakarriaz.github.io/issues/<PR_NUMBER>/labels \
  -X POST -f "labels[]=<best-label>" -f "labels[]=automated-task" --jq '.[].name'
```

**Label guide** (repo labels — pick the closest one as the primary):

| Change type | Primary label |
|---|---|
| New feature / capability / UI addition | `enhancement` |
| Fix for broken behavior | `bug` |
| Docs, skills, config, tooling, READMEs | `documentation` |
| Audience-infrastructure WBS task | `audience-infrastructure` |
| PR needs the user to do something manual | `manual-task` |

Always add `automated-task` alongside the primary label for agent-created PRs.

**Project field.** Every PR belongs to the **Personal Portfolio** project. This is recorded as the `**Project:** Personal Portfolio` line in the PR body (above). Assigning the PR to a GitHub *project board* via CLI is **not currently possible** — the repo is linked to a classic project (which breaks `gh pr edit`) and the auth token lacks the `read:project`/`project` scopes. If board assignment is needed, tell the user to either set it in the GitHub web UI or run `gh auth refresh -s project,read:project` first; do not silently skip it.

### Step 6 — Hand off for review

Report back to the user:
- The branch name and PR URL (printed by `gh pr create`).
- A one-line summary of what the PR does.
- The label(s) applied and the project (Personal Portfolio).
- That **they review and merge manually** — this skill does not merge.
- If the conversation continues with more changes to the *same* feature, push to the same branch and update the existing PR (see below) — do not open a new PR.

## Updating an existing PR

When the same feature continues after a PR is open, push more commits to the same branch, then refresh the PR description so it reflects the **full** set of changes:

```bash
git push   # same branch — the open PR updates automatically with new commits
```

To update the PR body, **do not use `gh pr edit --body`** (it fails on this repo with a GitHub Projects classic deprecation error). Use the API instead:

```bash
gh api repos/mabubakarriaz/mabubakarriaz.github.io/pulls/<N> -X PATCH \
  -f title="<updated title>" \
  -f body="<updated full body>"
```

## Closing stale / outdated PRs

When opening a new PR — or whenever the user asks to tidy up open PRs — check for stale ones and close those that no longer apply. **Never close a PR without first confirming it's genuinely outdated**, and always leave a comment explaining why.

A PR is a close candidate when any of these hold:
- It is **superseded** — its changes were re-done, reverted, or made obsolete by later merged work (e.g. a design polish PR that predates a full redesign).
- It is **far behind `main`** and its diff no longer applies cleanly to the current code.
- It targets a **retired direction** (e.g. the old Azure-blue/Segoe token layer rather than the Control Plane brand).
- It has been **open and untouched for a long time** with no path to merge.

Confirm staleness before closing:

```bash
# List open PRs with age + mergeability
gh pr list --state open --json number,title,headRefName,updatedAt,mergeable \
  --jq '.[] | "#\(.number) [\(.headRefName)] mergeable=\(.mergeable) updated=\(.updatedAt) — \(.title)"'

# How far behind / ahead of main is a candidate branch?
git fetch origin <branch>
git rev-list --count origin/<branch>..origin/main   # commits it is BEHIND main
git rev-list --count origin/main..origin/<branch>    # commits it is AHEAD (its own work)

# Inspect its commits to judge whether the work still matters
gh pr view <N> --json commits --jq '.commits[] | "\(.oid[0:7]) \(.messageHeadline)"'
```

Close with a comment stating the reason and how to revive it:

```bash
gh pr close <N> --comment "Closing as superseded by #<X>/#<Y>. This branch is N commits behind main and targets <retired direction>. Reopen or re-branch off current main if still wanted."
```

**Rules:**
- Only close PRs that are clearly stale by the criteria above — when in doubt, ask the user rather than closing.
- **Never** close a PR you just opened, or one the user is actively iterating on.
- Always include a reason and a revival path in the close comment.

## Hard rules

- **Never** push to `main` or merge a PR. The user reviews and merges.
- **Never** force-push a shared branch or rewrite published history without explicit instruction.
- **Always** branch from an up-to-date `main` (`git pull origin main` first).
- One feature → one branch → one PR. Keep them aligned.
- **Always** apply at least one label (via the REST API, not `gh pr edit`) and keep the `**Project:** Personal Portfolio` line in every PR body.
- **Never** close a PR without confirming it's stale (per the criteria above) and leaving a reason comment.
- If `gh` is not authenticated, tell the user to run `gh auth login` rather than working around it.
