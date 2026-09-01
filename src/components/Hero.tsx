import { useEffect, useMemo, useRef } from 'react';
import { projects } from '../data/projects';
import { useCopy } from '../i18n/language-context';
import { useAllowsHeavyMedia } from '../lib/hooks';
import { onScrollFrame } from '../lib/scrollFrame';
import { ArrowDown, ArrowUpRight } from './Icon';
import './hero.css';

export function Hero() {
  const text = useCopy().hero;
  const allowsVideo = useAllowsHeavyMedia();
  const sectionRef = useRef<HTMLElement>(null);

  const stats = useMemo(
    () =>
      [
        projects.length,
        projects.filter((project) => project.tags.includes('Scroll-driven')).length,
        projects.filter((project) => project.category === 'app').length,
      ] as const,
    [],
  );

  // Delikatny dryf kadru przy wyjściu z hero. Liczony wyłącznie dopóki sekcja
  // jest widoczna i zapisywany jako jedna zmienna CSS — bez odczytu layoutu.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !allowsVideo) return;

    return onScrollFrame((scrollY) => {
      const height = section.offsetHeight;
      if (scrollY > height) return;
      section.style.setProperty('--hero-exit', (scrollY / height).toFixed(3));
    });
  }, [allowsVideo]);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero__media" aria-hidden="true">
        {allowsVideo ? (
          <video
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            tabIndex={-1}
          >
            <source media="(max-width: 767px)" src="/hero-loop-mobile.mp4" type="video/mp4" />
            <source src="/hero-loop-desktop.mp4" type="video/mp4" />
          </video>
        ) : (
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero-poster-mobile.jpg" />
            <img src="/hero-poster.jpg" alt="" width="1280" height="720" fetchPriority="high" />
          </picture>
        )}
        <span className="hero__scrim" />
        <span className="hero__grain" />
      </div>

      <div className="hero__body shell">
        <div className="hero__lockup">
          <p className="hero__eyebrow mono">{text.eyebrow}</p>
          <h1 className="hero__title display">
            <span>{text.titleLead}</span>
            <span>{text.titleAccent}</span>
          </h1>
          <p className="hero__lede">{text.lede}</p>
          <div className="hero__actions">
            <a className="button button--solid" href="#selected">
              {text.primary}
              <ArrowDown size={17} />
            </a>
            <a className="button button--ghost" href="#contact">
              {text.secondary}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero__aside">
          <dl className="hero__stats">
            {stats.map((value, index) => (
              <div key={text.stats[index]}>
                <dt className="mono">{text.stats[index]}</dt>
                <dd>{String(value).padStart(2, '0')}</dd>
              </div>
            ))}
          </dl>
          <p className="hero__cue mono" aria-hidden="true">
            {text.scroll}
            <span className="hero__cue-line" />
          </p>
        </div>
      </div>

      {/* Pasek indeksu: wszystkie tytuły przesuwają się jak napisy końcowe.
          Tekst jest dekoracją, wejście do katalogu prowadzi przez jeden stały odnośnik. */}
      <div className="hero__ticker">
        <a className="hero__ticker-cta mono" href="#index">
          {text.tickerLabel}
          <ArrowUpRight size={14} />
        </a>
        <div className="hero__ticker-window">
          <div className="hero__ticker-track" aria-hidden="true">
            {[0, 1].map((copyIndex) => (
              <ul key={copyIndex}>
                {projects.map((project) => (
                  <li key={project.id}>
                    <i style={{ background: project.accent }} />
                    {project.title}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
