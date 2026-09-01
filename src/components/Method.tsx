import { SECTIONS } from '../i18n/copy';
import { useCopy } from '../i18n/language-context';
import { useReveal } from '../lib/hooks';
import './method.css';

const SECTION_CODE = SECTIONS[2].code;

export function Method() {
  const text = useCopy().method;
  const headerRef = useReveal<HTMLElement>();
  const ratioRef = useReveal<HTMLDivElement>();
  const stepsRef = useReveal<HTMLOListElement>();

  return (
    <section className="method" id="method" aria-labelledby="method-title">
      <div className="method__top shell">
        <header className="method__intro" data-reveal ref={headerRef}>
          <p className="section-mark mono">{SECTION_CODE}</p>
          <h2 className="display" id="method-title">
            <span>{text.titleLines[0]}</span>{' '}
            <span className="method__title-accent">{text.titleLines[1]}</span>
          </h2>
        </header>

        <div className="method__ratio" data-reveal ref={ratioRef}>
          <p className="lede method__lede">{text.lede}</p>
          {/* Proporcja z tekstu obok, narysowana: prędkość maszyny i ostatnie 20% rzemiosła. */}
          <div className="method__bar" aria-hidden="true">
            <span className="method__bar-ai" />
            <span className="method__bar-human" />
          </div>
          <dl className="method__bar-legend mono">
            <div>
              <dt>{text.ratioAi}</dt>
              <dd>80%</dd>
            </div>
            <div>
              <dt>{text.ratioHuman}</dt>
              <dd>20%</dd>
            </div>
          </dl>
        </div>
      </div>

      <ol className="method__steps shell" data-reveal ref={stepsRef}>
        {text.steps.map((step, index) => (
          <li key={step.title}>
            <p className="method__step-number mono">{String(index + 1).padStart(2, '0')}</p>
            <h3>{step.title}</h3>
            <p className="method__step-body">{step.body}</p>
            <p className="method__step-meta mono">{step.meta}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
