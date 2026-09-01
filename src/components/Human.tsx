import { useEffect, useRef, type PointerEvent } from 'react';
import { SECTIONS } from '../i18n/copy';
import { useCopy } from '../i18n/language-context';
import { usePrefersReducedMotion, useReveal } from '../lib/hooks';
import './human.css';

const SECTION_CODE = SECTIONS[3].code;

export function Human() {
  const text = useCopy().human;
  const videoRef = useRef<HTMLVideoElement>(null);
  const portraitRef = useReveal<HTMLDivElement>();
  const copyRef = useReveal<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  // Portret startuje z preload="none", żeby nie rywalizował o pasmo z hero.
  // Pobieranie rusza dopiero, gdy sekcja zbliża się do widoku.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        video.preload = 'auto';
        video.load();
      },
      { rootMargin: '300px' },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const play = () => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (video.readyState >= 1) video.currentTime = 0;
    void video.play().catch(() => undefined);
  };

  const reset = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (video.readyState >= 1) video.currentTime = 0;
  };

  const onPointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') play();
  };

  const onPointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') reset();
  };

  return (
    <section className="human" id="human" aria-labelledby="human-title">
      <div className="human__grid shell">
        <div className="human__portrait-shell" data-reveal ref={portraitRef}>
          <button
            type="button"
            className="human__portrait"
            aria-label={text.portrait}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={play}
          >
            <video
              ref={videoRef}
              src="/profile.mp4"
              poster="/profile.jpg"
              preload="none"
              muted
              playsInline
              aria-hidden="true"
              onEnded={reset}
            />
            <span className="human__scan" aria-hidden="true" />
            <span className="human__portrait-meta mono" aria-hidden="true">
              <span>{text.portraitMeta[0]}</span>
              <span>{text.portraitMeta[1]}</span>
            </span>
          </button>
        </div>

        <div className="human__copy" data-reveal ref={copyRef}>
          <p className="section-mark mono">{SECTION_CODE}</p>
          <h2 className="display" id="human-title">
            <span>{text.titleLead}</span>{' '}
            <span className="human__title-accent">{text.titleAccent}</span>
          </h2>
          <div className="human__narrative">
            <p>{text.p1}</p>
            <p>{text.p2}</p>
          </div>
          <div className="human__capabilities">
            <p className="mono">{text.capabilitiesLabel}</p>
            <ul>
              {text.capabilities.map((capability, index) => (
                <li key={capability}>
                  <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
