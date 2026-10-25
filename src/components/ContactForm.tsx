"use client";

import { FormEvent, PointerEvent, useRef, useState } from "react";
import { isPlaceholder, site } from "@/data/site";

const PULL = 0.25; // how far the send button follows the cursor
const MAX = 8; // px

/** No backend: the form opens the visitor's mail app with the message filled in. */
export default function ContactForm() {
  const btn = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPlaceholder(site.email)) return;
    const f = new FormData(e.currentTarget);
    const subject = `Portfolio enquiry from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n${f.get("name")}\n${f.get("email")}`;
    const url = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    // Let the paper plane take off before the mail app takes focus.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => (window.location.href = url), reduce ? 0 : 550);
  };

  // Magnetic button: drifts a few px toward the cursor, springs back on leave.
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = Math.max(-MAX, Math.min(MAX, (e.clientX - r.left - r.width / 2) * PULL));
    const dy = Math.max(-MAX, Math.min(MAX, (e.clientY - r.top - r.height / 2) * PULL));
    e.currentTarget.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onLeave = () => {
    if (btn.current) btn.current.style.transform = "";
  };

  return (
    <form className="form" onSubmit={onSubmit} onInput={() => sent && setSent(false)}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="fullname">Full name</label>
          <input id="fullname" name="name" type="text" autoComplete="name" placeholder="Your Name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="content">Your Message</label>
        <textarea id="content" name="message" rows={5} placeholder="Tell me about your project," required aria-describedby="content-hint" />
        <p id="content-hint" className="hint">
          I&apos;ll never share your data with anyone else.
        </p>
      </div>
      <button ref={btn} className="submit" type="submit" data-wrap data-sent={sent || undefined} onPointerMove={onMove} onPointerLeave={onLeave}>
        <span className="submit-word">{sent ? "Opening your mail app…" : "Send Message"}</span>
        <svg className="plane" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
        </svg>
      </button>
      <p className="sr-only" aria-live="polite">
        {sent ? "Opening your mail app with your message." : ""}
      </p>
    </form>
  );
}
