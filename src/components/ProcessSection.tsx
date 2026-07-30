import { copy } from '../content';
import type { Language } from '../data/projects';
import { ForgeArtifact } from './ForgeArtifact';

export function ProcessSection({ language }: { language: Language }) {
  const text = copy[language].process;

  return (
    <section className="process section-shell" id="process" aria-labelledby="process-title">
      <header className="process-intro">
        <p className="eyebrow">{text.overline}</p>
        <h2 id="process-title">
          <span>{text.titleLines[0]}</span>
          <span className="process-title-accent">
            <span>{text.titleLines[1]}</span>{' '}
            <span>{text.titleLines[2]}</span>
          </span>
        </h2>
        <p>{text.body}</p>
        <ForgeArtifact />
      </header>

      <ol className="process-list">
        {text.steps.map((step, index) => (
          <li key={step.title}>
            <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
            <span className="process-meta">{step.meta}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
