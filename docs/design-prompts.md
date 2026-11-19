# Adapted design prompts (Uptisement)

Raw material from [taste-skill](https://github.com/Leonxlnx/taste-skill) and the
[Superdesign library](https://superdesign.dev/library), rewritten for the **7:04 PM**
scroll story, ink / mint / orange palette, Syne + Manrope, Motion (UI) + GSAP (scroll
scene only). Uptisement product rules always win: honest demo labels, no invented
stats/logos/reviews/photos-as-clients, no phone number, `BOOK_URL` only from config,
reduced-motion, mobile perf.

One section per effect. Other builders: copy the *adapted* behaviour, not the
upstream prompt verbatim.

---

## Scroll journey line

- **Original:** https://superdesign.dev/library/scroll-journey-line
- **What we changed:** Mint→orange gradient lead thread synced to the same `progressRef` as the three.js town. Soft glow + tip head. On mobile the DOM/SVG line carries the story when the canvas is ambient/poster. No Framer — rAF + CSS.
- **Where:** `app/components/JourneyLine.tsx` on the homepage story.

## Travelling product (phone mock)

- **Original:** https://superdesign.dev/library/animated-landing-page-one-product-that-travels-the-whole-page
- **What we changed:** Sticky phone shell whose screen content changes with chapter progress (missed → text-back → quote → booked → review). Simulated job thread, not a product photo. Midnight mint-navy palette. Hidden under reduced-motion.
- **Where:** `app/components/StoryPhone.tsx` beside story chapters.

## Stacking cards

- **Original:** https://superdesign.dev/library/the-stacking-cards-effect
- **What we changed:** Sticky deck with pin + slight scale-down. Conversion copy and prices from `prices.ts`. GSAP ScrollTrigger only; hover stays quiet CSS/Motion.
- **Where:** `app/components/StackingCards.tsx` — `/services` and `/automations`.

## Cinematic slide-up headline

- **Original:** https://superdesign.dev/library/cinematic-slideup-headline
- **What we changed:** Motion word stagger + overflow mask; ease `[0.22, 1, 0.36, 1]`. Plain text first (SSR / scripts-off), then enhance. H1 stays "Stop losing jobs to missed calls."
- **Where:** `app/components/ChapterHeading.tsx`.

## Shrinking sticky header

- **Original:** https://superdesign.dev/library/shrinking-sticky-header
- **What we changed:** Padding + logo shrink after 100px; glass blur on paper tokens. Mobile Book only in the bottom bar (not duplicated in the header).
- **Where:** `app/components/Header.tsx`.

## Book call CTA

- **Original:** https://superdesign.dev/library/bookcallcta
- **What we changed:** Mint fill + ink text; pointer glow; arrow shift. Still `BOOK_URL` only.
- **Where:** `app/components/BookCallCta.tsx` — `#book` on the homepage.

## Pricing section

- **Original:** https://superdesign.dev/library/pricing-section
- **What we changed:** Split summary | features; orange checks; mint Book buttons; Uptisement packages/prices only. Content visible at rest.
- **Where:** `app/components/Pricing.tsx` — `/pricing` and homepage close.

## Animated list + counter

- **Originals:** https://superdesign.dev/library/animated-list · https://superdesign.dev/library/counter
- **What we changed:** Notify stack for demo events; optional rolling digits on `CountUp` for demo quote ranges only.
- **Where:** `AnimatedNotifyList.tsx`, `CountUp.tsx`; demos / StoryPhone.

## Fintech midnight mint navy (phone UI)

- **Original:** https://superdesign.dev/library/fintech-mobile-app-midnight-mint-navy-wallet-home
- **What we changed:** Ink-navy ground + mint accents for simulated phone chrome. No fake bank figures. Honest "Simulated" labels.
- **Where:** `.story-phone` CSS + `StoryPhone.tsx`.

## Taste-skill polish

- **Original:** https://github.com/Leonxlnx/taste-skill (MIT)
- **What we kept:** Equal edges (~80px at 1440), hero `data-enter`, quiet 2px card lift, dealt type moment on proof, copy-lint anti-slop.
- **Uptisement wins:** Multi-screen 7:04 PM story, honest work labels, three.js scene, GSAP scroll + Motion UI.
- **Gate:** `GATE: DONE` with Adil's conflict rule; skill cloned outside the repo only (not committed).
