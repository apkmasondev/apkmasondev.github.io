import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { stats } from '../data/projects';
import { YOUTUBE_URL } from '../i18n/copy';
import { useCopy, useLanguage } from '../i18n/language';
import { useAllowsHeavyMedia, useFinePointer, useReveal } from '../lib/hooks';
import { plural } from '../lib/text';
import { ArrowUpRight, Kicker, Lines, Youtube } from './ui';
import './about.css';

/**
 * Scena maskotki: robot APKMason unosi się nad świecącą „podłogą”, na komputerze
 * lekko odwraca się za kursorem, a kliknięty podskakuje. Cały ruch jest
 * dekoracją — przy ograniczonym ruchu zostaje nieruchoma ilustracja.
 */
function MascotStage({ alt, hello, label }: { alt: string; hello: string; label: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const heavy = useAllowsHeavyMedia();
  const [hop, setHop] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !finePointer || !heavy) return;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      stage.style.setProperty('--tilt-x', x.toFixed(4));
      stage.style.setProperty('--tilt-y', y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    // Kierunek kursora względem środka sceny, ograniczony do −1…1.
    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 1.2)));
      ty = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 1.2)));
      start();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      start();
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [finePointer, heavy]);

  return (
    <div className="mascot" ref={stageRef} onClick={() => setHop((value) => value + 1)}>
      <span className="mascot__glow" aria-hidden="true" />
      <span className="mascot__floor" aria-hidden="true" />
      <p className="mascot__label mono" aria-hidden="true">
        {label}
      </p>
      <div className="mascot__float">
        {/* Klucz z licznikiem kliknięć restartuje animację podskoku przy każdym kliknięciu. */}
        <div className="mascot__hop" key={hop} data-hop={hop > 0}>
          <img
            className="mascot__img"
            src="/media/mascot-wave-560.webp"
            srcSet="/media/mascot-wave-560.webp 560w, /media/mascot-wave-960.webp 960w"
            sizes="(max-width: 960px) min(80vw, 420px), 32vw"
            alt={alt}
            width="560"
            height="581"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
      <p className="mascot__bubble" aria-hidden="true">
        {hello}
      </p>
    </div>
  );
}

export function About() {
  const text = useCopy().about;
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef);

  const numbers = [stats.total, stats.stories, stats.spatial, stats.apps];

  return (
    <section className="about section" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="about__grid shell">
        <div className="about__aside" data-reveal>
          <MascotStage {...text.mascot} />
          <a className="channel" href={YOUTUBE_URL} target="_blank" rel="noopener">
            <span className="channel__icon" aria-hidden="true">
              <Youtube size={22} />
            </span>
            <span className="channel__text">
              <span className="channel__label mono">{text.channel.label}</span>
              <span className="channel__name">{text.channel.name}</span>
              <span className="channel__handle mono">{text.channel.handle}</span>
            </span>
            <span className="channel__cta mono">
              {text.channel.cta}
              <ArrowUpRight size={14} />
            </span>
            <span className="sr-only"> {text.channel.newTab}</span>
          </a>
        </div>

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
