import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { hostOf, imageSrc, imageSrcSet, platformOf, projects } from '../data/projects';
import { useCopy, useLanguage } from '../i18n/language';
import { useFocusTrap, useScrollLock } from '../lib/hooks';
import { splitTitle } from '../lib/text';
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from './ui';
import './sheet.css';

interface SheetProps {
  id: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function ProjectSheet({ id, onClose, onNavigate }: SheetProps) {
  const text = useCopy();
  const { lang } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const open = id !== null;

  // Po zamknięciu panel trzyma ostatni projekt, żeby animacja wyjścia miała treść.
  const [shownId, setShownId] = useState(id);
  if (id && id !== shownId) setShownId(id);

  useScrollLock(open);
  useFocusTrap(open, panelRef);

  const index = Math.max(0, projects.findIndex((project) => project.id === shownId));
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Przy przejściu do innego projektu treść wraca na górę. Na desktopie przewija
  // się kolumna opisu, na telefonie cały arkusz — zerujemy oba.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    panelRef.current?.scrollTo({ top: 0 });
  }, [shownId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft' && !event.altKey) {
        onNavigate(prev.id);
      } else if (event.key === 'ArrowRight' && !event.altKey) {
        onNavigate(next.id);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, onNavigate, prev.id, next.id]);

  if (!project) return null;
  const [main, sub] = splitTitle(project.title);

  return (
    <div className="sheet" data-open={open} inert={!open} style={{ '--accent': project.accent } as CSSProperties}>
      <button className="sheet__backdrop" type="button" tabIndex={-1} aria-hidden="true" onClick={onClose} />

      <div
        className="sheet__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        tabIndex={-1}
      >
        <div className="sheet__media">
          <span className="sheet__glow" aria-hidden="true" />
          <a
            className="sheet__frame shot"
            href={project.link}
            target="_blank"
            rel="noopener"
            tabIndex={-1}
            aria-hidden="true"
            data-cursor={text.work.cursor}
          >
            <img
              key={project.id}
              src={imageSrc(project, 1254)}
              srcSet={imageSrcSet(project)}
              sizes="(max-width: 900px) 100vw, 780px"
              alt=""
              width="1254"
              height="1254"
              decoding="async"
            />
          </a>
        </div>

        <div className="sheet__body" ref={bodyRef}>
          <div className="sheet__top">
            <p className="mono sheet__counter">
              <span>{String(index + 1).padStart(2, '0')}</span> / {projects.length}
            </p>
            <button className="icon-btn" type="button" onClick={onClose} aria-label={text.sheet.close}>
              <Close size={18} />
            </button>
          </div>

          <div className="sheet__content" key={project.id}>
            <p className="sheet__badges">
              <span className="chip">{text.categories[project.category]}</span>
              {project.featured && <span className="chip sheet__featured">{text.sheet.featured}</span>}
            </p>
            <h2 className="sheet__title" id="sheet-title">
              {main}
              {sub && <em> {sub}</em>}
            </h2>
            <p className="sheet__desc">{project.description[lang]}</p>

            <dl className="sheet__meta">
              <div>
                <dt className="mono">{text.sheet.platform}</dt>
                <dd>{text.platforms[platformOf(project)]}</dd>
              </div>
              <div>
                <dt className="mono">{text.sheet.stack}</dt>
                <dd>{project.tags.join(' · ')}</dd>
              </div>
              <div>
                <dt className="mono">{text.sheet.address}</dt>
                <dd className="sheet__host">{hostOf(project)}</dd>
              </div>
            </dl>

            <a className="btn sheet__launch" href={project.link} target="_blank" rel="noopener">
              {text.sheet.launch}
              <ArrowUpRight size={17} />
            </a>
          </div>

          <nav className="sheet__nav" aria-label={`${text.sheet.prev} / ${text.sheet.next}`}>
            {[
              { item: prev, label: text.sheet.prev, icon: <ArrowLeft size={16} />, dir: 'prev' },
              { item: next, label: text.sheet.next, icon: <ArrowRight size={16} />, dir: 'next' },
            ].map(({ item, label, icon, dir }) => (
              <button
                key={dir}
                type="button"
                className={`sheet__step sheet__step--${dir}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="sheet__step-thumb shot" aria-hidden="true">
                  <img src={imageSrc(item, 480)} alt="" width="480" height="480" loading="lazy" decoding="async" />
                </span>
                <span className="sheet__step-text">
                  <span className="mono">
                    {dir === 'prev' && icon}
                    {label}
                    {dir === 'next' && icon}
                  </span>
                  <span className="sheet__step-title">{splitTitle(item.title)[0]}</span>
                </span>
              </button>
            ))}
          </nav>
          <p className="sheet__keys mono" aria-hidden="true">
            {text.sheet.keys}
          </p>
        </div>
      </div>
    </div>
  );
}
