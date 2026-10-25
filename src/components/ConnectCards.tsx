"use client";

import { useEffect, useRef, useState } from "react";
import { experience, isPlaceholder, site } from "@/data/site";
import ContactForm from "./ContactForm";

function Icon({ children, size = 18 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

/** Live local time in India, rendered only after mount so server and client HTML match. */
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const time = now?.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true });
  return <>{time ?? "--:--"}</>;
}

/** Mirrors the mail card: the same header layout, then one slim row holding the host and the booking action. */
function CallCard() {
  const job = experience[0];
  const { url, minutes } = site.booking;
  const external = !isPlaceholder(url);
  // No booking page yet: the button emails a call request instead, so it still works.
  const action = external ? url : `mailto:${site.email}?subject=${encodeURIComponent(`${minutes}-minute intro call request`)}`;

  return (
    <article className="call flyl" aria-labelledby="call-title">
      <div className="card-top">
        <p className="kicker">
          <Icon size={16}>
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <path d="M16 10l6-3v10l-6-3" />
          </Icon>
          Video call · Google Meet · {minutes} min
        </p>
        <h3 id="call-title" className="card-title">
          {minutes}-minute intro call
        </h3>
        <p className="card-lead">A focused chat about your project, role or idea. Slots show in your time zone, and the Meet link comes with the invite.</p>
        <span className="card-badge" aria-hidden="true">
          <Icon size={18}>
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <path d="M16 10l6-3v10l-6-3" />
          </Icon>
        </span>
      </div>

      <div className="card-row host">
        <span className="cap host-cap" aria-hidden="true">
          <span className="cap-top">
            {site.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        </span>
        <div className="host-who">
          <strong>{site.name}</strong>
          {job && <span>{`${job.role}, ${job.company.split(" · ")[0].replace(/^.*\((.+)\)$/, "$1")}`}</span>}
        </div>
        <span className="host-time">
          <span className="open-dot" aria-hidden="true" />
          <LocalTime /> IST
        </span>
        <a className="call-btn" href={action} data-wrap {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {external ? "Book a call" : "Request a call"}
          <Icon size={16}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </Icon>
        </a>
      </div>
    </article>
  );
}

function MailCard() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hasEmail = !isPlaceholder(site.email);

  // On open, move focus into the form; Esc folds it back up.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => body.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && body.current?.contains(document.activeElement)) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <article className="mail flyr" data-open={open || undefined}>
      <button ref={toggle} type="button" className="mail-head card-top" aria-expanded={open} aria-controls="mail-body" onClick={() => setOpen((o) => !o)}>
        <span className="kicker">
          <Icon size={16}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </Icon>
          Personal email
        </span>
        <span className="card-title">Send a message</span>
        <span className="card-lead">Prefer writing? Open the form, and your mail app will have the message ready to send.</span>
        <span className="card-badge mail-chev" aria-hidden="true">
          <Icon size={18}>
            <path d="M6 9l6 6 6-6" />
          </Icon>
        </span>
      </button>

      {hasEmail && (
        <div className="card-row mail-addr">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <button type="button" className="mail-copy" data-wrap data-copied={copied || undefined} onClick={copy} aria-label="Copy email address">
            <span className="copy-word">Copy</span>
            <span className="copy-done">Copied!</span>
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied" : ""}
          </span>
        </div>
      )}

      {/* Drops open by animating the grid row from 0fr to 1fr; inert keeps it out of reach while closed. */}
      <div ref={body} id="mail-body" className="mail-body" inert={!open}>
        <div className="mail-inner">
          <ContactForm />
        </div>
      </div>
    </article>
  );
}

export default function ConnectCards() {
  return (
    <div className="connect">
      <CallCard />
      <MailCard />
    </div>
  );
}
