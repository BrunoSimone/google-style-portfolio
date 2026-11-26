import { steps, stepsFacts } from "@/content/work";
import { EdgeLabel } from "./EdgeLabel";

/**
 * How I work (Bruno, 26/11): between the work and the close, readable in five seconds. The four
 * steps sit on one stretch of film, numbered on the frame like the catalog codes: laid across on
 * wider screens (perforations above and below), standing up on phones (perforations either side),
 * so it reads as one column there. A small line of facts under it.
 */
export function Steps() {
  return (
    <section id="process" className="steps" aria-labelledby="steps-title" data-tick>
      <h2 id="steps-title" className="sec-title condensed">
        How I work.
      </h2>
      <ol className="steps-band">
        {steps.map((s, i) => (
          <li key={s.title} className="step">
            <span className="step-n edge-type">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="step-t condensed">{s.title}</h3>
            <p className="step-b">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="steps-facts text-dim">
        <EdgeLabel parts={stepsFacts} wrap />
      </p>
    </section>
  );
}
