# Redesign Plan — "Mission Control" (Huly-inspired Control Plane)

> Status: planning → execution. Owner: design pass on branch `redesign-control-plane`.
> Reference pull: [huly.io](https://huly.io) landing + pricing. North star: the existing **Control Plane** system (`PRODUCT.md` / `DESIGN.md`). This file is the build contract. Excluded from the published site via `.impeccable/` in `_config.yml`.

---

## 1. The idea in one line

Take huly.io's spatial product showcase — floating UI panels at perspective, pinned scroll-telling, asymmetric bento, horizontal galleries, smooth scroll — and render it through the Control Plane lens, where the "product screenshots" are not faked images but **live instrument panels built in HTML/CSS** that read out the portfolio's own data (certs, experience, skills, telemetry). The site stops being a document about a cloud architect and becomes the operations console a cloud architect would ship.

**Inverse-test sentence (a competitor describing theirs):** "A dark portfolio with a glowing gradient hero and animated cards." If the result reads as only that, it failed. The differentiator is the *instrument-panel-as-content* conceit and the pinned topology storytelling, not the dark gradient.

## 2. What carries over, untouched (identity preservation)

These are committed brand, not reflex picks — they stay:

- Dark-default deep-space canvas `#050810`; light theme remains at parity (opt-in).
- 135° indigo→cyan gradient spine; never inverted, never re-angled.
- Cyan = telemetry only (dates, metadata, logo brackets, live dots). Never a fill or body text.
- Inter (300–900) + JetBrains Mono (instrumentation only). No third family.
- Glow / blur / translucency for depth. No hard drop shadows, no borders > 1px as accents.
- `<AR/>` terminal logo, `~/section` kicker system, hero-network canvas, console boot.
- Existing IntersectionObserver `.visible` reveal stays as the no-JS-safe baseline (content visible by default).

## 3. Decisions locked (from the user)

1. **Motion stack:** Lenis smooth-scroll (vendored locally, ~ small) + native CSS scroll-driven animations (`animation-timeline: view()/scroll()`) + a little rAF for parallax. **No GSAP.** Pinned sections use `position: sticky` (CSS) + IntersectionObserver for active-state, so no JS scroll-pinning engine is needed.
2. **Engage section:** add "Work with me" — three tiers (Cloud Architecture / Team Training / Speaking), **no prices**, each with an included-items checklist and a "Start a conversation" CTA. Middle tile featured. This is the huly-pricing homage.
3. **Scope:** everything bespoke — homepage fully re-architected + each sub-page gets its own treatment, all on the shared upgraded system.

## 4. Homepage architecture (section by section)

| # | Section | Huly move adapted | Build |
|---|---------|-------------------|-------|
| 0 | **Navbar** | minimal product nav | streamline links, add `Engage`; keep logo/theme/resume |
| 1 | **Hero — "Mission Control"** | floating product UI at perspective + parallax | name/role/CTAs left; a 3D-perspective **stack of floating instrument panels** right (console + mini deploy pipeline + metric tiles), drifting on mouse + scroll. Orbs/grid/net canvas behind. |
| 2 | **Telemetry strip** | n/a (keep) | the stats bar restyled as a live readout band with a scanning gradient line; count-up retained |
| 3 | **About — "What I build"** | MetaBrain pinned scroll-telling | sticky left visual (CSS/SVG **control-plane topology**) that swaps active node per chapter; right column = 3 scroll-stepped chapters (Architecture → DevOps/Automation → Training/Community) |
| 4 | **Capabilities — "The stack"** | asymmetric bento grid w/ mini UI | varied-size instrument tiles: large Cloud-Architecture tile w/ mini topology, tall Certifications tile, wide skills cloud, small IaC / CI-CD / Data tiles each w/ a tiny visual. Real content, varied sizes → avoids identical-card-grid ban |
| 5 | **Experience — "Deployment timeline"** | scroll-linked reveal | keep signature timeline; upgrade line-draw to scroll-linked (fills as you pass), subtle parallax on cards |
| 6 | **Certifications — "Credential registry"** | feature cards / carousel | featured certs as a **horizontal scroll-snap filmstrip** (keyboard + button nav) with issuer-glow; CTA to full list |
| 7 | **Projects — "Shipped"** | bento / horizontal gallery | **horizontal scroll-snap gallery** of larger project panels w/ perspective tilt + mini status readout |
| 8 | **Engage — "Work with me"** | pricing tiers | 3 tier cards, no prices, featured middle, gradient-border glow, CTA each |
| 9 | **Newsletter banner** | CTA band (keep) | light polish, align to new system |
| 10 | **Education + Awards** | condensed (keep) | light polish; full detail on sub-pages |
| 11 | **Footer** | keep | light polish |

## 5. Signature components to build (new)

- `.float-stack` / `.float-panel` — perspective-transformed floating instrument panels (hero). Variants: console, pipeline, metric-tiles. `transform: perspective() rotateY() rotateX() translateZ()`; parallax via `--px/--py` (mouse) and `--sy` (scroll) custom props.
- `.pinned-story` — `display:grid` with a `position: sticky` visual column + scrolling chapter column. `.story-stage` holds stacked `.stage-layer`s; active layer toggled by IO on `.story-chapter`.
- `.topology` — CSS/SVG node-graph (nodes + links) with a per-chapter active node/path highlight. Reuses the gradient spine + node-glow vocabulary.
- `.bento` — `grid-template-columns: repeat(6, 1fr)` with tiles spanning varied col/row counts; `auto-fit` fallback on small screens.
- `.filmstrip` / `.gallery` — `scroll-snap-type: x mandatory` rails with prev/next buttons, edge-fade masks, keyboard support.
- `.tier-grid` / `.tier-card` — engagement tiers; `.tier-card--featured` carries a gradient border via mask-composite or layered background.

## 6. Motion specification

- **Smooth scroll:** Lenis vendored at `assets/js/vendor/lenis.min.js`, initialised in `main.js`. Uses real window scroll (so existing `scroll` listeners — navbar `.scrolled`, scroll-progress bar, active-nav IO — keep working). Disabled under `prefers-reduced-motion` and on coarse pointers if it harms.
- **Reveals:** keep IO `.visible` baseline. Layer CSS `view()`-timeline fade/rise on capable browsers as progressive enhancement (never gate visibility on it).
- **Parallax:** hero float-panels translate on pointermove (rAF-throttled) and on scroll offset. Bento/gallery panels get light scroll parallax via `view()` timeline where cheap.
- **Pinned story:** sticky visual + IO chapter activation; the topology cross-fades layers (opacity/transform only).
- **Easing:** ease-out expo/quint for entrances; existing `cubic-bezier(0.4,0,0.2,1)` for state. No bounce/elastic.
- **Reduced motion:** Lenis off, parallax off, scroll-linked draws shown in final state, layers all visible, loops parked. Extend the existing `@media (prefers-reduced-motion: reduce)` block to cover every new effect.

## 7. Color / type guardrails for the new work

- Gradient spine only; cyan stays telemetry. New tiles use indigo/violet tints at 8–12% with matching 1px borders, lightened text for contrast (mirror existing `.skill-*`).
- Body text ≥ 4.5:1: keep `--text-secondary` for prose; never drop to `--text-muted` for sentences. Verify the engage-tier checklist text and gallery captions.
- Display ceiling ≤ ~96px; letter-spacing ≥ -0.04em; `text-wrap: balance` on headings.
- **Light theme brand fix (small, in-scope):** migrate the light theme accent off legacy Azure-blue `#0078D4` toward the indigo→cyan brand (`#4f46e5`/cyan-dark) so the spine is consistent across themes, keeping AA contrast on white. Token-level only.

## 8. Sub-pages (bespoke, on shared system)

Each sub-page currently shares `.page-hero` (orb + grid + net canvas). Upgrade:

- **Shared:** richer `.page-hero` — add a floating mini-panel / breadcrumb-as-terminal-path, scanning line, and a stat readout relevant to the page (e.g. "40+ credentials", "15+ yrs"). Components (cert-card, timeline, award-item, edu-card, project-full-card) inherit all main.css upgrades automatically.
- **certifications/** — category sections get instrument-panel framing; consider issuer-glow + a count readout. `certifications/yearly/` — timeline-flavoured chronological rail.
- **experience/** — full timeline already strong; apply scroll-linked draw + page-hero stat.
- **projects/** — full project cards get the panel/status treatment; optional filter chips.
- **education/** & **awards/** — page-hero stat + polished list/cards.

## 9. Build order & risk notes

A. Motion foundation (Lenis vendor + init, scroll-driven CSS infra, light-theme token fix).
B. Hero float-stack + parallax.
C. About pinned story + topology.
D. Capabilities bento.
E. Experience scroll-linked.
F. Certs filmstrip + Projects gallery.
G. Engage tiers + nav.
H. Newsletter/Education/Awards/footer polish.
I. Sub-page heroes + apply system.
J. QA: `bundle exec jekyll build` (Ruby32 path), browser screenshots @ 390 / 820 / 1440, reduced-motion pass, keyboard pass, contrast spot-checks; fix and re-shoot.

**Risks / watch-items**
- Lenis vs. anchor links / `scroll-behavior:smooth` / `scroll-snap`: scope smooth-scroll to the page, keep snap on galleries working (Lenis allows nested overflow with `data-lenis-prevent`).
- Horizontal galleries must not trap keyboard or hide content from crawlers; provide buttons + real focus order.
- Perspective transforms can blur text — keep panels mostly flat (small angles), translateZ modest, and avoid transforming text-critical panels too far.
- Performance: canvas + Lenis + parallax all rAF — consolidate to avoid multiple loops; pause off-screen; cap DPR (already done for canvas).
- Critical CSS: hero is above the fold — new hero float-stack base styles must go in `_includes/critical.css`; below-fold in `main.css`.
- Don't revive the Azure/Segoe/GitHub-dark legacy token layer as the visible dark brand.

## 10. Definition of done

Beautiful, responsive (390/820/1440 verified in-browser), fast (no extra render-blocking, loops paused off-screen), AA contrast in both themes, full keyboard + focus, reduced-motion parity, no console errors, Jekyll build clean, every huly ingredient present (floating perspective panels, pinned scroll-telling, bento, horizontal gallery, smooth scroll, tier cards) and rendered in Control-Plane voice. Defensible in a high-end studio review.
