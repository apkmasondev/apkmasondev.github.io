import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';

/**
 * Panel projektu ma własny adres `#/p/<id>`: da się go udostępnić, a przycisk
 * „wstecz” zamyka panel zamiast opuszczać stronę.
 */
const PREFIX = '#/p/';

function readHash() {
  const hash = window.location.hash;
  if (!hash.startsWith(PREFIX)) return null;
  let id: string;
  try {
    id = decodeURIComponent(hash.slice(PREFIX.length));
  } catch {
    // Uszkodzony adres (np. `#/p/%E0`) nie może wyłożyć strony — traktujemy go jak brak panelu.
    return null;
  }
  return projects.some((project) => project.id === id) ? id : null;
}

export function projectHref(id: string) {
  return `${PREFIX}${id}`;
}

export function useProjectRoute() {
  const [openId, setOpenId] = useState<string | null>(readHash);
  // Czy wpis historii z panelem dodaliśmy sami — wtedy zamknięcie to `back()`.
  const pushed = useRef(false);

  useEffect(() => {
    const sync = () => {
      const id = readHash();
      if (!id) pushed.current = false;
      setOpenId(id);
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = useCallback((id: string) => {
    if (readHash()) {
      history.replaceState(null, '', projectHref(id));
    } else {
      history.pushState(null, '', projectHref(id));
      pushed.current = true;
    }
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    if (pushed.current) {
      pushed.current = false;
      history.back();
    } else {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return { openId, open, close };
}
