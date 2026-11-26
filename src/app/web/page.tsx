import type { Metadata } from "next";
import { EdgeLabel } from "@/components/EdgeLabel";
import { MoreLink, PageHead, WebShots } from "@/components/Pieces";
import { experience, webs } from "@/content/work";

export const metadata: Metadata = {
  title: "Web",
  description: "Websites built by Bruno Simone, with the context and the decisions behind each one.",
  alternates: { canonical: "/web" },
};

export default function WebPage() {
  return (
    <>
      <PageHead
        title="Sites I build."
        lede="The same care as the edits, in code. Each site has a page with what it needed and the decisions behind it."
      />
      {webs.map((w, i) => (
        <article key={w.slug} className="web-item" aria-labelledby={`w-${w.slug}`} data-tick>
          <WebShots web={w} eager={i === 0} />
          <div className="work-head">
            <h2 id={`w-${w.slug}`} className="work-title condensed">
              {w.title}
            </h2>
            <p className="work-edge">
              <EdgeLabel parts={[w.kind, w.host]} wrap />
            </p>
            <p className="work-summary">{w.summary}</p>
            <div className="web-links">
              <MoreLink href={`/web/${w.slug}`}>Context and decisions</MoreLink>
              <MoreLink href={w.url} out>
                Visit {w.host}
              </MoreLink>
            </div>
          </div>
        </article>
      ))}

      <section className="xp" aria-labelledby="xp-title" data-tick>
        <h2 id="xp-title" className="sec-title condensed">
          In product teams, every day.
        </h2>
        <ul className="xp-list">
          {experience.map((x) => (
            <li key={x.company} className="xp-row">
              <span>
                <span className="xp-co condensed">{x.company}</span>
                <span className="xp-role ml-3">{x.role}</span>
              </span>
              <span className="edge-type text-dim">{x.when}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
