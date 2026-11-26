# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing repository `~/Desktop/Personal/google-style-portfolio` (Next.js 16, Tailwind 4, pnpm, deployed on Vercel at brunosimone.dev). The new portfolio is rebuilt inside that same repo and domain, adding GSAP for motion (free for commercial use since April 2025). The rebuild happens on the `portfolio-video` branch of this repo.

## Users

Whoever needs video or a website: content creators (YouTube long-form and short-form: Reels, TikTok, Shorts), small brands, agencies and businesses. The same kinds of clients can need either service. They do not arrive organically: Bruno sends the link inside a proposal or a direct message, so most open it on a phone, between other tasks, and decide within seconds whether the work is worth a reply.

## Product Purpose

The portfolio of Bruno Simone: freelance video editor first, web developer second. Its only job is to make the visitor want to ask: show the quality of the work immediately, explain the judgement behind each piece, build trust in the person behind it, and end in a simple way to write. Success is a message through the contact form. Prices are never published; money is discussed in the conversation that follows.

## Positioning

- **The edit is the point, not the client.** Work is shown abstracted from who it was for: no client names, handles or logos anywhere on the site (Bruno, 23/11). What matters is that it is Bruno's edit.
- **An editing identity per piece or series.** For each project Bruno defines a style of its own (color, typography, graphics, subtitles, sound) and keeps it consistent across every part. The site demonstrates this, not just claims it.
- **Judgement, explained.** Every piece, video or web, has its own page with context, the decisions taken and the criteria behind them.
- **Corporate experience behind the web work.** Full-stack developer at WeCheck AI (Oct 2023 – Jul 2026), frontend at Gol Ball (Jan – Sep 2023), per Bruno's CV. Stated with companies and dates, mentioned in passing; never as a count of years.
- **Fast asynchronous delivery.** Work runs through messages and review platforms, with no calls and no live changes; deliveries are quick once the style is set.

## Operating Context

The link travels in cold proposals and DMs (YTJobs, direct outreach), so the first seconds on a phone decide the outcome. Clients review cuts asynchronously; Bruno works with two revision rounds, a brief form before editing, and fixed turnarounds.

## Capabilities and Constraints

- Site language: English.
- Contact: a form that sends an email directly from the site (no calendar booking, no public pricing) to bruno@brunosimone.dev through Resend (RESEND_API_KEY and a verified sender set in Vercel by Bruno). The same close with the form ends every page; once sent, the form gives way to a confirmation.
- Most of the video work is vertical 9:16; desktop layouts must present vertical pieces well.
- Routes (Bruno, 24/11): two landings, `/` for video and `/web` for webs; no `/video` and no per-piece pages. `/` is hero (quiet scroll cue), the reel «A few seconds of each.» (a few seconds of every piece, interleaved, running by itself; «Watch with sound», «Watch the full pieces ↓» to the work), then the three projects in full (#work): **Roller Pro** (short 9:16 beside long 16:9 at one height, then the before/after with a Short/Long switch, credit line under it), **Félicette** (the piece beside five of its frames; tapping a frame plays from there; credits under it), **Pick a pile** (all seven parts play: the player beside the seven covers, a cover loads its part). Every piece plays in place with sound on tap, then native controls; one sound at a time, the reel included. Then the close. The quiet line to /web under it («I also build custom websites…») is hidden until /web is reworked (Bruno, 25/11). `/web` the sites plus the experience line; `/web/[slug]` one page per site; no `/about` (Bruno, 26/11: not needed; the page, its photo, statement and process stages were removed, the statement and stages stay parked in `src/content/work.ts`). Bar: logo to home, Work · Contact.
- Home is video only (Bruno, 24/11, after an LLM council: a creator opening a cold DM link should meet one trade; Bruno sends /web directly to web prospects). Hero (Bruno, 23–24/11): no big logotype. «I'm Bruno Simone, video editor.», then «Thanks for stopping by. Here's more about my work.» linking down to the work (the «and about me» link went with /about, 26/11). The home's term is **video editor**; the web work is mentioned in passing. Revised the same day: the first screen is the text on the background only, no projects (the work starts on scroll); the current look reads empty and flat, and the layout and the strip under it had to change, the type stays (Bruno, 24/11). Now: the text centred on the first screen, no reel, over the dithered ground.
- Film strips (the carousels and perforated bands) only where the piece is the content (Bruno, 23/11): the home's reel and its projects. Never in the hero or the web pages.
- Loading screen (Bruno, 23/11): an animated logo on every full page load or reload, not skippable; it stays until its animation has played through once (never cut short) and the page has loaded, whichever is later. Not on client-side navigation between routes (those get a short transition). The animation (Bruno, 25/11, after «Factory — Logo loader» on thepromptsfactory.com): over the site's own dither ground, a fine bone line traces the outline of every letter of the name, the left ones a touch earlier, then the name fills solid. The way out to the page (Bruno, 25/11, like the change between two title cards): the ground never changes, the name fades out on its own, then the hero's lines rise from a mask one after another, the bar drops in and the scroll cue comes last; only on that first entrance, never on client navigation (a zoom through the letters and a tilted wipe were tried and dropped). Tried and rejected the same day: the letters stippled out of the dither (after «SIGNAL — Stipple typography», read cheap and dirty), a crest of the ground revealing the clean name, and handwritten signatures. The ground runs on one clock with the site's, so the lift shows no seam. Under reduced motion the name shows still, with the same timing; without WebGL2 the ground is flat ink.
- Open: the showreel does not exist yet; the talking-head sample will come from another person's footage with permission.

## Brand Commitments

- Name: **Bruno Simone** (personal brand, matches the domain).
- Dark, **monochrome** site: bone white and greys only, no accent color; the ground is not flat black: a slow two-tone dither of waves (mid body, bone crests, Bayer 8×8, 3 px cells) at 35 % strength behind everything, its middle kept clear (Bruno, 24/11, chosen over film dust, pixels, tunnel, flickering grid and ascii); all color comes from the videos and the sites shown (Bruno rejected Steel #7088AE on 12/11). He prefers matte colors to saturated ones. Every route carries the same palette, type and components.
- Logotype: Big Shoulders, «BRUNO SIMONE» whole, two cuts of the same name (large and bar). No cut since 25/11: the diagonal cut (concept B) and its blade entrance read as a cliché and no longer matched the dithered ground; the identity lives in the entrance, the name drawn as a line and then filled. The background picker is gone too (the ground is chosen). Favicon and app icons (Bruno, 25/11): the B of the logotype in bone over the site's own dither ground at 60 % (so the waves read at tab size), rendered from the site's shader by `scripts/brand/render-icons.mjs` into `src/app` (favicon.ico, icon1–3.png, apple-icon.png); a plain B, a BS monogram, an outlined B and an inverted B were shown and read as generic. Vector outlines.
- References Bruno chose: Arcade Edit (full-bleed video under a huge logotype), Trim (animated logo entrance, strong typographic identity), Wiedemann (giant headline, own photo, one brand color), Katia Vannoy (editorial calm, generous space). Rejected: creator-agency sales pages with reviews, counters and "book a call" buttons.
- Desired feeling: visual impact, authority, trust, hard work, polish, success. The site reads like an edited video: hook, development, close.

## Evidence on Hand

- **"Roller Pro" (spec edit, 24/11):** a 1:09:10 product livestream cut into a 56 s vertical short and a 4:29 horizontal video, plus two edited before/afters. Not commissioned: credit «Spec edit, not affiliated with Peak Design. Footage and photos © Peak Design» is required wherever it shows. Finals in `~/Documents/Kit Claude DaVinci/entrega/Roller Pro/`.
- **"Félicette" (narrative animation, 24/11):** 1:40 vertical, archive and animated graphics, AI voice. Archive credits (CC BY 2.0 manila folder among them) are required. Finals in `entrega/Felicette/`.
- **"Pick a pile" (tarot reading series):** 7 delivered vertical parts with custom grade (LUT), dynamic subtitles, arch title card, citation cards, Hebrew letter plates, pile outlines, end cards and mix. Shown as one piece, the full series. Finals in `~/Documents/Kit Claude DaVinci/entrega/Shashi pick a pile/`. Internal note only, never on the site: made for @aeon_arcana (Shashi, Bruno's partner); no testimonial.
- **Out of the portfolio (Bruno, 24/11):** "Michi sorteo" and "Ser editor" (first workflow tests).
- **Media weight (Bruno, 25/11):** every piece plays from the site, so the whole set stays under Vercel Hobby's 100 MB upload: 720p at crf 31–32 (Pick a pile parts capped at 600 kbps), before/afters 1080p at crf 30. About 79 MB of video, 85 MB in `public`. Félicette's AI voice is not mentioned on the site; the @aeon_arcana mark burnt into Pick a pile stays.
- **Webs:** JubiGestor (jubigestor.xyz, AI assistant for Argentine pension procedures, live demo) and Canela (canela-store.com, store). A tarot site joins when it exists.
- **Talking-head sample:** pending, from another person's footage with permission.
- **Absent, never to be fabricated:** client names or logos, testimonials, view counts, star ratings, a count of years of experience, prices.

## Product Principles

1. The work leads; the interface recedes. Every section must make the next piece of work more convincing.
2. Demonstrate the mechanism: show the style identity built for a piece (before/after, consistent graphics across parts) instead of describing it, then explain the decisions on the piece's page.
3. Mobile first: the decisive visit happens on a phone, opened from a message.
4. No sales theater: no counters, fake urgency, star badges or prices. Interest leads to a conversation.
5. Fast and light: video-heavy, but the first frame must appear immediately.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` (the loading logo and scroll motion must have a still alternative), keep text contrast at or above 4.5:1, and give every video a poster frame and muted autoplay with an explicit sound control.
