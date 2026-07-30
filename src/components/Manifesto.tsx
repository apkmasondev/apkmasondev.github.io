import type { Language } from '../data/projects';
import { projects } from '../data/projects';
import { copy } from '../content';

export function Manifesto({ language }: { language: Language }) {
  const text = copy[language].intro;
  const storyCount = projects.filter((project) => project.category === 'story').length;

  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
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
          <div><strong>{String(storyCount).padStart(2, '0')}</strong><span>Scroll stories</span></div>
          <div><strong>03</strong><span>Product platforms</span></div>
          <div><strong>∞</strong><span>Curiosity</span></div>
        </div>
      </div>
    </section>
  );
}
