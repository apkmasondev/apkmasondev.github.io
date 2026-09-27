import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { stats } from '../data/projects';
import { useCopy, useLanguage } from '../i18n/language';
import { useAllowsHeavyMedia, useInView, useReveal } from '../lib/hooks';
import { plural } from '../lib/text';
import { Kicker, Lines } from './ui';
import './about.css';

export function About() {
  const text = useCopy().about;
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heavy = useAllowsHeavyMedia();
  const [frameRef, near] = useInView<HTMLDivElement>('300px 0px');
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useReveal(sectionRef);

  // Film montuje się dopiero, gdy portret zbliża się do kadru, i pauzuje poza nim.
  if (heavy && near && !mounted) setMounted(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (near) void video.play().catch(() => undefined);
    else video.pause();
  }, [near, mounted]);

  const numbers = [stats.total, stats.stories, stats.spatial, stats.apps];

  return (
    <section className="about section" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="about__grid shell">
        <figure className="about__portrait" data-reveal>
          <div className="about__frame" ref={frameRef}>
            <img src="/media/profile.jpg" alt={text.portraitAlt} width="641" height="1024" loading="lazy" decoding="async" />
            {mounted && (
              <video
                ref={videoRef}
                className={ready ? 'is-ready' : undefined}
                src="/media/profile.mp4"
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                onCanPlay={() => setReady(true)}
              />
            )}
            <span className="about__frame-shade" aria-hidden="true" />
          </div>
          <figcaption className="about__caption mono">
            <span>{text.caption[0]}</span>
            <span>{text.caption[1]}</span>
          </figcaption>
        </figure>

        <div className="about__body">
          <Kicker no="04">{text.kicker}</Kicker>
          <Lines lines={text.title} className="h2 about__title" id="about-title" />

          <div className="about__copy">
            <p className="about__lead" data-reveal>
              {text.p1}
            </p>
            <p data-reveal style={{ '--delay': '120ms' } as CSSProperties}>
              {text.p2}
            </p>
          </div>

          <dl className="about__stats" data-reveal>
            {numbers.map((value, index) => (
              <div key={text.stats[index][2]}>
                <dt className="mono">{plural(value, text.stats[index], lang)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="about__craft" data-reveal>
            <h3 className="mono">{text.craft}</h3>
            <ul>
              {text.capabilities.map((item, index) => (
                <li key={item}>
                  <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
