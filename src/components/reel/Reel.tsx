"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { HOOK_CUT_SECONDS, hookCuts, hookVideo } from "@/content/work";
import { AUDIO_EVENT, claimAudio } from "../audio";
import { FilmStrip } from "../FilmStrip";
import { FilmStripH } from "../FilmStripH";

/**
 * The reel of the home's video section (Bruno, 24/11): a few seconds of every selected piece,
 * running by itself through a flatbed gate. Split into parts that any layout can arrange.
 *
 * <Reel> owns the behaviour: one lit reel video (the only one that can carry
 * sound), any number of switched-off copies kept in sync, and every strip
 * track advancing one frame on each cut. The parts register themselves, so a
 * layout is just markup: strips (vertical or horizontal) and the sound
 * control, in any arrangement.
 */

/** one band forward, a small overshoot, then it settles (departures-board grammar) */
const ADVANCE = { duration: 0.42, ease: "back.out(1.7)" };

type ReelApi = {
  registerMain: (video: HTMLVideoElement | null) => void;
  registerSide: (key: string) => (video: HTMLVideoElement | null) => void;
  registerTrack: (key: string) => (track: HTMLDivElement | null) => void;
  cut: number;
  sound: boolean;
  playing: boolean;
  toggleSound: () => void;
  togglePlay: () => void;
};

const ReelContext = createContext<ReelApi | null>(null);

function useReel() {
  const api = useContext(ReelContext);
  if (!api) throw new Error("Reel parts must sit inside <Reel>");
  return api;
}

const rendered = (el: Element) => el.getClientRects().length > 0;

export function Reel({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLVideoElement | null>(null);
  const sides = useRef(new Map<string, HTMLVideoElement>());
  const tracks = useRef(new Map<string, HTMLDivElement>());
  const cutRef = useRef(0);
  const [cut, setCut] = useState(0);
  const [sound, setSound] = useState(false);
  const [playing, setPlaying] = useState(false);

  const registerMain = useCallback((video: HTMLVideoElement | null) => {
    mainRef.current = video;
  }, []);
  const sideRefs = useRef(new Map<string, (v: HTMLVideoElement | null) => void>());
  const registerSide = useCallback((key: string) => {
    let fn = sideRefs.current.get(key);
    if (!fn) {
      fn = (v) => {
        if (v) sides.current.set(key, v);
        else sides.current.delete(key);
      };
      sideRefs.current.set(key, fn);
    }
    return fn;
  }, []);
  const trackRefs = useRef(new Map<string, (t: HTMLDivElement | null) => void>());
  const registerTrack = useCallback((key: string) => {
    let fn = trackRefs.current.get(key);
    if (!fn) {
      fn = (t) => {
        if (t) tracks.current.set(key, t);
        else tracks.current.delete(key);
      };
      trackRefs.current.set(key, fn);
    }
    return fn;
  }, []);

  /* ── every strip advances one frame on every cut of the reel ──
     The gate (the lit video) rides with the frame it belongs to: it is held
     at the track's distance from rest (--drift), so the new cut arrives inside
     its own frame from the neighbouring slot, and frame and picture overshoot
     and settle together instead of the strip sliding under a still video. */
  const tweens = useRef(new WeakMap<HTMLDivElement, gsap.core.Tween>());
  const advanceTo = useCallback((next: number, animate: boolean) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    tracks.current.forEach((track) => {
      const len = Number(track.dataset.len);
      const start = Number(track.dataset.start); // len + offset
      const gate = track.parentElement?.querySelector<HTMLElement>(":scope > .film-gate, :scope > .film-gate-h");
      const prev = Number(track.style.getPropertyValue("--pos")) || start;
      let target = start + next;
      const wrapped = target < Math.round(prev);
      if (wrapped) target += len; // keep going forward, then jump back a whole copy
      const place = (pos: number, rest: number) => {
        track.style.setProperty("--pos", String(pos));
        gate?.style.setProperty("--drift", String(pos - rest));
      };
      tweens.current.get(track)?.kill();
      if (!animate || reduce) {
        place(start + next, start + next);
        return;
      }
      const state = { pos: prev };
      tweens.current.set(
        track,
        gsap.to(state, {
          pos: target,
          ...ADVANCE,
          onUpdate: () => place(state.pos, target),
          onComplete: () => {
            if (wrapped) place(start + next, start + next);
          },
        }),
      );
    });
  }, []);

  useEffect(() => {
    const video = mainRef.current;
    if (!video) return;
    video.muted = true; // the attribute alone is not enough for iOS autoplay under React
    let raf = 0;

    /* switched-off copies: the same reel, muted, held a fixed number of cuts
       away from the lit one so every strip advances on the same cut */
    const syncSides = () => {
      const dur = video.duration;
      sides.current.forEach((side) => {
        if (video.paused || !dur || !rendered(side)) {
          side.pause();
          return;
        }
        const target = (video.currentTime + Number(side.dataset.offset)) % dur;
        if (Math.abs(side.currentTime - target) > 0.2) side.currentTime = target;
        side.muted = true;
        side.play().catch(() => {});
      });
    };

    const check = () => {
      const next = Math.min(hookCuts.length - 1, Math.floor(video.currentTime / HOOK_CUT_SECONDS + 0.02));
      if (next !== cutRef.current) {
        cutRef.current = next;
        setCut(next);
        advanceTo(next, true);
        syncSides();
      }
    };
    const tick = () => {
      check();
      raf = requestAnimationFrame(tick);
    };
    // rAF keeps the advance on the cut; timeupdate covers throttled frames
    video.addEventListener("timeupdate", check);
    const onPlay = () => {
      setPlaying(true);
      syncSides();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onPause = () => {
      setPlaying(false);
      syncSides();
      cancelAnimationFrame(raf);
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let userPaused = false;
    const onUserPause = () => (userPaused = true);
    const onUserPlay = () => (userPaused = false);
    video.addEventListener("bs-userpause", onUserPause);
    video.addEventListener("bs-userplay", onUserPlay);
    setPlaying(!video.paused); // autoplay may start before these listeners attach
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("seeked", syncSides);
    addEventListener("resize", syncSides);
    if (!video.paused) syncSides();

    // play only while the reel is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        // with reduced motion the reel waits on its poster until asked to play
        if (entry.isIntersecting) {
          if (!reduce && !userPaused) video.play().catch(() => {});
        } else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      video.removeEventListener("timeupdate", check);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("seeked", syncSides);
      video.removeEventListener("bs-userpause", onUserPause);
      video.removeEventListener("bs-userplay", onUserPlay);
      removeEventListener("resize", syncSides);
    };
  }, [advanceTo]);

  const toggleSound = useCallback(() => {
    const video = mainRef.current;
    if (!video) return;
    if (!video.muted) {
      video.muted = true;
      setSound(false);
      return;
    }
    video.currentTime = 0;
    cutRef.current = 0;
    setCut(0);
    advanceTo(0, true);
    claimAudio("reel");
    video.muted = false;
    video.dispatchEvent(new Event("bs-userplay"));
    video.play().catch(() => {});
    setSound(true);
  }, [advanceTo]);

  // another sound started on the page (a sample piece): the reel goes back to silent
  useEffect(() => {
    const onAudio = (e: Event) => {
      const video = mainRef.current;
      if ((e as CustomEvent<string>).detail === "reel" || !video || video.muted) return;
      video.muted = true;
      setSound(false);
    };
    addEventListener(AUDIO_EVENT, onAudio);
    return () => removeEventListener(AUDIO_EVENT, onAudio);
  }, []);

  const togglePlay = useCallback(() => {
    const video = mainRef.current;
    if (!video) return;
    if (video.paused) {
      video.dispatchEvent(new Event("bs-userplay"));
      video.play().catch(() => {});
    } else {
      video.dispatchEvent(new Event("bs-userpause"));
      video.pause();
    }
  }, []);

  const api = useMemo<ReelApi>(
    () => ({ registerMain, registerSide, registerTrack, cut, sound, playing, toggleSound, togglePlay }),
    [registerMain, registerSide, registerTrack, cut, sound, playing, toggleSound, togglePlay],
  );
  return <ReelContext.Provider value={api}>{children}</ReelContext.Provider>;
}

type StripProps = {
  /** which cut sits in the gate at rest, counted from the reel's current cut */
  offset?: number;
  /** "main" carries the lit reel, "side" a switched-off copy, "still" posters only */
  role: "main" | "side" | "still";
  axis?: "y" | "x";
  className?: string;
  label: string;
};

/* ── a strip of the reel, vertical or horizontal ── */
export function ReelStrip({ offset = 0, role, axis = "y", className, label }: StripProps) {
  const { registerTrack } = useReel();
  const key = useId();
  const gate =
    role === "main" ? <MainGate /> : role === "side" ? <SideVideo slot={key} offsetCuts={offset} /> : undefined;
  const Strip = axis === "x" ? FilmStripH : FilmStrip;
  return (
    <Strip
      cuts={hookCuts}
      offset={offset}
      gate={gate}
      dimGate={role !== "main"}
      className={className}
      label={label}
      stripRef={registerTrack(key)}
    />
  );
}

function SideVideo({ slot, offsetCuts }: { slot: string; offsetCuts: number }) {
  const { registerSide } = useReel();
  return (
    <video
      ref={registerSide(slot)}
      data-offset={offsetCuts * HOOK_CUT_SECONDS}
      className="h-full w-full object-cover"
      poster={hookCuts[offsetCuts % hookCuts.length].poster}
      muted
      loop
      playsInline
      preload="none"
      disableRemotePlayback
      tabIndex={-1}
      aria-hidden="true"
    >
      <source src={hookVideo.av1} type='video/webm; codecs="av01.0.05M.08, opus"' />
      <source src={hookVideo.h264} type="video/mp4" />
    </video>
  );
}

function MainGate() {
  const { registerMain, playing, sound, togglePlay } = useReel();
  return (
    <>
      <video
        ref={registerMain}
        className="h-full w-full object-cover"
        poster={hookCuts[0].poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disableRemotePlayback
        aria-label="Excerpts of three pieces edited by Bruno Simone"
      >
        <source src={hookVideo.av1} type='video/webm; codecs="av01.0.05M.08, opus"' />
        <source src={hookVideo.h264} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause the reel" : "Play the reel"}
        className="absolute inset-0 flex items-end justify-end p-5 text-left focus-visible:outline-offset-[-4px]"
      >
        <span className="edge-type bg-ink/70 px-1.5 py-1 text-bone">{playing ? (sound ? "Sound on" : "Playing") : "Paused"}</span>
      </button>
    </>
  );
}

/* ── «Watch with sound»: unmutes the lit reel only, from the top ── */
export function SoundButton({ className }: { className?: string }) {
  const { sound, toggleSound } = useReel();
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={sound}
      className={`shrink-0 border border-bone/70 px-4 py-[11px] text-[14px] font-medium leading-none text-bone transition-colors duration-150 hover:border-bone hover:bg-bone hover:text-ink ${className ?? ""}`}
    >
      {sound ? "Mute" : "Watch with sound"}
    </button>
  );
}
