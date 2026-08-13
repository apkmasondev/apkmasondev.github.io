import { useEffect, useRef, type PointerEvent } from 'react';
import { copy } from '../content';
import type { Language } from '../data/projects';

export function AboutSection({ language }: { language: Language }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const text = copy[language].about;

  // Portret startuje z preload="none", żeby nie rywalizował o pasmo z filmem hero.
  // Pobieranie rusza dopiero, gdy sekcja zbliża się do widoku.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      video.preload = 'auto';
      video.load();
    }, { rootMargin: '300px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const playPortrait = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) video.currentTime = 0;
    video.play().catch(() => undefined);
  };

  const resetPortrait = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (video.readyState >= 1) video.currentTime = 0;
  };

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') playPortrait();
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') resetPortrait();
  };

  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <span className="about-wordmark" aria-hidden="true">APKMASON</span>

      <div className="about-portrait-shell">
        <button
          className="about-portrait"
          type="button"
          aria-label={language === 'pl' ? 'Odtwórz portret wideo' : 'Play video portrait'}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={playPortrait}
        >
          <video
            ref={videoRef}
            src="/profile.mp4"
            poster="/profile.jpg"
            preload="none"
            muted
            playsInline
            aria-hidden="true"
            onEnded={resetPortrait}
          />
          <span className="about-scanline" aria-hidden="true" />
          <div className="about-portrait-meta" aria-hidden="true">
            <span>SUBJECT / KRZYSZTOF</span>
            <span>SEQUENCE / 06S</span>
          </div>
        </button>
        <div className="about-axis" aria-hidden="true">
          <span>Structure</span>
          <i />
          <span>Imagination</span>
        </div>
      </div>

      <div className="about-copy">
        <p className="eyebrow">{text.overline}</p>
        <h2 id="about-title">
          <span className="about-title-lead">{text.titleLead}</span>
          <span className="about-title-after">
            {text.titleBridge}{' '}
            <span className="about-title-accent">{text.titleAccent}</span>
          </span>
        </h2>
        <div className="about-narrative">
          <p><span>01 / SCALE</span>{text.p1}</p>
          <p><span>02 / CURIOSITY</span>{text.p2}</p>
        </div>
        <ul aria-label="Capabilities">
          {text.capabilities.map((capability, index) => (
            <li key={capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
