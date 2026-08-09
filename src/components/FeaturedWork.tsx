import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '../content';
import { featuredProjects, type Language } from '../data/projects';
import { SectionIndexNote } from './SectionIndexNote';

export function FeaturedWork({ language }: { language: Language }) {
  const text = copy[language].featured;

  return (
    <section className="featured section-shell" id="featured" aria-labelledby="featured-title">
      <header className="section-heading">
        <p className="eyebrow">{text.overline} / {String(featuredProjects.length).padStart(2, '0')}</p>
        <h2 id="featured-title">
          {text.titleLead}
          <span className="accent-word">{text.titleAccent}</span>
        </h2>
        <SectionIndexNote index={`01—${String(featuredProjects.length).padStart(2, '0')}`}>
          {text.body}
        </SectionIndexNote>
      </header>

      <div className="featured-stack">
        {featuredProjects.map((project, index) => (
          <article
            className="featured-card"
            key={project.id}
            style={{ '--card-index': index, '--project-accent': project.accent } as CSSProperties}
          >
            <img src={project.image} alt="" loading="lazy" decoding="async" />
            <div className="featured-shade" aria-hidden="true" />
            <div className="featured-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
            <div className="featured-content">
              <div className="project-kicker">
                <span>{project.category.toUpperCase()}</span>
                <span>APKMASON.DEV</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description[language]}</p>
              <div className="project-footer">
                <ul aria-label="Technologies">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <a href={project.link} target="_blank" rel="noreferrer">
                  {text.open}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
