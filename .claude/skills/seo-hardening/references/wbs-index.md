# SEO Hardening WBS — Task Index

Quick reference for all task numbers and their one-line descriptions.
Source: Notion → Streams → MVP → Personal Portfolio → Roadmap → 2. SEO Hardening

---

## Sprint 1: Technical Foundation (Days 1–3)

### 1.1 Sitemap & Robots
| Task | Description | File(s) |
|---|---|---|
| 1.1.1 | Add `jekyll-sitemap` plugin, verify sitemap.xml exists with all 7 pages | `_config.yml`, `Gemfile` |
| 1.1.2 | Create `robots.txt` at root referencing sitemap | `robots.txt` |
| 1.1.3 | Submit sitemap to Google Search Console | Manual (no code) |
| 1.1.4 | Submit sitemap to Bing Webmaster Tools | Manual (no code) |

### 1.2 Canonical Tags
| Task | Description | File(s) |
|---|---|---|
| 1.2.1 | Add `<link rel="canonical">` to every page via `_includes/head.html` | `_includes/head.html` |
| 1.2.2 | Verify no trailing slash inconsistencies | All pages + `_config.yml` |

### 1.3 Title Tags & Meta Descriptions
| Task | Description | File(s) |
|---|---|---|
| 1.3.1 | Audit & optimize title tags for every page (unique, <60 chars) | `_includes/head.html`, page front matter |
| 1.3.2 | Add unique `<meta name="description">` to every page (150–160 chars) | `_includes/head.html`, page front matter |

---

## Sprint 2: Structured Data / JSON-LD (Days 3–5)

### 2.1 Person Schema (Homepage)
| Task | Description | File(s) |
|---|---|---|
| 2.1.1 | Add Person JSON-LD to homepage `<head>` | `_includes/head.html` or `_includes/jsonld-person.html` |

### 2.2 WebSite Schema (Homepage)
| Task | Description | File(s) |
|---|---|---|
| 2.2.1 | Add WebSite JSON-LD alongside Person schema | Same as 2.1.1 |

### 2.3 BreadcrumbList Schema (All Pages)
| Task | Description | File(s) |
|---|---|---|
| 2.3.1 | Add BreadcrumbList JSON-LD to all inner pages via `_layouts/default.html` | `_layouts/default.html` |
| 2.3.2 | Validate ALL structured data across all pages using Schema.org Validator | Validation only (no code) |

---

## Sprint 3: Open Graph & Social Sharing (Days 5–8)

### 3.1 Open Graph Meta Tags
| Task | Description | File(s) |
|---|---|---|
| 3.1.1 | Add full OG meta tag block to `_includes/head.html` | `_includes/head.html` |

### 3.2 Twitter Card Meta Tags
| Task | Description | File(s) |
|---|---|---|
| 3.2.1 | Add Twitter Card meta tags alongside OG tags | `_includes/head.html` |

### 3.3 OG Image Creation
| Task | Description | File(s) |
|---|---|---|
| 3.3.1 | Design default OG image (1200×630px, <300KB) | `/assets/images/og-default.png` |
| 3.3.2 | Create page-specific OG images for Experience, Certifications, Projects | `/assets/images/og-*.png` + page front matter |

### 3.4 Social Sharing Validation
| Task | Description | File(s) |
|---|---|---|
| 3.4.1 | Test homepage with Facebook Sharing Debugger | Manual validation |
| 3.4.2 | Test homepage with LinkedIn Post Inspector | Manual validation |
| 3.4.3 | Test all key pages with both social debugger tools | Manual validation |

---

## Sprint 4: Performance & Core Web Vitals (Days 8–10)

### 4.1 Measure Baseline
| Task | Description | File(s) |
|---|---|---|
| 4.1.1 | Run PageSpeed Insights on homepage — record mobile & desktop scores | Manual |
| 4.1.2 | Run PageSpeed on Experience, Certs, Projects pages | Manual |

### 4.2 Image Optimization
| Task | Description | File(s) |
|---|---|---|
| 4.2.1 | Convert all images to WebP with `<picture>` fallback | All HTML/MD pages with images |
| 4.2.2 | Add `width` and `height` to all `<img>` tags | All HTML/MD pages |
| 4.2.3 | Add `loading="lazy"` to below-fold images | All HTML/MD pages |
| 4.2.4 | Preload hero image using `<link rel="preload">` | `_includes/head.html` |

### 4.3 Font Optimization
| Task | Description | File(s) |
|---|---|---|
| 4.3.1 | Self-host web fonts with `@font-face` + `font-display: swap` | `/assets/fonts/`, CSS files |
| 4.3.2 | Preload critical font files | `_includes/head.html` |

### 4.4 CSS & JS Optimization
| Task | Description | File(s) |
|---|---|---|
| 4.4.1 | Inline critical CSS in `<head>` | `_includes/head.html` |
| 4.4.2 | Defer non-critical CSS with `media="print"` trick | `_includes/head.html` |
| 4.4.3 | Add `defer` attribute to all `<script>` tags | `_includes/head.html`, `_layouts/default.html` |

### 4.5 Re-measure
| Task | Description | File(s) |
|---|---|---|
| 4.5.1 | Re-run PageSpeed Insights on all pages after optimizations | Manual |
| 4.5.2 | Document before/after scores in a table | Manual / docs |

---

## Sprint 5: Final SEO Touches (Days 10–14)

### 5.1 Heading Structure Audit
| Task | Description | File(s) |
|---|---|---|
| 5.1.1 | Verify every page has exactly ONE `<h1>` tag | All pages |
| 5.1.2 | Verify heading hierarchy is sequential (H1→H2→H3) | All pages |

### 5.2 Accessibility SEO Overlap
| Task | Description | File(s) |
|---|---|---|
| 5.2.1 | Add `alt` text to every image | All pages |
| 5.2.2 | Add `lang="en"` to `<html>` tag | `_layouts/default.html` |
| 5.2.3 | Ensure all links have descriptive anchor text or `aria-label` | All pages |

### 5.3 Miscellaneous Technical SEO
| Task | Description | File(s) |
|---|---|---|
| 5.3.1 | Add `favicon.ico` and Apple touch icon meta tags | `_includes/head.html` |
| 5.3.2 | Verify HTTPS enforced, no mixed content | Audit (config/links) |
| 5.3.3 | Add `<meta name="theme-color" content="#0078D4">` | `_includes/head.html` |
| 5.3.4 | Create branded `404.html` page | `404.html` |

### 5.4 Google Search Console Monitoring Setup
| Task | Description | File(s) |
|---|---|---|
| 5.4.1 | Verify all pages indexed in GSC, request indexing for missing | Manual |
| 5.4.2 | Check for coverage errors in GSC | Manual |
| 5.4.3 | Set up email alerts for GSC issues | Manual |

---

## Tasks That Are Manual (No Code PR Needed)

These tasks require tool access or external validation — they cannot be done via a GitHub PR:
- 1.1.3 — Google Search Console submission
- 1.1.4 — Bing Webmaster Tools submission
- 2.3.2 — Schema.org Validator (run after deploy)
- 3.4.1, 3.4.2, 3.4.3 — Social debugger testing (run after deploy)
- 4.1.1, 4.1.2 — PageSpeed baseline (run before code changes)
- 4.5.1, 4.5.2 — PageSpeed re-measure (run after deploy)
- 5.4.1, 5.4.2, 5.4.3 — GSC monitoring (run after deploy)

For these tasks, Claude will provide step-by-step instructions instead of a PR.