# APKMason.dev Portfolio V2

Nowe portfolio Krzysztofa / APKMason.dev. Strona została zaprojektowana jako
kinowe, scroll-driven doświadczenie prezentujące projekty webowe, 3D i
aplikacje bez utraty czytelności na urządzeniach mobilnych.

Stara wersja znajduje się w sąsiednim katalogu `portfolio-site-stara-wersja` i nie została
zmodyfikowana.

## Najważniejsze elementy

- film hero sterowany przewijaniem z osobnym źródłem dla desktopu, telefonu w
  pionie i telefonu w poziomie,
- statyczny fallback dla `prefers-reduced-motion`,
- siedem wyróżnionych case studies i filtrowalne archiwum,
- polska i angielska wersja treści,
- semantyczny HTML, obsługa klawiatury i widoczne stany focus,
- kompletne metadane Open Graph, Twitter Card i schema.org,
- responsywne grafiki ładowane leniwie poza pierwszym ekranem,
- brak trackingu i zewnętrznych skryptów analitycznych.

## Uruchomienie

Wymagany jest Node.js 24 lub nowszy.

```bash
npm ci
npm run dev
```

## Kontrola jakości

```bash
npm run check
```

Polecenie uruchamia lint, kontrolę typów i produkcyjny build.

## Build i publikacja

```bash
npm run build
```

Gotowe pliki znajdują się w katalogu `dist`. Strona jest publikowana przez
GitHub Pages pod adresem `https://apkmason.dev/`, na który
`apkmasondev.github.io` przekierowuje kodem 301. Wszystkie adresy kanoniczne,
Open Graph, `sitemap.xml` i linki do projektów wskazują na domenę docelową,
żeby nie generować dodatkowego przeskoku. Publikację wykonuje workflow
`.github/workflows/deploy.yml` przy każdym pushu na `main`.

Domena jest przypięta plikiem `public/CNAME`, który build kopiuje do `dist`.
Ten plik musi zawierać dokładnie `apkmason.dev` i nie wolno go usuwać — bez
niego domena własna istnieje wyłącznie w ustawieniach repozytorium.

## Aktualizacja projektów

Dane projektów znajdują się w `src/data/projects.ts`. Każdy wpis zawiera:

- opis PL i EN,
- kategorię używaną przez filtry,
- listę technologii,
- link i nazwę obrazu,
- opcjonalny status `featured`.

Zmiana treści nie wymaga modyfikowania komponentów.

Liczniki projektów, liczby przy filtrach i podział na sekcje są wyliczane
automatycznie z tablicy `projects`.

## Film hero

Źródłowy film został zachowany poza projektem. W katalogu `public` znajdują się
trzy wersje zoptymalizowane do scrubbingu:

- `hero-monolith-desktop.mp4` — 1280 × 720, 4,7 MB,
- `hero-monolith-landscape.mp4` — 854 × 480, 2,9 MB, dla telefonów w poziomie
  (`(max-height: 520px) and (pointer: coarse)`),
- `hero-monolith-mobile.mp4` — 480 × 854, 2,9 MB, kadr pionowy
  (`(max-width: 767px)`).

Wszystkie są pozbawione ścieżki audio, mają `faststart`, GOP=1 oraz grading
koloru wypalony bezpośrednio w obraz, aby ograniczyć koszt renderowania hero.
GOP=1 oznacza, że każda klatka jest kluczowa — to warunek płynnego scrubbingu i
powód, dla którego pliki nie schodzą poniżej ~3 MB.

## Dokumentacja

- [`CHANGELOG.md`](CHANGELOG.md) — historia zmian.

Rozszerzone notatki (architektura, wdrożenie, pochodzenie mediów, dodawanie
realizacji) leżą lokalnie w katalogu `docs/`, który jest wyłączony z
wersjonowania.
