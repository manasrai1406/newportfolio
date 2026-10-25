"use client";

import { useEffect, useState } from "react";
import type { achievements as Achievements } from "@/data/site";

// Matches the point where the grid drops to a single column.
const STACKED = "(max-width: 719px)";

/** Whether the grid is a single column; false during server render, so desktop markup is the default. */
function useStacked() {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(STACKED);
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return stacked;
}

/**
 * Achievement grid. Side by side (tablet, desktop) every card shows in full. Stacked on phones, cards
 * collapse to number, tag and title; tapping the title drops the details open, one card at a time.
 */
export default function AchievementCards({ items }: { items: typeof Achievements }) {
  const stacked = useStacked();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid3">
      {items.map((a) => {
        const isOpen = !stacked || open === a.number;
        const bodyId = `ach-detail-${a.number}`;
        return (
          <article className="catcard ach-card rise2" data-glow data-collapsible={stacked || undefined} data-open={isOpen || undefined} key={a.number}>
            <span className="ach-num" aria-hidden="true">
              {a.number}
              <span className="ach-num-fill">{a.number}</span>
            </span>
            <span className="tag">{a.tag}</span>
            <h3>
              {stacked ? (
                <button type="button" className="ach-toggle" aria-expanded={isOpen} aria-controls={bodyId} onClick={() => setOpen(isOpen ? null : a.number)}>
                  <span>{a.title}</span>
                  <span className="ach-chev" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              ) : (
                a.title
              )}
            </h3>
            {/* Drops open by animating the grid row 0fr -> 1fr; inert keeps a closed card's link out of reach. */}
            <div className="ach-detail" id={bodyId} inert={!isOpen}>
              <div className="ach-detail-in">
                <p>{a.description}</p>
                {a.url && (
                  <a className="ach-link" href={a.url} target="_blank" rel="noreferrer">
                    {a.linkLabel ?? "View"}
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
