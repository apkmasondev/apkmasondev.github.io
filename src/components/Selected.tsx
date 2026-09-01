import type { CSSProperties } from 'react';
import { featuredProjects, type Project } from '../data/projects';
import { SECTIONS } from '../i18n/copy';
import { useCopy, useLanguage } from '../i18n/language-context';
import { useParallax, usePrefersReducedMotion, useReveal } from '../lib/hooks';
import { ArrowUpRight } from './Icon';
import './selected.css';

const SECTION_CODE = SECTIONS[0].code;

function SelectedEntry({ project, index }: { project: Project; index: number }) {
  const { language } = useLanguage();
  const text = useCopy().selected;
  const reducedMotion = usePrefersReducedMotion();
  const frameRef = useParallax<HTMLDivElement>(!reducedMotion);
  const revealRef = useReveal<HTMLDivElement>();

  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      className="reel__entry"
      style={{ '--accent': project.accent } as CSSProperties}
      aria-labelledby={`selected-${project.id}`}
    >
      <div className="reel__stage" ref={frameRef}>
        <span className="reel__glow" aria-hidden="true" />
        <figure className="reel__frame">
          <img
            src={project.image}
            alt=""
            width="1254"
            height="1254"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <span className="reel__number" aria-hidden="true">
          {number}
        </span>
      </div>

      <div className="reel__caption" data-reveal ref={revealRef}>
        <p className="reel__kicker mono">
          <span>{text.counter}</span>
          <i aria-hidden="true" />
          <span>
            {number} / {String(featuredProjects.length).padStart(2, '0')}
          </span>
        </p>
        <h3 className="reel__title display" id={`selected-${project.id}`}>
          {project.title}
        </h3>
        <p className="reel__body">{project.description[language]}</p>
        <ul className="reel__tags mono" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a
          className="link-underline reel__link"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          {text.open}
          <ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}

export function Selected() {
  const text = useCopy().selected;
  const headerRef = useReveal<HTMLElement>();

  return (
    <section className="reel" id="selected" aria-labelledby="selected-title">
      <header className="reel__header shell" data-reveal ref={headerRef}>
        <p className="section-mark mono">{SECTION_CODE}</p>
        <h2 className="display" id="selected-title">
          {text.title}
        </h2>
        <p className="lede">{text.lede}</p>
      </header>

      <div className="reel__list shell">
        {featuredProjects.map((project, index) => (
          <SelectedEntry key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
