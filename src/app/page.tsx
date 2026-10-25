import Header from "@/components/Header";
import HoverGlow from "@/components/HoverGlow";
import Hero from "@/components/Hero";
import ScrollFx from "@/components/ScrollFx";
import { Achievements, Contact, Education, Experience, Footer, Gap, Projects, Skills } from "@/components/Sections";
import WrapRing from "@/components/WrapRing";
import type { CSSProperties } from "react";

// [x %, y %, size px, alpha] — the starfield from the design.
const STARS = [
  [12, 8, 1, 0.55], [78, 14, 1, 0.4], [34, 22, 1.5, 0.5], [91, 31, 1, 0.35],
  [55, 5, 1, 0.45], [6, 41, 1.5, 0.4], [68, 47, 1, 0.3], [22, 63, 1, 0.4],
  [84, 72, 1.5, 0.35], [47, 85, 1, 0.4], [15, 93, 1, 0.3], [73, 96, 1, 0.4],
];

export default function Home() {
  return (
    <div className="root">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="stars" aria-hidden="true">
        {STARS.map(([x, y, s, a], i) => (
          <i
            key={i}
            className="twinkle"
            style={{ left: `${x}%`, top: `${y}%`, "--s": `${s}px`, "--a": a, animationDelay: `${-i * 0.9}s` } as CSSProperties}
          />
        ))}
      </div>
      <WrapRing />
      <ScrollFx />
      <HoverGlow />
      <Header />
      <main id="main">
        <Hero />
        <Gap n={1} label="Experience" />
        <Experience />
        <Gap n={2} label="Skills" />
        <Skills />
        <Gap n={3} label="Projects" />
        <Projects />
        <Gap n={4} label="Achievements" />
        <Achievements />
        <Gap n={5} label="Education" />
        <Education />
        <Gap n={6} label="Contact" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
