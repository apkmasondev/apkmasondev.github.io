import { useEffect, useRef, useState, type RefObject } from 'react';
import { onScrollFrame } from './scrollFrame';

const REVEALED_CLASS = 'is-revealed';

let revealObserver: IntersectionObserver | null = null;

function getRevealObserver(): IntersectionObserver {
  revealObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED_CLASS);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  return revealObserver;
}

/**
 * Jeden współdzielony IntersectionObserver ujawnia wszystkie elementy oznaczone
 * `data-reveal` i przestaje je śledzić zaraz po pierwszym wejściu w kadr.
 */
export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getRevealObserver();
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return ref;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Ciężkie media (wideo hero, portret) uruchamiamy tylko wtedy, gdy użytkownik
 * ich chce i za nie nie płaci: bez reduced-motion i bez trybu oszczędzania danych.
 */
export function useAllowsHeavyMedia(): boolean {
  const reducedMotion = usePrefersReducedMotion();
  const [saveData] = useState(
    () => (navigator as NavigatorWithConnection).connection?.saveData === true,
  );

  return !reducedMotion && !saveData;
}

/** Zwraca id sekcji aktualnie zajmującej środek ekranu. */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        if (best) setActiveId(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: '-20% 0px -35% 0px' },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

/**
 * Blokuje przewijanie tła bez skoku layoutu (kompensuje szerokość paska).
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousPadding = document.body.style.paddingRight;

    document.body.classList.add('is-locked');
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.classList.remove('is-locked');
      document.body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}

/** Przytrzymuje fokus wewnątrz otwartej warstwy (menu mobilne). */
export function useFocusTrap<T extends HTMLElement>(active: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!active || !container) return;

    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (element) => element.offsetParent !== null,
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const elements = focusables();
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => container.removeEventListener('keydown', onKeyDown);
  }, [active]);

  return ref;
}

/**
 * Delikatna paralaksa kadru. Pozycja elementu jest mierzona tylko przy zmianie
 * rozmiaru, więc w trakcie przewijania nie ma żadnego odczytu layoutu — do CSS
 * trafia jedna liczba z zakresu mniej więcej [-1, 1].
 */
export function useParallax<T extends HTMLElement>(enabled: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    let documentTop = 0;
    let height = 0;
    let visible = false;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      documentTop = rect.top + window.scrollY;
      height = rect.height;
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: '15% 0px' },
    );
    visibilityObserver.observe(element);

    measure();

    const stop = onScrollFrame((scrollY) => {
      if (!visible) return;
      const viewport = window.innerHeight;
      const distance = documentTop + height / 2 - scrollY - viewport / 2;
      element.style.setProperty('--parallax', (distance / viewport).toFixed(3));
    });

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      stop();
      element.style.removeProperty('--parallax');
    };
  }, [enabled]);

  return ref;
}
