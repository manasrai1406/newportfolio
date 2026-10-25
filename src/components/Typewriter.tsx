"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 90;
const HOLD_MS = 1500;
const ERASE_MS = 45;
const PAUSE_MS = 350;
const START_MS = 2400;

export default function Typewriter({ roles }: { roles: string[] }) {
  const [text, setText] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    let i = 0;
    let n = 0;
    let erasing = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = roles[i];
      if (!erasing) {
        n++;
        setText(word.slice(0, n));
        if (n === word.length) {
          erasing = true;
          t = setTimeout(tick, HOLD_MS);
          return;
        }
        t = setTimeout(tick, TYPE_MS);
      } else {
        n--;
        setText(word.slice(0, n));
        if (n === 0) {
          erasing = false;
          i = (i + 1) % roles.length;
          t = setTimeout(tick, PAUSE_MS);
          return;
        }
        t = setTimeout(tick, ERASE_MS);
      }
    };
    t = setTimeout(tick, START_MS);
    return () => clearTimeout(t);
  }, [roles]);

  if (reduced) {
    return <p className="role static">{roles.join(" · ")}</p>;
  }
  return (
    // aria-label is not reliably announced on a <p>, so the full list sits in a visually hidden span.
    <p className="role blur3">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}
