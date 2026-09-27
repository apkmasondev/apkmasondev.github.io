import type { Language } from '../data/projects';

/**
 * Dzieli tytuł na nazwę i podtytuł po myślniku: „OSTOJA — Dom nad jeziorem”
 * → ['OSTOJA', 'Dom nad jeziorem']. Podtytuł renderowany jest kursywą.
 */
export function splitTitle(title: string): [string, string | undefined] {
  const [main, ...rest] = title.split(' — ');
  return [main, rest.length ? rest.join(' — ') : undefined];
}

/** Dopasowanie wyszukiwania bez względu na wielkość liter i polskie znaki. */
export function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l');
}

/** Zwykłe kliknięcie lewym przyciskiem — bez modyfikatorów otwierających nową kartę. */
export function isPlainClick(event: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export type PluralForms = readonly [one: string, few: string, many: string];

/**
 * Forma rzeczownika po liczebniku. PL ma trzy (1 praca, 2–4 prace, 5+ prac —
 * z wyjątkiem 12–14, które biorą „prac”), EN dwie (1 work, 2+ works).
 */
export function plural(count: number, forms: PluralForms, lang: Language) {
  if (count === 1) return forms[0];
  if (lang === 'en') return forms[1];
  const tens = count % 100;
  const units = count % 10;
  return units >= 2 && units <= 4 && (tens < 12 || tens > 14) ? forms[1] : forms[2];
}
