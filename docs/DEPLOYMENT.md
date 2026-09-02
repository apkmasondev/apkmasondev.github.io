# Publikacja

## Przed wdrożeniem

1. Uruchom `npm ci`.
2. Uruchom `npm run check`.
3. Otwórz `npm run preview` i sprawdź kluczowe sekcje na telefonie i desktopie.
4. Zweryfikuj adresy projektów w `src/data/projects.ts`.
5. Sprawdź, czy docelowy adres nadal brzmi `https://apkmason.dev/`.

Jeżeli domena się zmieni, zaktualizuj:

- canonical i metadane Open Graph w `index.html`,
- adresy w JSON-LD,
- `public/robots.txt`,
- `public/sitemap.xml`.

## GitHub Pages

Push na `main` uruchamia `.github/workflows/deploy.yml`. Workflow instaluje
zależności, waliduje dane projektów, buduje stronę, tworzy pojedynczy artefakt
Pages i publikuje go pod domeną zapisaną w `public/CNAME`.

Nie publikuj katalogu `dist` ręcznie i nie twórz drugiego artefaktu
`github-pages` w tym samym przebiegu — wdrożenie obsługuje wyłącznie workflow.

## Kontrola po wdrożeniu

- strona otwiera się bez błędów konsoli,
- hero reaguje na scroll i nie odtwarza dźwięku,
- przełącznik PL/EN działa po odświeżeniu,
- filtry archiwum są dostępne z klawiatury,
- linki projektów otwierają się w nowej karcie,
- `robots.txt`, `sitemap.xml`, `site.webmanifest` i `og.jpg` zwracają HTTP 200,
- podgląd linku nie zawiera starej grafiki „Alexander Chen”.
