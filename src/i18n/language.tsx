import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Language } from '../data/projects';
import { copy, META } from './copy';

// Ten sam klucz co w poprzedniej wersji strony — powracający goście zachowują wybrany język.
const STORAGE_KEY = 'apkmason-language';

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageState | null>(null);

function initialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pl' || stored === 'en') return stored;
  } catch {
    /* prywatne okno albo zablokowany storage — zostaje wartość domyślna */
  }
  return navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en';
}

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(initialLanguage);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* brak zapisu nie blokuje zmiany języka */
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === 'pl' ? 'en' : 'pl'), [lang, setLang]);

  useEffect(() => {
    const meta = META[lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:locale"]', meta.locale);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCopy() {
  return copy[useLanguage().lang];
}
