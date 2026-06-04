---
name: Adeel Arshad Portfolio
description: A cloud architect's portfolio rendered as a dark, instrument-grade control plane.
colors:
  accent-indigo: "#6366f1"
  accent-indigo-light: "#818cf8"
  accent-cyan: "#22d3ee"
  accent-violet: "#8b5cf6"
  bg-primary: "#050810"
  bg-secondary: "#0a0f1e"
  bg-card: "#0d162dbf"
  bg-card-solid: "#0d162d"
  text-primary: "#f1f5f9"
  text-secondary: "#94a3b8"
  text-muted: "#475569"
  border: "#6366f126"
  border-hover: "#6366f173"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 7vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "64px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.accent-indigo}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  nav-resume-btn:
    backgroundColor: "transparent"
    textColor: "{colors.accent-cyan}"
    rounded: "{rounded.sm}"
    padding: "6px 14px"
  card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "28px 32px"
  skill-tag:
    backgroundColor: "{colors.accent-indigo}"
    textColor: "{colors.accent-indigo-light}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  pill-meta:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "{colors.accent-cyan}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Adeel Arshad Portfolio

## 1. Overview

**Creative North Star: "The Control Plane"**

This portfolio renders a cloud architect's craft as the thing a cloud architect actually builds: a dark, instrument-grade control plane. The surface is near-black deep space (`#050810`), lit from within by indigo-to-cyan gradients, drifting blurred orbs, and a faint engineering grid. Glowing nodes mark the timeline; monospace telemetry labels carry dates and metadata; a blinking terminal cursor types the role line. The aesthetic argument is direct: if the orchestration layer you ship is precise, fast, and legible under load, the portfolio that represents it should read the same way. The build is the credential.

The personality is **bold, precise, distinctive** — an engineer's confidence expressed as visual conviction. Density is generous and rhythmic rather than cramped: 100px section breathing, deliberate fades on scroll, restraint in the type and looseness in the dark canvas. Color is committed, not hedged: the indigo/cyan/violet triad does real work across heroes, gradients, and hover glow rather than sitting in the margins as a timid accent. Light carries depth; lines are kept hairline-faint so the glow reads.

This system explicitly rejects three things, carried straight from the brand's anti-references. It is **not a generic resume template** — no interchangeable CV-builder shell where only the name changes. It is **not corporate or sterile** — no enterprise-stock, Fluent-default Microsoft look (notably, the dormant Azure-blue + Segoe UI token layer in the CSS is *drift to retire*, not the brand). And it is **not a trendy AI-startup clone** — no cream-and-slate neutrals, no gradient-mesh-by-default, no tiny tracked uppercase eyebrow stamped above every section.

Responsive behavior is composition, not just reflow. The desktop surface runs the full eleven-section sequence; the phone surface is **curated to a tighter story** because a mobile visit is short and one-handed (PRODUCT.md: *"short, evaluative visits, often arriving from LinkedIn… frequently on mobile"*). The mobile arc reads: identity (hero) → proof (stats) → how I work (the pinned About story) → the stack → track record (experience) → credentials (certs) → recognition (awards) → **the ask (Engage)** → **stay in touch (Newsletter)**. Two desktop sections, Projects and Education, are tangents to that arc and are dropped on phones (their full content still lives on dedicated pages and on desktop/tablet); the Engage → Newsletter call-to-action is pulled to the end so the scroll lands on the ask, not on a list of awards.

**The Mobile-Story Rule.** On phones (`≤768px`) the page is curated into a narrative, not shrunk. Off-arc sections are dropped, the primary CTA (Engage, then Newsletter) is pulled to the close, and every nav target still resolves. Desktop and tablet keep the full section set in source order — the mobile recomposition is a `display:none` + flex-`order` overlay, never a separate information architecture or a content fork.

**Key Characteristics:**
- Dark by default (near-black deep-space canvas); a full light theme exists as an opt-in override.
- A committed indigo → cyan gradient as the system's signature, with violet as a third voice.
- Monospace (JetBrains Mono) reserved for telemetry: dates, eyebrows, metadata, the logo, the cursor.
- Depth via blur, glow, and translucency — never via heavy drop shadows or borders.
- Glow-on-hover and small directional nudges (`translateX`/`translateY`) as the interaction signature.
- Mobile is a curated story, not a scaled-down desktop: tangential sections drop away and the Engage → Newsletter CTA closes the scroll (The Mobile-Story Rule).

## 2. Colors

A committed dark palette where a single indigo→cyan gradient carries the brand and violet plays third voice, all floating on a near-black deep-space ground.

### Primary
- **Signal Indigo** (`#6366f1`): The brand's primary voice. Anchors the gradient start, primary-button fill, active states, bullet markers, timeline dots, and link emphasis. This is the color the eye reads as "Adeel's blue."
- **Indigo Glow** (`#818cf8`): A lightened indigo for text-on-dark contexts — gradient-text start, skill-tag labels — where the base indigo would sit too dark against `#050810`.

### Secondary
- **Telemetry Cyan** (`#22d3ee`): The gradient's destination and the system's signal color. Reserved for monospace metadata (dates, eyebrows), the bracket logo, the cursor, hover targets, and the resume button outline. Cyan reads as "live data."

### Tertiary
- **Orbit Violet** (`#8b5cf6`): A supporting accent for the third orb, certain skill tags, and change-request dots. Used sparingly; it widens the palette without competing with the indigo→cyan spine.

### Neutral
- **Deep Space** (`#050810`): The default page background. Near-black with a faint blue cast; the canvas everything glows against.
- **Console Navy** (`#0a0f1e`): Secondary background for alternating sections and the footer; one step up from Deep Space.
- **Card Surface** (`#0d162d` solid / `#0d162dbf` translucent): Card and panel fill. The translucent form layered over `backdrop-filter: blur(20px)` is the default; the solid form is the fallback.
- **Bright Ink** (`#f1f5f9`): Primary text. High-contrast near-white for headings and body emphasis.
- **Muted Slate** (`#94a3b8`): Secondary text — body copy, descriptions, role lines.
- **Faint Slate** (`#475569`): Tertiary/disabled text — fine print, separators, low-priority metadata. Use only at large/non-critical sizes; it does not clear 4.5:1 for body.

### Named Rules
**The Gradient-Spine Rule.** The indigo→cyan gradient (`linear-gradient(135deg, #6366f1, #22d3ee)`) is the system's signature and runs on a 135° axis everywhere — buttons, dots, nav underlines, stat numbers. Never invert the stops, never swap the angle, never introduce a second unrelated gradient.

**The Cyan-Is-Telemetry Rule.** Cyan marks live or machine data: dates, metadata pills, the cursor, the logo brackets, hover affordances. It is forbidden as a large fill or as body text. Its meaning comes from its restraint.

## 3. Typography

**Display / Body Font:** Inter (with `system-ui, sans-serif` fallback) — loaded as a single variable font, weights 300–900.
**Label / Mono Font:** JetBrains Mono (with `Fira Code, monospace` fallback) — weights 400–600.

**Character:** One workhorse sans carries everything from 96px hero display down to 14px body, leaning hard on Inter's weight range (400 → 900) for hierarchy instead of a competing display face. JetBrains Mono is the deliberate second voice: it appears only as instrumentation — the engineer's readout layer — never as prose. The pairing is geometric-neutral sans against a true monospace: a real contrast axis, not two similar sans-serifs.

### Hierarchy
- **Display** (900, `clamp(3.2rem, 7vw, 5.5rem)`, lh 1.05, ls -0.03em): Hero name only. The single loudest element on the site; capped at ~96px so it commands without shouting.
- **Headline** (800, `clamp(2rem, 4vw, 2.75rem)`, lh 1.15, ls -0.02em): Section and page titles.
- **Title** (700, 1.05rem, lh 1.3): Card titles — roles, cert names, project names, award titles.
- **Body** (400, 1–1.05rem, lh 1.6–1.75): Paragraph copy and descriptions. Constrain to ~520–560px (≈65–75ch) for hero and about text.
- **Label** (600, 0.75rem, ls 0.05–0.12em, UPPERCASE, JetBrains Mono): Eyebrows, dates, metadata pills, stat labels, the scroll indicator. Always monospace, always short.

### Named Rules
**The Mono-Is-Instrumentation Rule.** JetBrains Mono is reserved for telemetry-class text: dates, code-ish labels, the `<AR/>` logo, the cursor, section tags. It is forbidden for headings, body copy, or anything sentence-length. Mono here earns its keep because the subject *is* technical; it is never decoration.

**The One-Family Display Rule.** Hierarchy comes from Inter's weight range (400/500/600/700/800/900) and scale, not from adding display faces. Do not introduce a serif or a second sans for headings.

## 4. Elevation

Depth is built from **light, blur, and translucency — not from drop shadows or borders.** Cards are translucent navy over a 20px `backdrop-filter` blur, edged with a 1px near-invisible indigo border (`#6366f126`). At rest they sit flat; on hover the border brightens (`#6366f173`) and a soft indigo glow blooms beneath. Atmospheric depth in the hero comes from large blurred orbs (`filter: blur(80px)`) drifting behind a faint grid, not from stacked shadow layers. The result reads as "lit from within," the opposite of the 2014 hard-shadow card.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 4px 24px rgba(0,0,0,0.4)`): Quiet ambient seat for floating cards against the dark ground. Diffuse, never crisp.
- **Accent Glow** (`box-shadow: 0 0 40px rgba(99,102,241,0.18)`): The hover signature. An indigo bloom, not a directional shadow — it makes the element feel energized rather than lifted by a hard light source.
- **Node Glow** (`box-shadow: 0 0 16px rgba(99,102,241,0.5)`): Tight halo on timeline dots and live markers, so nodes read as emitting light.

### Named Rules
**The Glow-Not-Drop Rule.** Elevation responds to state with *glow* (a colored bloom), not with a darker or larger drop shadow. Surfaces are calm at rest; light is the reward for interaction. If a card looks like it's casting a hard shadow onto a page below it, the effect is wrong.

## 5. Components

Components feel **precise and instrument-like**: tight radii, monospace metadata, glow-on-hover, and small directional nudges that read as responsive feedback from a well-built panel.

### Buttons
- **Shape:** Rounded (12px, `--radius`); large variant keeps the radius and grows padding to 16px 32px.
- **Primary:** The gradient spine as fill (`linear-gradient(135deg, #6366f1, #22d3ee)`), white text, 14px 28px padding, seated on a soft indigo shadow.
- **Outline:** Transparent fill, near-white text, 1px `border-hover` edge; on hover, a faint indigo wash (`rgba(99,102,241,0.08)`) and the border tightens to full indigo.
- **Hover / Focus:** Both lift `translateY(-2px)`; primary deepens its shadow, outline fills faintly. Transitions run on `cubic-bezier(0.4,0,0.2,1)`.
- **Resume button (nav):** A cyan-outlined pill (6px radius); on hover it inverts to a solid cyan fill with near-black text.

### Chips / Tags
- **Skill tags:** Pill-shaped (999px), monospace, tinted by tier — indigo (`primary`), cyan (`secondary`), violet (`tertiary`), each at ~8–12% background with a matching translucent border and a lightened text color for contrast.
- **Tech tags:** Quieter neutral pills (`rgba(255,255,255,0.04)`), muted text; on hover they pick up an indigo tint. Used for tech-stack lists on timeline and project cards.
- **Metadata pills:** Cyan-tinted monospace pills (`rgba(34,211,238,0.08)` fill, `0.2` border) for dates and costs — the telemetry readout.

### Cards / Containers
- **Corner Style:** 20px (`--radius-lg`) for content cards; 28px (`--radius-xl`) for the skills panel.
- **Background:** Translucent Card Surface (`#0d162dbf`) over a 20px backdrop blur.
- **Shadow Strategy:** Flat at rest (Card Rest ambient); Accent Glow on hover. See Elevation.
- **Border:** 1px `#6366f126`, brightening to `#6366f173` on hover.
- **Internal Padding:** 28px 32px for content cards; 24px for compact cards; 32px for panels.
- **Hover motion:** A small directional nudge — `translateY(-4px)` for grids, `translateX(4–6px)` for list rows and timeline cards.

### Inputs / Fields
The site currently has no form inputs (CTAs link out to LinkedIn/RSS). When inputs are introduced, follow the system: translucent Card Surface fill, 1px `border` at rest, a `border-hover` indigo edge plus a soft Accent Glow on focus (never a default browser outline), 12px radius, near-white text, Muted Slate placeholder at ≥4.5:1.

### Navigation
- **Style:** Fixed, transparent at top; on scroll it compacts and gains a blurred translucent bar (`rgba(5,8,16,0.85)` + 24px blur) with a hairline indigo bottom border.
- **Logo:** `<AR/>` in JetBrains Mono with cyan brackets — the terminal signature.
- **Links:** Muted Slate, 0.9rem; hover/active brightens to near-white and grows a gradient underline left-to-right.
- **Controls:** A circular theme toggle (sun/moon) and the cyan resume pill sit inline.
- **Mobile (`≤768px`):** Hamburger opens a full-screen blurred overlay; links scale up to 1.5rem, centered. The menu is curated to what the phone actually renders — the Projects link is dropped because that section is hidden at this breakpoint (The Mobile-Story Rule). Never leave a nav link pointing at a section hidden on its own breakpoint.

### Engage Tiers (the ask)

Three offer cards (Cloud architecture, Team training, Speaking) in a `repeat(3, 1fr)` grid. The middle card is the **featured** tier: a `Most requested` cyan-gradient badge, a gradient border-box edge, and a deeper glow on hover (`0 0 50px → 72px rgba(99,102,241,…)`). Each card carries a `~/`-prefixed mono kicker, a one-line "for whom", a cyan-check include list, and a full-width CTA pinned to the card foot. As the climax of the page, Engage is where the gradient spine does its closing work.

- **Single-column reorder:** when the grid collapses to one column (`≤860px`), the featured tier is pulled to the top with `order: -1` so the strongest offer leads instead of sitting marooned in the middle. Padding tightens to `28px 24px`.

### Signature: The Experience Timeline
A two-column grid (40px marker rail + content) where each entry is a glowing indigo **node** (`14px`, Node Glow halo) connected by a gradient line that fades to transparent. Cards carry a square company badge with a per-company gradient, a monospace date pill, and `›`-marked bullets in indigo. This is the system's most distinctive pattern — the literal "control plane" read — and should be preserved as the model for any chronological content.

## 6. Do's and Don'ts

### Do:
- **Do** keep the indigo→cyan gradient on a 135° axis everywhere it appears (The Gradient-Spine Rule); it is the single signature that ties the system together.
- **Do** reserve JetBrains Mono for telemetry-class text only — dates, eyebrows, the logo, the cursor (The Mono-Is-Instrumentation Rule).
- **Do** build depth with glow, blur, and translucency; respond to hover with an Accent Glow bloom, not a darker drop shadow (The Glow-Not-Drop Rule).
- **Do** drive hierarchy from Inter's weight range (400→900) and scale, not from extra type families (The One-Family Display Rule).
- **Do** bump body text from Muted Slate toward Bright Ink wherever it must clear 4.5:1; Faint Slate (`#475569`) is for large or non-critical text only.
- **Do** provide a `prefers-reduced-motion` fallback (crossfade or instant) for every orb drift, fade-in, blink, and hover transform — the bold motion makes this non-negotiable.
- **Do** treat the dark theme as default and keep the light theme at full parity (it already exists as a `[data-theme="light"]` override).
- **Do** curate mobile into a story rather than shrinking the desktop stack: on phones (`≤768px`) drop off-arc sections (Projects, Education) and pull the Engage → Newsletter CTA to the close so the scroll ends on the ask (The Mobile-Story Rule). Keep desktop's full section set and source order untouched — the recomposition is a media-query overlay, not a fork.

### Don't:
- **Don't** revive the dormant Azure-blue (`#0078D4`) + Segoe UI + GitHub-dark token layer as the visible brand — it's migration drift and it reads as the **corporate / sterile, Fluent-default Microsoft look** the brand explicitly rejects.
- **Don't** let the page slide into a **generic resume template** — if a section could belong to any portfolio with the name swapped, give it the control-plane treatment (glow, mono telemetry, gradient spine) instead.
- **Don't** drift toward a **trendy AI-startup clone**: no cream-and-slate neutrals, no gradient-mesh-by-default hero, and no tiny tracked-uppercase eyebrow stamped above *every* section. One mono `section-tag` used with intent is voice; on every heading it's AI scaffolding.
- **Don't** use cyan as a large fill or as body text (The Cyan-Is-Telemetry Rule), and never invert or re-angle the gradient spine.
- **Don't** add hard drop shadows or borders heavier than 1px to convey elevation; that's the 2014-app tell this system is built to avoid.
- **Don't** introduce a serif or a second sans for headings, or use monospace for sentence-length copy.
- **Don't** exceed the ~96px display ceiling or tighten display letter-spacing past -0.04em.
- **Don't** treat mobile as desktop-scaled-down: never leave a nav link pointing at a section hidden on that breakpoint, and never bury the primary CTA mid-scroll on phones. If a section is off the mobile arc, drop it and its nav entry together.
