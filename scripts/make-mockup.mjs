/**
 * Przygotowuje grafikę projektu z dowolnego pliku źródłowego: kadruje do kwadratu,
 * skaluje i dobiera jakość WebP tak, aby zmieścić się w limicie wagi. Na koniec
 * wypisuje gotowy wpis do wklejenia w src/data/projects.ts.
 *
 *   npm run mockup -- <plik> <identyfikator> [--pad] [--accent=#ff4d2e]
 *
 * --pad  zamiast przycinać, dokłada czarne pole do kwadratu (dla szerokich kadrów).
 *
 * Wymaga ffmpeg w PATH. Nie jest częścią builda — to narzędzie do ręki.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';

const SIZE = 1254;
const TARGET_KB = 180;
const QUALITY_STEPS = [88, 82, 76, 70, 64, 58];

const args = process.argv.slice(2);
const flags = args.filter((value) => value.startsWith('--'));
const [source, id] = args.filter((value) => !value.startsWith('--'));

const pad = flags.includes('--pad');
const accent = flags.find((value) => value.startsWith('--accent='))?.split('=')[1] ?? '#ff4d2e';

if (!source || !id) {
  console.error('Użycie: npm run mockup -- <plik> <identyfikator> [--pad] [--accent=#rrggbb]');
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`Nie ma pliku: ${source}`);
  process.exit(1);
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
  console.error(`Identyfikator „${id}" musi być zapisany małymi literami z myślnikami.`);
  process.exit(1);
}

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('Nie znaleziono ffmpeg w PATH. Zainstaluj ffmpeg i spróbuj ponownie.');
  process.exit(1);
}

// Przycięcie do kwadratu po krótszym boku, albo dołożenie czarnego pola po dłuższym.
const geometry = pad
  ? `scale=${SIZE}:${SIZE}:force_original_aspect_ratio=decrease,pad=${SIZE}:${SIZE}:(ow-iw)/2:(oh-ih)/2:black`
  : `crop='min(iw,ih)':'min(iw,ih)',scale=${SIZE}:${SIZE}:flags=lanczos`;

const target = `public/${id.replace(/-/g, '_')}_mockup.webp`;

let chosenQuality = null;
let kilobytes = 0;

for (const quality of QUALITY_STEPS) {
  execFileSync('ffmpeg', [
    '-v', 'error', '-y', '-i', source,
    '-vf', geometry,
    '-quality', String(quality),
    '-frames:v', '1',
    target,
  ]);

  kilobytes = Math.round(statSync(target).size / 1024);
  chosenQuality = quality;
  if (kilobytes <= TARGET_KB) break;
}

if (kilobytes > TARGET_KB) {
  console.warn(
    `Uwaga: przy jakości ${chosenQuality} plik nadal waży ${kilobytes} KB. ` +
      'Materiał jest bardzo szczegółowy — rozważ spokojniejszy kadr.',
  );
}

console.log(`\nZapisano ${target} — ${SIZE}×${SIZE}, ${kilobytes} KB, jakość ${chosenQuality}.`);
console.log('\nWklej do tablicy `projects` w src/data/projects.ts:\n');
console.log(`  {
    id: '${id}',
    title: 'TYTUŁ PROJEKTU',
    description: {
      pl: 'Opis po polsku — jedno zdanie mówiące, czym to doświadczenie jest.',
      en: 'A one-sentence description in English saying what the experience is.',
    },
    image: '/${target.slice('public/'.length)}',
    link: 'https://apkmason.dev/${id}/',
    tags: ['Tag', 'Tag'],
    category: 'story',
    accent: '${accent}',
  },`);
console.log('\nPotem uruchom: npm run validate');
