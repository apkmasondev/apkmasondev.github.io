# APKMason.dev — portfolio

Portfolio Krzysztofa / APKMason.dev: interaktywne strony, aplikacje i multimedia
na styku kodu, motion designu i AI. Strona działa pod adresem
[apkmason.dev](https://apkmason.dev/).

## Koncepcja

**Praca jest bohaterem.** Pierwszy ekran pokazuje wszystkie realizacje naraz —
na pochylonej, powoli dryfującej ścianie reagującej na kursor. Na części kafli
ekrany laptopów „żyją”: to nagrania działających projektów wpasowane w mockupy.

**Kamień i żar.** Szeryfowy Instrument Serif (litery jak wykute w kamieniu),
Geist do interfejsu, Geist Mono do oznaczeń. Ciepła czerń, kość zamiast bieli
i jeden kolor marki — żar z logotypu. Kolory projektów pojawiają się tylko jako
światło wokół ich kadrów. Stronę domyka bazaltowy monolit ze świecącymi
szczelinami.

## Sekcje

| Nr | Sekcja   | Zawartość                                                                  |
| -- | -------- | -------------------------------------------------------------------------- |
| 00 | Hero     | ściana wszystkich prac (CSS 3D), żywe ekrany, nagłówek odsłaniany liniami  |
| 01 | Prace    | wybrane prace jako kinowe rozdziały nakładające się przy przewijaniu       |
| 02 | Archiwum | pełny katalog: kategorie, wyszukiwarka (`/`), lista z podglądem lub siatka |
| 03 | Proces   | cztery etapy zapalające się na linii odczytu                               |
| 04 | O mnie   | portret wideo, liczby, warsztat                                            |
| 05 | Kontakt  | e-mail z kopiowaniem, GitHub, rozwinięcie APK: AI · Pixels · Kinetics      |

Każdy projekt ma panel szczegółów z własnym adresem, np. `/#/p/ostoja`
(przełączanie `←` `→`, zamykanie `Esc` lub przyciskiem „wstecz”).

## Uruchomienie

Wymagany Node.js 24 lub nowszy.

```bash
npm ci
npm run dev        # serwer deweloperski
npm run check      # lint + typy + walidacja danych + build
npm run preview    # podgląd buildu produkcyjnego
```

## Dodanie projektu

1. Grafika w trzech rozmiarach (wymaga `ffmpeg` z libwebp):

   ```bash
   npm run work-image -- zrzut.png klucz_projektu
   ```

   Polecenie zapisuje `public/work/<klucz>-{480,800,1254}.webp` i wypisuje
   szkielet wpisu.

2. Wklej wpis do `src/data/projects.ts` — to jedyne źródło prawdy. Kolejność
   na liście jest kolejnością w archiwum; `featured: true` dodaje rozdział
   w sekcji „Prace”.

3. `npm run validate` — sprawdza pliki, wymiary, wagę, duplikaty, tłumaczenia,
   kontrast akcentu i osierocone grafiki.

Liczniki (z poprawną odmianą), filtry, numeracja, ściana w hero i panel
szczegółów aktualizują się same.

### Żywy ekran na ścianie (opcjonalnie)

Nagranie projektu wpasowane w ekran laptopa na mockupie. Narzędzia i parametry
wszystkich dotychczasowych nagrań: [`tools/live-screens/README.md`](tools/live-screens/README.md).
Gotowy plik `public/work/<klucz>-live-480.mp4` + `live: true` przy projekcie.

## Struktura

- `src/data/projects.ts` — projekty, ścieżki grafik, platformy, statystyki,
- `src/i18n/` — teksty PL/EN, wybór języka (zapamiętywany), metadane strony,
- `src/components/*.tsx` + bliźniaczy `*.css` — sekcje,
- `src/lib/frame.ts` — jedna pętla `requestAnimationFrame` dla całej strony,
- `src/lib/hooks.ts` — odsłanianie treści, media queries, pułapka fokusa, blokada przewijania,
- `src/lib/route.ts` — adresy panelu projektu,
- `src/lib/text.ts` — tytuły, wyszukiwanie bez polskich znaków, odmiana liczebników,
- `public/work/` — grafiki projektów (480 / 800 / 1254 px) i żywe ekrany,
- `public/media/` — filmy i portret,
- `scripts/` — walidator danych i generator grafik,
- `tools/live-screens/` — nagrywanie żywych ekranów (narzędzie robocze, poza buildem).

## Jakość

- jedyna zależność w runtime: React; bez bibliotek animacji,
- animowane wyłącznie `transform` i `opacity`; pętle przewijania stoją poza kadrem swoich sekcji,
- żywe ekrany ładują się dopiero po wczytaniu strony i grają tylko w widocznej, jasnej części ściany,
- filmy w sekcjach montowane przy zbliżeniu do kadru i pauzowane poza nim,
- `prefers-reduced-motion` i `Save-Data` wyłączają ruch i filmy,
- WCAG: kontrast tekstu ≥ 4,5:1, pełna obsługa klawiatury, pułapka fokusa w menu
  i panelu, link „przejdź do treści”, komunikaty wyników dla czytników ekranu,
- brak śledzenia i zewnętrznych skryptów (poza czcionkami Google Fonts).

## Publikacja

Strona jest publikowana przez GitHub Pages z gałęzi `main` (workflow
`.github/workflows/deploy.yml`, który przed buildem uruchamia walidację).
Domenę przypina plik `public/CNAME` z wartością `apkmason.dev` — nie wolno go
usuwać. Poprzednie wersje strony są oznaczone tagami w historii repozytorium.
