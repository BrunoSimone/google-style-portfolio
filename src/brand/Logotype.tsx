import { marks, type MarkOutline } from "./marks";

/**
 * The logotype (Bruno, 25/11): «BRUNO SIMONE» in Big Shoulders, whole, no cut. The cut (concept
 * B) and its blade entrance read as a cliché and no longer matched the dithered ground; the
 * identity now lives in the entrance on the loading screen, where the name is drawn as a line
 * and then filled (src/components/Loader.tsx). Vector outline, one piece.
 */
export function wordmarkBox(mark: MarkOutline) {
  const pad = mark.upm * 0.02;
  return { x: mark.inkLeft - pad, y: -pad, w: mark.width - mark.inkLeft + pad * 2, h: mark.cap + pad * 2 };
}

export function Wordmark({
  name,
  className,
  title = "Bruno Simone",
  decorative,
}: {
  name: keyof typeof marks;
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const mark = marks[name];
  const b = wordmarkBox(mark);
  return (
    <svg
      viewBox={`${b.x} ${b.y} ${b.w} ${b.h}`}
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      data-logo={name}
    >
      <path d={mark.d} fill="currentColor" />
    </svg>
  );
}
