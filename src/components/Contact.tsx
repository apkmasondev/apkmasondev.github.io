import { SECTIONS } from '../i18n/copy';
import { useCopy } from '../i18n/language-context';
import { useReveal } from '../lib/hooks';
import { ArrowUp, ArrowUpRight, Mail } from './Icon';
import './contact.css';

const SECTION_CODE = SECTIONS[4].code;

export function Contact() {
  const text = useCopy().contact;
  const mainRef = useReveal<HTMLDivElement>();

  return (
    <footer className="contact" id="contact">
      <div className="contact__main shell" data-reveal ref={mainRef}>
        <p className="section-mark mono">{SECTION_CODE}</p>
        <h2 className="display">
          {text.titleLead}
          <span className="contact__title-accent">{text.titleAccent}</span>
        </h2>
        <p className="lede">{text.lede}</p>

        <div className="contact__actions">
          <a className="button button--solid" href={`mailto:${text.emailValue}`}>
            <Mail size={17} />
            {text.email}
          </a>
          <a className="button button--ghost" href={text.githubUrl} target="_blank" rel="noreferrer">
            {text.github}
            <ArrowUpRight size={17} />
          </a>
        </div>

        <a className="contact__address mono" href={`mailto:${text.emailValue}`}>
          {text.emailValue}
        </a>
      </div>

      {/* Znak zamykający — nazwa czytana jako ostatnia klatka, nie jako ozdoba. */}
      <p className="contact__wordmark" aria-hidden="true">
        APKMASON
      </p>

      <div className="contact__bottom shell">
        <p className="contact__signature mono">
          <span>APK /</span>
          {text.signature.map((word) => (
            <span key={word}>
              <strong>{word.charAt(0)}</strong>
              {word.slice(1)}
            </span>
          ))}
        </p>
        <p className="contact__legal mono">
          © {new Date().getFullYear()} APKMason.dev. {text.legal}
        </p>
        <a className="contact__top mono" href="#top">
          {text.top}
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
