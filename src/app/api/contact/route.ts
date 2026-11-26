/**
 * The contact form's only way out: one email to Bruno through Resend's REST API (no SDK).
 *
 * Needs RESEND_API_KEY (a secret: set it in Vercel's environment variables, never in the repo),
 * and optionally CONTACT_TO (defaults to bruno@brunosimone.dev) and CONTACT_FROM (a sender on a
 * domain verified in Resend, e.g. "Bruno Simone <contact@brunosimone.dev>"). Resend's shared
 * test sender (onboarding@resend.dev) only delivers to the Resend account's own address.
 * Without the key the route answers 503 and the form shows its error state with the address.
 */
export const runtime = "nodejs";

const LIMITS = { name: 120, email: 200, channel: 300, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = { name: string; email: string; channel: string; message: string; company?: string };

function clean(body: unknown): Fields | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const str = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const f: Fields = { name: str("name"), email: str("email"), channel: str("channel"), message: str("message"), company: str("company") };
  if (!f.name || !f.email || !f.message) return null;
  if (!EMAIL.test(f.email)) return null;
  for (const k of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) if (f[k].length > LIMITS[k]) return null;
  return f;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const f = clean(body);
  if (!f) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  // the hidden field only bots fill: answer as if sent, send nothing
  if (f.company) return Response.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, error: "unconfigured" }, { status: 503 });

  const to = process.env.CONTACT_TO || "bruno@brunosimone.dev"; // Bruno, 25/11
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
  const text = [`Name: ${f.name}`, `Email: ${f.email}`, `Channel or site: ${f.channel || "—"}`, "", f.message].join("\n");
  const html = `<p><b>Name:</b> ${esc(f.name)}<br><b>Email:</b> ${esc(f.email)}<br><b>Channel or site:</b> ${esc(f.channel || "—")}</p><p style="white-space:pre-wrap">${esc(f.message)}</p>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: f.email, subject: `New message from ${f.name}`, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) return Response.json({ ok: false, error: "send" }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "send" }, { status: 502 });
  }
}
