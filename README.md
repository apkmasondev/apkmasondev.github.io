# ApkMason.dev Portfolio V2

Nowe portfolio Krzysztofa / ApkMason.dev. Strona została zaprojektowana jako
kinowe, scroll-driven doświadczenie prezentujące projekty webowe, 3D i
aplikacje bez utraty czytelności na urządzeniach mobilnych.

Stara wersja znajduje się w sąsiednim katalogu `portfolio-site-stara-wersja` i nie została
zmodyfikowana.

## Najważniejsze elementy

- film hero sterowany przewijaniem z osobnym źródłem desktop i mobile,
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

Gotowe pliki znajdują się w katalogu `dist`. Repozytorium jest przygotowane do
publikacji jako główna strona użytkownika GitHub Pages pod adresem
`https://apkmasondev.github.io/`.

Szczegółowy proces znajduje się w
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Aktualizacja projektów

Dane projektów znajdują się w `src/data/projects.ts`. Każdy wpis zawiera:

- opis PL i EN,
- kategorię używaną przez filtry,
- listę technologii,
- link i nazwę obrazu,
- opcjonalny status `featured`.

Zmiana treści nie wymaga modyfikowania komponentów.

Pełna instrukcja i gotowy szablon wpisu:
[`docs/ADDING_PROJECTS.md`](docs/ADDING_PROJECTS.md).

Liczniki projektów, liczby przy filtrach i podział na sekcje są wyliczane
automatycznie z tablicy `projects`.

## Film hero

Źródłowy film został zachowany poza projektem. W katalogu `public` znajdują się
dwie wersje zoptymalizowane do scrubbingu:

- `hero-monolith-desktop.mp4`,
- `hero-monolith-mobile.mp4`.

Obie są pozbawione ścieżki audio, mają `faststart` i częste klatki kluczowe.

## Dokumentacja

- [`CHANGELOG.md`](CHANGELOG.md) — historia zmian,
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — architektura i decyzje,
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — publikacja i kontrola po wdrożeniu,
- [`docs/ASSETS.md`](docs/ASSETS.md) — pochodzenie mediów i prompt grafiki OG,
- [`docs/ADDING_PROJECTS.md`](docs/ADDING_PROJECTS.md) — dodawanie realizacji.
