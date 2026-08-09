import type { Language } from '../data/projects';
import { projects } from '../data/projects';
import { copy } from '../content';

export function Manifesto({ language }: { language: Language }) {
  const text = copy[language].intro;
  const scrollStoryCount = projects.filter((project) => project.tags.includes('Scroll-driven')).length;
  const appCount = projects.filter((project) => project.category === 'app').length;

  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <picture className="manifesto-art" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/manifesto-faultline-mobile.webp" />
        <img
          src="/manifesto-faultline-desktop.webp"
          alt=""
          width="1664"
          height="935"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="section-shell">
        <div className="section-index">
          <span>{text.overline}</span>
          <span>001—{String(projects.length).padStart(3, '0')}</span>
        </div>
        <div className="manifesto-copy">
          <h2 id="manifesto-title">
            <span>{text.line1}</span>
            <span>{text.line2}</span>
          </h2>
          <div className="manifesto-statement">
            <span>HUMAN CURATED / AI ACCELERATED</span>
            <p>{text.body}</p>
          </div>
        </div>
        <div className="proof-strip" aria-label="Portfolio statistics">
          <div><strong>{String(projects.length).padStart(2, '0')}</strong><span>Digital projects</span></div>
          <div><strong>{String(scrollStoryCount).padStart(2, '0')}</strong><span>Scroll stories</span></div>
          <div><strong>{String(appCount).padStart(2, '0')}</strong><span>Product apps</span></div>
          <div><strong>∞</strong><span>Curiosity</span></div>
        </div>
      </div>
    </section>
  );
}
