import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { imageSrc, liveSrc, projects, stats, type Project } from '../data/projects';
import { useCopy, useLanguage } from '../i18n/language';
import { clamp, onFrame } from '../lib/frame';
import { useAllowsHeavyMedia, useFinePointer, useMediaQuery } from '../lib/hooks';
import { plural } from '../lib/text';
import { ArrowDown, ArrowUpRight, Lines } from './ui';
import './hero.css';

/**
 * Ściana prac: wszystkie realizacje na jednej, pochylonej płaszczyźnie.
 * Kolumny przesuwają się naprzemiennie w górę i w dół. Całość jest dekoracją
 * (aria-hidden, bez celów kliknięcia) — pełny katalog jest niżej, w archiwum.
 */
/** Minimalna liczba żywych ekranów na ścianie, która mieści tylko część listy (telefon). */
const MIN_LIVE_ON_WALL = 4;

/**
 * Kafle na ścianę: pierwsze `size` prac z listy. Jeśli żywych ekranów jest wśród
 * nich za mało (nowe projekty dopisywane na górę listy spychają je dalej), ostatnie
 * statyczne kafle ustępują miejsca żywym spoza tego zakresu.
 */
function wallPool(size: number) {
  const pool = projects.slice(0, size);
  const missing = MIN_LIVE_ON_WALL - pool.filter((project) => project.live).length;
  if (missing <= 0) return pool;
  const extras = projects.slice(size).filter((project) => project.live).slice(0, missing);
  for (let index = pool.length - 1; index >= 0 && extras.length; index--) {
    if (!pool[index].live) pool[index] = extras.shift()!;
  }
  return pool;
}

function buildColumns(count: number, perColumn: number) {
  const columns: Project[][] = Array.from({ length: count }, () => []);
  // Przeplot z przesunięciem, żeby sąsiednie kafle nie powtarzały sąsiadów z listy.
  // Krok musi być względnie pierwszy z liczbą kolumn — inaczej część kolumn zostałaby pusta.
  const pool = wallPool(count * perColumn);
  const stride = count % 3 === 0 ? 1 : 3;
  pool.forEach((project, index) => {
    columns[(index * stride) % count].push(project);
  });
  const arranged = columns.map((column, index) =>
    index % 2 ? column : [...column.slice(Math.ceil(column.length / 2)), ...column.slice(0, Math.ceil(column.length / 2))],
  );

  // Żywe ekrany trafiają do prawych kolumn, w okolice środka — tam, gdzie
  // ściana nie jest przyciemniona pod typografią i widać je od pierwszej chwili.
  const targetColumns = [count - 2, count - 3, count - 1, count - 4].filter((column) => column >= 0);
  const live = pool.filter((project) => project.live);
  live.slice(0, targetColumns.length).forEach((project, index) => {
    const from = arranged.findIndex((column) => column.includes(project));
    const fromRow = arranged[from].indexOf(project);
    const to = arranged[targetColumns[index]];
    if (to === arranged[from]) return;
    // Na zwolnione miejsce trafia ostatni kafel kolumny docelowej — ten, który
    // na starcie i tak jest poza kadrem — więc reszta kompozycji się nie zmienia.
    const displaced = to.pop()!;
    to.splice(Math.min(to.length, 2 + (index % 2)), 0, project);
    arranged[from][fromRow] = displaced;
  });
  return arranged;
}

interface WallProps {
  columns: number;
  perColumn: number;
  /** Ile żywych ekranów (filmów) zamontować; 0 = sama fotografia. */
  live: number;
}

function Wall({ columns: columnCount, perColumn, live }: WallProps) {
  const columns = useMemo(() => buildColumns(columnCount, perColumn), [columnCount, perColumn]);
  // Limit liczymy spośród kafli, które naprawdę są na ścianie (telefon pokazuje tylko część listy).
  const liveIds = useMemo(
    () =>
      new Set(
        columns
          .flat()
          .filter((project) => project.live)
          .slice(0, live)
          .map((project) => project.id),
      ),
    [columns, live],
  );

  return (
    <div className="wall__plane">
      {columns.map((column, columnIndex) => (
        <div
          className="wall__col"
          key={columnIndex}
          style={
            {
              '--dur': `${70 + ((columnIndex * 17) % 5) * 9}s`,
              '--dir': columnIndex % 2 ? 'reverse' : 'normal',
              '--c': columnIndex,
            } as CSSProperties
          }
        >
          <div className="wall__track">
            {[0, 1].map((copyIndex) =>
              column.map((project, index) => (
                <div
                  className="wall__tile"
                  key={`${copyIndex}-${project.id}`}
                  style={{ '--accent': project.accent } as CSSProperties}
                >
                  <img
                    src={imageSrc(project, 480)}
                    alt=""
                    width="480"
                    height="480"
                    decoding="async"
                    loading={copyIndex === 0 && index < 3 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                  {liveIds.has(project.id) && (
                    // Żywy ekran: ten sam kadr co zdjęcie, tylko z nagraniem strony w ekranie
                    // laptopa. Wchodzi przenikaniem dopiero po pierwszej klatce.
                    <video
                      src={liveSrc(project)!}
                      muted
                      loop
                      playsInline
                      preload="none"
                      tabIndex={-1}
                      onPlaying={(event) => event.currentTarget.classList.add('is-ready')}
                    />
                  )}
                </div>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const text = useCopy().hero;
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heavy = useAllowsHeavyMedia();
  const finePointer = useFinePointer();
  const [liveReady, setLiveReady] = useState(false);
  const narrow = useMediaQuery('(max-width: 720px)');
  const medium = useMediaQuery('(max-width: 1100px)');

  // Hero odsłania się od razu po starcie, niezależnie od obserwatora przewijania.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      sectionRef.current?.querySelectorAll('[data-reveal]').forEach((node) => node.classList.add('is-in'));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Żywe ekrany dociągają się dopiero po załadowaniu strony — nie konkurują
  // o pasmo z nagłówkiem i miniaturami.
  useEffect(() => {
    if (!heavy) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => setLiveReady(true), 400);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', schedule);
    };
  }, [heavy]);

  // Film gra tylko wtedy, gdy jego kafel jest faktycznie w kadrze. Każdy projekt
  // ma na ścianie dwie kopie (pętla bez końca), a widać zwykle jedną — druga stoi.
  // Po zjechaniu z hero wszystkie filmy się zatrzymują.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !liveReady) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement;
          if (isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        });
      },
      // Pod typografią ściana jest mocno przyciemniona — tam filmy nie grają.
      // Desktop: cień z lewej; telefon i tablet: cień od dołu.
      { rootMargin: medium ? '10% 0px -40% 0px' : '10% 0px 10% -38%' },
    );
    const videos = section.querySelectorAll<HTMLVideoElement>('.wall__tile video');
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [liveReady, narrow, medium]);

  // Wyjście z hero: płaszczyzna rośnie i gaśnie, treść odpływa w górę.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return onFrame((y) => {
      const height = section.offsetHeight;
      if (y > height * 1.1) return;
      section.style.setProperty('--exit', clamp(y / height).toFixed(4));
    });
  }, []);

  // Paralaksa kursora — wygładzana, żeby płaszczyzna miała bezwładność.
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || !finePointer || !heavy) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const tick = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      stage.style.setProperty('--mx', x.toFixed(4));
      stage.style.setProperty('--my', y.toFixed(4));
      raf = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    section.addEventListener('pointermove', onMove);
    return () => {
      section.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [finePointer, heavy]);

  // Desktop i tablet mieszczą zawsze cały katalog — kolumny wydłużają się same.
  // Telefon pokazuje pierwsze 24 prace z listy, żeby nie pobierać wszystkich miniatur.
  const columnCount = narrow ? 4 : medium ? 5 : 7;
  const layout = {
    columns: columnCount,
    perColumn: narrow ? 6 : Math.ceil(projects.length / columnCount),
  };

  return (
    <section className="hero" id="top" ref={sectionRef} data-motion={heavy ? 'on' : 'off'}>
      <div className="hero__wall" aria-hidden="true">
        <div className="wall" ref={stageRef}>
          <Wall key={layout.columns} {...layout} live={liveReady ? (narrow ? 4 : Infinity) : 0} />
        </div>
        <span className="hero__shade" />
      </div>

      <div className="hero__content shell">
        <p className="hero__eyebrow mono" data-reveal style={{ '--delay': '150ms' } as CSSProperties}>
          <span className="hero__pulse" aria-hidden="true" />
          {text.eyebrow}
          <span className="hero__role">{text.role}</span>
        </p>

        <Lines as="h1" className="display hero__title" lines={text.title} />

        <div className="hero__row">
          <p className="lede" data-reveal style={{ '--delay': '520ms' } as CSSProperties}>
            {text.lede}
          </p>
          <div className="hero__actions" data-reveal style={{ '--delay': '640ms' } as CSSProperties}>
            <a className="btn btn--ember btn--down" href="#work">
              {text.primary}
              <ArrowDown size={17} />
            </a>
            <a className="btn btn--ghost" href="#contact">
              {text.secondary}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero__foot shell" data-reveal style={{ '--delay': '900ms' } as CSSProperties}>
        <p className="mono">
          <span className="hero__count">{stats.total}</span>
          {plural(stats.total, text.count.forms, lang)} {text.count.rest}
        </p>
        <a className="hero__cue mono" href="#work">
          {text.scroll}
          <span className="hero__cue-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
