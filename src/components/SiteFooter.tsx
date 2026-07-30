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
        <span />
        <i />
        <div className="contact-orbit-middle">
          <b />
        </div>
        <div className="contact-orbit-inner">
          <u />
        </div>
      </div>
      <div className="footer-main section-shell">
        <p className="eyebrow">{contact.overline}</p>
        <h2>
          {contact.titleLead}
          <span className="accent-word">{contact.titleAccent}</span>
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
        <p>{footer.statement}</p>
        <p>© {new Date().getFullYear()} ApkMason.dev. {footer.legal}</p>
        <a href="#top">{footer.top} <ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
