# Audience Infrastructure WBS — Task Index

Quick reference for all task numbers, descriptions, file targets, and task type (automated vs manual).
Source: Notion → Streams → MVP → Personal Portfolio → Roadmap → 3. Audience Infrastructure

---

## Sprint 1: Newsletter CTAs & LinkedIn Integration (Days 1–5)

### 1.1 LinkedIn Newsletter Subscribe Link
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 1.1.1 | Get your direct LinkedIn Newsletter subscribe URL and test in incognito | **Manual** | LinkedIn |

### 1.2 Newsletter CTA on Portfolio Homepage
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 1.2.1 | Add "Subscribe to My Newsletter" CTA button in hero section | **Automated** | `index.html` / homepage layout |
| 1.2.2 | Add newsletter CTA in the site footer (all pages) | **Automated** | `_includes/footer.html` |
| 1.2.3 | Add dedicated newsletter banner section on homepage (between Projects and Education) | **Automated** | `index.html` / homepage layout |

### 1.3 Newsletter CTA on Hashnode Blog
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 1.3.1 | Add LinkedIn Newsletter link to Hashnode blog navigation | **Manual** | Hashnode Dashboard → Appearance → Navigation |
| 1.3.2 | Add newsletter CTA to Hashnode author bio / about widget | **Manual** | Hashnode Dashboard → General → Blog description |
| 1.3.3 | Create standard closing block template for blog posts (newsletter CTA + links) | **Manual** | Personal habit / post template |

---

## Sprint 2: RSS Feed & Social Sharing Links (Days 5–10)

### 2.1 Surface Hashnode RSS Feed
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 2.1.1 | Verify Hashnode RSS feed is active at `blog.abubakarriaz.com.pk/rss.xml` | **Manual** | Browser check |
| 2.1.2 | Add RSS feed `<link>` auto-discovery tag to Hashnode blog `<head>` | **Manual** | Hashnode Dashboard → Advanced → Custom Head Tags |
| 2.1.3 | Add visible RSS link to Hashnode blog navigation | **Manual** | Hashnode Dashboard → Appearance → Navigation |
| 2.1.4 | Add RSS link to the main portfolio site footer | **Automated** | `_includes/footer.html` |
| 2.1.5 | Submit RSS feed to aggregators (Feedly, Hashnode, DevURLs) | **Manual** | Feedly, Hashnode, DevURLs |

### 2.2 Social Sharing Links on Portfolio
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 2.2.1 | Add/verify social profile links in homepage hero (GitHub, LinkedIn, MS Learn, Hashnode) | **Automated** | `index.html` / homepage layout |
| 2.2.2 | Add social links row to site footer (GitHub, LinkedIn, MS Learn, Hashnode, RSS) | **Automated** | `_includes/footer.html` |
| 2.2.3 | Add "Share This Page" links (LinkedIn + X + Copy Link) to Experience, Projects, Certifications | **Automated** | `experience.html`, `projects.html`, `certifications.html` |

---

## Sprint 3: Comments & Engagement on Hashnode (Days 10–14)

### 3.1 Optimize Hashnode Comments
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 3.1.1 | Verify commenting is enabled on Hashnode blog | **Manual** | Hashnode Dashboard → General |
| 3.1.2 | Enable comment email notifications | **Manual** | Hashnode Dashboard → Notifications |
| 3.1.3 | Respond to all existing comments on blog posts | **Manual** | Hashnode blog posts |
| 3.1.4 | Add comment prompt to standard blog post closing template | **Manual** | Personal habit / post template |

### 3.2 Hashnode Subscriber System
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 3.2.1 | Verify Hashnode built-in blog newsletter/subscriber feature is enabled | **Manual** | Hashnode Dashboard → Newsletter |
| 3.2.2 | Customize Hashnode newsletter subscribe widget text | **Manual** | Hashnode Dashboard → Newsletter |
| 3.2.3 | Decide on dual-newsletter strategy and document it in Notion | **Manual** | Notion personal notes |

---

## Sprint 4: Analytics Setup (Days 14–18)

### 4.1 Portfolio Site Analytics (Jekyll)
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 4.1.1 | Choose analytics platform (Plausible / Umami / GA4 / Cloudflare) | **Manual** | Decision |
| 4.1.2 | Sign up and get tracking script from chosen platform | **Manual** | Chosen analytics platform |
| 4.1.3 | Add tracking script to Jekyll site | **Automated** | `_includes/head.html` or `_includes/analytics.html` |
| 4.1.4 | Verify data is flowing (visit site, check dashboard) | **Manual** | Browser + analytics dashboard |
| 4.1.5 | Set up basic goals/events (Resume download, Newsletter CTA clicks) | **Automated** | `_includes/head.html`, relevant pages |

### 4.2 Hashnode Blog Analytics
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 4.2.1 | Review Hashnode's built-in analytics dashboard | **Manual** | Hashnode Dashboard → Analytics |
| 4.2.2 | Connect Google Search Console to `blog.abubakarriaz.com.pk` | **Manual** | GSC + Hashnode Dashboard → Advanced → Custom Head Tags |
| 4.2.3 | Create weekly analytics review recurring task in Notion | **Manual** | Notion |

---

## Sprint 5: "Latest from the Blog" Section on Main Site (Days 18–21)

### 5.1 Design the Section
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 5.1.1 | Design "Latest from the Blog" section (3-card layout, placement, fields) | **Manual** | Design decision / wireframe |

### 5.2 Implementation Options
| Task | Description | Type | File(s) / Platform |
|---|---|---|---|
| 5.2.1 | Option A: Static manual update via `_data/latest_posts.yml` + Liquid loop | **Automated** | `_data/latest_posts.yml`, `index.html` |
| 5.2.2 | Option B: GitHub Actions auto-fetch from Hashnode RSS, update YAML, commit | **Automated** | `.github/workflows/fetch-blog-posts.yml`, `scripts/fetch_blog_posts.py`, `_data/latest_posts.yml` |
| 5.2.3 | Choose Option A or B and implement | **Automated** | Depends on choice |

---

## Automated vs Manual Summary

### Automated (Claude implements via branch + PR)
`1.2.1`, `1.2.2`, `1.2.3`, `2.1.4`, `2.2.1`, `2.2.2`, `2.2.3`, `4.1.3`, `4.1.5`, `5.2.1`, `5.2.2`, `5.2.3`

### Manual (User executes — Claude provides step-by-step guide)
`1.1.1`, `1.3.1`, `1.3.2`, `1.3.3`, `2.1.1`, `2.1.2`, `2.1.3`, `2.1.5`, `3.1.1`, `3.1.2`, `3.1.3`, `3.1.4`, `3.2.1`, `3.2.2`, `3.2.3`, `4.1.1`, `4.1.2`, `4.1.4`, `4.2.1`, `4.2.2`, `4.2.3`, `5.1.1`

---

## Key Constants

| Constant | Value |
|---|---|
| Portfolio site | `https://abubakarriaz.com.pk` |
| Blog | `https://blog.abubakarriaz.com.pk` |
| RSS feed URL | `https://blog.abubakarriaz.com.pk/rss.xml` |
| LinkedIn newsletter | `https://www.linkedin.com/newsletters/XXXXXX` (task 1.1.1 captures exact URL) |
| Newsletter name | "Think you know DevOps?" |
| GitHub profile | `https://github.com/mabubakarriaz` |
| LinkedIn profile | `https://linkedin.com/in/mabubakarriaz` |
| Microsoft Learn profile | Link from existing hero section |