# Media

## Wideo hero

Kompozycja jest **pozioma i celowo asymetryczna**: kamień zajmuje 33–88%
szerokości kadru, a lewa jedna trzecia to niemal czysta czerń (zmierzona jasność
1,8%) zarezerwowana pod nagłówek. To wymaganie układu, nie estetyka — każdy nowy
materiał hero musi je spełniać.

### Bezszwowa pętla

Klip wraca do stanu wyjściowego, ale nie klatka w klatkę, więc ostatnie pół
sekundy jest przenikane na początek. Wynik: 9,5 s zapętlone bez widocznego cięcia.

```bash
ffmpeg -i zrodlo.mp4 -filter_complex "[0:v]trim=0:9.5,setpts=PTS-STARTPTS,split[a1][a2];[a1]trim=0:0.5,setpts=PTS-STARTPTS[head];[a2]trim=start=0.5,setpts=PTS-STARTPTS[body];[0:v]trim=9.5:10,setpts=PTS-STARTPTS[tail];[head][tail]blend=all_expr='A*(T/0.5)+B*(1-T/0.5)'[mixed];[mixed][body]concat=n=2:v=1[v]"   -map "[v]" -an -c:v libx264 -preset slow -crf 28 -g 48   -pix_fmt yuv420p -movflags +faststart public/hero-loop-desktop.mp4
```

### Dwa kadry, przełączane proporcją okna

Kompozycji poziomej nie da się przyciąć do pionu bez utraty albo czarnego pola
pod typografię, albo świecącej szczeliny. Dlatego o trybie decyduje **proporcja
okna**, nie szerokość — próg to 6:5.

| Warunek | Plik | Rola |
| --- | --- | --- |
| `min-aspect-ratio: 6/5` | `hero-loop-desktop.mp4` — 1920×1080, 1,44 MB | pełny ekran, kadrowanie zakotwiczone do lewej krawędzi |
| `max-aspect-ratio: 6/5` | `hero-loop-mobile.mp4` — 900×600, 0,47 MB | kadr u góry ekranu, typografia pod nim na czerni |

Wariant telefonowy to wycinek 1620×1080 z pozycji x=300 (obejmuje cały kamień
z czernią dookoła), przeskalowany do 900×600:

```bash
# do filtra powyżej dopisz przed -map:  ;[v]crop=1620:1080:300:0,scale=900:600:flags=lanczos[s]
# i zmień -map "[v]" na -map "[s]"
```

Plakaty (pierwsza klatka każdego wariantu, `-q:v 6`):
`hero-poster.jpg` (1280×720, 29 KB) i `hero-poster-mobile.jpg` (900×600, 21 KB).

Film jest montowany dopiero po zdarzeniu `load` strony i ujawniany dopiero, gdy
ma gotową klatkę. Przy `prefers-reduced-motion` lub `Save-Data` nie jest pobierany
w ogóle — zostaje sam plakat.

## Grafiki projektów

Wszystkie mockupy są **kwadratowe** (1200–1254 px). Format jest częścią układu:
sekcja `SELECTED` pokazuje je jako kadry 1:1, podgląd w indeksie również, a na
telefonie lista rozwijana przycina je do 4:3.

## Portret

`public/profile.mp4` (720×1280, 6 s, bez dźwięku) z plakatem `public/profile.jpg`.
Wideo startuje z `preload="none"` i dociąga się dopiero, gdy sekcja `HUMAN`
zbliża się do widoku; odtwarza się na najechanie kursorem lub kliknięcie.

## Open Graph

Finalny plik: `public/og.jpg` (1200×630, JPEG — poniżej limitu 300 KB stosowanego
przez komunikatory).

## Wycofane mockupy

Grafiki projektów nieobecnych w bieżącym indeksie są przechowywane w
`docs/archive-assets/`. Nie trafiają do produkcyjnego buildu, ale można je
przywrócić razem z odpowiednim wpisem w `src/data/projects.ts`.
