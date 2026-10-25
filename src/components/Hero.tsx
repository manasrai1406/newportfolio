import { Fragment } from "react";
import { href, isPlaceholder, site } from "@/data/site";
import Keyboard from "./Keyboard";
import Typewriter from "./Typewriter";

export default function Hero() {
  const name = site.name.split(" ").map((w, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {w}
    </Fragment>
  ));

  return (
    <section id="hero" className="hero">
      <div className="hero-copy">
        <p className="hero-hi blur1">Hi, I am</p>
        <h1 className="intro">
          <span className="name">{name}</span>
          <span className="shine" aria-hidden="true">
            {[0, 1, 2, 3].map((b) => (
              <span className="sw" key={b}>
                <span className="shine-in">{name}</span>
              </span>
            ))}
          </span>
        </h1>
        <Typewriter roles={site.roles} />
        <div className="hero-ctas rise0">
          <a className="btn btn-solid" href={href(site.resumeUrl)} download="Manas-Rai-Resume.pdf" data-wrap>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
              <path d="M14 3v5h5" />
            </svg>
            Resume
          </a>
          <div className="hero-row">
            <a className="btn btn-line tipwrap" href="#contact" aria-describedby="hiretip" data-wrap>
              Hire Me
              <span id="hiretip" role="tooltip" className="tip">
                pls 🥹 🙏
              </span>
            </a>
            {!isPlaceholder(site.socials.x) && (
              <a className="btn btn-line btn-icon" href={href(site.socials.x)} aria-label="X" data-wrap>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </a>
            )}
            <a className="btn btn-line btn-icon" href={href(site.socials.github)} aria-label="GitHub" data-wrap>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
              </svg>
            </a>
            <a className="btn btn-line btn-icon" href={href(site.socials.linkedin)} aria-label="LinkedIn" data-wrap>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Keyboard />

      <div className="bob" aria-hidden="true">
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <rect x="3" y="2" width="18" height="30" rx="9" />
          <path d="M12 9v6" />
        </svg>
      </div>
    </section>
  );
}
