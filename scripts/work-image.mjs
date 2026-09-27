/**
 * Przygotowuje grafikę projektu we wszystkich trzech wariantach:
 *
 *   npm run work-image -- <plik-źródłowy> <klucz>
 *
 * Źródło jest kadrowane do kwadratu (środek), skalowane i zapisywane jako
 * public/work/<klucz>-{480,800,1254}.webp. Wymaga ffmpeg w PATH (z libwebp).
 * Na koniec wypisuje szkielet wpisu do src/data/projects.ts.
 */
import { spawnSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';

const [source, key] = process.argv.slice(2);
if (!source || !key || !/^[a-z0-9_]+$/.test(key)) {
  console.error('Użycie: npm run work-image -- <plik> <klucz_z_podkresleniami>');
  process.exit(1);
}

const QUALITY = { 480: 70, 800: 76, 1254: 80 };

for (const [width, quality] of Object.entries(QUALITY)) {
  const out = join('public', 'work', `${key}-${width}.webp`);
  const result = spawnSync(
    'ffmpeg',
    [
      '-loglevel', 'error', '-y', '-i', source,
      '-vf', `crop='min(iw,ih)':'min(iw,ih)',scale=${width}:${width}:flags=lanczos`,
      '-c:v', 'libwebp', '-quality', String(quality), '-compression_level', '6', out,
    ],
    { stdio: 'inherit' },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`✓ ${out}  ${(statSync(out).size / 1024).toFixed(0)} KB`);
}

console.log(`
  {
    id: '${key.replace(/_/g, '-')}',
    title: '',
    description: { pl: '', en: '' },
    image: '${key}',
    link: 'https://apkmason.dev/…/',
    tags: [],
    category: 'story',
    accent: '#',
  },`);
