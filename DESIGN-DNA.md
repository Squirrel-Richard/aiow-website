# AIOW — Human Industrial

## Authority and status

This file governs the public AIOW homepage redesign on branch `feat/aiow-human-industrial-motion-20260906`. Richard rejected the prior Quiet Monolith and editorial architecture directions because they retained the recognisable visual grammar of AI-generated “premium” sites: fashionable serif/sans pairings, beige/black/gold, generic architecture imagery, glass, and mirrored light/dark themes.

This branch passed local technical, accessibility, motion and product-art review on 2026-09-06. Production remains unchanged until protected PR integration and exact live-domain readback complete.

## Product intent

- Audience: Dutch owners and operators seeking bespoke AI for company processes, a commercial building, or a home/villa.
- Primary task: choose the correct world in 3–5 seconds, then see only relevant examples, boundaries, price context and scan flow.
- Primary worlds: `Werk`, `Pand`, `Wonen` in the expressive hero; full accessible labels remain `Voor mijn bedrijf`, `Voor mijn bedrijfspand`, `Voor mijn woning of villa`.
- Courage: 5/5. AIOW must look authored, not prompt-generated.
- Emotional core: precise control with human presence; capable enough to be bold, disciplined enough not to perform intelligence.

## Promise

NL H1:

`Niet nog een losse tool. Een systeem dat voor u werkt.`

NL support:

`AIOW ontwerpt, bouwt en beheert AI op maat — voor processen, gebouwen en woningen.`

EN H1:

`Not another disconnected tool. One system built to work for you.`

Human authority remains explicit: `Een mens beslist. Altijd.` / `A person decides. Always.`

## Brand world

Physical sources:

- Dutch wayfinding and civic signage;
- industrial control labels;
- anodised aluminium;
- lacquered emergency-stop red;
- deep green machinery paint;
- chalk markings;
- milled instrument apertures;
- indexed technical binders;
- architectural material boards;
- precisely aligned switchgear.

Insider language: ontworpen, gebouwd, beheerd, gekoppeld, begrensd, scan, scope, mens beslist, één geheel, dagelijks beheer.

Avoid: AI glow, robots, generated architecture heroes, dashboards, glass cards, purple/blue gradients, default SaaS icons, fake metrics, repeated rounded cards, fashionable editorial serif, beige/black/gold luxury, raw stock photography.

## Visual system

### Typography

- Display: narrow industrial/signage grotesk with a deliberately resilient stack: `Avenir Next Condensed`, `Arial Narrow`, `Helvetica Neue`, sans-serif. The production composition is proven against the non-Avenir fallback; a licensed or commissioned AIOW cut is an optional future refinement, not a release dependency.
- Body/UI: humanist sans. Prototype stack: `Avenir Next`, `Segoe UI`, system-ui, sans-serif.
- No serif anywhere on the public homepage.
- Display is uppercase only for short promises, route words and instrument labels; body copy stays sentence case.

### Day palette

- Aluminium `#E4E5E0`
- Instrument black `#11110F`
- Lacquer red `#D94B30`
- Secondary graphite `#686963`
- White `#F5F4EE`

### Evening palette

Evening is independently art-directed, not an inverted day palette:

- Machinery green `#17382E`
- Chalk `#DDEADD`
- Coral control `#F56A4D`
- Muted mineral `#9EB7A9`
- Deep field `#10271F`

System mode selects day/evening by OS preference. Manual Light/Dark remains available but is described visually as Day/Evening where copy allows.

### Shape and surface

- Square or 1–2px corners; no pill navigation or repeated rounded cards.
- Hairline rules establish rhythm.
- Large solid fields, hard crops and typographic scale create depth.
- No body glass. One sticky navigation layer may use a near-solid surface with subtle transparency and solid fallback.
- The outlined `O` is the physical aperture in the A-I-O-W spine and the primary identity motif.

## Homepage composition

### Mobile 320/375/390

Compact identity/header → short eyebrow → four-line H1 with one lacquer field → concise support → human-authority line → all three route rows → compact active Route Field.

All three routes must remain identifiable in the first useful viewport at 390×844. At 320px the third route may touch the lower edge but must remain visible and tappable without horizontal overflow.

### Desktop 1024/1440/1920

A fixed-width A-I-O-W identity spine anchors the left edge. The promise and route instrument share the left scene without overlap. A solid Route Field occupies the right scene. The active route expands within that field without moving any link target.

The header is a horizontal instrument line, not a floating rounded navigation pill. Its primary labels mirror the customer journey: `Bedrijf`, `Bedrijfspand`, `Woning`, `Kosten` / `Company`, `Building`, `Home`, `Costs`.

## Signature motion — Route Field

Purpose: preview which customer world will open and make route choice feel physical and authored.

State authority:

- One `activeRoute` state controls pointer hover, keyboard focus and visual field.
- Links remain normal semantic links; click/tap navigates directly.
- Visual layers are decorative and `aria-hidden`.
- `aria-current` is not used for a hover preview because no navigation has occurred.

Motion:

- First paint: spine settles and active route field opens once.
- Route preview: active solid field reveals with one directional `clip-path` shutter.
- Large route word follows 55–90ms later with a restrained translate/opacity settle.
- Route indicator moves through a transform, never through layout geometry.
- Desktop target transition: 460–560ms, cubic-bezier(.22,1,.36,1).
- Mobile target transition: 320–420ms.
- No idle loop, particles, cursor following, parallax, scroll-jacking, animated blur or decorative continuous motion.

Invariant anchors: H1, route links, header, scan contract and focus targets never move.

Reduced motion / weak device / no-JS:

- `prefers-reduced-motion: reduce` and `update: slow` remove animation and transition.
- Default route content is rendered in settled state in HTML.
- Without JavaScript all three route links work and the first visual field remains legible.
- No feature or claim exists only in motion.

## Theme behavior

Day and Evening share information architecture and semantics but not merely colours:

- Day uses the black identity spine and lacquer route field.
- Evening uses the green field, chalk type and coral aperture; background field geometry shifts independently.
- Theme switching may crossfade surfaces but may not replay the full entrance choreography.
- Both themes retain AA contrast, visible focus and identical authority text.

## Conversion

The hero does not lead with a generic scan CTA. Visitors choose a world first:

- Werk → `/ai-automatisering`
- Pand → `/smart-office`
- Wonen → `/home`

Those routes preserve context into:

- `/scan?intent=proces`
- `/scan?intent=pand`
- `/scan?intent=woning`

The scan contract remains: free, approximately max. 30 minutes, human confirmation, decision memo, separate scoping for hardware/installation/external qualified partners.

## Knowledge architecture

SEO/GEO/GAO depth lives in the knowledge layer and contextual route pages. The primary homepage journey contains only what is needed to choose a route, understand the delivery model and take the next action.

Priority context pages preserve one optional plain-language journey before feature examples: `Nu vaak → Met AIOW → menselijke beslissing` / `Current situation → With AIOW → human decision`.

## Accessibility and performance

- Exactly one H1.
- Semantic links and landmarks.
- Touch targets at least 44×44px.
- Visible keyboard focus; hover and focus parity.
- NL/EN; Day/Evening/System.
- Reduced Motion; no-JS; 200% text; 400% reflow.
- Width proof: 320, 375, 390, 768, 1024, 1440, 1920.
- No horizontal overflow.
- LCP <2.0s, CLS <0.05, INP <200ms.
- Marketing JS <100KB gzip where measurable.
- No hero image or video dependency; core visual is CSS and text.

## Anti-generic gate

- Swap test: generic AI agencies do not own the A-I-O-W spine, outlined aperture, lacquer route field, three-world wording and independently composed Evening state.
- Logo-away test: route field, typography, red/green physical palette and human authority remain recognisable without the wordmark.
- Exactly one signature moment: Route Field.
- Chanel rule: remove every effect that does not improve route choice.

## Commercial truth

No invented clients, cases, certifications, savings, rankings, outcomes or autonomous authority. Calculator output remains an indication. Dates and times are confirmed by a person. Hardware, delivery, installation and qualified partner work are separately scoped.

Company facts remain canonical: AIOW B.V. · Bijlmermeerstraat 30 · 2131 HC Hoofddorp · KvK 71887466 · info@aiow.io.

## Release proof

Before preview or production:

1. tests, lint and production build;
2. exact responsive screenshots in NL/EN and Day/Evening;
3. runtime motion-state probe for pointer, focus and direct navigation;
4. reduced-motion and no-JS proof;
5. no-overflow, target size and exactly-one-H1 assertions;
6. 390px mobile and 1440px desktop visual review;
7. independent product-art and accessibility review on immutable SHA;
8. protected PR, exact-SHA deployment proof and explicit production cutover decision.

`TECHNICAL_PASS`, `MOTION_PASS`, `PRODUCT_ART_PASS`, `ACCESSIBILITY_PASS`, `PREVIEW_READY` and `LIVE_PROVEN` remain separate verdicts.

### 2026-09-06 candidate evidence

- `TECHNICAL_PASS`: 216/216 AIOW tests, lint and 89-route Next production build.
- `MOTION_PASS`: pointer and keyboard route-state parity; settled Route Field states; non-zero standard transition and zero reduced-motion transition.
- `ACCESSIBILITY_PASS`: one H1, semantic route links, minimum 44px targets, no-JS links, NL/EN and no horizontal overflow.
- `PRODUCT_ART_PASS`: reviewed at 320 light, 390 Evening, 768 light, 1440 light and settled 1440 `Wonen`; desktop auto-placement, fallback clipping and trust/route overlap blockers were fixed and re-reviewed.
- Browser receipt: `.team-handsome/AIOW-HI-MOTION-20260906/50-proof/browser-proof.json` — `views=28`, `motion=6`, `no_js=4`.
- `PREVIEW_READY`: PASS.
- `LIVE_PROVEN`: pending protected PR, production deployment and custom-domain readback.
