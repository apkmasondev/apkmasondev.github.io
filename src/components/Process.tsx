import { useEffect, useRef, type CSSProperties } from 'react';
import { useCopy } from '../i18n/language';
import { clamp, onFrame } from '../lib/frame';
import { useReveal } from '../lib/hooks';
import { Kicker, Lines } from './ui';
import './process.css';

export function Process() {
  const text = useCopy().process;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useReveal(sectionRef);

  // Aktywny jest krok, który minął linię odczytu na 55% wysokości okna;
  // pionowa kreska postępu rośnie razem z nią. Poza kadrem sekcji pętla stoi,
  // a atrybuty i zmienne są zapisywane tylko wtedy, gdy się zmieniają.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = [...list.querySelectorAll<HTMLElement>('.step')];
    let lastProgress = '';

    return onFrame((_, vh) => {
      const listRect = list.getBoundingClientRect();
      if (listRect.bottom < -vh || listRect.top > vh * 2) return;
      const line = vh * 0.55;
      const tops = steps.map((step) => step.getBoundingClientRect().top);
      let active = 0;
      tops.forEach((top, index) => {
        if (top < line) active = index;
      });
      const progress = clamp((line - listRect.top) / listRect.height).toFixed(3);
      if (progress !== lastProgress) {
        lastProgress = progress;
        list.style.setProperty('--progress', progress);
      }
      steps.forEach((step, index) => {
        const state = index === active ? 'active' : index < active ? 'done' : 'next';
        if (step.dataset.state !== state) step.dataset.state = state;
      });
    });
  }, []);

  const [ai, human] = text.balance;

  return (
    <section className="process section" id="process" ref={sectionRef} aria-labelledby="process-title">
      <div className="process__grid shell">
        <div className="process__aside">
          <Kicker no="03">{text.kicker}</Kicker>
          <Lines lines={text.title} className="h2 process__title" id="process-title" />
          <p className="lede" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
            {text.lede}
          </p>
          <div className="process__balance" data-reveal style={{ '--delay': '320ms' } as CSSProperties}>
            <p>
              <span className="process__dot process__dot--ai" aria-hidden="true" />
              {ai}
            </p>
            <p>
              <span className="process__dot process__dot--human" aria-hidden="true" />
              {human}
            </p>
          </div>
        </div>

        <ol className="process__steps" ref={listRef}>
          {text.steps.map((step, index) => (
            <li className="step" key={step.title} data-reveal>
              <span className="step__no" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="step__body">
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.body}</p>
                <p className="step__meta mono">{step.meta}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
