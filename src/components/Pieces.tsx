import Link from "next/link";
import type { Note, WebWork } from "@/content/work";
import { EdgeLabel } from "./EdgeLabel";

/** a drawn arrow for links that go somewhere: right for inside the site, up-right for outside */
export function Arrow({ out, down }: { out?: boolean; down?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      {out ? (
        <path d="M4 10L10 4M5 4h5v5" strokeLinecap="square" />
      ) : down ? (
        <path d="M7 1v11M3 8l4 4 4-4" strokeLinecap="square" />
      ) : (
        <path d="M1 7h11M8 3l4 4-4 4" strokeLinecap="square" />
      )}
    </svg>
  );
}

export function MoreLink({ href, children, out, down }: { href: string; children: React.ReactNode; out?: boolean; down?: boolean }) {
  if (out) {
    return (
      <a className="more-link" href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <Arrow out />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className="more-link" href={href}>
      {children}
      <Arrow down={down} />
    </Link>
  );
}

/** copy still waiting for Bruno's corrections: flagged in development only */
export function DraftFlag({ draft }: { draft: boolean }) {
  if (!draft || process.env.NODE_ENV !== "development") return null;
  return <div className="draft-flag edge-type">Draft copy · pending Bruno&apos;s corrections</div>;
}

export function PageHead({ title, lede, edge }: { title: string; lede?: string; edge?: string[] }) {
  return (
    <header className="page-head" data-tick>
      <h1 className="page-title condensed">{title}</h1>
      {edge && (
        <p className="page-edge">
          <EdgeLabel parts={edge} wrap />
        </p>
      )}
      {lede && <p className="page-lede">{lede}</p>}
    </header>
  );
}

/** the reasoning behind a piece: what it is, then the decisions and why */
export function Notes({ context, decisions, draft }: { context: string[]; decisions: Note[]; draft: boolean }) {
  return (
    <section className="notes" aria-label="Context and decisions" data-tick>
      <div className="notes-block">
        <h2 className="notes-h condensed">Context</h2>
        <div className="notes-body">
          {context.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <DraftFlag draft={draft} />
        </div>
      </div>
      <div className="notes-block">
        <h2 className="notes-h condensed">Decisions</h2>
        <ul className="notes-body decisions">
          {decisions.map((d) => (
            <li key={d.title} className="decision">
              <h3 className="decision-t">{d.title}</h3>
              <p className="decision-b">{d.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** the live site as it looks, desktop and phone, laid on the same perforated band as the video */
export function WebShots({ web, eager }: { web: WebWork; eager?: boolean }) {
  const shots = [
    { kind: "desktop" as const, src: web.shots.desktop, w: 1440, h: 900, edge: ["Desktop", "1440 × 900"] },
    { kind: "phone" as const, src: web.shots.phone, w: 390, h: 844, edge: ["Phone", "390 × 844"] },
  ];
  return (
    <div className="web-band bg-film">
      <div className="web-track">
        {shots.map((s) => (
          <div key={s.kind} className="web-col">
            <div className="gal-lane items-end pb-[5px]">
              <EdgeLabel parts={[web.host, s.edge[0]]} />
            </div>
            <div className="web-shot film-frame" data-kind={s.kind}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={`${web.title} on a ${s.kind === "desktop" ? "desktop screen" : "phone"}`}
                width={s.w}
                height={s.h}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </div>
            <div className="gal-lane items-start pt-[5px]">
              <EdgeLabel parts={[s.edge[1], web.kind]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pager({ label, href, title }: { label: string; href: string; title: string }) {
  return (
    <nav className="pager" aria-label="Next piece">
      <span className="text-dim">{label}</span>
      <Link href={href} className="inline-flex items-center gap-3">
        {title}
        <Arrow />
      </Link>
    </nav>
  );
}
