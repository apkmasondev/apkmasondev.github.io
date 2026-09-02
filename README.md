# APKMason.dev Portfolio

Portfolio Krzysztofa / APKMason.dev. Strona jest pomyślana jako **katalog pracy**,
a nie prezentacja o pracy: pierwszy ekran mówi, kim jest autor, a już drugi
pokazuje projekty. Rdzeniem strony jest indeks wszystkich 37 realizacji — lista
z filtrami, wyszukiwarką, obsługą klawiatury i podglądem, która na dotyku zamienia
się w listę rozwijaną projektowaną pod kciuk.

## Najważniejsze elementy

- hero: jeden pełny kadr z filmem w pętli, licznikami dorobku i paskiem indeksu,
- `SELECTED`: siedem prac w kwadratowych kadrach, oświetlonych własnym kolorem projektu,
- `INDEX`: pełny katalog jako instrument — filtry, wyszukiwarka, `/`, `↑ ↓`, `Enter`,
- polska i angielska wersja treści z zapisem wyboru,
- semantyczny HTML, pułapka fokusa w menu, widoczne stany focus,
- pełna obsługa `prefers-reduced-motion` i `Save-Data`,
- kompletne metadane Open Graph, Twitter Card i schema.org,
- brak trackingu, brak zewnętrznych skryptów, brak zależności runtime poza React.

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

Dane projektów znajdują się w `src/data/projects.ts` — to jedyne źródło prawdy.
Dodanie projektu to trzy kroki:

```bash
npm run mockup -- zrzut.png nazwa-projektu   # grafika: kadr, skala, waga, gotowy wpis
# wklej wypisany wpis do src/data/projects.ts
npm run validate                              # sprawdzenie danych względem plików
```

Reszta dzieje się sama: liczniki w hero, pasek indeksu, filtry z licznikami,
numeracja pozycji, kolor akcentu w podglądzie i na liście, obecność w wynikach
wyszukiwania, a przy `featured: true` także kadr w sekcji wybranych prac.

Szczegóły i pełna lista sprawdzeń: [`docs/ADDING_PROJECTS.md`](docs/ADDING_PROJECTS.md).

## Dokumentacja

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — układ sekcji, pętla przewijania, dostępność, wydajność,
- [`docs/ADDING_PROJECTS.md`](docs/ADDING_PROJECTS.md) — jak dodać projekt,
- [`docs/ASSETS.md`](docs/ASSETS.md) — media, formaty i polecenia do ich przygotowania,
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — publikacja.
