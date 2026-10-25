"use client";

import { useEffect } from "react";

/**
 * Feeds the cursor position into any element with data-glow as --mx / --my (px, relative to the element),
 * which its CSS spotlight and border light follow. One delegated listener, throttled to a frame; mouse only.
 */
export default function HoverGlow() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const run = () => {
      raf = 0;
      const card = last?.target instanceof Element ? last.target.closest<HTMLElement>("[data-glow]") : null;
      if (!card || !last) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${last.clientX - r.left}px`);
      card.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!raf) raf = requestAnimationFrame(run);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
