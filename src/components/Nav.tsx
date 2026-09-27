import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EMAIL, SECTIONS, type SectionId } from '../i18n/copy';
import { useCopy, useLanguage } from '../i18n/language';
import { onFrame } from '../lib/frame';
import { useFocusTrap, useScrollLock } from '../lib/hooks';
import { ArrowUpRight, Mark } from './ui';
import './nav.css';

export function Nav({ active }: { active: string }) {
  const text = useCopy().nav;
  const { lang, toggle } = useLanguage();
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(open, menuRef);

  // Pasek chowa się przy przewijaniu w dół i wraca przy każdym ruchu w górę.
  // Stan zapisywany jest jako atrybuty — bez renderu Reacta w pętli scrolla.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;
    let lastY = window.scrollY;
    root.dataset.nav = 'shown';
    // Atrybuty zmieniają się rzadko — zapis tylko przy zmianie, żeby nie
    // unieważniać stylów w każdej klatce przewijania.
    const set = (element: HTMLElement, key: string, value: string) => {
      if (element.dataset[key] !== value) element.dataset[key] = value;
    };
    return onFrame((y, vh) => {
      const max = root.scrollHeight - vh;
      bar.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0');
      set(bar, 'solid', String(y > 24));
      if (Math.abs(y - lastY) > 6) {
        const hidden = y > lastY && y > vh * 0.6;
        set(bar, 'hidden', String(hidden));
        // Przyklejone paski (np. filtry archiwum) ustępują miejsca widocznej nawigacji.
        set(root, 'nav', hidden ? 'hidden' : 'shown');
        lastY = y;
      }
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const langButton = (
    <button className="nav__lang mono" type="button" onClick={toggle} aria-label={text.language}>
      <span data-active={lang === 'pl'}>PL</span>
      <span aria-hidden="true">/</span>
      <span data-active={lang === 'en'}>EN</span>
    </button>
  );

  return (
    <>
      <header className="nav" ref={barRef} data-open={open}>
        <div className="nav__inner shell">
          <a className="nav__brand" href="#top" aria-label={text.home} onClick={() => setOpen(false)}>
            <Mark size={30} />
            <span className="nav__word">
              APKMason<span>.dev</span>
            </span>
          </a>

          <nav className="nav__links" aria-label={text.label}>
            <ul>
              {SECTIONS.filter((section) => section.id !== 'contact').map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={active === section.id ? 'location' : undefined}
                  >
                    <sup className="mono">{section.no}</sup>
                    {text[section.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__end">
            {langButton}
            <a className="nav__cta" href="#contact">
              {text.cta}
              <ArrowUpRight size={15} />
            </a>
            <button
              className="nav__burger"
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="mono">{open ? text.close : text.menu}</span>
              <span className="nav__burger-lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
        <span className="nav__progress" aria-hidden="true" />
      </header>

      <div
        className="menu"
        id="site-menu"
        ref={menuRef}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label={text.label}
        inert={!open}
      >
        <nav className="menu__inner shell">
          <ul className="menu__list">
            {SECTIONS.map((section, index) => (
              <li key={section.id} style={{ '--i': index } as CSSProperties}>
                <a href={`#${section.id}`} onClick={() => setOpen(false)}>
                  <span className="mono">{section.no}</span>
                  {text[section.id as SectionId]}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            {langButton}
            <a className="mono" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
