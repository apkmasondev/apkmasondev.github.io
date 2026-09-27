# Żywe ekrany na ścianie hero

Narzędzie robocze (nie jest częścią strony ani buildu). Nagrywa działający
projekt i wpasowuje nagranie w ekran laptopa na jego mockupie, tak że kafel na
ścianie wygląda jak zdjęcie, tylko ekran żyje.

Wymaga: Chrome, `ffmpeg`, Python z Pillow (tylko do wyznaczania narożników)
oraz Playwright uruchamianego z dowolnego katalogu roboczego (`npm i playwright`).

## Kroki

1. **Narożniki ekranu** na mockupie 1254 px (powiększone wycinki z siatką):

   ```bash
   python corners.py ../../public/work/<klucz>-1254.webp out.png x1,y1 x2,y2 x3,y3 x4,y4
   ```

2. **Nagranie** — dopisz plan do `PLANS` w `record.cjs` (adres, okno o proporcjach
   ekranu z mockupu, czas rozgrzania, akcja: scroll / przeciąganie / nic) i uruchom:

   ```bash
   node record.cjs <plan> rec-<plan>
   cd rec-<plan> && ffmpeg -f concat -safe 0 -i list.txt -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" -c:v libx264 -crf 14 ../raw-<plan>.mp4
   ```

3. **Montaż** — pętla bez szwu (przenikanie 0,8 s), wpasowanie w ekran, kafel 480 px:

   ```bash
   bash compose.sh <klucz> raw-<plan>.mp4 <start> <koniec> <x> <y> <szer> <wys>
   ```

4. Skopiuj `<klucz>-live-480.mp4` do `public/work/`, dodaj `live: true` przy
   projekcie w `src/data/projects.ts` i uruchom `npm run validate` (limit 300 KB).

## Użyte parametry

| Projekt  | Okno nagrania | Fragment | Ekran na mockupie 1254 px (x, y, szer., wys.) |
| -------- | ------------- | -------- | --------------------------------------------- |
| aurora   | 1466 × 1000   | 0–10 s   | 221, 345, 813, 555                             |
| zamek    | 1484 × 900    | 0–11 s   | 179, 310, 894, 542                             |
| spectrum | 1440 × 898    | 0–10 s   | 224, 327, 800, 499                             |
| apkmason_watch  | 1494 × 900 | 2,5–12,5 s (scroll) | 122, 198, 1012, 610             |
| ostoja          | 1438 × 900 | 0–12 s (samo)       | 163, 265, 928, 581 (crf 32)     |
| nexus_game      | 1316 × 900 | 1–10 s (samo, nth 2) | 230, 298, 797, 545             |
| prime           | 1330 × 900 | 2–12 s (scroll)     | 180, 322, 905, 613              |
| tsukimi_pinball | 1294 × 900 | 1,5–11,5 s (samo)   | 190, 200, 905, 630              |
| veil            | 1404 × 900 | 0–8,6 s (scroll)    | 193, 314, 882, 565 (crf 33)     |
| skincare        | 1404 × 900 | 0–8 s (scroll)      | 229, 282, 795, 510              |
| the_vault       | 1380 × 900 | 2–14 s (klik „ENTER MUTED” + wolny scroll) | 232, 302, 813, 530 (crf 31) |
| dual_choice     | 1370 × 900 | 2–13,5 s (klik „CONTINUE MUTED” + scroll) | **compose-quad.sh**: 193,311 1042,311 189,874 1054,874 |

Nie nadają się (produkt lub kolaż wychodzi poza ekran albo laptop pod kątem):
KSZTAŁT SIŁY, CAN//FORM, FRUIT ENERGY, Pure Form, Pinball 2D, Sfera, Beyond the Door.

## Budżet

Na ścianie jest 12 żywych ekranów (~1,45 MB łącznie, 50–200 KB każdy). Filmy mają
`preload="none"` i startują dopiero, gdy kafel wjedzie w jasną część ściany —
na desktopie gra ich naraz ok. 7, na telefonie maksymalnie 4 (pierwsze z listy).
Więcej niż ~12 nie ma sensu: ściana zaczyna migotać, a ruch przestaje przyciągać wzrok.

Najlepiej sprawdzają się mockupy z frontalnym laptopem (ekran jest prostokątem).
Gdy ekran jest lekko trapezowy (laptop minimalnie pod kątem, jasny ekran na
ciemnej ramce), użyj `compose-quad.sh` z czterema narożnikami — nagranie jest
przekształcane perspektywicznie i przycinane maską o zaokrąglonych rogach.

Gry 3D (WebGL) nagrywaj z `nth: 2` — pełne 60 kl./s przy długich nagraniach
potrafi zablokować rekorder, a na kaflu i tak wystarcza 24 kl./s.
