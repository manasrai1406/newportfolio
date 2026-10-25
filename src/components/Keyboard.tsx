import { keyboard } from "@/data/site";
import type { CSSProperties } from "react";

const COLORS = ["#e8890c", "#1e88d8", "#e5421c", "#6b3fa0", "#1fb5c8", "#1da84a", "#2b2c30", "#0f7a8f", "#d6203f", "#d9a90f", "#1c8fd6", "#16a34a"];
const COLS = 6;

/** Pure-CSS 3D keyboard: 3 rows x 6 keys, each with a periodic lift (the wave) and hover key travel. */
export default function Keyboard() {
  const rows = Array.from({ length: Math.ceil(keyboard.length / COLS) }, (_, r) => keyboard.slice(r * COLS, r * COLS + COLS));

  return (
    <div className="kbstage" aria-hidden="true">
      <div className="breathe" />
      <div className="orbit orbitA" />
      <div className="orbit orbitB" />
      <div className="kbscale">
        <div className="kbfloat">
          <div className="kbboard">
            <div className="sheen">
              <i />
            </div>
            {rows.map((row, r) => (
              <div className="kbrow" key={r}>
                {row.map((k, c) => {
                  const i = r * COLS + c;
                  return (
                    <div className="kc" key={k.label} style={{ "--c": COLORS[(i * 5) % COLORS.length] } as CSSProperties}>
                      {/* Stationary hover target at the key top's resting height. The moving key ignores the
                          pointer, so pressing it down can't slide it out from under the cursor and re-trigger. */}
                      <span className="khit" />
                      <div className="kp" style={{ animationDelay: `${(r * 0.35 + c * 0.09).toFixed(2)}s` }}>
                        {/* No right-hand face: the board's tilt never shows it, and the extra
                            3D layers nearly halved the frame rate. */}
                        <b className="ks s0"><i /></b>
                        <b className="ks s2"><i /></b>
                        <b className="ks s3"><i /></b>
                        <div className="kt">
                          {k.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`/icons/${k.icon}.svg`} alt="" width={29} height={29} />
                          ) : (
                            <span>{k.label}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
