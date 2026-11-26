"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { felicette, pickAPile, rollerPro, type Media, type Project } from "@/content/work";
import { AUDIO_EVENT, claimAudio } from "./audio";
import { EdgeLabel } from "./EdgeLabel";
import { DraftFlag } from "./Pieces";

/**
 * The work, on the home (Bruno, 24/11): the home is the video landing, so the three projects live
 * here in full, no per-piece pages. Each project is a head (edge facts, title, one line) over a
 * band of perforated film: its playable cut(s) and, beside them, a contact sheet of the piece
 * (Félicette's frames, Pick a pile's seven covers). Pieces play in place with sound when tapped,
 * one sound on the page at a time (the reel included, through «bs-audio»).
 */
export function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title" data-tick>
      <h2 id="work-title" className="sr-only">
        Work
      </h2>
      <RollerPro />
      <Felicette />
      <PickAPile />
    </section>
  );
}

function ProjectHead({ project }: { project: Project }) {
  return (
    <header className="project-head">
      <div>
        <p className="project-edge text-dim">
          <EdgeLabel parts={project.edge} wrap />
        </p>
        <h3 id={`${project.slug}-title`} className="project-title condensed">
          {project.title}
        </h3>
      </div>
      <div>
        <p className="project-line">{project.line}</p>
        <DraftFlag draft={project.draft} />
      </div>
    </header>
  );
}

function Shell({ project, children }: { project: Project; children: ReactNode }) {
  return (
    <article className="project" aria-labelledby={`${project.slug}-title`}>
      <ProjectHead project={project} />
      {children}
      {project.credit && <p className="project-credit">{project.credit}</p>}
    </article>
  );
}

/** a full piece on its stretch of film: poster first, tap to play with sound, then native controls */
function Player({
  id,
  media,
  title,
  wide,
  top,
  bottom,
  videoRef,
}: {
  id: string;
  media: Media;
  title: string;
  wide?: boolean;
  top: string[];
  bottom: string[];
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const own = useRef<HTMLVideoElement>(null);
  const ref = videoRef ?? own;
  const [started, setStarted] = useState(false);

  // another sound started (another piece, or the reel with sound): stop this one
  useEffect(() => {
    const onAudio = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) ref.current?.pause();
    };
    addEventListener(AUDIO_EVENT, onAudio);
    return () => removeEventListener(AUDIO_EVENT, onAudio);
  }, [id, ref]);

  // once playing, the native controls take over: hand them the focus the play button had
  useEffect(() => {
    if (started) ref.current?.focus({ preventScroll: true });
  }, [started, ref]);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    setStarted(true);
    v.play().catch(() => {});
  };

  return (
    <div className="band-col">
      <div className="gal-lane items-end pb-[5px]">
        <EdgeLabel parts={top} />
      </div>
      <div className="band-frame film-frame" data-wide={wide ? "" : undefined}>
        <video
          ref={ref}
          poster={media.poster}
          preload="none"
          playsInline
          controls={started}
          disableRemotePlayback
          onPlay={() => {
            setStarted(true);
            claimAudio(id);
          }}
          aria-label={`${title}, edited by Bruno Simone`}
        >
          <source src={media.h264} type="video/mp4" />
        </video>
        {!started && (
          <button type="button" className="band-hit" onClick={start} aria-label={`Play ${title} with sound`}>
            <span className="band-badge edge-type">
              <svg width="8" height="9" viewBox="0 0 8 9" aria-hidden="true">
                <path d="M0 0L8 4.5L0 9Z" fill="currentColor" />
              </svg>
              Play with sound
            </span>
          </button>
        )}
      </div>
      <div className="gal-lane items-start pt-[5px]">
        <EdgeLabel parts={bottom} />
      </div>
    </div>
  );
}

function RollerPro() {
  const { short, long } = rollerPro.cuts;
  const [ba, setBa] = useState(0);
  const pair = rollerPro.beforeAfter[ba];
  return (
    <Shell project={rollerPro}>
      <div className="roller-cuts">
        <div className="band">
          <Player
            id="roller-short"
            media={short}
            title="Roller Pro, the short"
            top={[short.piece.catalog, "Short"]}
            bottom={[short.piece.format, short.piece.duration]}
          />
        </div>
        <div className="band">
          <Player
            id="roller-long"
            media={long}
            title="Roller Pro, the long version"
            wide
            top={[long.piece.catalog, "Long"]}
            bottom={[long.piece.format, long.piece.duration]}
          />
        </div>
      </div>

      <div className="roller-ba">
        <div className="roller-ba-side">
          <h4 className="ba-title condensed">Before and after</h4>
          <p className="ba-text">The raw livestream beside the cut, chapter by chapter.</p>
          <div className="ba-switch" role="group" aria-label="Which cut">
            {rollerPro.beforeAfter.map((b, i) => (
              <button key={b.label} type="button" aria-pressed={i === ba} onClick={() => setBa(i)}>
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <div className="band">
          <Player
            key={pair.label}
            id={`roller-ba-${ba}`}
            media={pair}
            title={`Roller Pro, before and after, the ${pair.label.toLowerCase()}`}
            wide
            top={["Before", "After", pair.label]}
            bottom={["16:9", pair.duration]}
          />
        </div>
      </div>
    </Shell>
  );
}

function Felicette() {
  const ref = useRef<HTMLVideoElement>(null);
  const { cut } = felicette;
  const jump = (at: number) => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    const go = () => {
      v.currentTime = at;
      v.play().catch(() => {});
    };
    // with preload none the duration is unknown until metadata arrives
    if (v.readyState >= 1) go();
    else {
      v.addEventListener("loadedmetadata", go, { once: true });
      v.load();
    }
  };
  return (
    <Shell project={felicette}>
      <div className="project-media">
        <div className="band band-lead">
          <Player
            id="felicette"
            videoRef={ref}
            media={cut}
            title="Félicette, the first cat in space"
            top={[cut.piece.catalog, "Félicette"]}
            bottom={[cut.piece.format, cut.piece.duration]}
          />
        </div>
        <div className="band band-sheet" role="group" aria-label="Frames from the piece">
          {felicette.stills.map((s) => (
            <div key={s.tc} className="band-col">
              <div className="gal-lane items-end pb-[5px]">
                <EdgeLabel parts={[s.tc]} />
              </div>
              <button type="button" className="band-still film-frame" onClick={() => jump(s.at)} aria-label={`Play from ${s.tc}: ${s.alt}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt="" width={360} height={640} loading="lazy" decoding="async" draggable={false} />
              </button>
              <div className="gal-lane" />
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function PickAPile() {
  const { parts } = pickAPile;
  const ref = useRef<HTMLVideoElement>(null);
  const [cur, setCur] = useState(0);
  const part = parts[cur];
  // "Pile 1 · 3/4" read aloud as "Pile 1, part 3 of 4"
  const spoken = (p: string) => p.replace(" · ", ", part ").replace("/", " of ");
  // a cover loads its part into the player and plays it with sound, in the same tap
  const pick = (i: number) => {
    const v = ref.current;
    if (!v) return;
    setCur(i);
    if (i !== cur) {
      v.src = parts[i].h264;
      v.poster = parts[i].poster;
    }
    v.muted = false;
    v.play().catch(() => {});
  };
  return (
    <Shell project={pickAPile}>
      <div className="project-media">
        <div className="band band-lead">
          <Player
            id="pile"
            videoRef={ref}
            media={parts[0]}
            title={`Pick a pile, ${spoken(part.piece.part)}`}
            top={[part.piece.catalog, part.piece.part]}
            bottom={[part.piece.format, part.piece.duration]}
          />
        </div>
        <div className="band-sheet-wrap">
          <ul className="band band-sheet" aria-label="The seven parts of the series">
            {parts.map((c, i) => (
              <li key={c.piece.catalog} className="band-col">
                <div className="gal-lane items-end pb-[5px]">
                  <EdgeLabel parts={[c.piece.part]} />
                </div>
                <button
                  type="button"
                  className="band-still film-frame"
                  aria-pressed={i === cur}
                  aria-label={`Play ${spoken(c.piece.part)}`}
                  onClick={() => pick(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.poster} alt="" width={720} height={1280} loading="lazy" decoding="async" draggable={false} />
                </button>
                <div className="gal-lane items-start pt-[5px]">
                  <EdgeLabel parts={[c.piece.duration]} />
                </div>
              </li>
            ))}
          </ul>
          <p className="carried edge-type text-dim">
            <EdgeLabel parts={pickAPile.carried} wrap />
          </p>
        </div>
      </div>
    </Shell>
  );
}
