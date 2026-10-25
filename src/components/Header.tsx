"use client";

import { useEffect, useRef, useState } from "react";
import { href, isPlaceholder, nav, site } from "@/data/site";

const quickLinks = [
  { label: "GitHub", url: site.socials.github },
  { label: "LinkedIn", url: site.socials.linkedin },
  { label: "X", url: site.socials.x },
  { label: "Email", url: isPlaceholder(site.email) ? "" : `mailto:${site.email}` },
].filter((l) => !isPlaceholder(l.url));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0].href);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Track which section is on screen so the menu can mark it.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const links = () => Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    // Focus the current section's item, not always the first one.
    (panel.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]') ?? links()[0])?.focus({ preventScroll: true });

    const close = (refocus: boolean) => {
      setOpen(false);
      if (refocus) btn.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close(true);
      const items = links();
      const i = items.indexOf(document.activeElement as HTMLAnchorElement);
      const go = (n: number) => {
        e.preventDefault();
        items[(n + items.length) % items.length]?.focus();
      };
      if (e.key === "ArrowDown") go(i + 1);
      else if (e.key === "ArrowUp") go(i - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(items.length - 1);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !btn.current?.contains(t)) close(false);
    };
    const onFocus = (e: FocusEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !btn.current?.contains(t)) close(false);
    };
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 160) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <header className="hdr hdrin">
      <div className="hdr-left">
        <a href="#hero" className="logo" data-wrap aria-label={`${site.name}, back to top`}>
          <span className="cap" aria-hidden="true">
            <span className="cap-top">
              {site.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </span>
        </a>
        {site.openToWork && (
          <a href="#contact" className="open" data-wrap>
            <span className="open-pill">
              <span className="open-dot" aria-hidden="true" />
              <span className="open-long">Open to opportunities</span>
              <span className="open-short">Open to work</span>
            </span>
          </a>
        )}
      </div>
      <div className="hdr-right">
        <button
          ref={btn}
          type="button"
          className="menu-btn"
          data-wrap
          data-open={open || undefined}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-word" aria-hidden="true">
            <span>Menu</span>
            <span>Close</span>
          </span>
          <span className="menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* Always mounted so it can animate out; inert keeps it out of the tab order while closed. */}
      <div ref={panel} id="site-menu" className="menu-panel" data-open={open || undefined} inert={!open}>
        <nav aria-label="Sections">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={item.href} aria-current={active === item.href || undefined} onClick={() => setOpen(false)}>
                  <span className="num" aria-hidden="true">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span className="lbl">{item.label}</span>
                  <svg className="arr" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {quickLinks.length > 0 && (
          <div className="menu-foot" style={{ "--i": nav.length } as React.CSSProperties}>
            {quickLinks.map((l) => (
              <a key={l.label} href={href(l.url)} {...(l.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
