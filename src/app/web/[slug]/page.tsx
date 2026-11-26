import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EdgeLabel } from "@/components/EdgeLabel";
import { MoreLink, Notes, PageHead, Pager, WebShots } from "@/components/Pieces";
import { webBySlug, webs } from "@/content/work";

export function generateStaticParams() {
  return webs.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = webBySlug((await params).slug);
  if (!w) return {};
  return { title: w.title, description: w.summary, alternates: { canonical: `/web/${w.slug}` } };
}

export default async function WebPiece({ params }: { params: Promise<{ slug: string }> }) {
  const w = webBySlug((await params).slug);
  if (!w) notFound();
  const i = webs.indexOf(w);
  const next = webs[(i + 1) % webs.length];

  return (
    <>
      <PageHead title={w.title} edge={[w.kind, w.host]} lede={w.summary} />
      <div className="web-item">
        <WebShots web={w} eager />
        <div className="work-head">
          <p className="work-edge">
            <EdgeLabel parts={w.stack} wrap />
          </p>
          <div className="web-links">
            <MoreLink href={w.url} out>
              Visit {w.host}
            </MoreLink>
          </div>
        </div>
      </div>
      <Notes context={w.context} decisions={w.decisions} draft={w.draft} />
      {next.slug !== w.slug && <Pager label="Next site" href={`/web/${next.slug}`} title={next.title} />}
    </>
  );
}
