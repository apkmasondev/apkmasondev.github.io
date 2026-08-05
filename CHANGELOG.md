# Changelog

Wszystkie istotne zmiany w projekcie są dokumentowane w tym pliku. Format jest
zgodny z [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), a wersje
stosują [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- zaktualizowano projekt „Skin Elixir” w portfolio o nową grafikę 3D, zaktualizowany adres URL oraz nowy opis doświadczenia kosmetycznego premium,
- zoptymalizowano filmy hero pod słabsze CPU: zmniejszono rozdzielczość i
  bitrate przy zachowaniu GOP=1, grading przeniesiono z CSS do plików wideo,
  a elementowi `video` nadano wysoki priorytet pobierania,
- doprecyzowano opisy projektów „PCVerse” i „From Vertex to Reality” w obu
  wersjach językowych,
- zaktualizowano grafikę karty wyróżnionego projektu „THE IRIS”,
- w sekcji wyróżnionej „Mechanika Czasu” zastąpiono projektem „FRUIT ENERGY”,
  a „SPARK” projektem „THE IRIS”; obie wcześniejsze realizacje zachowano w
  archiwum,
- dodano do archiwum projekt „From Vertex to Reality” w kategorii Scroll / Story
  wraz z opisami PL/EN i zoptymalizowaną grafiką,
- ujednolicono szerokość linii, tekstu i rytm odstępów w notach sekcji
  wybranych projektów oraz archiwum,
- delikatnie podniesiono kontrast opisów i ograniczono nadmiar pionowej
  przestrzeni tych sekcji na urządzeniach mobilnych,
- finałowe orbity poruszają się w spokojniejszych, zróżnicowanych rytmach i
  reagują subtelnym skupieniem sygnału na hover oraz focus głównego CTA,
- zaktualizowano Vite i zależności pośrednie do wersji bez znanych podatności
  raportowanych przez `npm audit`,
- w sekcji wyróżnionej „From Sand to Silicon” zastąpiono projektem „PCVerse”,
  a poprzednią realizację zachowano w archiwum,
- dodano projekt „ORIGIN — The Cycle of Becoming” jako siódmą kartę w sekcji wyróżnionej oraz zaktualizowano odwołania z 6 na 7 projektów,
- mobilne menu działa jako nieprzezroczysty panel całego viewportu, blokuje
  przewijanie dokumentu i nie dziedziczy kontekstu `backdrop-filter` nagłówka,
- hero pomija źródła wideo i przechodzi na pełnoekranowy poster przy
  `prefers-reduced-motion` lub aktywnym trybie `Save-Data`,
- poster hero jest pobierany z wysokim priorytetem jako krytyczny obraz
  pierwszego ekranu,
- wszystkie obrazy głównych kart projektów są ładowane leniwie i nie konkurują
  już z zasobami pierwszego ekranu,
- główny ornament podpisów został przerysowany z osi zakończonej kropkami na
  większy wariant technicznego narożnika używanego w całym interfejsie,
- opisy etapów procesu oraz głównych kart projektów otrzymały wspólny,
  statyczny motyw technicznego narożnika z krótkim akcentem kolorystycznym,
- karty archiwum otrzymały stałą numerację kolekcji oraz subtelny system
  technicznych linii porządkujący metadane, tytuły i opisy,
- w sekcji wyróżnionej projekty „Space Scale” i „Inside the Internet”
  zastąpiono realizacjami „From Sand to Silicon” oraz „Sfera”,
- mobilny filtr archiwum pokazuje teraz wszystkie kategorie w czytelnej
  siatce 2 × 2 z pełnowymiarowym przyciskiem „Wszystkie”,
- przywrócono pomarańczowy favicon „A” z poprzedniego portfolio,
- tytuł karty, opis SEO i metadane social pozycjonują markę jako „AI Creator”
  zamiast eksponować określenie „scroll-driven”,
- przebudowano hero, aby typografia nie zasłaniała filmu i miała kontrolowane
  łamanie wierszy,
- manifest otrzymał ciemną, materiałową scenę z subtelnym czerwonym akcentem,
- poprawiono proporcje i łamanie nagłówka w sekcji procesu,
- zwiększono kontrast tekstów pomocniczych,
- liczniki projektów, historii i wyróżnionych realizacji są teraz wyliczane
  automatycznie z danych,
- uproszczono przełączanie języka i dodano trwałe zapamiętywanie wyboru,
- dopiski sekcji „Selected work” i „Project universe” tworzą wspólny,
  automatycznie aktualizowany system indeksów oparty na danych projektów,
- przypadkowe współrzędne w hero zastąpiono znaczącą deklaracją
  „Human directed — AI accelerated”,
- sekcję O mnie przebudowano w autorskie „identity dossier” z nową hierarchią
  treści, osią Structure / Imagination i indeksowaną mapą kompetencji,
- ornament podtytułów został wydzielony do współdzielonego komponentu i
  zastosowany również w końcowym CTA.

### Added

- autorski przekrój „Human Faultline” płynnie łączący finał filmu hero z
  Manifestem, z osobnymi lekkimi wariantami WebP dla desktopu i mobile,
- instrukcja dodawania nowych projektów wraz z gotowym szablonem wpisu,
- udokumentowany audyt wizualny i checklista przedwdrożeniowa,
- generatywny obiekt „Forge Signal” z płynną sześciusekundową pętlą, renderowany
  bez dodatkowego pliku wideo i zatrzymywany przez `prefers-reduced-motion`,
- dyskretny statyczny znacznik sygnału przy podtytule otwarcia i wszystkich
  czterech etapów hero,
- reguły `.gitignore` dla buildów, zależności, logów, plików środowiskowych i
  danych edytorów.

### Removed

- koncentryczne okręgi w Manifeście, które konkurowały z nowym motywem
  materiałowego przekroju,
- nieużywane pliki demonstracyjne React/Vite pozostałe po inicjalizacji projektu,
- pięć nieużywanych wariantów faviconu, logo i grafiki Open Graph,
- dwie nadmiarowe paczki oznaczone przez npm jako `extraneous`,
- powielony markup ornamentu sygnału.

### Fixed

- mobilny pasek statystyk Manifestu układa się teraz w pełną siatkę 2 × 2 bez
  ucinania czwartej wartości,

### Planned

- opcjonalne dedykowane podstrony case study,
- automatyczny audyt Lighthouse w CI,
- obrazy AVIF po potwierdzeniu docelowego workflow publikacji.

## [2.0.0] - 2026-07-30

### Added

- nowa kinowa identyfikacja „Digital Forge”,
- scroll-driven hero wykorzystujący film z monolitem,
- osobne, zoptymalizowane źródła wideo dla desktop i mobile,
- statyczny fallback dla reduced motion,
- sześć pełnoekranowych wyróżnionych projektów,
- filtrowalne archiwum pozostałych realizacji,
- sekcje procesu, autora i kontaktu,
- polska i angielska wersja treści,
- Open Graph, Twitter Card, JSON-LD, manifest, robots i sitemap,
- dokumentacja architektury oraz publikacji.

### Changed

- porzucono glassmorphism, procentowe paski umiejętności i efekt typewriter,
- skrócono opisy projektów i nadano im wyraźną hierarchię,
- poprawiono mobilny UX, dostępność klawiatury i obsługę dotyku,
- usunięto nieużywane zależności.

### Fixed

- zastąpiono błędny obraz Open Graph zawierający dane „Alexander Chen”,
- usunięto zależność treści od efektów hover na urządzeniach dotykowych,
- naprawiono przycisk zmiany wersji językowej PL/EN.
