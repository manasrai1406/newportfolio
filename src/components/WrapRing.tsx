"use client";

import { useEffect, useRef } from "react";

const PAD = 7;

/**
 * The "wrapping" ring that glides to and around hovered or focused controls.
 * Any element with a data-wrap attribute inside the ring's parent opts in.
 */
export default function WrapRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ref.current;
    const root = ring?.parentElement;
    if (!ring || !root) return;
    let visible = false;

    const show = (t: HTMLElement) => {
      const rr = root.getBoundingClientRect();
      const r = t.getBoundingClientRect();
      const br = parseFloat(getComputedStyle(t).borderTopLeftRadius) || 6;
      // When appearing from hidden, jump into place instead of gliding from the last spot.
      if (!visible) ring.style.transition = "opacity .3s ease, transform .45s cubic-bezier(.22,1,.36,1)";
      ring.style.left = `${r.left - rr.left - PAD}px`;
      ring.style.top = `${r.top - rr.top - PAD}px`;
      ring.style.width = `${r.width + PAD * 2}px`;
      ring.style.height = `${r.height + PAD * 2}px`;
      ring.style.borderRadius = `${br + PAD}px`;
      if (!visible) {
        void ring.offsetWidth;
        ring.style.transition = "";
      }
      ring.style.opacity = "1";
      ring.style.transform = "scale(1)";
      visible = true;
    };
    const hide = () => {
      ring.style.opacity = "0";
      ring.style.transform = "scale(.94)";
      visible = false;
    };
    const target = (e: Event) =>
      (e.target instanceof Element ? e.target.closest<HTMLElement>("[data-wrap]") : null);

    const onOver = (e: Event) => {
      const t = target(e);
      if (t) show(t);
    };
    const onOut = (e: Event) => {
      const t = target(e);
      const to = (e as FocusEvent | PointerEvent).relatedTarget;
      if (!t || (to instanceof Node && t.contains(to))) return;
      hide();
    };

    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerout", onOut);
    root.addEventListener("focusin", onOver);
    root.addEventListener("focusout", onOut);
    return () => {
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerout", onOut);
      root.removeEventListener("focusin", onOver);
      root.removeEventListener("focusout", onOut);
    };
  }, []);

  return <div ref={ref} className="wrap" aria-hidden="true" />;
}
