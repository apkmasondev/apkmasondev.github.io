# Dodawanie nowego projektu

Portfolio jest oparte na jednym źródle danych. Dodanie projektu nie wymaga
zmieniania komponentów, filtrów ani liczników.

## 1. Przygotuj grafikę

Nie rób tego ręcznie — jest do tego polecenie:

```bash
npm run mockup -- sciezka/do/zrzutu.png nazwa-projektu
```

Kadruje do kwadratu, skaluje do 1254 px, dobiera jakość WebP tak, aby zmieścić
się poniżej 180 KB, zapisuje plik w `public/` i wypisuje gotowy wpis do wklejenia.

Opcje:

- `--pad` — zamiast przycinać, dokłada czarne pole do kwadratu. Użyj dla bardzo
  szerokich kadrów, w których przycięcie ucięłoby urządzenie.
- `--accent=#rrggbb` — kolor projektu wstawiony od razu do wypisanego wpisu.

Format jest częścią układu: sekcje `SELECTED` i `INDEX` pokazują kadry **1:1**,
a lista rozwijana na telefonie przycina je do 4:3 — dlatego urządzenie powinno
być mniej więcej wyśrodkowane, a krawędzie zostawione jako zapas.

Wymagany jest `ffmpeg` w PATH. Jeśli wolisz przygotować grafikę samodzielnie:
kwadrat 1200–1400 px, WebP, poniżej 180 KB.

## 2. Dodaj jeden wpis

Otwórz `src/data/projects.ts` i dopisz obiekt do tablicy `projects`:

```ts
{
  id: 'unikalny-identyfikator',
  title: 'Nazwa projektu',
  description: {
    pl: 'Krótki opis projektu po polsku.',
    en: 'A short project description in English.',
  },
  image: '/nazwa_projektu_mockup.webp',
  link: 'https://adres-projektu.example/',
  tags: ['React', 'Three.js', 'AI'],
  category: 'experiment',
  accent: '#ff4d2e',
},
```

Dostępne kategorie:

- `story` — scroll-driven i narracyjne doświadczenia,
- `spatial` — 3D, Three.js i WebGL,
- `product` — koncepty produktów i prezentacje komercyjne,
- `app` — aplikacje mobilne lub desktopowe,
- `experiment` — formaty badawcze i doświadczenia celowo wymykające się pozostałym kategoriom.

Tagi powinny opisywać przede wszystkim charakter doświadczenia. Preferuj
trwałe określenia, takie jak `Scroll-driven`, `Cinematic`, `Interactive 3D`
lub `Educational`, zamiast wersji narzędzi i parametrów technicznych. Użycie
tagu `Scroll-driven` automatycznie aktualizuje licznik „Scroll Stories”.

## Projekt wyróżniony

Jeżeli projekt ma pojawić się w sekcji `01 / SELECTED`, dodaj:

```ts
featured: true,
```

Projekt pojawia się w pełnym indeksie zawsze — flaga decyduje wyłącznie o tym,
czy dostanie dodatkowo własny kadr w sekcji wybranych prac i kropkę
w kolorze `accent` na liście.

## Co aktualizuje się automatycznie

Po dodaniu wpisu strona sama:

- zwiększy liczniki w hero (projekty / scroll stories / aplikacje),
- doda tytuł do przesuwanego paska indeksu,
- zaktualizuje liczby przy filtrach i wynik wyszukiwania,
- ponumeruje pozycję w indeksie,
- użyje koloru `accent` jako ramki podglądu, kreski odczytu i światła sceny,
- wyświetli treść w języku polskim i angielskim.

## 3. Sprawdź dane

```bash
npm run validate
```

Walidator porównuje dane z rzeczywistością i przerywa publikację, jeśli coś się
nie zgadza. Sprawdza:

| Sprawdzenie | Skutek |
| --- | --- |
| identyfikator małymi literami i niepowtarzalny | błąd |
| tytuł, opis PL i opis EN obecne | błąd |
| kategoria z listy | błąd |
| `accent` w formacie `#rrggbb` | błąd |
| co najmniej jeden tag | błąd |
| adres `https`, poprawny i niepowtarzalny | błąd |
| plik grafiki istnieje | błąd |
| grafika jest kwadratowa | błąd |
| grafika nieużyta przez inny projekt | błąd |
| opis za krótki, za długi lub nieprzetłumaczony | ostrzeżenie |
| `accent` zbyt ciemny, żeby było go widać na czerni | ostrzeżenie |
| grafika cięższa niż 260 KB lub mniejsza niż 1000 px | ostrzeżenie |
| więcej niż 4 tagi (rozjeżdżają kadr wybranych prac) | ostrzeżenie |
| liczba wyróżnionych poza zakresem 5–8 | ostrzeżenie |
| grafiki w `public` bez przypisanego projektu | informacja |

Pełna kontrola przed publikacją:

```bash
npm run check
```

Uruchamia lint, kontrolę typów, walidację danych i produkcyjny build. To samo
sprawdzenie wykonuje workflow publikacji, więc błędny wpis nie ma jak trafić
na produkcję.
