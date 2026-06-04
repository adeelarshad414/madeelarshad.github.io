# Update Profile from CV and LinkedIn PDFs

You are updating a Jekyll-based personal portfolio site for Abubakar Riaz hosted at abubakarriaz.com.pk.

## Input

The user provides two PDF file paths as arguments: `$ARGUMENTS`

Parse the arguments to identify:
- **CV PDF** — the first path (used to update the main landing page `index.html`)
- **LinkedIn PDF** — the second path (used to update the dedicated section pages)

If only one path is given, ask the user which type it is before proceeding.
If no paths are given, ask the user to provide them.

## Step 1 — Create a working branch

Before making any changes, create a new git branch from `main`:

```
git checkout main && git pull && git checkout -b sync-profile-<YYYYMMDD>
```

Use today's date in the branch name.

## Step 2 — Read source PDFs

Read both PDF files fully. Extract and mentally organize:

**From the CV PDF** (for `index.html`):
- Current job title and employer
- Hero description / professional tagline
- Years of experience stat
- Top 3–4 highlight certifications shown in hero badge cards
- Summary bullet points for each recent role (shown in the experience section of the landing page, usually the most recent 3)
- Summary of top certifications shown on the landing page
- Top projects shown on the landing page
- Key education entry shown on the landing page
- Top awards shown on the landing page

**From the LinkedIn PDF** (for dedicated section pages):
- Full work history: every role with company, title, location, dates, bullet points, and tech stack
- Full certifications list: name, issuer, date (group by: Azure Cloud Engineer, DevOps Engineer, GitHub, Google Cloud, Coursera/Other)
- Full education: all degrees with institution, dates, field of study
- All projects: name, description, tech stack, estimated cost if any
- All honors & awards: title, issuer, date

## Step 3 — Read existing site files

Read the current content of:
- `index.html`
- `experience/index.html`
- `certifications/index.html`
- `certifications/yearly.html`
- `education/index.html`
- `projects/index.html`
- `awards/index.html`

## Step 4 — Diff and plan changes

Compare extracted PDF content against existing file content. Identify what is new, changed, or removed. Do not change anything that already matches. List all planned changes to the user before editing.

## Step 5 — Update `index.html` from the CV PDF

The landing page sections to update (identified by HTML comments):

- **Hero** (`<!-- HERO -->`): title, role text, tagline, years of experience, hero badge cards (top 3 certs), social links
- **About** (`<!-- ABOUT -->`): update the about-text paragraphs from the LinkedIn PDF summary — professional tagline, current role, years of experience, areas of expertise, domain knowledge, and personal note. Also update the Core Competencies skill tags using the following process:
  1. **Source**: scan the **tools and technologies** listed across all roles in the LinkedIn PDF experience section (e.g., tags like "GitHub Actions", "Terraform", "Azure DevOps", "C# .NET", etc.).
  2. **Selection criteria** — keep a skill if it meets at least one:
     - Appears in **2 or more roles** (demonstrates sustained use, not a one-off)
     - Is a **senior/expert-level signal** (e.g., Solution Architecture, IaC, CI/CD, Observability)
     - Is **highly in-demand** in the current market (e.g., Terraform, Docker, Kubernetes, GitHub Actions, OpenTelemetry)
     - Is a **core language or platform** that underpins the career (e.g., C# .NET, T-SQL, Azure Cloud)
  3. **Exclude** generic or commodity skills that don't differentiate (e.g., "Microsoft Office", "Windows", basic tools everyone uses).
  4. **Categorize** into three tiers matching the existing CSS classes:
     - `skill-primary` (3–4 tags): highest-level strategic competencies (e.g., Solution Architecture, Cloud Computing, Data Engineering, DevOps)
     - `skill-secondary` (4–6 tags): core platforms and frameworks with strong market demand (e.g., Azure Cloud, C# .NET, GitHub Actions, Terraform, Docker)
     - `skill-tertiary` (4–6 tags): specific tools and technologies that demonstrate depth (e.g., T-SQL, SSIS, ASP.NET Core, PowerShell, Azure DevOps, Kubernetes)
  5. **Do not** simply copy the LinkedIn "Top Skills" list verbatim — derive the tags from the full experience section to ensure completeness and accuracy.
- **Experience** (`<!-- EXPERIENCE -->`): reflect the CV's own grouping/summarization of experience — if the CV groups roles under the same employer or presents a condensed view, mirror that structure. Do not always default to listing 3 individual roles; follow how the CV frames the career story. Each entry gets 2–3 bullet points.
- **Certifications** (`<!-- CERTIFICATIONS -->`): curated diverse mix of 6–8 featured certs drawn from the CV's completed list. Prioritize breadth across issuers and skill domains (e.g., one Azure Expert, one DevOps, one GitHub, one HashiCorp/other, one Google/Coursera). Do **not** fill the section with cards all from the same issuer or category.
- **Projects** (`<!-- PROJECTS -->`): top 3–4 projects
- **Education** (`<!-- EDUCATION -->`): highest degree entry
- **Awards** (`<!-- AWARDS -->`): editorially select the most notable/impressive awards (e.g., external recognitions, promotions, competitive honors). Do not simply pick the most recent — choose awards that best represent professional credibility. Typically 3–5 items.

**Preserve exactly**: all CSS classes, `animate-on-scroll`, `{{ relative_url }}` Liquid filters, HTML structure, and `&amp;` entity encoding for `&` in HTML content. Do not add Google Analytics or `<head>` content — those are in the layout.

## Step 6 — Update dedicated section pages from the LinkedIn PDF

### `experience/index.html`
Replace the full `<div class="timeline">...</div>` block with updated timeline items. Each role follows this structure:

```html
<div class="timeline-item animate-on-scroll">
  <div class="timeline-marker">
    <div class="timeline-dot"></div>
    <div class="timeline-line"></div>  <!-- omit on last item -->
  </div>
  <div class="timeline-card">
    <div class="timeline-header">
      <div class="company-badge SLUG">INITIAL</div>
      <div class="timeline-meta">
        <h3 class="timeline-role">TITLE</h3>
        <span class="timeline-company">COMPANY · CITY, COUNTRY · DOMAIN</span>
      </div>
      <span class="timeline-date">Mon YYYY – Mon YYYY · DURATION</span>
    </div>
    <ul class="timeline-bullets">
      <li>bullet</li>
    </ul>
    <div class="timeline-tags">
      <span class="tech-tag">Tech</span>
    </div>
  </div>
</div>
```

Company badge slugs in use: `tkxel`, `jazz`, `pgc`, `mindbridge`, `evs`, `digi`, `stahlco`, `sbp`. Reuse existing slugs for known companies; add new ones as needed.

### `certifications/index.html`
Replace cert cards within each `<div class="cert-grid">` block. Each cert card:

```html
<div class="cert-card">
  <div class="cert-issuer-bar ISSUER"></div>
  <div class="cert-body">
    <div class="cert-icon">EMOJI</div>
    <h3 class="cert-name">CERT NAME</h3>
    <span class="cert-issuer-label">ISSUER</span>
    <span class="cert-date">Mon YYYY</span>
    <a href="VERIFY_URL" target="_blank" rel="noopener" class="cert-verify">Verify ↗</a>
    <!-- sub-certs if applicable -->
    <div class="sub-cert-list">
      <div class="sub-cert-item">
        <span class="sub-cert-name">Sub Cert Name</span>
        <a href="URL" target="_blank" rel="noopener" class="sub-cert-link">↗</a>
      </div>
    </div>
  </div>
</div>
```

Issuer bar classes in use: `azure`, `github`, `google`, `coursera`, `microsoft`. Omit `cert-date` and `cert-verify` if not available. Omit `sub-cert-list` if no sub-certs.

Also update the `<h1>` count (e.g., `40+ Certifications`) and page `description` front matter to reflect the new total.

### `certifications/yearly.html`
Update the chronological yearly view to match all certs from `certifications/index.html`. Group by year, newest first.

### `education/index.html`
Replace education timeline items. Each entry:

```html
<div class="timeline-item animate-on-scroll">
  <div class="timeline-marker">
    <div class="timeline-dot"></div>
    <div class="timeline-line"></div>  <!-- omit on last item -->
  </div>
  <div class="edu-full-card" style="flex:1; margin-bottom: 24px;">
    <div class="edu-full-icon">🎓</div>
    <div class="edu-body">
      <span class="edu-period">YYYY – YYYY</span>
      <h3 class="edu-degree">DEGREE NAME</h3>
      <span class="edu-institution">INSTITUTION · CITY, COUNTRY · DOMAIN</span>
      <p class="edu-focus">KEY SUBJECTS</p>
    </div>
  </div>
</div>
```

### `projects/index.html`
Replace project cards in each `<div class="projects-grid">`. Each card:

```html
<div class="project-full-card animate-on-scroll">
  <div class="project-full-header">
    <div class="project-full-icon">EMOJI</div>
    <div class="project-full-meta">
      <div class="project-full-name">PROJECT NAME</div>
      <span class="project-cost">Est. Vendor Cost: $Xk/annum</span>  <!-- omit if unknown -->
    </div>
  </div>
  <p class="project-full-desc">Description.</p>
  <div class="project-tags">
    <span class="tech-tag">Tech</span>
  </div>
</div>
```

Keep the two-section structure: "Developed Projects" and "Maintained Projects".

### `awards/index.html`
Replace award items in `<div class="awards-list">`:

```html
<div class="award-full-item animate-on-scroll">
  <div class="award-full-icon">EMOJI</div>
  <div class="award-body">
    <h3 class="award-full-title">AWARD TITLE</h3>
    <p class="award-full-issuer">Issued by ISSUER · COMPANY</p>
  </div>
  <div class="award-meta">
    <span class="award-date">Mon YYYY</span>
  </div>
</div>
```

## Step 7 — Verify and commit

After all edits:

1. Run `git diff --stat` to summarize changes.
2. Show the user a brief summary of what was updated in each file.
3. Stage and commit with a descriptive message following the pattern of recent commits (e.g., `Sync portfolio content with latest CV and LinkedIn profile`).
4. **Create or update the pull request**:
   - If no PR exists for the current branch, create one with `gh pr create`.
   - If a PR already exists (check with `gh pr list --head <branch>`), update its title and body to reflect the latest changes using `gh pr edit <number> --title "..." --body "..."`.
   - Always ensure the PR title and description accurately reflect all changes made in the session, even if the PR was created in a previous run.

## Rules

- **Never** add inline GA tags or `<head>` content to individual pages.
- **Never** push directly to `main`.
- **Never** remove or rename CSS classes — the layout CSS depends on them.
- Use `&amp;` for `&` inside HTML attributes and text content.
- Use `{{ '/' | relative_url }}` for internal links, not hardcoded paths.
- Date format: `Mon YYYY` (e.g., `Mar 2025`) for certs and awards; `Mon YYYY – Mon YYYY · DURATION` for roles.
- Only update content that has actually changed — do not touch unchanged sections.
- If a PDF section is ambiguous or missing data, ask the user before guessing.
