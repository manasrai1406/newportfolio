"use client";

import { useEffect } from "react";

const REVEAL = ".rise2, .flyl, .flyr, .hd, .fillt, .grow, .gap";

/**
 * 1. Scroll velocity: sets --sa (speed 0..1), --sd (direction +1/-1) and --so (offset)
 *    on <html>; the gap connectors read them. Eases back to calm when scrolling stops.
 * 2. Fallback for browsers without CSS scroll-driven animations (Firefox): adds .io to
 *    <html> and .in to elements as they enter the viewport, which plays time-based versions.
 */
export default function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    // Only the connectors read these, so set them there: writing them on <html> restyled the whole page every frame.
    const gaps = Array.from(document.querySelectorAll<HTMLElement>(".gap"));
    const setVar = (name: string, value: string) => gaps.forEach((g) => g.style.setProperty(name, value));

    let last: number | null = null;
    let vel = 0;
    let off = 0;
    let dir = 1;
    let raf = 0;
    const loop = () => {
      raf = 0;
      vel *= 0.9;
      if (Math.abs(vel) > 0.2) dir = vel > 0 ? 1 : -1;
      const sa = Math.min(Math.abs(vel) / 40, 1);
      setVar("--sa", sa.toFixed(3));
      setVar("--sd", String(dir));
      setVar("--so", off.toFixed(1));
      if (Math.abs(vel) > 0.05) raf = requestAnimationFrame(loop);
      else setVar("--sa", "0");
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (last !== null) {
        const d = y - last;
        if (Math.abs(d) < 400) {
          vel += (d - vel) * 0.35;
          off += d * 0.6;
        }
      }
      last = y;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | undefined;
    if (!CSS.supports("animation-timeline: view()")) {
      // Stagger cards that share a grid.
      document.querySelectorAll<HTMLElement>(".rise2").forEach((el) => {
        const i = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
        el.style.setProperty("--i", String(Math.max(i, 0) % 3));
      });
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      document.querySelectorAll(REVEAL).forEach((el) => io?.observe(el));
      html.classList.add("io");
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io?.disconnect();
      html.classList.remove("io");
    };
  }, []);

  return null;
}
