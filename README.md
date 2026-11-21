# Chandni's Academy: website

A premium single-page website for Chandni's Academy, HSR Layout, Bengaluru.
It is built with React, TypeScript, Tailwind CSS v4, GSAP with ScrollTrigger, Framer Motion and Lucide icons.

## Run and build

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the production build
```

`/dist` is fully static and uses relative paths, so it can be hosted on Netlify, Vercel, Cloudflare Pages, S3 or any shared host.

## Before launch: things to supply

| What | Where | Notes |
|---|---|---|
| **Photography** | `src/data/images.ts` | Each image slot has a key, alt text and an art-direction brief. Put optimised WebP/AVIF files in `public/images/` and set `src` (and `srcSet` if you have it). Until then, a branded placeholder plate is shown. |
| **Founder portrait** | `images.ts` → `founder` | Use a real, approved photograph only. |
| **Testimonials** | `src/components/Community.tsx` → `TESTIMONIALS` | Use genuine Google reviews, with permission. Placeholders show, clearly marked, while the list is empty. |
| **Exam preparation** | `src/data/content.ts` → `EXAMS_CONFIRMED` | Set this to `true` once IELTS/TOEFL/Duolingo prep is confirmed. The site currently says "subject to availability". |
| **FAQ answers** | `content.ts` → `FAQ` | Online classes and trial sessions currently direct visitors to contact the academy. Update them once confirmed. |
| **Full street address** | `content.ts` → `CONTACT`, `index.html` JSON-LD | Only "HSR Layout, Bengaluru" is used for now. |
| **Share image** | `public/og-image.jpg` (1200×630) | Then uncomment the `og:image` tag in `index.html`. |
| **Logo** | `src/components/Nav.tsx` → `Wordmark` | A text wordmark is used until an official logo is supplied. |

## Enquiry forms

No backend is configured, so the forms **never claim a message was sent**. After validation they show a "ready to send" step, which hands the filled-in enquiry to WhatsApp (`wa.me/918754829969`) or email, or lets the visitor copy it.

To deliver form submissions directly, set an endpoint that accepts JSON POST (Formspree, Basin, a serverless function and so on):

```bash
# .env.production
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

With an endpoint set, a real "Thank you" state shows only when the server returns a 2xx response.

## Structure

```
src/
  data/content.ts      all copy, programmes, FAQ, contact details
  data/images.ts       image manifest and art direction
  lib/motion.ts        GSAP setup, reduced-motion guard, scroll-reveal vocabulary
  lib/forms.ts         validation and submit/hand-off logic
  lib/events.ts        cross-section actions (open programme tab, prefill enquiry)
  components/
    Hero.tsx           cinematic intro timeline (skipped on any input or under reduced motion)
    Pillars.tsx        Communicate / Confidence / Lead storytelling sections
    PillarExplorer.tsx interactive three-pillar panels (desktop) and accordion (mobile)
    Story.tsx          About, Founder, Programmes, Learning journey, Why us
    Community.tsx      Corporate (+ form), Beyond Words, Testimonials, Gallery, FAQ
    Contact.tsx        Contact (+ form, WhatsApp, Maps) and Footer
```

## Motion and accessibility

- The intro plays once per browser session (about 6 seconds). Scrolling, a tap or a key press fast-forwards it. It never locks scrolling or blocks input.
- `prefers-reduced-motion` turns off all GSAP and Framer Motion animation. Content is visible by default.
- Keyboard: skip link, visible focus rings, arrow keys in the pillar tabs, Escape closes the mobile menu, labelled form errors that receive focus.
- Fonts (Cormorant Garamond, Manrope, Inter) are self-hosted through Fontsource, so there are no third-party font requests.
