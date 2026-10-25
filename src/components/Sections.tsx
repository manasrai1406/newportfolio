import Image from "next/image";
import { achievements, education, experience, href, isPlaceholder, projects, site, skills } from "@/data/site";
import AchievementCards from "./AchievementCards";
import ConnectCards from "./ConnectCards";

/** Connector between sections: line, travelling dot, node and "02 / Skills" label. */
export function Gap({ n, label }: { n: number; label: string }) {
  return (
    <div className="gap" aria-hidden="true">
      <i className="gl" />
      <i className="gd" />
      <i className="gn" />
      <span className="gt">
        {String(n).padStart(2, "0")} / {label}
      </span>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="hd">
      <span className="hd-out">{children}</span>
      <span className="hd-fill" aria-hidden="true">
        {children}
      </span>
    </h2>
  );
}

export function Experience() {
  return (
    <section id="experience" className="sec secfx exp">
      <Heading>Experience</Heading>
      <p className="sub">My professional journey.</p>
      <div className="timeline">
        {experience.map((j, i) => (
          <article className="card rise2" key={i}>
            <div className="card-head">
              <div>
                <h3>{j.role}</h3>
                <p className="card-meta">{j.company}</p>
              </div>
              <span className="date">{j.dates}</span>
            </div>
            <ul className="points">
              {j.points.map((p, k) => (
                <li key={k}>{p}</li>
              ))}
            </ul>
            <ul className="chips" aria-label="Skills used">
              {j.skills.map((s, k) => (
                <li className="chip" key={k}>
                  <span className="glyph" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="skills sep">
      <div className="skills-title">
        <h2>SKILLS</h2>
        <div className="fillt" aria-hidden="true">
          SKILLS
        </div>
      </div>
      <p className="sub">What I bring to every project.</p>

      <div className="marquee">
        {skills.marquee.map((row, r) => (
          <div className={r % 2 ? "drift rev" : "drift"} key={r}>
            {/* Items are doubled so the loop is seamless; the copy is hidden from screen readers. */}
            <ul className={r % 2 ? "marq rev" : "marq"} aria-label={r === 0 ? "Skills" : undefined} aria-hidden={r > 0 || undefined}>
              {[...row, ...row].map((label, i) => (
                <li
                  key={i}
                  className={(i % row.length + r) % 3 === 0 ? "pill filled" : "pill"}
                  aria-hidden={i >= row.length || undefined}
                >
                  <span className="glyph" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="cats">
        {skills.categories.map((c, i) => (
          <article className={`catcard ${i % 2 ? "flyr" : "flyl"}`} key={c.title}>
            <h3>{c.title}</h3>
            <div className="grow" aria-hidden="true" />
            <ul>
              {c.items.map((s, k) => (
                <li key={k}>{s}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="sec secfx ach">
      <Heading>Achievements</Heading>
      <p className="sub">Milestones worth a mention.</p>
      <AchievementCards items={achievements} />
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="sec secfx alt projs">
      <Heading>Projects</Heading>
      <div className="grid3">
        {projects.filter((p) => !isPlaceholder(p.title)).map((p, i) => {
          const main = isPlaceholder(p.liveUrl) ? p.repoUrl : p.liveUrl;
          const card = (
            <>
              {p.image ? (
                <Image className="proj proj-img" src={p.image} alt="" fill sizes="(max-width: 720px) 100vw, 400px" />
              ) : (
                <div className="proj proj-ph" aria-hidden="true">
                  [Project screenshot]
                </div>
              )}
              <div className="proj-cap">
                <span className="t">{p.title}</span>
                {p.tags[0] && <span className="c">{p.tags[0]}</span>}
              </div>
            </>
          );
          // Empty string = no link exists; a [placeholder] still renders as "#" until filled in.
          const links = [
            { url: p.repoUrl, label: "Code", aria: "source code" },
            { url: p.liveUrl, label: "Live", aria: "live demo" },
          ].filter((l) => l.url);
          return (
            <div className="proj-item rise2" key={i}>
              {main ? (
                <a className="projwrap" href={href(main)} aria-label={p.title}>
                  {card}
                </a>
              ) : (
                <div className="projwrap">{card}</div>
              )}
              <div className="proj-meta">
                <p>{p.description}</p>
                {links.length > 0 && (
                  <div className="proj-links">
                    {links.map((l) => (
                      <a key={l.label} className="link" href={href(l.url)} aria-label={`${p.title} ${l.aria}`}>
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="sec secfx alt edu">
      <Heading>Education</Heading>
      <p className="sub">Where I studied.</p>
      <div className="stack">
      {education.map((e, i) => (
        <article className="card card-head rise2" key={i}>
          <div>
            <h3>{e.degree}</h3>
            <p className="card-meta">
              {e.institution} · {e.grade}
            </p>
          </div>
          <span className="date">{e.years}</span>
        </article>
      ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="sec secfx contact">
      <Heading>
        Got an idea?
        <br />
        Let&apos;s connect.
      </Heading>
      <p className="sub">Book a quick call or send me a message, whichever suits you.</p>
      <ConnectCards />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <span>
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </span>
    </footer>
  );
}
