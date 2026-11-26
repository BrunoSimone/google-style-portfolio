import { type HookCut } from "@/content/work";
import { EdgeLabel } from "./EdgeLabel";
import { STRIP_COPIES } from "./FilmStrip";

/**
 * The same strip of film laid flat, running sideways through a gate (a
 * flatbed). Edge numbers print along the top and bottom lanes, readable
 * without turning the head: catalog and piece above, part, format and
 * running time below. `--pos` puts a frame in the gate, exactly as in the
 * vertical strip.
 */
export function FilmStripH({
  cuts,
  offset = 0,
  gate,
  dimGate,
  className,
  stripRef,
  label,
}: {
  cuts: HookCut[];
  offset?: number;
  gate?: React.ReactNode;
  dimGate?: boolean;
  className?: string;
  stripRef?: React.Ref<HTMLDivElement>;
  label: string;
}) {
  const frames = Array.from({ length: STRIP_COPIES }, () => cuts).flat();
  const startPos = cuts.length + offset;
  const lit = gate && !dimGate;
  return (
    <div
      className={`film-strip-h relative h-full min-h-0 w-full [container-type:size] ${className ?? ""}`}
      role="group"
      aria-label={label}
    >
      <div className="film-band-h absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden bg-film">
        <div
          ref={stripRef}
          data-track
          data-len={cuts.length}
          data-start={startPos}
          className="film-track-h relative flex h-full w-max will-change-transform"
          style={{ ["--pos" as string]: startPos }}
        >
          <div aria-hidden="true" className="perfs-t absolute inset-x-0 top-0 h-[var(--edge)]" />
          <div aria-hidden="true" className="perfs-b absolute inset-x-0 bottom-0 h-[var(--edge)]" />
          {frames.map((cut, i) => {
            const copy = Math.floor(i / cuts.length);
            const live = copy === 1; // only one copy is read by assistive tech
            const p = cut.piece;
            return (
              <div key={i} className="film-col-h relative grid grid-rows-[var(--edge)_1fr_var(--edge)]" aria-hidden={!live}>
                <div className="relative flex items-end gap-2 overflow-hidden pb-[5px] text-dim">
                  <span className="edge-type edge-run shrink-0">{cut.frame}</span>
                  <EdgeLabel parts={[p.catalog, p.piece]} />
                </div>
                <div className="film-frame relative overflow-hidden bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cut.poster}
                    alt={live ? `${p.piece}, ${p.part}, at ${cut.sourceTc}` : ""}
                    width={540}
                    height={960}
                    loading={lit ? "eager" : "lazy"}
                    fetchPriority={lit ? (i === startPos ? "high" : "low") : undefined}
                    decoding="async"
                    className="frame-media h-full w-full object-cover"
                  />
                  <div aria-hidden="true" className="frame-dim absolute inset-0" />
                </div>
                <div className="relative flex items-start justify-between gap-2 overflow-hidden pt-[5px] text-dim">
                  <EdgeLabel parts={[p.part, p.format, p.duration]} />
                  <span className="edge-type edge-run shrink-0">TC {cut.sourceTc}</span>
                </div>
              </div>
            );
          })}
        </div>
        {gate && (
          <div className={`film-gate-h absolute ${dimGate ? "is-dim" : ""}`}>
            {gate}
            {dimGate && <div aria-hidden="true" className="frame-dim absolute inset-0" />}
          </div>
        )}
      </div>
    </div>
  );
}
