# AIOW — Quiet Monolith

## Scope and authority

This file governs the public AIOW V1 surface at `aiow.ai`. It preserves the existing portal, scan, venture, admin and transactional behavior. Richard approved **Quiet Monolith** on 2026-09-05 after vetoing the live Living Blueprint as visually chaotic and insufficiently high-end on both mobile and desktop. Product truth survives; the rejected diagram metaphor does not.

## Product intent

- **Audience:** Dutch owners and operators evaluating practical bespoke AI for their work, a commercial building, or a home/villa.
- **Primary task:** understand in three seconds that AIOW designs and builds one controlled system around the visitor’s world, recognise exactly **Werk**, **Bedrijfspanden**, and **Woningen & villa’s**, then request one bounded scan.
- **Platform:** responsive public web; mobile and desktop are separately composed around one shared hierarchy.
- **Courage:** 4/5 — near-silent luxury with one ownable object, not visual spectacle.
- **Emotional core:** “this is where I have my AI built” — private architectural atelier, exact, calm and capable.

## Promise and plain-language law

**Hero promise:** “AI die voor u werkt.”
**Support:** “AIOW ontwerpt en bouwt één beheerst systeem voor uw werk, gebouw of woning.”
**Category truth:** Werk · Bedrijfspanden · Woningen & villa’s.
**Primary action:** “Laat één proces of ruimte scannen.”

Every public surface leads with the change in the visitor’s world, then explains technology, boundaries and delivery. Public NL uses `u/uw` consistently. Customer-facing UI, PDF and mail never expose implementation vocabulary such as outbox, adapter, canonical snapshot, durable receipt, frozen request, mail task or lead.

## Brand world

Objects/materials: blackened architectural steel, precision-cut limestone, one embedded copper seam, museum plinth, warm drafting paper, smoked glass, linen proposal, survey notebook, engraved instrument plate, architectural section.

Language: ontworpen, gebouwd, gekoppeld, beheerd, scan, scope, implementatie, begrensd, lokaal, privé, menselijke regie.

Avoid: purple/blue AI glow, robots, generic AI-agency claims, fake social proof, dashboard KPIs, speculative savings, technical diagrams in the hero, repeated cards and over-glass body copy.

## Tokens

- Deep background `#0D0E10` — blackened architectural steel.
- Raised solid surface `#15171A` — museum plinth.
- Warm light background `#EEE8DD` — architectural limestone/drafting paper.
- Warm light surface `#F7F2E9` — linen proposal.
- Dark ink `#171717`; light ink `#F4F0E9`.
- Muted dark `#59564F`; muted light `#B9B3AA`.
- Single accent `#D2A15D` dark / `#8A5A20` light — embedded copper seam, AA-safe in context.
- Hairline dark `rgba(255,255,255,.12)` / light `rgba(23,23,23,.16)`.
- Headlines: Fraunces. UI/body: Inter. No third family.

## Composition and visual grammar

The homepage follows one sequence:

`one promise → one action → three domains → proof of control → delivery → indication → final scan decision`.

### First viewport

- One minimal header.
- One short eyebrow.
- One two-line promise.
- One short support sentence.
- One primary scan CTA.
- One Quiet Monolith asset: a single blackened-steel/limestone object with an embedded copper seam representing one controlled system.
- The three exact categories appear as a quiet text ledger, never as cards, tabs, diagrams or technical stages.
- No scan-contract microcopy, trust chips, secondary CTA, numbered sections, schematic disclaimer or capability descriptions compete in the hero.

### Mobile 320/375/390

The order is fixed: compact header → promise → support → full-width CTA → cropped monolith → three category rows. The first viewport carries one promise, one action and one visual. Descriptors, causal stages and pricing move below. Mobile is not compressed desktop.

### Desktop 1024/1440/1920

The hero uses a restrained statement/visual split. Promise and CTA occupy the left; the monolith receives uninterrupted space on the right. A bottom category register spans the composition. Negative space is functional and may not be filled with proof labels or decoration.

### Page rhythm below the fold

- **Environment chapter:** one editorial section per category, with one short promise and progressively disclosed examples/causal trace. Never three dense technical ledgers at once.
- **Human control chapter:** one large statement plus one compact four-step line; no second card grid.
- **Delivery chapter:** Scan · Scope · Bouw · Beheer as a quiet chronological rail.
- **Indication chapter:** calculator remains the canonical commercial instrument and receives its own solid field.
- **Closing chapter:** scan decision and memo contract share one calm closing scene; no duplicate decorative grid.

Every major section gets one dominant content block, one job and generous separation. Alternating every section between heavy light/dark slabs is forbidden.

## Clean Glass constitution

- Maximum one glass layer: the sticky header only when it floats above meaningful imagery.
- Header glass uses `color-mix(in oklch, var(--surface) 62%, transparent)`, blur 18px, saturation 160%, one light edge and a broad soft shadow.
- Solid fallback is mandatory through `@supports`; reduced transparency uses the solid header.
- Body copy never sits on glass.
- The hero visual and all content sections use solid surfaces.

## Signature and motion

**Signature:** Quiet Monolith — one finite copper seam settles through the single architectural object after first paint. It expresses `one system under human control`, not AI activity or autonomous execution.

- Static HTML/image and all text are complete without JavaScript.
- The primary task remains complete without motion.
- Motion duration: at most 700ms on first entry; no idle loop.
- Hover/focus changes only local emphasis; interactive geometry never moves.
- Reduced Motion, slow-update and weak-device routes show the settled final state immediately.
- No video, WebGL, particles, parallax, pointer chasing or scroll-jacking in the first release.
- **Invariant anchors:** logo, H1, CTA and category ledger never shift during motion.
- **Compressed repeat-use form:** static seam; no replay during ordinary navigation.

## Asset strategy

The approved styleframe uses synthetic concept art as a direction artifact. Production may use the optimized monolith asset only as a non-customer, abstract brand object with recorded source/hash. It is not evidence of a built system, customer site or included hardware. If a real commissioned render or photographed physical maquette replaces it later, preserve the same silhouette, crop-safe negative space and copper seam.

- Source concept PNG SHA-256: `25642b7b4f03a6af0e1c45aaaddbfe477c2132673585788292f74ddc6d2cc306`.
- Production `public/aiow/quiet-monolith/hero.webp` SHA-256: `303221b524906b4ef1e284c6472998b5acb1448a5a233d51895dd12ce2603569`.

No raw stock. Documentary environment imagery below the fold must be real/commissioned or clearly synthetic and must never imply a customer case.

## State and commercial truth

- Calculator output is explicitly an indication.
- Booking remains a scan request pending human confirmation, never reserved availability.
- Errors explain correction; success follows durable acceptance only.
- Missing booking, quote, mail or storage configuration fails closed.
- Evidence remains labelled as reference architecture, internal demonstration, pilot or approved customer case.
- Hardware, physical installation and qualified partner work are separately scoped.
- No universal €2.950 offer represents all three environments.

## Three-category contract

1. **Werk** — processes, websites, internal apps and integrations.
2. **Bedrijfspanden** — energy, climate, access, safety and maintenance.
3. **Woningen & villa’s** — comfort, lighting, climate, energy and safety.

All three stay visible in the hero category register. Detailed pages and the environment chapter may explain `signaal → AI-interpretatie → begrensde action/systeem → menselijke bevoegdheid`; the hero must not. Priority context pages preserve one optional plain-language journey before examples: `Nu vaak → Met AIOW → menselijke beslissing`.

## Conversion and authority law

- Exactly one visually dominant commercial action appears in the first viewport: `Laat één proces of ruimte scannen`.
- The adjacent hero no longer carries the complete legal/scan contract; the scan route and closing chapter state it clearly before submission.
- The scan produces a bounded decision memo: what can be built, dependencies, limits, physical scope and where the customer decides.
- A person confirms date and time. Stopping remains possible.
- The customer journey remains indication → PDF indication → free human scan → decision memo → written proposal → implementation → management.

## Navigation and company identity

Primary navigation keeps Oplossingen, Mogelijkheden, Tarieven and Bedrijf plus the existing scan flow where appropriate. The homepage itself shows no competing header CTA while the hero CTA is visible. Company facts remain canonical: AIOW B.V. · Bijlmermeerstraat 30 · 2131 HC Hoofddorp · KvK 71887466 · info@aiow.io.

## Copy voice

Direct, calm, exact. Three adjectives: architectural, human, assured.

Example headline: `AI die voor u werkt.`
Example button: `Laat één proces of ruimte scannen`.

No invented clients, reviews, addresses, awards, rankings, outcomes, savings, autonomous authority, medical inference or included physical hardware.

## Responsive and accessibility law

- Compose and prove 320, 375, 390, 768, 1024, 1440 and 1920px.
- NL and EN; Light, Dark and System; Reduced Motion and no JavaScript.
- Controls at least 44×44px; inputs at least 16px mobile; visible focus; WCAG AA.
- No horizontal overflow or clipping; 200% text and 400% reflow retain the primary action.
- Hero image is decorative with empty alt; product truth exists in HTML.
- The three category links remain semantic and keyboard/screenreader accessible.
- Exactly one H1 and one visible first-viewport commercial scan action.
- Target budgets: LCP <2.0s, CLS <0.05, INP <200ms, marketing JS <100KB gzip where measurable.

## Anti-generic gate

- **Swap test:** a generic automation agency cannot own the monolith’s work/building/home system meaning and human-control seam.
- **Logo-away test:** blackened steel + limestone + one copper seam + the three-domain ledger remains recognisably AIOW.
- **Forbidden:** card grids in the hero, technical blueprint, chatbot, robots, neon glow, fake metrics, centered generic SaaS hero, two peer CTAs, multiple signature effects, body glass, raw stock.
- Chanel rule: if a line, label, badge or effect can be removed without losing meaning, remove it.

## Release proof

Before any cutover:

1. claim/source tests, lint, typecheck and production build;
2. exact first-viewport screenshots for every required width, locale and theme;
3. no-JS, Reduced Motion, focus/keyboard, controls and 200%/400% proof;
4. parent/child viewport containment and exact one-CTA browser assertions;
5. visual review of 390 mobile and 1440 desktop against the approved styleframes;
6. independent product-art and engineering/accessibility review on one immutable SHA;
7. protected preview, exact deployment identity, public alias readback and recorded rollback.

`TECHNICAL_PASS`, `PRODUCT_ART_PASS`, `ACCESSIBILITY_PASS`, `PREVIEW_READY` and `LIVE_PROVEN` remain separate verdicts.
