import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { featuredProjects, imageSrc, imageSrcSet, type Project } from '../data/projects';
import { useCopy, useLanguage } from '../i18n/language';
import { clamp, onFrame } from '../lib/frame';
import { useReveal } from '../lib/hooks';
import { projectHref } from '../lib/route';
import { isPlainClick, splitTitle } from '../lib/text';
import { ArrowUpRight, Kicker, Lines } from './ui';
import './work.css';

interface WorkProps {
  onOpen: (id: string) => void;
}

function Chapter({ project, index, onOpen }: { project: Project; index: number; onOpen: (id: string) => void }) {
  const { lang } = useLanguage();
  const text = useCopy();
  const [main, sub] = splitTitle(project.title);
  const total = String(featuredProjects.length).padStart(2, '0');

  const openDetails = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onOpen(project.id);
  };

  return (
    <article
      className="chapter"
      data-side={index % 2 ? 'left' : 'right'}
      style={{ '--accent': project.accent } as CSSProperties}
      aria-labelledby={`chapter-${project.id}`}
    >
      <div className="chapter__card">
        <div className="chapter__grid shell">
          <div className="chapter__info" data-reveal>
            <p className="chapter__index mono">
              <span className="chapter__no">{String(index + 1).padStart(2, '0')}</span>
              <span className="chapter__total">/ {total}</span>
              <span className="chapter__cat">{text.categories[project.category]}</span>
            </p>
            <h3 className="h3 chapter__title" id={`chapter-${project.id}`}>
              {main}
              {sub && <em> {sub}</em>}
            </h3>
            <p className="chapter__desc">{project.description[lang]}</p>
            <ul className="chapter__tags" aria-label={text.sheet.stack}>
              {project.tags.map((tag) => (
                <li className="chip" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <div className="chapter__actions">
              <a className="btn btn--ember" href={project.link} target="_blank" rel="noopener">
                {text.work.live}
                <ArrowUpRight size={17} />
              </a>
              <a className="btn btn--ghost" href={projectHref(project.id)} onClick={openDetails}>
                {text.work.details}
              </a>
            </div>
          </div>

          <a
            className="chapter__media"
            href={project.link}
            target="_blank"
            rel="noopener"
            tabIndex={-1}
            aria-hidden="true"
            data-cursor={text.work.cursor}
          >
            <span className="chapter__glow" />
            <span className="chapter__frame shot">
              <img
                src={imageSrc(project, 1254)}
                srcSet={imageSrcSet(project)}
                sizes="(max-width: 900px) 92vw, min(56vw, 78svh)"
                alt=""
                width="1254"
                height="1254"
                loading="lazy"
                decoding="async"
              />
            </span>
          </a>
        </div>
        <span className="chapter__shade" aria-hidden="true" />
      </div>
    </article>
  );
}

export function Work({ onOpen }: WorkProps) {
  const text = useCopy().work;
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef);

  // Każdy rozdział wie, jak bardzo przykrywa go następny (--cover) i jak daleko
  // sam wszedł w kadr (--enter). Najpierw wszystkie odczyty, potem zapisy —
  // i tylko zmienione wartości. Poza kadrem sekcji oraz na telefonie (gdzie
  // rozdziały się nie nakładają) pętla nie robi nic.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const chapters = [...stack.querySelectorAll<HTMLElement>('.chapter')];
    const stacked = window.matchMedia('(min-width: 901px)');
    const written = new Map<HTMLElement, string>();

    return onFrame((_, vh) => {
      if (!stacked.matches) return;
      const bounds = stack.getBoundingClientRect();
      if (bounds.bottom < -vh || bounds.top > vh * 2) return;
      const tops = chapters.map((chapter) => chapter.getBoundingClientRect().top);
      chapters.forEach((chapter, index) => {
        const next = tops[index + 1];
        const cover = next === undefined ? 0 : clamp(1 - next / vh);
        const enter = clamp(1 - tops[index] / vh);
        const value = `${cover.toFixed(3)}|${enter.toFixed(3)}`;
        if (written.get(chapter) === value) return;
        written.set(chapter, value);
        chapter.style.setProperty('--cover', cover.toFixed(3));
        chapter.style.setProperty('--enter', enter.toFixed(3));
      });
    });
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef} aria-labelledby="work-title">
      <header className="work__head shell">
        <Kicker no="01">{text.kicker}</Kicker>
        <div className="work__head-row">
          <Lines lines={text.title} className="h2" id="work-title" />
          <p className="lede" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
            {text.lede}
          </p>
        </div>
      </header>

      <div className="work__stack" ref={stackRef}>
        {featuredProjects.map((project, index) => (
          <Chapter key={project.id} project={project} index={index} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
