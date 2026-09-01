import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Language } from '../data/projects';
import { META } from './copy';
import { LanguageContext } from './language-context';

const STORAGE_KEY = 'apkmason-language';

function isLanguage(value: string | null): value is Language {
  return value === 'pl' || value === 'en';
}

// Dostęp do localStorage rzuca wyjątkiem, gdy przeglądarka blokuje magazyn danych
// (tryb prywatny, restrykcyjne ustawienia ciasteczek), więc nie może wywrócić startu aplikacji.
function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    () => readStoredLanguage() ?? (navigator.language.toLowerCase().startsWith('en') ? 'en' : 'pl'),
  );

  useEffect(() => {
    const meta = META[language];

    document.documentElement.lang = language;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:locale"]', meta.locale);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (next: Language) => {
        setLanguageState(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Wybór języka działa w tej sesji nawet bez zapisu w magazynie danych.
        }
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
