import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { copy } from '../content';
import type { Language } from '../data/projects';
import { SignalCaption } from './SignalCaption';

export function SiteFooter({ language }: { language: Language }) {
  const contact = copy[language].contact;
  const footer = copy[language].footer;

  return (
    <footer className="site-footer" id="contact">
      <div className="contact-orbit" aria-hidden="true">
        <span className="contact-orbit-core" />
        <span className="contact-orbit-satellite contact-orbit-satellite--outer" />
        <div className="contact-orbit-ring contact-orbit-ring--middle">
          <span className="contact-orbit-satellite contact-orbit-satellite--middle" />
        </div>
        <div className="contact-orbit-ring contact-orbit-ring--inner">
          <span className="contact-orbit-satellite contact-orbit-satellite--inner" />
        </div>
      </div>
      <div className="footer-main section-shell">
        <p className="eyebrow">{contact.overline}</p>
        <h2>
          {contact.titleLead}
          <span className="footer-title-accent">{contact.titleAccent}</span>
        </h2>
        <SignalCaption className="footer-signal-caption">{contact.body}</SignalCaption>
        <div className="contact-links">
          <a className="contact-primary" href="mailto:apkmason.dev@gmail.com">
            <Mail aria-hidden="true" /> {contact.email}
          </a>
          <a href="https://github.com/apkmasondev" target="_blank" rel="noreferrer">
            {contact.github} <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <div className="footer-brand">
          <img src="/logo.svg" alt="" width="32" height="32" />
          <span>APKMASON<em>.DEV</em></span>
        </div>
        <p className="footer-signature" aria-label={`APK — ${footer.signature.join(', ')}`}>
          <span className="footer-signature-mark" aria-hidden="true">APK /</span>
          <span className="footer-signature-words" aria-hidden="true">
            {footer.signature.map((word) => (
              <span className="footer-signature-word" key={word}>
                <strong>{word.charAt(0)}</strong>{word.slice(1)}
              </span>
            ))}
          </span>
        </p>
        <p>© {new Date().getFullYear()} ApkMason.dev. {footer.legal}</p>
        <a href="#top">{footer.top} <ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
