import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import {
  CATEGORIES,
  imageSrc,
  imageSrcSet,
  platformOf,
  projects,
  type Project,
  type ProjectCategory,
} from '../data/projects';
import { useCopy, useLanguage } from '../i18n/language';
import { useFinePointer, useReducedMotion, useReveal } from '../lib/hooks';
import { projectHref } from '../lib/route';
import { isPlainClick, normalize, splitTitle } from '../lib/text';
import { ArrowUpRight, Close, GridIcon, Kicker, Lines, ListIcon, Search } from './ui';
import './archive.css';

type Filter = 'all' | ProjectCategory;
type View = 'list' | 'grid';

const VIEW_KEY = 'apkmason-archive-view';
const numberOf = new Map(projects.map((project, index) => [project.id, String(index + 1).padStart(2, '0')]));

function readView(): View | null {
  try {
    const stored = localStorage.getItem(VIEW_KEY);
    return stored === 'list' || stored === 'grid' ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Podgląd podążający za kursorem nad listą — z bezwładnością i lekkim przechyłem.
 * Dopóki podgląd jest ukryty, nasłuch tylko zapamiętuje pozycję kursora: żadnych
 * pomiarów układu ani pętli animacji.
 */
function CursorPreview({ active, visible }: { active: string | null; visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(visible);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let target: Element | null = null;
    let x = pointerX;
    let y = pointerY;
    let raf = 0;

    // Podgląd nigdy nie zasłania tytułu wskazanego wiersza: w poziomie zaczyna
    // się za jego końcem i nie wychodzi poza prawą krawędź okna.
    const targetX = () => {
      const name = target?.closest?.('.row')?.querySelector('.row__name');
      const width = (node.firstElementChild as HTMLElement | null)?.offsetWidth ?? 320;
      const after = name ? name.getBoundingClientRect().right + 8 : pointerX;
      return Math.min(Math.max(pointerX, after), window.innerWidth - width - 64);
    };

    const tick = () => {
      const tx = targetX();
      const dx = tx - x;
      const dy = pointerY - y;
      x += dx * 0.14;
      y += dy * 0.14;
      const tilt = Math.max(-8, Math.min(8, dx * 0.05));
      node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
      raf = visibleRef.current && Math.abs(dx) + Math.abs(dy) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      target = event.target as Element | null;
      if (visibleRef.current) start();
    };

    // Po pojawieniu się podgląd startuje z miejsca kursora, a nie z poprzedniej pozycji.
    const onShow = () => {
      x = targetX();
      y = pointerY;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    node.addEventListener('preview:show', onShow);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      node.removeEventListener('preview:show', onShow);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const wasVisible = visibleRef.current;
    visibleRef.current = visible;
    if (visible && !wasVisible) ref.current?.dispatchEvent(new Event('preview:show'));
  }, [visible]);

  return (
    <div className="preview" ref={ref} data-visible={visible} aria-hidden="true">
      <div className="preview__inner">
        {projects.map((project) => (
          <img
            key={project.id}
            src={imageSrc(project, 480)}
            alt=""
            width="480"
            height="480"
            decoding="async"
            loading="lazy"
            data-active={project.id === active}
          />
        ))}
      </div>
    </div>
  );
}

function Title({ project }: { project: Project }) {
  const [main, sub] = splitTitle(project.title);
  return (
    <>
      {main}
      {sub && <em> {sub}</em>}
    </>
  );
}

export function Archive({ onOpen }: { onOpen: (id: string) => void }) {
  const text = useCopy();
  const { lang } = useLanguage();
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [view, setViewState] = useState<View>(() => readView() ?? 'list');
  const [hovered, setHovered] = useState<string | null>(null);
  const [overList, setOverList] = useState(false);

  useReveal(sectionRef);

  const setView = (next: View) => {
    setViewState(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {
      /* preferencja widoku jest tylko wygodą */
    }
  };

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { all: projects.length, story: 0, spatial: 0, product: 0, app: 0, experiment: 0 };
    projects.forEach((project) => (result[project.category] += 1));
    return result;
  }, []);

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return projects.filter((project) => {
      if (filter !== 'all' && project.category !== filter) return false;
      if (!needle) return true;
      const haystack = normalize(
        [project.title, project.description[lang], project.tags.join(' '), text.categories[project.category], text.platforms[platformOf(project)]].join(' '),
      );
      return needle.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [filter, query, lang, text]);

  // „/” skacze do wyszukiwarki z dowolnego miejsca strony.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable="true"], [role="dialog"]')) return;
      event.preventDefault();
      searchRef.current?.focus({ preventScroll: true });
      searchRef.current?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [reduced]);

  const open = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onOpen(id);
  };

  const reset = () => {
    setFilter('all');
    setQuery('');
  };

  // Lista montuje się od nowa (z animacją wejścia) tylko przy zmianie widoku albo
  // kategorii. Wpisywanie w wyszukiwarkę jedynie filtruje istniejące wiersze.
  const listKey = `${view}-${filter}`;
  const showPreview = finePointer && view === 'list' && overList && hovered !== null;

  return (
    <section className="archive section" id="archive" ref={sectionRef} aria-labelledby="archive-title">
      <div className="shell">
        <header className="archive__head">
          <Kicker no="02">{text.archive.kicker}</Kicker>
          <div className="archive__head-row">
            <Lines lines={text.archive.title} className="h2" id="archive-title" />
            <p className="lede" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
              {text.archive.lede}
            </p>
          </div>
        </header>

        <div className="archive__bar" data-reveal>
          <div className="archive__filters" role="group" aria-label={text.archive.filtersLabel}>
            {(['all', ...CATEGORIES] as Filter[]).map((key) => (
              <button
                key={key}
                type="button"
                className="archive__filter"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {key === 'all' ? text.archive.all : text.categories[key]}
                <sup className="mono">{counts[key]}</sup>
              </button>
            ))}
          </div>

          <div className="archive__tools">
            <div className="archive__search">
              <Search size={17} />
              <label className="sr-only" htmlFor={searchId}>
                {text.archive.searchLabel}
              </label>
              <input
                id={searchId}
                ref={searchRef}
                type="search"
                value={query}
                placeholder={text.archive.searchPlaceholder}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && query) {
                    event.stopPropagation();
                    setQuery('');
                  }
                }}
                autoComplete="off"
                spellCheck={false}
              />
              {query ? (
                <button type="button" className="archive__clear" onClick={() => setQuery('')} aria-label={text.archive.clear}>
                  <Close size={15} />
                </button>
              ) : (
                <kbd className="archive__kbd mono" aria-hidden="true">
                  /
                </kbd>
              )}
            </div>

            <div className="archive__view" role="group" aria-label={text.archive.viewLabel}>
              <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} aria-label={text.archive.viewList}>
                <ListIcon size={17} />
              </button>
              <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')} aria-label={text.archive.viewGrid}>
                <GridIcon size={17} />
              </button>
            </div>
          </div>
        </div>

        <p className="archive__count mono">
          <span aria-hidden="true">{text.archive.results(visible.length, projects.length)}</span>
          <span className="sr-only" aria-live="polite">
            {text.archive.resultsLabel(visible.length, projects.length)}
          </span>
        </p>

        {visible.length === 0 ? (
          <div className="archive__empty">
            <p className="h3">{text.archive.empty(query.trim())}</p>
            <button type="button" className="btn btn--ghost" onClick={reset}>
              {text.archive.reset}
            </button>
          </div>
        ) : view === 'list' ? (
          <div
            className="archive__list"
            onPointerEnter={() => setOverList(true)}
            onPointerLeave={() => setOverList(false)}
          >
            <div className="archive__cols mono" aria-hidden="true">
              {text.archive.columns.map((column) => (
                <span key={column}>{column}</span>
              ))}
            </div>
            <ul key={listKey} aria-label={text.archive.listLabel}>
              {visible.map((project, index) => (
                <li key={project.id} style={{ '--i': Math.min(index, 14) } as CSSProperties}>
                  <a
                    className="row"
                    href={projectHref(project.id)}
                    onClick={(event) => open(event, project.id)}
                    onPointerEnter={() => setHovered(project.id)}
                    onFocus={() => setHovered(project.id)}
                    aria-label={text.archive.open(project.title)}
                    style={{ '--accent': project.accent } as CSSProperties}
                  >
                    <span className="row__no mono">{numberOf.get(project.id)}</span>
                    <span className="row__thumb shot" aria-hidden="true">
                      <img src={imageSrc(project, 480)} alt="" width="480" height="480" loading="lazy" decoding="async" />
                    </span>
                    <span className="row__title">
                      <span className="row__name">
                        <Title project={project} />
                      </span>
                      {project.featured && <span className="row__star mono">{text.archive.featured}</span>}
                    </span>
                    <span className="row__cat mono">{text.categories[project.category]}</span>
                    <span className="row__plat mono">{text.platforms[platformOf(project)]}</span>
                    <span className="row__arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="archive__grid" key={listKey} aria-label={text.archive.listLabel}>
            {visible.map((project, index) => (
              <li key={project.id} style={{ '--i': Math.min(index, 14) } as CSSProperties}>
                <a
                  className="card"
                  href={projectHref(project.id)}
                  onClick={(event) => open(event, project.id)}
                  aria-label={text.archive.open(project.title)}
                  style={{ '--accent': project.accent } as CSSProperties}
                  data-cursor={text.archive.cursor}
                >
                  <span className="card__media shot">
                    <img
                      src={imageSrc(project, 800)}
                      srcSet={imageSrcSet(project)}
                      sizes="(max-width: 640px) 46vw, (max-width: 1100px) 31vw, 24vw"
                      alt=""
                      width="800"
                      height="800"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="card__meta mono">
                    <span>{numberOf.get(project.id)}</span>
                    <span>{text.categories[project.category]}</span>
                  </span>
                  <span className="card__title">
                    <Title project={project} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {finePointer && <CursorPreview active={hovered} visible={showPreview} />}
    </section>
  );
}
