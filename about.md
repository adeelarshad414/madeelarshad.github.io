# About This Application

## Overview

This repository contains the professional portfolio website for Adeel Arshad, a Cloud Solution Architect, Head of DevOps, Kubestronaut, and multi-cloud certified technology leader. The site is built as a customer-facing profile that presents Adeel's cloud architecture, DevOps transformation, Kubernetes, AI platform readiness, business analysis, QA, and software delivery expertise in a polished and production-ready format.

The application is a static Jekyll site hosted on GitHub Pages.

Live repository: https://github.com/adeelarshad414/madeelarshad.github.io

## Purpose

The purpose of this application is to act as a professional digital profile for customers, recruiters, partners, and technical stakeholders. It helps visitors quickly understand Adeel's experience, certifications, services, project impact, and engagement areas.

The site is designed to support:

- Customer trust building before cloud, DevOps, or platform advisory conversations.
- Professional visibility for solution architecture, DevOps leadership, and AI-ready platform work.
- Resume and LinkedIn discovery from one central profile.
- Demonstration of cloud, Kubernetes, automation, FinOps, DevSecOps, and delivery leadership.
- Clear positioning for consulting, advisory, transformation, and technical leadership opportunities.

## Key Features

- Responsive landing page with a strong personal brand and executive summary.
- Cloud, DevOps, Kubernetes, AI readiness, BA, QA, and platform engineering capability sections.
- Professional experience timeline covering leadership, architecture, and delivery roles.
- Certifications section highlighting AWS, Azure, Google Cloud, CNCF, Kubernetes, and Kubestronaut credentials.
- Projects and impact programs covering multi-cloud architecture, GitOps, CI/CD, FinOps, observability, modernization, and DevOps organization buildout.
- Engagement section for cloud architecture, DevOps transformation, and AI platform advisory services.
- Resume download support through `assets/resume.pdf`.
- LinkedIn and GitHub profile links.
- Dark/light theme toggle.
- SEO metadata, Open Graph preview images, robots file, and structured data.
- Playwright smoke tests for layout, SEO, audience, and design checks.
- Customer demo video with voiceover under `demo/customer-demo/`.

## Main Pages

- `/` - Main portfolio landing page.
- `/experience/` - Full professional experience.
- `/certifications/` - Certification overview grouped by platform and skill area.
- `/certifications/yearly/` - Certification timeline/list view.
- `/projects/` - Selected cloud and DevOps impact programs.
- `/education/` - Academic background.
- `/awards/` - Awards, honors, and community involvement.
- `/assets/resume.pdf` - Downloadable resume.

## Customer Demo

A narrated customer demo has been generated and stored in:

`demo/customer-demo/output/adeel-arshad-customer-demo.webm`

Supporting files include:

- `demo/customer-demo/voiceover.txt` - Voiceover script.
- `demo/customer-demo/generate-customer-demo.cjs` - Local video generation script.
- `demo/customer-demo/captures/` - Screenshots used in the video.
- `demo/customer-demo/audio/` - Generated narration audio files.

The demo video introduces the portfolio, summarizes Adeel's value proposition, and highlights customer-relevant strengths such as multi-cloud delivery, DevOps transformation, Kubernetes maturity, certifications, and LinkedIn contact flow.

## Technology Stack

- Jekyll static site generator.
- GitHub Pages hosting.
- HTML, CSS, and JavaScript.
- Custom responsive design system.
- Playwright for browser-based validation.
- macOS `say` and browser media recording for local demo video generation.

## Usage

Visitors can use the site to:

- Review Adeel's professional profile and cloud leadership experience.
- Download the latest resume.
- Browse certifications and project impact areas.
- Understand services offered for cloud architecture, DevOps transformation, and AI platform readiness.
- Connect through LinkedIn or GitHub.

Developers or maintainers can use the repository to:

- Update content in the root `index.html` and section pages.
- Replace resume assets in `assets/resume.pdf` and `assets/resume.docx`.
- Update design styles in `assets/css/main.css`.
- Update client-side interactions in `assets/js/main.js`.
- Run the Playwright test suite from the `tests/` directory.
- Regenerate the customer demo video when site content changes.

## Local Development

Install Ruby and Bundler, then run Jekyll locally:

```bash
bundle exec jekyll serve --no-watch
```

Open the local site at:

```text
http://127.0.0.1:4000
```

Run the browser test suite from the `tests/` directory:

```bash
npm test
```

## Content Update Guide

Common profile updates usually happen in these files:

- `_config.yml` - Site title, URL, author metadata, SEO defaults.
- `index.html` - Main landing page copy, capabilities, engagement content, featured projects, certifications, awards, and calls to action.
- `experience/index.html` - Full work history.
- `certifications/index.html` - Certification listing.
- `projects/index.html` - Impact programs and project summaries.
- `assets/resume.pdf` - Public resume download.
- `assets/images/` - Favicons and social preview images.

After updates, verify the site locally, run tests where possible, commit the changes, and push to `origin/main`.
