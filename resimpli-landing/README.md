# resimpli.vocalxlabs.com — Landing Page

Landing page selling ReSimpli users a one-time setup to rebuild ReSimpli's AI SMS + voice agents inside their own ReSimpli account. No recurring fee, lifetime support.

Built from `resimpli-landing-strategy.md`, red-teamed across multiple rounds, and verified rendering on desktop (1280px) + mobile (375px).

---

## Files

```
resimpli-landing/
├── index.html          The landing page (edit this)
├── dist/styles.css     Compiled Tailwind (deploy this)
├── fonts/              Self-hosted woff2 + fonts.css (deploy this)
├── src/input.css       Tailwind source (only to rebuild)
├── tailwind.config.js  Theme config
└── README.md           This file
```

Deploy the whole folder. No runtime CDN, no Google Fonts call. Only external runtime calls are the Calendly embed and the testimonial videos (on your CDN).

---

## Current state

- **Two plans:** AI SMS ($1,099 one-time) and AI SMS + Voice ($1,899 one-time, includes Call Intelligence + Lead Scorer).
- **Lifetime private Slack support + free patches** on both plans. No 90-day window, no retainer.
- **Calendly is wired in** (`https://calendly.com/vocalxlabs_fawaaz/discovery-call`) as an inline embed in the `#book` section, with a fallback link if the script doesn't load.
- **Two real testimonial videos** (Ron Jones, Michael) play inline. They are vertical (9:16) phone clips, shown in portrait cards beside the text on desktop and stacked on mobile.
- **Capabilities section** spells out: live-transfer hot leads, book appointments, drip nurture, custom qualifying questions, disqualify junk leads, everything logged in ReSimpli.
- **Favicon** is an inline SVG (navy "v"), no file needed.
- **Mobile:** no horizontal scrolling anywhere. The old comparison tables are now responsive grids that stack on phones.

---

## What to fill in before launch

1. **Demetrius video** — when his walkthrough is ready, copy a Ron/Michael testimonial block (a `figure` with the `.video-facade` div: `data-src`, `role="button"`, `tabindex`, `onclick`, `onkeydown`, plus the inner `<video preload="metadata" src="...#t=1.5">`) into the `#testimonials` list, and add his numbers. Remove the "Next up" filler section once he's in.
2. **Public name / about** — the footer intentionally shows no personal name (you asked to remove it). The Calendly handle is `vocalxlabs_fawaaz`; a client also named "Daniel" on camera. Decide what name (if any) you want public, then optionally add a founder line back to the footer.
3. **OG image** — add `<meta property="og:image" content="...">` (1200x630) for link previews.

Optional conversion lift: the testimonial cards currently show the video's own first frame as the thumbnail (via `preload="metadata"` + `#t=1.5`). If you want a guaranteed-sharp poster or a looping GIF preview, drop an image into an `img/` folder and set it as a `background-image` on the `.video-facade`, or swap the `#t=` time to land on a better frame.

---

## Rebuilding the CSS (only if you change Tailwind classes)

```bash
cd resimpli-landing
npx tailwindcss@3.4.17 -c tailwind.config.js -i src/input.css -o dist/styles.css --minify
```

Custom CSS (`.display`, `.sticky-cta`, `.pulse-dot`, etc.) lives in the `<style>` block in `index.html` and is not affected by the rebuild.

---

## Deploy

Drag the folder into Vercel / Cloudflare Pages / Netlify. Point `resimpli.vocalxlabs.com` at the host with a CNAME (Name: `resimpli`, Value: the host's target).

---

## Verified

- Desktop (1280) + mobile (375): no horizontal overflow; tables reflow to stacked grids; nav collapses; portrait videos fill cleanly with `object-cover`.
- Calculator: live monthly/annual savings, first-year ROI multiple, payback months. 2 plan buttons.
- Calendly inline embed loads (iframe injected).
- Click/Enter/Space plays a testimonial with sound; handlers strip after play so clicking the video to pause won't restart it.
- All assets serve 200; no console errors.

---

## Notes on a couple of design choices

- **One dark band** (the navy "Built around you" capabilities section) plus the dark final-CTA and the dark "41x markup" callout. The rest of the page is white/light as you asked. The dark accents add rhythm and make those points pop. Say the word if you want the capabilities band on white instead.
- **Testimonial framing:** Ron and Michael don't name ReSimpli on camera, so the section says "same engine, installed in your ReSimpli" rather than calling them ReSimpli users. Honest and it holds up to a skeptical viewer.

Strategy doc: `C:\Users\nandha\Documents\resimpli-landing-strategy.md`.
