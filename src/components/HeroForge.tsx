import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { Language } from '../data/projects';
import { copy } from '../content';
import { SignalCaption } from './SignalCaption';

interface HeroForgeProps {
  language: Language;
}

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

function canLoadHeroVideo() {
  if (typeof window === 'undefined') return false;

  const connection = (navigator as NavigatorWithConnection).connection;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !connection?.saveData;
}

export function HeroForge({ language }: HeroForgeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeStage, setActiveStage] = useState(-1);
  const [shouldLoadVideo] = useState(canLoadHeroVideo);
  const text = copy[language].hero;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (!shouldLoadVideo) {
      section.style.setProperty('--hero-progress', '0');
      return;
    }

    let previousStage = -1;
    const update = () => {
      frameRef.current = null;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const stage = progress < 0.16
        ? -1
        : Math.min(3, Math.floor(((progress - 0.16) / 0.84) * 4));

      section.style.setProperty('--hero-progress', progress.toFixed(4));
      if (stage !== previousStage) {
        previousStage = stage;
        setActiveStage(stage);
      }

      if (Number.isFinite(video.duration) && video.duration > 0 && video.readyState >= 2) {
        const targetTime = Math.min(video.duration - 0.04, progress * video.duration);
        if (Math.abs(video.currentTime - targetTime) > 0.025) {
          video.currentTime = targetTime;
        }
      }
    };

    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };
    const primeVideo = () => {
      video.currentTime = 0.001;
      requestUpdate();
    };

    update();
    video.addEventListener('loadedmetadata', primeVideo, { once: true });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', primeVideo);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [shouldLoadVideo]);

  return (
    <section
      className={`hero-forge${shouldLoadVideo ? '' : ' is-static'}`}
      id="top"
      ref={sectionRef}
      aria-label={`${text.titleLead} ${text.titleAccent}`}
    >
      <div className="hero-sticky">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          preload={shouldLoadVideo ? 'auto' : 'none'}
          poster="/hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          {shouldLoadVideo && (
            <>
              <source media="(max-width: 767px)" src="/hero-monolith-mobile.mp4" type="video/mp4" />
              <source src="/hero-monolith-desktop.mp4" type="video/mp4" />
            </>
          )}
        </video>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div className={`hero-opening${activeStage === -1 ? ' is-active' : ''}`}>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>
            <span>{text.titleLead}</span>
            <span>{text.titleAccent}</span>
          </h1>
          <SignalCaption className="hero-subtitle-lockup" textClassName="hero-subtitle">
            {text.subtitle}
          </SignalCaption>
          <div className="hero-coordinates" aria-hidden="true">
            <span>INDEPENDENT / PORTFOLIO 2026</span>
            <span>HUMAN DIRECTED — AI ACCELERATED</span>
          </div>
        </div>

        <div className="hero-stage-wrap" aria-live="polite">
          {text.stages.map((stage, index) => (
            <div className={`hero-stage${activeStage === index ? ' is-active' : ''}`} key={stage.label}>
              <span>{stage.label}</span>
              <h2>{stage.title}</h2>
              <SignalCaption className="hero-stage-caption">{stage.body}</SignalCaption>
            </div>
          ))}
        </div>

        <div className="hero-progress" aria-hidden="true">
          <span />
          <i />
        </div>

        <div className={`scroll-cue${activeStage === -1 ? ' is-visible' : ''}`}>
          <span>{text.scroll}</span>
          <ArrowDown size={16} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
