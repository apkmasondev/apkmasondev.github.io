import { createContext, useContext } from 'react';
import type { Language } from '../data/projects';
import { copy } from './copy';

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageState | null>(null);

export function useLanguage(): LanguageState {
  const state = useContext(LanguageContext);
  if (!state) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return state;
}

/** Skrót po teksty w aktualnym języku — używany w każdej sekcji. */
export function useCopy() {
  return copy[useLanguage().language];
}
