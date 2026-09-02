# Architektura

## Założenia

Portfolio jest statyczną aplikacją React budowaną przez Vite. Nie wykorzystuje
routera, backendu ani trwałego stanu, dzięki czemu może być publikowane jako
zwykły zestaw plików na GitHub Pages. Poza React nie ma zależności runtime.

## Idea

Strona jest katalogiem, nie prezentacją. Pierwszy ekran mówi, kim jest autor;
zaraz za nim zaczyna się praca. Rdzeniem strony jest sekcja `INDEX` — wszystkie
37 pozycji jako jedno narzędzie z filtrami, wyszukiwarką i podglądem.

## Kolejność sekcji

| Kod | Id sekcji  | Komponent          | Rola                                     |
| --- | ---------- | ------------------ | ---------------------------------------- |
| 00  | `top`      | `Hero`             | jeden pełny kadr: kim jestem, co robię   |
| 01  | `selected` | `Selected`         | siedem prac w kwadratowych kadrach       |
| 02  | `index`    | `ProjectIndex`     | pełny katalog jako instrument            |
| 03  | `method`   | `Method`           | proces: iteracja wspierana przez AI i ludzka decyzja |
| 04  | `human`    | `Human`            | osoba, portret wideo, warsztat           |
| 05  | `contact`  | `Contact`          | kontakt i stopka                         |

Kody sekcji i ich kolejność definiuje `SECTIONS` w `src/i18n/copy.ts`. Dodanie
sekcji sprowadza się do dopisania wpisu w tej tablicy i komponentu w `App.tsx`.

## Podział odpowiedzialności

- `src/data/projects.ts` — dane i typy projektów (jedyne źródło prawdy),
- `src/i18n/copy.ts` — teksty PL/EN, kolejność i kody sekcji, metadane,
- `src/i18n/LanguageProvider.tsx` — wybór języka, zapis w localStorage, metadane,
- `src/components/*.tsx` + bliźniaczy `*.css` — sekcje, każda zamknięta w parze plików,
- `src/components/Icon.tsx` — sześć ikon inline zamiast biblioteki ikon,
- `src/lib/scrollFrame.ts` — jedna pętla animacji dla całej strony,
- `src/lib/hooks.ts` — ujawnianie treści, media queries, paralaksa, pułapka fokusa,
- `src/styles/` — tokeny, reset i wspólne kontrolki,
- `scripts/` — walidator danych projektów i generator grafik (czysty Node, bez zależności),
- `public` — media, SEO i pliki platformowe.

## Ruch i przewijanie

Cała strona ma jednego subskrybenta zdarzeń `scroll` i `resize`
(`onScrollFrame`). Zdarzenia tylko zamawiają klatkę; odczyt pozycji następuje
raz, a komponenty zapisują wynik jako pojedyncze zmienne CSS
(`--hero-exit`, `--parallax`, `--scroll-progress`). Gdy nikt nie subskrybuje,
nie działa żadna pętla.

Pozycje elementów do paralaksy mierzone są przez `ResizeObserver`, nigdy w
trakcie przewijania — dzięki temu w pętli nie ma wymuszonego layoutu.

Ujawnianie treści (`data-reveal`) obsługuje jeden współdzielony
`IntersectionObserver`, który przestaje śledzić element po pierwszym wejściu w kadr.

## INDEX — dwa warianty jednego komponentu

`ProjectIndex` trzyma logikę filtrowania i wyszukiwania, a renderuje jeden
z dwóch widoków wybieranych przez `useMediaQuery`:

- **desktop (≥1024 px)** — `IndexTable`: przyklejony podgląd, wiersze reagujące
  na kursor i fokus, kreska odczytu, klawisz `/`, strzałki `↑ ↓`, `Enter`,
- **dotyk (<1024 px)** — `IndexAccordion`: wiersze rozwijane w miejscu,
  z obrazem, opisem i odnośnikiem; jednocześnie otwarta jest jedna pozycja.

To nie jest ten sam układ przeskalowany — to dwa układy zaprojektowane pod
inny sposób obsługi.

## Dostępność

- semantyczne sekcje i nagłówki, jeden `h1`,
- link pomijający nawigację,
- pułapka fokusa i Escape w menu mobilnym, blokada scrolla pod menu,
- pełna obsługa klawiatury w indeksie,
- widoczne stany focus,
- brak treści dostępnej wyłącznie przez hover (opis projektu jest też w wierszu
  rozwijanym i pod odnośnikiem),
- dekoracyjne media ukryte przed czytnikami ekranu,
- `prefers-reduced-motion` wyłącza paralaksę, pasek indeksu i ujawnianie treści.

## Wydajność

- film hero ładowany dopiero po zdarzeniu `load`, za lekkim plakatem,
- osobne źródła filmu i plakatu dla telefonu i desktopu,
- `Save-Data` oraz `prefers-reduced-motion` całkowicie wyłączają film,
- wszystkie grafiki projektów: `loading="lazy"`, `decoding="async"`,
  stały `aspect-ratio` (brak przesunięć layoutu),
- podgląd w indeksie trzyma w DOM najwyżej dwie warstwy obrazu,
- animowane są wyłącznie `transform` i `opacity`,
- filtry i wyszukiwarka działają lokalnie, bez zapytań.

## SEO

Główne metadane znajdują się w `index.html`. Język dokumentu, tytuł i opis są
aktualizowane przy zmianie języka (`META` w `src/i18n/copy.ts`). Publiczne pliki
zawierają sitemap, robots, manifest oraz dane strukturalne Person.
