import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', notify);
      return () => list.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/** Film i ciężkie dekoracje: wyłączone przy reduced motion i Save-Data. */
export function useAllowsHeavyMedia() {
  const reduced = useReducedMotion();
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !reduced && connection?.saveData !== true;
}

/**
 * Wspólny obserwator ujawniania treści: każdy `[data-reveal]` dostaje klasę
 * `is-in` przy pierwszym wejściu w kadr i przestaje być śledzony.
 */
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  revealObserver ??= new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
  );
  return revealObserver;
}

export function useReveal(root: RefObject<HTMLElement | null>, key?: unknown) {
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const observer = getRevealObserver();
    const targets = [
      ...(scope.matches('[data-reveal]') ? [scope] : []),
      ...scope.querySelectorAll('[data-reveal]'),
    ];
    targets.forEach((target) => {
      if (!target.classList.contains('is-in')) observer.observe(target);
    });
    return () => targets.forEach((target) => observer.unobserve(target));
  }, [root, key]);
}

/** Czy element jest (w przybliżeniu) w kadrze — do montowania i pauzowania filmów. */
export function useInView<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}

// Elementy z `tabindex="-1"` (np. dekoracyjne kadry-linki) nie biorą udziału w
// nawigacji klawiaturą — nie mogą więc wyznaczać granic pułapki fokusa.
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]',
]
  .map((selector) => `${selector}:not([tabindex="-1"])`)
  .join(', ');

/** Pułapka fokusa dla dialogów i menu; przywraca fokus po zamknięciu. */
export function useFocusTrap(active: boolean, container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;
    const node = container.current;
    if (!node) return;
    const previous = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (item) => item.getClientRects().length > 0,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      // Fokus poza listą (np. na samym dialogu tuż po otwarciu albo poza nim):
      // Tab idzie do pierwszego elementu, Shift+Tab do ostatniego — nigdy na stronę pod spodem.
      if (!items.includes(document.activeElement as HTMLElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previous?.focus?.({ preventScroll: true });
    };
  }, [active, container]);
}

/**
 * Blokada przewijania dokumentu z kompensacją paska przewijania. Liczy
 * aktywne blokady, więc menu i panel projektu nie zdejmą jej sobie nawzajem.
 */
let scrollLocks = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (scrollLocks === 0) {
      root.style.setProperty('--scrollbar-gap', `${window.innerWidth - root.clientWidth}px`);
      root.classList.add('is-locked');
    }
    scrollLocks += 1;
    return () => {
      scrollLocks -= 1;
      if (scrollLocks === 0) {
        root.classList.remove('is-locked');
        root.style.removeProperty('--scrollbar-gap');
      }
    };
  }, [active]);
}

/** Aktywna sekcja: ta, która przecina linię na 40% wysokości okna. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -59% 0px' },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
