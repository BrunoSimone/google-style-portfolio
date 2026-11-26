import { Hero } from "@/components/Hero";
import { MoreLink } from "@/components/Pieces";
import { Reel, ReelStrip, SoundButton } from "@/components/reel/Reel";
import { Work } from "@/components/Work";

/**
 * Home: the video landing (Bruno, 24/11; /web is the other landing, no /video). Who this is first
 * (text only); then the reel (a few seconds of every piece, running by itself); then the three
 * projects in full: Roller Pro (short, long, before/after), Félicette, Pick a pile. The close and,
 * under it, one quiet line to the web work come from the layout.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <section className="preview" aria-labelledby="pv-video" data-tick>
        <Reel>
          <div className="preview-head">
            <h2 id="pv-video" className="sec-title condensed">
              A few seconds of each.
            </h2>
            <div className="preview-side">
              <SoundButton />
              <MoreLink href="#work" down>
                Watch the full pieces
              </MoreLink>
            </div>
          </div>
          <div className="reel-band">
            <ReelStrip role="main" axis="x" label="A few seconds of every piece, now playing" />
          </div>
        </Reel>
      </section>

      <Work />
    </>
  );
}
