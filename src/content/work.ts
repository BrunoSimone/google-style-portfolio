/**
 * Everything printed on the film edges is real data about the work.
 * Never add clients, pieces, views or numbers that do not exist.
 */

export type Format = "9:16" | "16:9";

export type Piece = {
  /** running catalog number, printed as the first edge number */
  catalog: string;
  piece: string;
  part: string;
  format: Format;
  /** final running time, mm:ss */
  duration: string;
  /** unlisted YouTube link for the full piece with sound, once uploaded */
  youtube?: string;
};

export const pilePart1: Piece[] = [
  { catalog: "BS 0001", piece: "Pick a pile", part: "Pile 1 · 1/4", format: "9:16", duration: "01:32" },
  { catalog: "BS 0002", piece: "Pick a pile", part: "Pile 1 · 2/4", format: "9:16", duration: "02:01" },
  { catalog: "BS 0003", piece: "Pick a pile", part: "Pile 1 · 3/4", format: "9:16", duration: "01:07" },
  { catalog: "BS 0004", piece: "Pick a pile", part: "Pile 1 · 4/4", format: "9:16", duration: "01:59" },
];

export function edgeLine(p: Piece): string[] {
  return [p.catalog, p.piece, p.part, p.format, p.duration];
}

/** Pile 2 and the other pieces on the home (Bruno, 24/11): Roller Pro and Félicette. */
export const pilePart2: Piece[] = [
  { catalog: "BS 0005", piece: "Pick a pile", part: "Pile 2 · 1/3", format: "9:16", duration: "01:30" },
  { catalog: "BS 0006", piece: "Pick a pile", part: "Pile 2 · 2/3", format: "9:16", duration: "01:49" },
  { catalog: "BS 0007", piece: "Pick a pile", part: "Pile 2 · 3/3", format: "9:16", duration: "01:56" },
];
export const rollerShort: Piece = { catalog: "BS 0008", piece: "Roller Pro", part: "Short", format: "9:16", duration: "00:56" };
export const rollerLong: Piece = { catalog: "BS 0009", piece: "Roller Pro", part: "Long", format: "16:9", duration: "04:29" };
export const felicettePiece: Piece = { catalog: "BS 0010", piece: "Félicette", part: "1/1", format: "9:16", duration: "01:40" };

/**
 * The reel of the home's video section (Bruno, 24/11): a few seconds of every selected piece,
 * interleaved, cut by scripts/media/encode-hook.sh (keep both lists in sync). Each cut is one
 * frame of the strip; the strip advances one frame per cut.
 */
export const HOOK_CUT_SECONDS = 3.5;

export type HookCut = {
  frame: string;
  piece: Piece;
  /** source timecode inside the delivered piece */
  sourceTc: string;
  poster: string;
};

const p = pilePart1;
export const hookCuts: HookCut[] = [
  { frame: "01", piece: p[0], sourceTc: "00:04", poster: "/media/hook/cut-01.webp" },
  { frame: "02", piece: rollerShort, sourceTc: "00:30", poster: "/media/hook/cut-02.webp" },
  { frame: "03", piece: felicettePiece, sourceTc: "00:41", poster: "/media/hook/cut-03.webp" },
  { frame: "04", piece: p[1], sourceTc: "00:31", poster: "/media/hook/cut-04.webp" },
  { frame: "05", piece: rollerShort, sourceTc: "00:41", poster: "/media/hook/cut-05.webp" },
  { frame: "06", piece: felicettePiece, sourceTc: "00:54", poster: "/media/hook/cut-06.webp" },
  { frame: "07", piece: p[3], sourceTc: "01:16", poster: "/media/hook/cut-07.webp" },
];

export const hookVideo = {
  av1: "/media/hook/hook.webm",
  h264: "/media/hook/hook.mp4",
};

/* ───────────────────────────── the projects ─────────────────────────────
 * The home is the video landing (Bruno, 24/11): three projects, everything on the page, no
 * per-piece routes. Work is shown abstracted from who it was for: no client names, handles or
 * logos. Full pieces play with sound on request only; built by scripts/media/encode-work.sh.
 *
 * Copy marked `draft` was written by Claude from the project files (delivery notes, credits)
 * and waits for Bruno's corrections; nothing in it goes beyond those files.
 */

export type Note = { title: string; body: string };

export type Media = { poster: string; h264: string };
const work = (id: string, poster = id): Media => ({ poster: `/media/work/${poster}.webp`, h264: `/media/work/${id}.mp4` });

export type Cut = Media & { piece: Piece };
/** a frame of the piece printed beside it; tapping it plays the piece from there */
export type Still = { at: number; tc: string; src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  /** facts printed on the edge above the title */
  edge: string[];
  line: string;
  /** required credits and licences, in small print under the project */
  credit?: string;
  draft: boolean;
};

export const rollerPro: Project & { cuts: { short: Cut; long: Cut }; beforeAfter: (Media & { label: string; duration: string })[] } = {
  slug: "roller-pro",
  title: "Roller Pro",
  edge: ["BS 0008–0009", "Spec edit", "2 cuts", "9:16 + 16:9"],
  line: "A 1:09:10 product livestream, cut two ways: a 56-second vertical short and a 4:29 horizontal video.",
  credit: "Spec edit, not affiliated with Peak Design. Footage and photos © Peak Design. Music: «mohair» by shamgang (Epidemic Sound).",
  cuts: {
    short: { piece: rollerShort, ...work("roller-short") },
    long: { piece: rollerLong, ...work("roller-long") },
  },
  beforeAfter: [
    { label: "Short", duration: "00:51", ...work("roller-ba-short") },
    { label: "Long", duration: "00:56", ...work("roller-ba-long") },
  ],
  draft: false, // approved by Bruno, 25/11
};

const still = (at: number, alt: string): Still => {
  const sec = Math.floor(at);
  const tc = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  return { at, tc, src: `/media/work/felicette-${String(sec).padStart(2, "0")}.webp`, alt };
};

export const felicette: Project & { cut: Cut; stills: Still[] } = {
  slug: "felicette",
  title: "Félicette",
  edge: ["BS 0010", "Animated story", "01:40", "9:16"],
  line: "The first cat in space, told in a hundred seconds with archive, maps and animated graphics.",
  credit:
    "Archive: CERMA card, 1963 (public domain in the US). Earth from orbit: NASA. The Sydney Morning Herald, 20 Oct 1963. Felix the Cat (1919). Statue by Gill Parker, photo ISU / Photo Expression. Manila folder photo: allispossible.org.uk, CC BY 2.0, modified. Cat silhouettes: PhyloPic (CC0). Music and sound effects: Epidemic Sound.",
  cut: { piece: felicettePiece, ...work("felicette") },
  stills: [
    still(21, "Fourteen cats on index cards"),
    still(35, "A map from Paris to the Sahara"),
    still(43.5, "A gauge: two and a half kilos feel like twenty-four"),
    still(49, "Earth from orbit, the flight's curve"),
    still(63, "A newspaper headline: Space cat back alive"),
  ],
  draft: false, // approved by Bruno, 25/11
};

export const pickAPile: Project & { parts: Cut[]; carried: string[] } = {
  slug: "pick-a-pile",
  title: "Pick a pile",
  edge: ["BS 0001–0007", "Series", "7 parts", "9:16"],
  line: "A recorded tarot reading cut into seven vertical parts, one card each, under one look.",
  carried: ["One title card", "One grade", "One subtitle style"],
  /** all seven play (Bruno, 25/11); each part's cover is its poster */
  parts: [...pilePart1, ...pilePart2].map((piece, i) => ({
    piece,
    ...work(`pile-${i < 4 ? 1 : 2}-${i < 4 ? i + 1 : i - 3}`),
  })),
  draft: false, // approved by Bruno, 25/11
};

/* ───────────────────────────── webs ───────────────────────────── */

export type WebWork = {
  slug: string;
  title: string;
  /** what it is, printed on the edge */
  kind: string;
  url: string;
  /** host as printed */
  host: string;
  summary: string;
  stack: string[];
  /** screenshots of the live site, captured by scripts/media/capture-webs.sh */
  shots: { desktop: string; phone: string };
  context: string[];
  decisions: Note[];
  draft: boolean;
};

export const webs: WebWork[] = [
  {
    slug: "jubigestor",
    title: "JubiGestor",
    kind: "AI assistant",
    url: "https://www.jubigestor.xyz/",
    host: "jubigestor.xyz",
    summary: "A chat assistant that explains Argentine pension procedures in plain language, citing the official, dated source in every answer.",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "FastAPI", "Postgres + pgvector", "Gemini"],
    shots: { desktop: "/media/web/jubigestor-desktop.webp", phone: "/media/web/jubigestor-phone.webp" },
    context: [
      "Pension procedures in Argentina are hard to follow, and the people who need them are often the least used to the web. JubiGestor answers questions in plain language from a curated corpus of official documentation, and says when that source was last updated.",
    ],
    decisions: [
      {
        title: "A guide, not an authority",
        body: "Answers are grounded in the official corpus with a relevance threshold. When the answer isn't there, it sends you to ANSES instead of guessing.",
      },
      {
        title: "The source before the answer",
        body: "Responses stream with the citations first, then the text, so where it comes from is on screen before what it says.",
      },
      {
        title: "Built for who reads it",
        body: "Adjustable large text, high contrast and a hyperlegible typeface.",
      },
      {
        title: "No lock-in to one model",
        body: "The language-model layer is provider-agnostic: Gemini, OpenAI or Claude through one setting.",
      },
    ],
    draft: true,
  },
  {
    slug: "canela",
    title: "Canela",
    kind: "Online store",
    url: "https://www.canela-store.com/",
    host: "canela-store.com",
    summary: "An online store for a studio of handcrafted glass, ceramics, mirrors and framed art.",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Sanity", "Neon PostgreSQL", "Mercado Pago"],
    shots: { desktop: "/media/web/canela-desktop.webp", phone: "/media/web/canela-phone.webp" },
    context: [
      "A small studio that makes its pieces by hand needed to sell them online without depending on a developer for every change. Customers browse the catalog, build a cart and pay through Mercado Pago.",
    ],
    decisions: [
      {
        title: "The studio owns its catalog",
        body: "Products, photos and stock live in Sanity Studio, so the owners update the shop themselves.",
      },
      {
        title: "Payments stay on the server",
        body: "Provider credentials and payment checks never reach the browser. Orders and payment state live in PostgreSQL, and the result page reads them from the server.",
      },
      {
        title: "Made to order, kept apart",
        body: "Pieces made to order can sit in the cart but not go to payment; direct-sale pieces use the checkout.",
      },
    ],
    draft: true,
  },
];

export const webBySlug = (slug: string) => webs.find((w) => w.slug === slug);

/** development experience, said in passing: companies and dates, never a count of years */
/** from Bruno's CV (25/11): companies, roles and dates, never a count of years */
export const experience = [
  { company: "WeCheck AI", role: "Full-stack developer", when: "Oct 2023 – Jul 2026" },
  { company: "Gol Ball", role: "Frontend developer", when: "Jan 2023 – Sep 2023" },
];

/* ───── parked: /about was removed (Bruno, 26/11); kept here in case they come back ───── */

/** approved by Bruno (signature) */
export const statement =
  "I set your style once: grade, type, subtitles, sound. Every video after that comes back faster, and looks like you.";

/**
 * The process as sealed stages (approved order, no turnaround numbers). The one-line
 * descriptions come from PRODUCT.md (brief form first, two rounds, all asynchronous); approved
 * by Bruno, 25/11.
 */
export const stages: Note[] = [
  { title: "Brief", body: "A short form before I start: what it's for, where it goes, how it should feel." },
  { title: "First cut", body: "The whole piece, cut, graded and subtitled in your style." },
  { title: "Round 1", body: "Your notes on a review link. I apply them and send it back." },
  { title: "Round 2", body: "One more pass for whatever is left." },
  { title: "Delivery", body: "Final files, ready to publish. Your style stays saved for the next one." },
];
