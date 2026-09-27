# Obrazek do udostępniania (Open Graph)

`public/og.jpg` (1200 × 630) to podgląd linku w komunikatorach i serwisach
społecznościowych. Źródłem jest `og.html` — ściana prac, nagłówek i sygnatura APK.
Obrazek nie zawiera liczby projektów, więc nie trzeba go odświeżać po dodaniu prac.

Ponowne wygenerowanie (Chrome + Playwright, jak w `tools/live-screens`):

```bash
node tools/og/render.cjs tools/og/og.html og-2x.png
ffmpeg -i og-2x.png -vf scale=1200:630:flags=lanczos -q:v 3 public/og.jpg
```
