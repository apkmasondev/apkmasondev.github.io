import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Language } from '../data/projects';
import { copy } from '../content';

interface SiteHeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function SiteHeader({ language, onLanguageChange }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const text = copy[language];

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    document.documentElement.classList.toggle('menu-open', menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${compact ? ' is-compact' : ''}${menuOpen ? ' is-open' : ''}`}>
      <a className="brand" href="#top" aria-label="APKMason.dev">
        <img src="/logo.svg" alt="" width="38" height="38" />
        <span>APKMASON<em>.DEV</em></span>
      </a>

      <nav className="desktop-nav" aria-label="Primary">
        <a href="#featured">{text.nav.work}</a>
        <a href="#archive">{text.nav.archive}</a>
        <a href="#process">{text.nav.process}</a>
        <a href="#about">{text.nav.about}</a>
      </nav>

      <div className="header-actions">
        <button
          className="language-button"
          type="button"
          onClick={() => onLanguageChange(language === 'pl' ? 'en' : 'pl')}
          aria-label={text.a11y.language}
        >
          {language === 'pl' ? 'EN' : 'PL'}
        </button>
        <a className="header-contact" href="#contact">{text.nav.contact}</a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? text.a11y.menuClose : text.a11y.menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile">
        <a href="#featured" onClick={closeMenu}>01 <span>{text.nav.work}</span></a>
        <a href="#archive" onClick={closeMenu}>02 <span>{text.nav.archive}</span></a>
        <a href="#process" onClick={closeMenu}>03 <span>{text.nav.process}</span></a>
        <a href="#about" onClick={closeMenu}>04 <span>{text.nav.about}</span></a>
        <a href="#contact" onClick={closeMenu}>05 <span>{text.nav.contact}</span></a>
      </nav>
    </header>
  );
}
