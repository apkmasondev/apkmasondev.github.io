import { useEffect, useRef, useState } from 'react';
import { HERO_CODE, SECTIONS } from '../i18n/copy';
import { useCopy, useLanguage } from '../i18n/language-context';
import { useFocusTrap, useMediaQuery, useScrollLock } from '../lib/hooks';
import { onScrollFrame } from '../lib/scrollFrame';
import { Close, MenuLines } from './Icon';
import './site-nav.css';

interface SiteNavProps {
  activeSection: string;
}

export function SiteNav({ activeSection }: SiteNavProps) {
  const { language, setLanguage } = useLanguage();
  const text = useCopy();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 900px)');

  // Na desktopie menu pełnoekranowe nie istnieje, więc jego stan jest tam po prostu
  // pomijany — nie trzeba go zerować przy zmianie szerokości okna.
  const sheetOpen = menuOpen && !isDesktop;

  useScrollLock(sheetOpen);
  const menuRef = useFocusTrap<HTMLDivElement>(sheetOpen);

  // Jedna subskrypcja obsługuje kompaktową nawigację i pasek postępu.
  // Wysokość dokumentu mierzymy przy zmianie układu, nie w każdej klatce.
  useEffect(() => {
    let scrollable = 0;
    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    measure();

    const stop = onScrollFrame((scrollY) => {
      setCompact(scrollY > 24);
      const progress = scrollable > 0 ? Math.min(1, scrollY / scrollable) : 0;
      barRef.current?.style.setProperty('--scroll-progress', progress.toFixed(4));
    });

    return () => {
      resizeObserver.disconnect();
      stop();
    };
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sheetOpen]);

  const activeCode =
    SECTIONS.find((section) => section.id === activeSection)?.code ?? HERO_CODE;

  return (
    <header className={`nav${compact ? ' is-compact' : ''}${sheetOpen ? ' is-open' : ''}`}>
      <div className="nav__bar" ref={barRef}>
        <a className="nav__brand" href="#top" onClick={() => setMenuOpen(false)}>
          <img src="/logo.svg" alt="" width="30" height="30" />
          <span>
            APKMASON<em>.DEV</em>
          </span>
        </a>

        {/* Licznik rolki: pokazuje, w której części katalogu jesteś. */}
        <p className="nav__reel mono" aria-hidden="true">
          <span className="nav__reel-dash" />
          {activeCode}
        </p>

        <nav className="nav__links" aria-label="Primary">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {text.nav[section.id]}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__lang mono"
            onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
            aria-label={text.nav.language}
          >
            <span className={language === 'pl' ? 'is-active' : ''}>PL</span>
            <i aria-hidden="true" />
            <span className={language === 'en' ? 'is-active' : ''}>EN</span>
          </button>

          <button
            type="button"
            className="nav__menu-button"
            aria-expanded={sheetOpen}
            aria-controls="site-menu"
            aria-label={sheetOpen ? text.nav.close : text.nav.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {sheetOpen ? <Close size={22} /> : <MenuLines size={22} />}
          </button>
        </div>

        <span className="nav__progress" aria-hidden="true" />
      </div>

      <div className="nav__sheet" id="site-menu" hidden={!sheetOpen} ref={menuRef}>
        <nav className="nav__sheet-links" aria-label={text.nav.label}>
          {SECTIONS.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
              <span className="mono">{String(index + 1).padStart(2, '0')}</span>
              {text.nav[section.id]}
            </a>
          ))}
        </nav>
        <a className="nav__sheet-mail mono" href={`mailto:${text.contact.emailValue}`}>
          {text.contact.emailValue}
        </a>
      </div>
    </header>
  );
}
