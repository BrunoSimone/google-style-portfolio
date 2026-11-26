import { edgeLine, type HookCut } from "@/content/work";
import { EdgeLabel } from "./EdgeLabel";

export const STRIP_COPIES = 4;

/**
 * One vertical strip of film. The track holds the cuts repeated so it can keep
 * advancing; `--pos` (a frame index, animated by the parent) puts a frame in
 * the gate. Geometry is pure CSS: the strip is a size container and the
 * frame height follows whichever runs out first, height or width.
 */
export function FilmStrip({
  cuts,
  offset = 0,
  gate,
  dimGate,
  className,
  stripRef,
  label,
}: {
  cuts: HookCut[];
  /** which cut sits in the gate at rest */
  offset?: number;
  /** content laid over the gate frame (the playing video) */
  gate?: React.ReactNode;
  /** dim the gate too (side strips): only the centre frame is lit */
  dimGate?: boolean;
  className?: string;
  stripRef?: React.Ref<HTMLDivElement>;
  label: string;
}) {
  const frames = Array.from({ length: STRIP_COPIES }, () => cuts).flat();
  const startPos = cuts.length + offset;
  return (
    <div
      className={`film-strip relative h-full min-h-0 [container-type:size] ${className ?? ""}`}
      role="group"
      aria-label={label}
    >
      <div className="film-col absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden bg-film">
        <div
          ref={stripRef}
          data-track
          data-len={cuts.length}
          data-start={startPos}
          className="film-track relative will-change-transform"
          style={{ ["--pos" as string]: startPos }}
        >
          <div aria-hidden="true" className="perfs absolute inset-y-0 left-0 w-[var(--edge)]" />
          <div aria-hidden="true" className="perfs-r absolute inset-y-0 right-0 w-[var(--edge)]" />
          {frames.map((cut, i) => {
            const copy = Math.floor(i / cuts.length);
            const live = copy === 1; // only one copy is read by assistive tech
            return (
              <div key={i} className="film-row relative grid grid-cols-[var(--edge)_1fr_var(--edge)]" aria-hidden={!live}>
                <div className="relative flex items-center justify-end overflow-hidden pr-[5px] text-dim">
                  <EdgeLabel parts={edgeLine(cut.piece)} className="[writing-mode:vertical-rl] rotate-180" />
                </div>
                <div className="film-frame relative overflow-hidden bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cut.poster}
                    alt={live ? `${cut.piece.piece}, ${cut.piece.part}, at ${cut.sourceTc}` : ""}
                    width={540}
                    height={960}
                    /* the playing strip fetches its 7 posters (one URL per cut, shared by every
                       copy and by the side strips); hidden side strips on phones fetch nothing */
                    loading={gate && !dimGate ? "eager" : "lazy"}
                    fetchPriority={gate && !dimGate ? (i === startPos ? "high" : "low") : undefined}
                    decoding="async"
                    className="frame-media h-full w-full object-cover"
                  />
                  <div aria-hidden="true" className="frame-dim absolute inset-0" />
                </div>
                <div className="relative flex flex-col items-start justify-between py-3 pl-[5px] text-dim">
                  <span className="edge-type [writing-mode:vertical-rl]">{cut.frame}</span>
                  <span className="edge-type [writing-mode:vertical-rl]">TC {cut.sourceTc}</span>
                </div>
              </div>
            );
          })}
        </div>
        {gate && (
          <div className={`film-gate absolute left-[var(--edge)] right-[var(--edge)] ${dimGate ? "is-dim" : ""}`}>
            {gate}
            {dimGate && <div aria-hidden="true" className="frame-dim absolute inset-0" />}
          </div>
        )}
      </div>
    </div>
  );
}
