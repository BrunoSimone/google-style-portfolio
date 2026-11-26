"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Arrow } from "./Pieces";

const EMAIL = "bruno@brunosimone.dev"; // Bruno, 25/11

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The close, at the foot of every page: one big invitation and a four-field form that sends an
 * email from the site (src/app/api/contact). States: sending; sent (the form gives way to a
 * confirmation with the address the reply goes to, and a way to write another); didn't send
 * (inline, with the address to write to instead).
 */
export function Close() {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [sentTo, setSentTo] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // the form is gone once sent: hand the focus to the confirmation so it is read out
  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const bad: Record<string, boolean> = {};
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (el.name && el.name !== "company" && !el.checkValidity()) bad[el.name] = true;
    }
    setInvalid(bad);
    if (Object.keys(bad).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(bad)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error(String(r.status));
      setSentTo(String(data.email ?? ""));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field = (name: string) => ({
    id: id(name),
    name,
    "aria-invalid": invalid[name] || undefined,
    "aria-describedby": invalid[name] ? id(`${name}-err`) : undefined,
    onInput: () => invalid[name] && setInvalid((v) => ({ ...v, [name]: false })),
    disabled: status === "sending",
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="close" data-tick>
      <div className="close-inner">
        <div className="close-head">
          <h2 id="contact-title" className="close-title condensed">
            Tell me what you&apos;re making.
          </h2>
          <p className="close-alt text-dim">
            Or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>

        {status === "sent" ? (
          <div className="close-done">
            <h3 ref={doneRef} tabIndex={-1} className="close-done-title condensed">
              Sent. Thanks.
            </h3>
            <p className="close-done-text">
              I&apos;ll reply to <span className="text-bone">{sentTo}</span> by email.
            </p>
            <button
              type="button"
              className="close-again"
              onClick={() => {
                setStatus("idle");
                setSentTo("");
              }}
            >
              Write another message
            </button>
          </div>
        ) : (
          <form ref={formRef} className="close-form" onSubmit={onSubmit} noValidate>
            <div className="close-row">
              <div className="close-field">
                <label htmlFor={id("name")}>Name</label>
                <input type="text" autoComplete="name" required maxLength={120} {...field("name")} />
                {invalid.name && <p id={id("name-err")} className="close-err">Your name, so I know who to answer.</p>}
              </div>
              <div className="close-field">
                <label htmlFor={id("email")}>Email</label>
                <input type="email" autoComplete="email" required maxLength={200} inputMode="email" {...field("email")} />
                {invalid.email && <p id={id("email-err")} className="close-err">An email I can reply to, like name@example.com.</p>}
              </div>
            </div>
            <div className="close-field">
              <label htmlFor={id("channel")}>
                Channel or site <span className="text-dim">(optional)</span>
              </label>
              <input type="url" inputMode="url" maxLength={300} placeholder="https://" {...field("channel")} />
              {invalid.channel && <p id={id("channel-err")} className="close-err">A full link, starting with https://</p>}
            </div>
            <div className="close-field">
              <label htmlFor={id("message")}>Message</label>
              <textarea rows={5} required maxLength={5000} {...field("message")} />
              {invalid.message && <p id={id("message-err")} className="close-err">A few lines about what you&apos;re making.</p>}
            </div>
            {/* only bots fill this one */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor={id("company")}>Company</label>
              <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="close-send">
              <button type="submit" className="close-btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send"}
                {status !== "sending" && <Arrow />}
              </button>
              <p className="close-status" role="status" aria-live="polite">
                {status === "error" && (
                  <>
                    Didn&apos;t send. Try again, or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </>
                )}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
