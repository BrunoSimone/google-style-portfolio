/**
 * A run of edge numbers, separated by a small printed triangle (drawn, not a glyph).
 * `wrap` lets a long run break between parts (never inside one) where it is not on a film edge.
 */
export function EdgeLabel({ parts, className, wrap }: { parts: string[]; className?: string; wrap?: boolean }) {
  return (
    <span
      className={`edge-type edge-run inline-flex items-center gap-[0.6em] ${wrap ? "flex-wrap gap-y-2" : "whitespace-nowrap"} ${className ?? ""}`}
    >
      {parts.map((part, i) => (
        <span key={i} className="inline-flex items-center gap-[0.6em] whitespace-nowrap">
          {i > 0 && (
            <svg width="5" height="6" viewBox="0 0 5 6" aria-hidden="true" className="shrink-0 opacity-80">
              <path d="M0 0L5 3L0 6Z" fill="currentColor" />
            </svg>
          )}
          <span>{part}</span>
        </span>
      ))}
    </span>
  );
}
