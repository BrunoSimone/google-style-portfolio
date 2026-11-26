import type { CSSProperties } from "react";

/**
 * Hero (Bruno, 23–24/11): who this is and what he offers. The name, the trade (the home is the video
 * landing; the web work sits behind a quiet line under the close) and, since 26/11, what he edits
 * and for whom (someone arriving from a job post has to see the service), centred on the first screen over the dithered ground; no project here,
 * the work starts on scroll, and a quiet cue at the foot says so (it fades once you scroll).
 * The small mark stays in the bar. On a full load, once the logo has gone, its lines rise into
 * place from a mask, one after another (.hero-line, html[data-entering]; Bruno, 25/11).
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero" data-tick>
      <div className="hero-intro">
        <h1 id="hero-title" className="hero-title condensed">
          <span className="hero-line" style={{ "--i": 0 } as CSSProperties}>
            <span>I&apos;m Bruno Simone,</span>
          </span>{" "}
          <span className="hero-line" style={{ "--i": 1 } as CSSProperties}>
            <span>video editor.</span>
          </span>
        </h1>
        <div className="hero-line hero-sub-line" style={{ "--i": 2 } as CSSProperties}>
          <p className="hero-sub">
            Short-form and YouTube edits for brands and creators: captions, motion graphics, color and sound.
          </p>
        </div>
      </div>
      <div className="hero-cue edge-type" aria-hidden="true">
        Scroll
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 1v11M1 8l4 4 4-4" strokeLinecap="square" />
        </svg>
      </div>
    </section>
  );
}
