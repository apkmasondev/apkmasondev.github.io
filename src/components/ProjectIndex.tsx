import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import {
  projects,
  type Language,
  type Project,
  type ProjectCategory,
} from '../data/projects';
import { SECTIONS } from '../i18n/copy';
import { useCopy, useLanguage } from '../i18n/language-context';
import { useMediaQuery, useReveal } from '../lib/hooks';
import { ArrowUpRight, Close, Search } from './Icon';
import './project-index.css';

const SECTION_CODE = SECTIONS[1].code;
const FILTERS = ['all', 'story', 'spatial', 'app', 'product', 'experiment'] as const;

type Filter = (typeof FILTERS)[number];

function matchesQuery(project: Project, query: string, language: Language) {
  const haystack = [
    project.title,
    project.category,
    project.description[language],
    ...project.tags,
  ]
    .join(' ')
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

function projectNumber(project: Project) {
  return String(projects.indexOf(project) + 1).padStart(2, '0');
}

/**
 * Podgląd z przenikaniem. Poprzednia klatka zostaje pod spodem do następnej zmiany,
 * więc w DOM nigdy nie ma więcej niż dwóch obrazów i nie potrzeba żadnego efektu.
 */
function PreviewStage({ project, previous }: { project: Project; previous: Project | null }) {
  return (
    <div className="index__preview">
      {previous && (
        <img
          key={previous.id}
          src={previous.image}
          alt=""
          width="1254"
          height="1254"
          decoding="async"
        />
      )}
      <img
        key={project.id}
        className="is-entering"
        src={project.image}
        alt=""
        width="1254"
        height="1254"
        loading="lazy"
        decoding="async"
      />
      <span className="index__preview-frame" aria-hidden="true" />
    </div>
  );
}

interface ViewProps {
  visible: Project[];
  activeProject: Project;
  previousProject: Project | null;
  onActivate: (project: Project) => void;
}

function IndexTable({ visible, activeProject, previousProject, onActivate }: ViewProps) {
  const { language } = useLanguage();
  const text = useCopy().index;
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLAnchorElement>());

  // Kreska odczytu przesuwa się do aktywnego wiersza. Pomiar zdarza się tylko
  // przy zmianie wyboru, nigdy w pętli przewijania.
  useLayoutEffect(() => {
    const list = listRef.current;
    const row = rowRefs.current.get(activeProject.id);
    if (!list || !row) return;

    list.style.setProperty('--scan-y', `${row.offsetTop}px`);
    list.style.setProperty('--scan-h', `${row.offsetHeight}px`);
  }, [activeProject, visible]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLOListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    const rows = Array.from(listRef.current?.querySelectorAll('a') ?? []);
    const index = rows.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;

    event.preventDefault();
    const next = rows[index + (event.key === 'ArrowDown' ? 1 : -1)];
    next?.focus();
  };

  return (
    <div className="index__layout" style={{ '--accent': activeProject.accent } as CSSProperties}>
      <div className="index__stage">
        <PreviewStage project={activeProject} previous={previousProject} />
        <div className="index__readout">
          <p className="index__readout-meta mono">
            <span>{projectNumber(activeProject)}</span>
            <i aria-hidden="true" />
            <span>{text.filters[activeProject.category]}</span>
          </p>
          <p className="index__readout-body">{activeProject.description[language]}</p>
          <ul className="index__readout-tags mono" aria-label="Technologies">
            {activeProject.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a
            className="link-underline index__readout-link"
            href={activeProject.link}
            target="_blank"
            rel="noreferrer"
            aria-label={text.openLabel(activeProject.title)}
          >
            {text.open}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="index__rows" ref={listRef}>
        <span className="index__scan" aria-hidden="true" />
        <ol onKeyDown={onKeyDown} aria-label={text.listLabel}>
          {visible.map((project) => (
            <li key={project.id}>
              <a
                className={`index__row${project.id === activeProject.id ? ' is-active' : ''}`}
                style={{ '--accent': project.accent } as CSSProperties}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={text.openLabel(project.title)}
                onMouseEnter={() => onActivate(project)}
                onFocus={() => onActivate(project)}
                ref={(element) => {
                  if (element) rowRefs.current.set(project.id, element);
                  else rowRefs.current.delete(project.id);
                }}
              >
                <span className="index__row-number mono">{projectNumber(project)}</span>
                <span className="index__row-title">
                  {project.featured && (
                    <>
                      <i className="index__row-star" aria-hidden="true" />
                      <span className="sr-only">{text.selectedMark}</span>
                    </>
                  )}
                  {project.title}
                </span>
                <span className="index__row-category mono">{text.filters[project.category]}</span>
                <ArrowUpRight className="index__row-arrow" size={17} />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function IndexAccordion({ visible }: { visible: Project[] }) {
  const { language } = useLanguage();
  const text = useCopy().index;
  const [openId, setOpenId] = useState<string | null>(null);
  const panelPrefix = useId();

  return (
    <ul className="index__accordion" aria-label={text.listLabel}>
      {visible.map((project) => {
        const open = openId === project.id;
        const panelId = `${panelPrefix}-${project.id}`;

        return (
          <li key={project.id} style={{ '--accent': project.accent } as CSSProperties}>
            <h3>
              <button
                type="button"
                className={`index__toggle${open ? ' is-open' : ''}`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : project.id)}
              >
                <span className="index__row-number mono">{projectNumber(project)}</span>
                <span className="index__toggle-title">
                  {project.featured && (
                    <>
                      <i className="index__row-star" aria-hidden="true" />
                      <span className="sr-only">{text.selectedMark}</span>
                    </>
                  )}
                  {project.title}
                </span>
                <span className="index__toggle-category mono">
                  {text.filters[project.category]}
                </span>
                <span className="index__toggle-sign" aria-hidden="true" />
              </button>
            </h3>

            <div className="index__panel" id={panelId} hidden={!open}>
              <img
                src={project.image}
                alt=""
                width="1254"
                height="1254"
                loading="lazy"
                decoding="async"
              />
              <p>{project.description[language]}</p>
              <ul className="index__panel-tags mono" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className="link-underline"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={text.openLabel(project.title)}
              >
                {text.open}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ProjectIndex() {
  const { language } = useLanguage();
  const text = useCopy().index;
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const headerRef = useReveal<HTMLElement>();
  const searchRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState<{ current: Project; previous: Project | null }>(
    () => ({ current: projects[0], previous: null }),
  );

  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          (filter === 'all' || project.category === filter) &&
          (query === '' || matchesQuery(project, query, language)),
      ),
    [filter, query, language],
  );

  const counts = useMemo(() => {
    const byCategory = {} as Record<ProjectCategory, number>;
    for (const project of projects) {
      byCategory[project.category] = (byCategory[project.category] ?? 0) + 1;
    }
    return { all: projects.length, ...byCategory };
  }, []);

  // Wybór jest wyliczany, nie synchronizowany: jeśli filtr usunie zaznaczoną pozycję,
  // podgląd sam schodzi na pierwszy widoczny wynik.
  const activeProject =
    visible.find((project) => project.id === selection.current.id) ?? visible[0] ?? projects[0];
  const previousProject =
    activeProject.id === selection.current.id ? selection.previous : null;

  const activate = useCallback((project: Project) => {
    setSelection((current) =>
      current.current.id === project.id ? current : { current: project, previous: current.current },
    );
  }, []);

  const reset = useCallback(() => {
    setQuery('');
    setFilter('all');
  }, []);

  // Ukośnik otwiera wyszukiwarkę — tak jak w narzędziach, z których korzysta się codziennie.
  useEffect(() => {
    if (!isDesktop) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === 'INPUT' || target?.isContentEditable;

      if (event.key === '/' && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
      } else if (event.key === 'Escape' && target === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDesktop]);

  return (
    <section className="index" id="index" aria-labelledby="index-title">
      <header className="index__header shell" data-reveal ref={headerRef}>
        <p className="section-mark mono">{SECTION_CODE}</p>
        <h2 className="display" id="index-title">
          {text.titleLead}
          <span className="index__title-accent">{text.titleAccent}</span>
        </h2>
        <p className="lede">{text.lede}</p>
      </header>

      <div className="index__toolbar-wrap">
        <div className="index__toolbar shell">
        <div className="index__search">
          <Search size={16} />
          <input
            ref={searchRef}
            type="search"
            value={query}
            placeholder={text.searchPlaceholder}
            aria-label={text.searchLabel}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query !== '' && (
            <button type="button" onClick={() => setQuery('')} aria-label={text.clear}>
              <Close size={15} />
            </button>
          )}
        </div>

        <div className="index__filters" role="group" aria-label={text.filtersLabel}>
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? 'is-active' : ''}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {text.filters[item]}
              <span className="mono">{String(counts[item] ?? 0).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

          <p className="index__results mono" aria-live="polite">
            {text.results(visible.length, projects.length)}
          </p>
        </div>
      </div>

      <div className="index__body shell">
        {visible.length === 0 ? (
          <div className="index__empty">
            <p>{text.empty(query.trim())}</p>
            <button type="button" className="link-underline" onClick={reset}>
              {text.emptyAction}
            </button>
          </div>
        ) : isDesktop ? (
          <IndexTable
            visible={visible}
            activeProject={activeProject}
            previousProject={previousProject}
            onActivate={activate}
          />
        ) : (
          <IndexAccordion visible={visible} />
        )}
      </div>

      {isDesktop && (
        <p className="index__hint mono shell" aria-hidden="true">
          {text.hint}
        </p>
      )}
    </section>
  );
}
