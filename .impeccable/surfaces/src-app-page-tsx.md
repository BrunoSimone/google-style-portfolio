---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Site · video editor and web developer portfolio (brunosimone.dev)

**Mode:** Experience. English, mobile first (390 px decides), desktop at 1440 px. Since 23/11 a site of routes, not one landing: `/` video landing, `/web`, `/web/[slug]`, `/about`; the close with the form ends every page (root layout).

**Audience and job:** English-speaking creators who open the link from a DM, decide in seconds. Only job: they write through the form. No prices, no turnaround numbers, no testimonials, no counters.

**Proof on hand (no client names on the site, Bruno 23/11):** «Pick a pile» shown as one piece, the 7-part series; raw vs delivered of Pile 1, Pile 2, Michi sorteo and Ser editor for the before/after. Michi sorteo: only seconds with no product sticker in frame (the sticker is a third-party product photo). Placeholders, marked, never invented: reel, talking-head piece, Bruno's photo, hook line.

**Media:** muted short loops (H.264 + WebM, ~1 MB) served by the site; full pieces with sound on unlisted YouTube. Form email through Resend from a Next.js route.

**Approved copy:** signature «I set your style once: grade, type, subtitles, sound. Every video after that comes back faster, and looks like you.» · close «Tell me what you're making.» · labels with catalog number (BS 0001 ▸ CLIENT ▸ PIECE ▸ PART ▸ FORMAT ▸ DURATION).

## Direction contract

THESIS: The site is a film contact sheet. Work sits in perforated strips whose edge numbers really label and order it (catalog, client, piece, part, format, duration), and a white grease pencil marks what matters; in the hook, the lit frame (not a circle) marks the one that plays. Refuses the reel-plus-equal-thumbnail-grid portfolio and the agency page with counters and «book a call».

OWN-WORLD: Monochrome. Ink #0b0b0c ground, film #141416 strips, rule #2a2b2e, bone #ecebe7 text and grease pencil, dim #9a9da3, mid #8d8f93. No accent; all colour comes from the footage. Mona Sans (condensed width for headings), Martian Mono only for real data on the edges, Big Shoulders only for the torn logotype. Square frames, rectangular sprocket holes; frames outside the gate are switched off with an ink veil.

STORY: The logotype lands whole, a blade cuts it and the top piece slips along the cut; it stays as the title over the reel; the visitor sees footage first, then one Shashi strip accumulating Raw → Graphics, then a client strip of four parts side by side proving one identity, then Bruno and sealed process stages, then «Tell me what you're making.» and a four-field form.

FIRST VIEWPORT (13/11: the back reel under the main one is gone; the main reel takes its height, lit frame up to 80 % of a phone's width): Flatbed (Bruno chose it 12/11 from three layout variants: overprint, bench, flatbed; the three equal vertical columns were rejected as too simple). Thin bar (26 px torn mark, Work · Process · Contact); the torn logotype on top (full width on phones, ~46vw left-aligned on desktop, with the hook line slot and «Watch with sound» beside it); below it one perforated strip laid flat across the full width, running sideways through a centred gate: only the gate frame is lit and carries sound, the neighbours either side are switched off (ink veil, drained colour); edge numbers print along the top lane (frame number, catalog, client) and bottom lane (part, format, running time, source TC); a smaller, dimmer reel runs further back underneath (perforations only, no printed numbers). On phones the controls sit at the foot. The logo entrance plays on every page load (Bruno, 12/11), still with a 200 ms fade under reduced motion. No grease-pencil ring on the hook (rejected 12/11).

FORM: Contact sheet with film-tape aesthetic, candidate 5 of the list. seed:c5457d2d77f7cfe8. Motion grammar from the departures board: changes advance one whole band with a small overshoot and settle; one bone playhead tied to scroll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

LOGO ENTRANCE (chosen 12/11): the big hero logotype uses concept B «the cut» (diagonal cut 78 % → 22 % of cap height, top piece slid down-left along it; blade hairline in bone; ≈0.95 s GSAP timeline, the name lands whole, the slit opens behind the blade's tip, the top piece overshoots to 125 % and settles). The bar mark and the favicon keep concept A's tear. Switch back with HERO_CUT in src/components/reel/Reel.tsx.

BEFORE/AFTER (rebuilt 13/11 on Bruno's call: no pass-by-pass breakdown, no cut stage because cuts change the duration): four pieces (Pile 1 · 2/4, Pile 2 · 2/4… see content/work.ts `comparisons`, Michi sorteo, Ser editor), each the same seconds as shot and as delivered, side by side, locked together (the delivered side leads, the raw follows). Every window is one uncut stretch of its take; offsets measured by audio/motion correlation. One flat strip of pairs, leader film either side; top lanes «NN As shot ▸ source» / «Delivered», the edit printed once under the pair. The lit pair plays; in view each pair plays twice and the sheet moves to the next, round and round, until the visitor picks one. A 16:9 take stays 16:9 inside its frame. No picker (Bruno, 13/11): the strip is dragged (settles on the nearest pair, a flick moves one, rubber at the ends), a neighbour is tapped, or the triangles step it — on the strip's edges at ≥768 px, flanking the «02 / 04» counter on phones. Media: scripts/media/encode-before-after.sh. Heading «Same seconds, as shot and as delivered.» is a draft pending Bruno's approval.

GALLERY (built 13/11, #work): the delivered work as a contact sheet, one group per client, one perforated strip per series, parts side by side; strips are only as long as their frames. Aeon Arcana: Pile 1 (4) and Pile 2 (3); posters are each part's arch title card moment, and a hand-drawn grease-pencil ring (bone, seeded wobble, drawn in on view, 140 ms apart) circles the title on every part — the proof that one identity runs through the series. «Carried through ▸ One title card ▸ One grade ▸ One subtitle style» under the strips. Own pieces: Michi sorteo, Ser editor. ≥1200 px: strips left, client name and facts in a column beside them; phones: each strip scrolls sideways with snap. Tap to play: only the tapped frame loops (fetched on tap, muted), its strip-mates switch off, tap again stops, leaving the section stops it; nothing autoplays. No format filters while every piece is 9:16 (a filter with one option is noise); add them with the first 16:9 piece. No YouTube links yet (none exist). Media: scripts/media/encode-gallery.sh (6 s loops, 3.2 MB AV1 in all, posters 330 KB). Heading «One look, carried through every part.» is a draft pending Bruno's approval.

## Open

Hook line (Bruno rejected all drafts so far), reel, talking-head piece, photo, turnaround copy stays numberless.

ROUTES (24/11, Bruno): two landings, `/` video and `/web` webs; /video and per-piece pages are gone. Work is shown abstracted from who it was for — no client names, handles or logos (Roller Pro carries its required spec credit). Home: hero as centred text over the dithered ground (Dither 35 %) with a quiet «Scroll» cue; «A few seconds of each.» (the flatbed reel: Pick a pile, Roller Pro short, Félicette interleaved; «Watch with sound», «Watch the full pieces ↓» to #work); #work (src/components/Work.tsx): three projects, each a head (edge facts, huge condensed title, one line) over perforated bands — Roller Pro short + long at one height (--h from the container width), before/after with a Short/Long switch beside; Félicette beside five of its frames (tap = play from there); Pick a pile Part 1 beside the seven covers; credits in small print. Players: poster, «Play with sound», then native controls; one sound at a time via bs-audio, the reel included. Then the close; under it, home only, «I also build custom websites, like this one. See more →» to /web. Bar: logo → home, Work · About · Contact. Route changes: a 360 ms rise (template.tsx), no loader.

LOADER (23/11): server-rendered overlay lifted by an inline script (html[data-loaded]) on window load, never before 0.5 s, safety cut at 8 s in the script and in CSS, <noscript> hides it; not skippable; only on full loads. Stand-in animation: the blade along the cut on a loop, until Bruno picks one on thepromptsfactory.com/#animations.

DRAFTS awaiting Bruno: every piece's context and decisions (from the delivery reports, project notes and READMEs; flagged in development), and the headings «Video, picked by me.», «Sites I build.», «In product teams, every day.», «And the sites I build.», «Same seconds, as shot and as delivered.», plus the form field «Channel or site (optional)».
