# Changelog

Wszystkie istotne zmiany w projekcie są dokumentowane w tym pliku. Format jest
zgodny z [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), a wersje
stosują [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- projekt „AI ≠ MODEL” w kategorii Eksperymenty: interaktywna lekcja o
  różnicach między modelem, systemem AI, workflow i agentem, z dedykowanym
  mockupem opartym na rzeczywistym interfejsie; indeks liczy teraz 37 prac,

- nowy materiał hero (bazaltowy blok ze świecącymi szczelinami) o kompozycji
  zaprojektowanej pod układ: lewa jedna trzecia kadru to niemal czysta czerń
  zarezerwowana pod nagłówek. Zapętlony bezszwowo przez przenikanie ostatniego
  pół sekundy na początek klipu — 9,5 s w pełnym 1080p waży 1,44 MB, czyli mniej
  niż poprzednie 720p odtwarzane w przód i w tył,
- dwa tryby kadru hero przełączane **proporcją okna**, nie szerokością: powyżej
  6:5 film wypełnia ekran z kadrowaniem zakotwiczonym do lewej krawędzi, poniżej
  staje się kadrem u góry ekranu z typografią pod nim na czystej czerni. Dzięki
  temu tablet w pionie nie dostaje kompozycji rozjechanej przez przycięcie,
  a telefon w poziomie dostaje pełny ekran,
- `npm run mockup -- <plik> <id>` — przygotowuje grafikę projektu: kadr do
  kwadratu, skala do 1254 px, automatyczny dobór jakości WebP pod limit 180 KB
  i wypisanie gotowego wpisu do wklejenia,
- `npm run validate` — sprawdza dane projektów względem plików na dysku:
  istnienie i proporcje grafik, unikalność identyfikatorów, adresów i grafik,
  poprawność kategorii i koloru, długość oraz przetłumaczenie opisów, jasność
  akcentu na czarnym tle i osierocone grafiki w `public`. Wpięte w `npm run check`
  oraz w workflow publikacji.

- sekcja `02 / INDEX` — pełny katalog 34 realizacji jako jedno narzędzie:
  filtry kategorii z licznikami, wyszukiwarka po tytule, opisie, kategorii
  i tagach, wynik `n z 34` ogłaszany przez `aria-live`, przyklejony podgląd
  z przenikaniem i kreską odczytu podążającą za wyborem. Na desktopie działa
  klawiatura: `/` otwiera wyszukiwarkę, `↑ ↓` przechodzą między pozycjami,
  `Esc` czyści zapytanie. Poniżej 1024 px ten sam zestaw danych renderuje
  osobny widok dotykowy — lista rozwijana z obrazem, opisem i odnośnikiem,
- sekcja `01 / SELECTED` — siedem wyróżnionych prac w kwadratowych kadrach
  galerii, naprzemiennie z lewej i prawej strony, z kolorem `accent` projektu
  użytym jako światło sceny i kolor ramki,
- pasek indeksu w hero: wszystkie tytuły przesuwają się jak napisy końcowe
  i zatrzymują pod kursorem; wejście do katalogu prowadzi przez jeden stały
  odnośnik, więc żaden cel kliknięcia się nie porusza,
- proporcja 80/20 w sekcji `03 / METHOD` narysowana jako pasek — ilustruje
  zdanie o „ostatnich 20%” zamiast je dekorować,
- licznik rolki w nawigacji (`02 / INDEX`) oraz włosowy pasek postępu strony,
- znak zamykający `APKMASON` skalowany zapytaniem kontenerowym tak, aby przy
  każdej szerokości okna wypełniał wiersz co do piksela.

### Changed

- polski nagłówek sekcji wybranych prac brzmi teraz naturalniej: „Prace, które
  wyznaczają kierunek”,
- dokumentację wskazaną w `README.md` włączono do repozytorium zamiast
  pozostawiać martwe odnośniki; na urządzeniach mobilnych filtr indeksu dostał
  zwartą matrycę 3 × 2 z krótkimi etykietami (na tabletach jeden rząd), a mobilną
  nawigację uproszczono do elastycznego paska, w którym przycisk menu nie może
  zostać wypchnięty poza ekran,
- zablokowano poziome przewijanie dokumentu na poziomie elementu głównego i
  sekcji wybranych prac; światła wychodzące poza kadry pozostają dekoracją, ale
  nie powiększają już obszaru przewijania na urządzeniach mobilnych,

- przywrócono do indeksu „VIBE//SHIFT” oraz całkowicie przebudowany projekt
  „Poznaj AI 2.0”, który otrzymał nowy opis, kategorię i mockup oparty na
  rzeczywistym artykule o tokenach, reprezentacjach, generowaniu i
  wiarygodności; wraz z nimi wrócił filtr „Eksperymenty”, a kolekcja liczy
  teraz 36 projektów bez zmian w wyróżnionej siódemce,
- sekcja metody nie przedstawia już pracy jako proporcji 80/20. Pasek opisuje
  przepływ od przyspieszonej iteracji do ludzkiej decyzji, selekcji i
  odpowiedzialności, a etap „Ostatnie 20%” zastąpiono neutralnym
  „Dopracowaniem” / „Refinement”,
- pięć nieużywanych mockupów wycofanych projektów przeniesiono z `public/` do
  `docs/archive-assets/`: historia pozostaje w repozytorium, ale pliki nie są
  już kopiowane do produkcyjnego buildu,

- **przebudowa strony**: układ `hero → manifest → wybrane → archiwum → proces →
  o mnie → kontakt` zastąpiony sekwencją `00 SIGNAL → 01 SELECTED → 02 INDEX →
  03 METHOD → 04 HUMAN → 05 CONTACT`. Pierwszy projekt jest widoczny po jednym
  ekranie przewijania zamiast po siedmiu; całość strony skróciła się z ~24 do
  ~13 ekranów,
- hero skrócone z sześciu ekranów sterowanych scrollem do jednego pełnego kadru.
  Film monolitu odtwarza się jako bezszwowa pętla (materiał w przód i w tył)
  zamiast być przewijany scrollem — znika kolizja napisów etapów z nagłówkiem
  i zależność pierwszego wrażenia od buforowania wideo,
- typografia: `Manrope` zastąpiony zmiennym krojem `Archivo` z osią szerokości
  (nagłówki w szerokości 118–125%), `DM Mono` pozostaje jako krój techniczny,
- teksty przeniesione z `src/content.ts` do `src/i18n/`, język udostępniany
  kontekstem zamiast przekazywany przez propsy; kolejność i kody sekcji opisuje
  jedna tablica `SECTIONS`,
- style rozbite z jednego pliku 2427 linii na tokeny, bazę, kontrolki
  i po jednym arkuszu na sekcję,
- wideo hero przekodowane: 4,7 MB → 1,7 MB (desktop) i 2,9 MB → 0,65 MB
  (telefon); katalog `public` zmniejszony z 16 MB do 7,4 MB,
- film hero montowany dopiero po zdarzeniu `load` i ujawniany po pierwszej
  gotowej klatce — pierwszym kadrem strony jest plakat 25 KB (18 KB na telefonie),
- cała strona korzysta z jednej pętli `requestAnimationFrame`; pozycje do
  paralaksy mierzone przez `ResizeObserver`, nigdy w trakcie przewijania,
- skala typograficzna dobrana pod najdłuższe polskie słowa — nagłówki nie są
  przycinane przy 320 px.

### Removed

- `lucide-react` — sześć używanych ikon wstawiono bezpośrednio w kodzie;
  poza React nie ma już zależności runtime,
- sekcja manifestu i osobna sekcja archiwum (ich rolę przejął `INDEX`),
- generatywny obiekt Canvas 2D w sekcji procesu i pierścienie orbity
  w stopce — dekoracje bez związku z treścią, kosztujące osobną pętlę animacji,
- grafiki `manifesto-threshold-*` i `section-note-*` po usuniętych sekcjach.

### Changed

- dodano projekt „AURORA — Dwa Nieba” do wybranych realizacji w miejsce „DUAL / CHOICE”; „DUAL / CHOICE” przeniesiono na początek archiwum, a „ARTIFACT SEED” przywrócono bezpośrednio za nim,
- wycofano z prezentowanej kolekcji projekty „VIBE//SHIFT” i „Poznaj AI” (ich zasoby pozostają w repozytorium), usunięto pustą kategorię „Eksperymenty” oraz przypisano BRIXCORE do Scroll / Story, a EDM Music Festival do Product / Commercial.

- „KSZTAŁT SIŁY” zastąpił „THE GUIDE” na szóstej pozycji wyróżnionej siódemki
  jako interaktywny esej o magnetyzmie, dźwięku i elektryczności ujawnianych
  przez materię. Projekt otrzymał opis PL/EN, tagi zgodne z implementacją oraz
  dedykowany mockup oparty na rzeczywistych kadrach ferrocieczy, figury
  Chladniego i rozgałęzionego wyładowania. „THE GUIDE” przeniesiono do archiwum
  w miejsce „SPARK”, a „SPARK” wycofano z prezentowanej kolekcji bez usuwania
  jego assetu,
- Mockup „BRIXCORE” przebudowano na podstawie aktualnej wersji doświadczenia:
  centralny ekran zachowuje rzeczywisty wybór między rdzeniami FORGE i EVOLVE,
  a scenografia dyskretnie pokazuje oba filmowe rezultaty — pomarańczowy monolit
  oraz cyjanową, generatywną strukturę. Kompozycja pozostaje wolna od dodatkowej
  typografii konkurującej z treścią karty portfolio,
- „BUILT BY NATURE” zastąpił „VEIL” na piątej pozycji wyróżnionej siódemki
  jako pełnoekranowy, filmowy esej o trzech biologicznych technologiach.
  Projekt otrzymał opis PL/EN, tagi zgodne z implementacją i dedykowany mockup
  oparty na rzeczywistych rozdziałach o kolibrze, mątwie i krewetce
  modliszkowej. „VEIL” przeniesiono do archiwum w miejsce „ORIGIN”, a „ORIGIN”
  wycofano z prezentowanej kolekcji bez usuwania jego assetu,
- „PRIME” zastąpił „CAN//FORM” na czwartej pozycji wyróżnionej siódemki jako
  sterowana scrollem opowieść o liczbach pierwszych — od sita Eratostenesa po
  spiralę Ulama, faktoryzację i kryptografię. Projekt otrzymał opis PL/EN,
  zgodne z implementacją tagi oraz mockup zbudowany z rzeczywistego profesora,
  korytarza i papierowej stacji matematycznej; z gestu usunięto dosłowny złoty
  łącznik, pozostawiając spokojniejszą, bardziej fotograficzną kompozycję.
  „CAN//FORM” zachowano w archiwum, a „ARTIFACT SEED” wycofano z prezentowanej
  kolekcji bez usuwania jego assetu,
- „THE GUIDE” zastąpił „ARTIFACT SEED” na szóstej pozycji wyróżnionej
  siódemki jako trzydziestosekundowa, sterowana scrollem opowieść o historii
  maszynowego obrazu. Projekt otrzymał opis PL/EN, tagi zgodne z implementacją
  i pozbawiony ekranowej typografii mockup zbudowany na rzeczywistym kadrze;
  „ARTIFACT SEED” zachowano w archiwum, a „NEXUS-1” wycofano z prezentowanej
  kolekcji bez usuwania jego assetu,
- „SPECTRUM — Archive of Light” otwiera teraz wyróżnioną siódemkę jako
  interaktywna, sterowana scrollem wystawa o percepcji koloru; projekt otrzymał
  dedykowany mockup oparty na jego rzeczywistym kadrze, z ekranem pozbawionym
  typografii konkurującej z tytułem karty, opis PL/EN i zgodne z implementacją
  tagi. „APK://GENESIS” przeniesiono bez usuwania do archiwum,
  a „Mechanikę Czasu” wycofano z prezentowanej kolekcji przy zachowaniu jej
  assetu źródłowego,
- Sekwencję hero zastąpiono materialnym, bazaltowym monolitem, który pęka i
  otwiera się w ciemny portal. Przygotowano osobne kadry desktop, landscape i
  mobile oraz nowy poster; wszystkie warianty zachowują GOP=1 i `faststart`,
  nie zawierają dźwięku i są lżejsze od poprzedniego zestawu,
- Tło manifestu zastąpiono responsywną sceną wnętrza za otwartym portalem,
  która kontynuuje materiał, światło i narrację hero, a następnie naturalnie
  wygasa w czerń pod typografią,
- Mockup „VOID DROP” zbudowano od nowa jako osiowy, frontowy render telefonu
  z równoległymi krawędziami, autentycznym ekranem aplikacji i neutralnym
  studyjnym tłem, eliminującym optyczne zniekształcenia wcześniejszej
  perspektywy,
- Wewnętrzne tła not sekcji „Wybrane” i „Archiwum” rozdzielono na dwa kadry
  kontynuujące świat nowego hero: zamknięty bazalt z pojedynczą szczeliną oraz
  wygasające w czerni wnętrze portalu; rama i sygnatura `A · P · K` pozostały
  bez zmian,
- Mockup „CAN//FORM” zastąpiono spójnym z wyróżnioną kolekcją kadrem
  laptopowym, którego ekran prezentuje pełnoekranową kampanię puszki NOIR w
  ciemnej, industrialnej scenografii zamiast podglądu interfejsu strony,
- Do wyróżnionej siódemki dodano projekty „DUAL / CHOICE”, „VEIL” i
  „ARTIFACT SEED”, zastępując odpowiednio „Beyond the Door”, „EDM Music
  Festival” i „VOID DROP”; trzy dotychczasowe realizacje zachowano na początku
  archiwum. Kolekcja liczy teraz 34 projekty, a nowe pozycje otrzymały wierne
  implementacji opisy PL/EN, tagi, kategorie i zoptymalizowane mockupy WebP,
- Skorygowano orientację tarczy zegarka w dolnym kadrze mockupu „Mechanika
  Czasu”: indeks godziny 12, datownik, koronka i mała sekunda są teraz ustawione
  zgodnie z rzeczywistą konstrukcją zegarka,
- Dwadzieścia dziewięć mockupów projektów — APK://GENESIS, BRIXCORE, Beyond the Door,
  CAN//FORM, EDM Music Festival, THE VAULT, Skin Elixir, APKMASON ARC,
  FRUIT ENERGY, Sfera, Evolution of the Phone, THE IRIS, Pure Form, From
  Sand to Silicon, Inside the Internet, SPARK, ASCENT, ORIGIN, Poznaj AI,
  VIBE//SHIFT, PCVerse, Budżet Domowy, Mechanika Czasu, Piątunio w Korpo,
  ScrollDebt, Allergen Guard, RecAI, Top Seven i Space Scale — zastąpiono kadrami
  przygotowanymi na podstawie aktualnych assetów źródłowych i zapisanymi jako
  zoptymalizowane WebP; THE VAULT
  pokazuje bieżącą, jednoczęściową płytę drzwi otwieraną w prawo, a EDM
  aktualną scenografię i identyfikację „BEYOND THE DROP.”,
- „VOID DROP” zastąpił „Skin Elixir” na szóstej pozycji wyróżnionej
  siódemki; NEXUS-1 otwiera teraz archiwum, Skin Elixir pozostaje tuż za nim,
  a przywróconą „Mechanikę Czasu” umieszczono bezpośrednio po projekcie
  „ASCENT — The Human Journey”. Nowe projekty otrzymały opisy PL/EN, zgodne
  z ich implementacją tagi oraz dedykowane, zoptymalizowane mockupy WebP,
- „CAN//FORM” zastąpił „ORIGIN — The Cycle of Becoming” na czwartej pozycji
  wyróżnionej siódemki; ORIGIN otwiera teraz archiwum, a projekt „Mechanika
  Czasu” usunięto z prezentowanej kolekcji bez kasowania zachowanego assetu,
- `README.md` nie linkuje już do plików w `docs/`, które są wyłączone z
  wersjonowania, więc odnośniki były martwe dla każdego, kto sklonuje
  repozytorium,
- arkusz fontów Google jest ładowany bezpośrednio w `index.html` zamiast przez
  `@import` w CSS, co skraca łańcuch blokujący renderowanie o jeden przeskok
  sieciowy,
- grafikę Open Graph zastąpiono wersją JPEG (`og.jpg`, 107 KB zamiast 948 KB),
  aby podgląd linku mieścił się w limitach komunikatorów,
- inicjały `A`, `P` i `K` w stopkowej sygnaturze „AI · Pixels · Kinetics”
  otrzymały firmowy pomarańczowy kolor,
- w archiwum zamieniono miejscami projekty „Space Scale” z „Sferą” oraz
  „Pure Form” z „VIBE//SHIFT”, bez zmian w ich opisach, tagach i kategoriach,
- zaktualizowano grafikę 3D projektu „ScrollDebt” na nową oprawę smartfonową w pionowym kadrze z koralowo-czerwonym akcentem (scrolldebt_mockup.webp),
- zaktualizowano grafikę 3D projektu „Piątunio w Korpo” na nową oprawę smartfonową w pionowym kadrze (piatunio_mockup.webp),
- „THE VAULT” dodano jako siódmą wyróżnioną realizację w kategorii 3D / Spatial;
  „APKMASON ARC” przeniesiono bez usuwania do początku archiwum, a na jego
  końcu przywrócono projekty „ScrollDebt” i „Piątunio w Korpo” wraz z
  zachowanymi grafikami, zredagowanymi opisami PL/EN i aktualnymi tagami,
- przeprowadzono redakcję polskiej i angielskiej warstwy treści: poszerzono
  narrację hero poza sam scroll, dopracowano sekcje procesu i autora oraz
  wygładzono nagłówki i wybrane opisy projektów,
- ujednolicono zapis marki do `APKMason.dev` w interfejsie, metadanych SEO,
  manifeście i dokumentacji oraz zsynchronizowano opis i locale metadanych po
  zmianie języka,
- strzałka odnośnika „Do góry” w stopce otrzymała firmowy pomarańczowy
  akcent,
- noty sekcji wyróżnionych projektów i archiwum przekształcono w ciemne,
  zatopione tablice monolitu z wygasającą ramką oraz sygnaturą marki
  „A · P · K” wbudowaną w prawą dolną krawędź,
- zaktualizowano oprawę graficzną 3D dla projektu „ASCENT — The Human Journey” (ascent_human_journey_mockup.webp — obsydianowo-czarne tło ze złotą sylwetką idącego człowieka),
- dodano kategorię „Product / Commercial” dla konceptów produktowych i
  prezentacji komercyjnych; przypisano do niej Skin Elixir, APKMASON ARC,
  FRUIT ENERGY, Pure Form i Mechanikę Czasu oraz uporządkowano tagi pod kątem
  trwałych cech doświadczenia zamiast szczegółów implementacyjnych; licznik
  „Scroll Stories” jest teraz oparty na cesze projektu, a nie jego kategorii,
- „ASCENT — The Human Journey” zastąpił „From Vertex to Reality” w archiwum,
  a „APKMASON ARC” awansował do wyróżnionej siódemki w miejsce zachowanego w
  archiwum projektu „PCVerse”,
- niejasny, statyczny licznik „Product Platforms” zastąpiono dynamicznym
  licznikiem „Product Apps”, wyliczanym z projektów aplikacyjnych,
- fraza „na własny świat?” w sekcji kontaktowej otrzymała subtelny, statyczny
  gradient domykający motyw „nowych światów”, z zachowaniem trybu wymuszonych
  kolorów,
- projekt „ASCENT — The Human Journey” zastąpiono „APK://GENESIS”, który
  otwiera teraz siedem wyróżnionych realizacji; „Sfera” została przeniesiona do
  archiwum, a opis GENESIS oparto na konkretnych elementach projektu: wideo,
  typografii i dźwięku,
- nagłówek sekcji „O mnie” otrzymał znaczeniową hierarchię koloru: ciepłą biel
  dla pracy dziennej, kamienny szary dla przejścia oraz statyczny gradient
  prowadzący do firmowego pomarańczu na frazie „nowe światy”,
- noty sekcji otrzymały pełnokadrową powierzchnię monolitu pod tekstem;
  przyciemnienie i czterostronne wygaszenie do czerni są kontrolowane w CSS,
  a wersjonowany adres zasobu eliminuje poprzednie wersje z cache,
- wśród wyróżnionych EDM Music Festival zastąpił THE IRIS, a Skin Elixir
  przesunięto na piątą pozycję,
- w archiwum zamieniono miejscami VIBE//SHIFT z APKMASON ARC oraz Allergen &
  Diet Guard z THE IRIS; końcówka pozostaje uporządkowana jako Budżet Domowy,
  Top Seven i RecAI,
- wycofano projekt „Suno AI Music”, przeniesiono projekt „ASCENT — The Human Journey” na nową pozycję oraz dodano nowy projekt „EDM Music Festival” (<https://apkmason.dev/edm/>, kategoria: experiment) wraz z dedykowaną grafiką 3D (edm_mockup.webp),
- zaktualizowano pośrednią zależność `nanoid` do wersji bez podatności
  `GHSA-2v37-7h3g-55p8`; `npm audit` ponownie raportuje zero problemów,
- zaktualizowano workflow GitHub Pages do akcji opartych na Node 24, wyrównano
  środowisko CI z wymaganiami projektu i zastąpiono instalację zależności
  deterministycznym `npm ci`,
- generyczne hasło w stopce zastąpiono sygnaturą marki
  „APK / AI · Pixels · Kinetics” z dyskretnie wyróżnionymi inicjałami,
- zaktualizowano opis projektu „APKMASON ARC” (usunięcie odniesienia do jednego kadru na rzecz opisu płynnej narracji produktowej),
- zastąpiono projekt „Piątunio w Korpo” nowym projektem konceptualnym głośnika przestrzennego „APKMASON ARC” (<https://apkmasondev.github.io/arc/>, kategoria: experiment) wraz z dedykowaną grafiką 3D,
- wycofano projekt „ScrollDebt”, wstawiono w jego miejsce projekt „From Vertex to Reality” (<https://apkmason.dev/vertex/>) oraz zamieniono miejscami pozycje „Allergen & Diet Guard” z „Skin Elixir”,
- zaktualizowano tytuł strony i meta-tagi Open Graph / Twitter na „APKMason.dev — AI · Pixels · Kinetics”,
- zamieniono pozycjami karty projektów „Mechanika Czasu” oraz „FRUIT ENERGY” w siatce portfolio,
- zamieniono pozycjami karty projektów „Skin Elixir” oraz „Pure Form” w siatce portfolio,
- zastąpiono grafikę 3D projektu „SPARK” nową, bezbłędną wersją bez artefaktów podwójnych krawędzi (spark_mockup.webp),
- zaktualizowano projekt „BRIXCORE” (nowy opis kinowego doświadczenia wyboru rdzenia FORGE/EVOLVE oraz dedykowana grafika 3D), zamieniono go miejscami z projektem „FRUIT ENERGY” i zmieniono kategorię FRUIT ENERGY na experiment,
- zastąpiono projekt „From Vertex to Reality” nowym luksusowym projektem scroll-driven „Pure Form” (URL: <https://apkmason.dev/Pure_form/>, kategoria: experiment) wraz z dedykowaną grafiką 3D,
- zaktualizowano plik karty profilowej w portfolio (profile.jpg),
- zastąpiono statyczny portret interaktywną, bezdźwięczną sekwencją wideo:
  uruchamianą po najechaniu na desktopie i po dotknięciu na mobile; pierwsza
  klatka filmu zastępuje osobny poster w interfejsie,
- zaktualizowano projekt „Skin Elixir” w portfolio o nową grafikę 3D, adres URL <https://apkmason.dev/skincare_demo/> oraz kategorię experiment,
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

- `public/CNAME` przypinający domenę `apkmason.dev` do repozytorium; wcześniej
  istniała wyłącznie w ustawieniach GitHub Pages, poza kontrolą wersji, więc
  jej utrata zerwałaby przekierowanie i unieważniła wszystkie adresy kanoniczne
  oraz Open Graph,
- dodano dyskretne „echo monolitu” w notach sekcji wyróżnionych projektów i
  archiwum: dwa odmienne kadry jednego lekkiego assetu WebP, ładowanego
  wyłącznie na większych ekranach i maskowanego do czerni,
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

- martwy zasób `src/assets/hero.png` pozostały po szablonie Vite oraz atrybut
  `fetchPriority` na elemencie `video`, który nie jest przez przeglądarki
  obsługiwany,
- koncentryczne okręgi w Manifeście, które konkurowały z nowym motywem
  materiałowego przekroju,
- nieużywane pliki demonstracyjne React/Vite pozostałe po inicjalizacji projektu,
- pięć nieużywanych wariantów faviconu, logo i grafiki Open Graph,
- dwie nadmiarowe paczki oznaczone przez npm jako `extraneous`,
- powielony markup ornamentu sygnału.

### Fixed

- wszystkie adresy własne wskazują teraz na domenę docelową `apkmason.dev`
  zamiast na `apkmasondev.github.io`, która przekierowuje na nią kodem 301:
  `canonical`, `og:url`, `og:image`, `twitter:image` i dane schema.org w
  `index.html`, `sitemap.xml`, `robots.txt` oraz 21 linków do projektów w
  `src/data/projects.ts`; adres kanoniczny prowadzący przez przekierowanie
  osłabiał sygnał dla wyszukiwarek, część scraperów nie podąża za
  przekierowaniem przy pobieraniu grafiki podglądu, a każde otwarcie projektu
  kosztowało dodatkowy przeskok sieciowy,
- telefon w orientacji poziomej nie pobiera już pliku desktopowego: dodano
  wariant `hero-monolith-landscape.mp4` (854 × 480, 3,0 MB zamiast 4,9 MB)
  wybierany zapytaniem `(max-height: 520px) and (pointer: coarse)`; próg
  `max-width: 767px` obejmował wyłącznie orientację pionową, więc obrócony
  telefon trafiał na najcięższe źródło,
- film hero jest teraz aktywnie buforowany krótkim żądaniem odtwarzania, dzięki
  czemu przeglądarki mobilne przestają traktować `preload="auto"` na transmisji
  komórkowej jako pobranie samych metadanych i scrubbing nie czeka na serię
  pojedynczych zapytań zakresowych,
- pozycja klatki filmu hero jest ponownie synchronizowana po zdarzeniu
  `loadeddata`; wcześniej kadr zatrzymywał się na początku, jeśli materiał
  dobuforował się w chwili, gdy użytkownik nie przewijał strony,
- portret wideo w sekcji „O mnie” nie rywalizuje już o pasmo z filmem hero:
  startuje z `preload="none"` i plakatem `profile.jpg`, a pobieranie rusza
  dopiero przy zbliżeniu sekcji do widoku (1,3 MB mniej na starcie),
- nieaktywne etapy hero są ukrywane właściwością `visibility`, więc czytniki
  ekranu odczytują wyłącznie widoczny etap zamiast wszystkich czterech naraz,
- odczyt i zapis języka w `localStorage` jest zabezpieczony przed wyjątkiem,
  który w trybie prywatnym lub przy zablokowanym magazynie danych przerywał
  start aplikacji,
- manifest deklarował ikonę jako 512 × 512 i `maskable`, choć plik ma 256 × 256
  bez marginesu bezpieczeństwa; rozmiar i przeznaczenie odpowiadają teraz
  zasobowi,
- usunięto mobilny odstęp flex przesuwający strzałkę w okrągłym przycisku
  głównych kart i zastąpiono wcześniejsze korekty pozycyjne rzeczywistym
  wycentrowaniem ikony,
- mobilny pasek statystyk Manifestu układa się teraz w pełną siatkę 2 × 2 bez
  ucinania czwartej wartości.

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
