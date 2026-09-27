/**
 * Sprawdza dane projektów względem plików na dysku: czy istnieją wszystkie trzy
 * warianty grafiki (480 / 800 / 1254), czy są kwadratowe i nie za ciężkie, czy
 * identyfikatory i adresy się nie powtarzają, czy opisy są przetłumaczone, a
 * akcenty widoczne na ciemnym tle. Wypisuje też osierocone grafiki.
 *
 * Node 24 czyta plik .ts bezpośrednio — bez dodatkowych zależności.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_WIDTHS, projects } from '../src/data/projects.ts';

const WORK_DIR = join('public', 'work');
const CATEGORIES = new Set(['story', 'spatial', 'product', 'app', 'experiment']);
const MAX_KB = { 480: 40, 800: 90, 1254: 260 };

const errors = [];
const warnings = [];
const fail = (project, message) => errors.push(`${project.id}: ${message}`);
const warn = (project, message) => warnings.push(`${project.id}: ${message}`);

/** Wymiary WebP czytane z nagłówka pliku — bez dekodowania obrazu. */
function webpSize(path) {
  const bytes = readFileSync(path);
  if (bytes.subarray(0, 4).toString('ascii') !== 'RIFF') return null;
  const format = bytes.subarray(12, 16).toString('ascii');
  if (format === 'VP8X') return [1 + bytes.readUIntLE(24, 3), 1 + bytes.readUIntLE(27, 3)];
  if (format === 'VP8 ') {
    const start = bytes.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    return [bytes.readUInt16LE(start + 3) & 0x3fff, bytes.readUInt16LE(start + 5) & 0x3fff];
  }
  if (format === 'VP8L') {
    const bits = bytes.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  return null;
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const seen = { id: new Set(), link: new Set(), image: new Set() };
const expectedFiles = new Set();

for (const project of projects) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(project.id)) fail(project, 'identyfikator: małe litery i myślniki');
  for (const [key, value] of [['id', project.id], ['link', project.link], ['image', project.image]]) {
    if (seen[key].has(value)) fail(project, `${key} się powtarza`);
    seen[key].add(value);
  }

  if (!project.title.trim()) fail(project, 'brak tytułu');
  for (const lang of ['pl', 'en']) {
    const text = project.description?.[lang]?.trim() ?? '';
    if (!text) fail(project, `brak opisu ${lang.toUpperCase()}`);
    else if (text.length > 320) warn(project, `opis ${lang.toUpperCase()} jest bardzo długi (${text.length})`);
  }
  if (project.description.pl === project.description.en) warn(project, 'opis PL i EN są identyczne');

  if (!CATEGORIES.has(project.category)) fail(project, `nieznana kategoria „${project.category}”`);
  if (!project.tags.length) warn(project, 'brak tagów');
  if (project.tags.length > 4) warn(project, 'więcej niż 4 tagi — rozbiją wiersz w kadrze');

  if (!/^#[0-9a-f]{6}$/i.test(project.accent)) fail(project, 'akcent musi mieć format #rrggbb');
  else if (luminance(project.accent) < 0.12) warn(project, `akcent ${project.accent} będzie słabo widoczny na czerni`);

  try {
    const url = new URL(project.link);
    if (url.protocol !== 'https:') fail(project, 'link musi używać https');
  } catch {
    fail(project, 'nieprawidłowy link');
  }

  for (const width of IMAGE_WIDTHS) {
    const file = `${project.image}-${width}.webp`;
    expectedFiles.add(file);
    const path = join(WORK_DIR, file);
    let stat;
    try {
      stat = statSync(path);
    } catch {
      fail(project, `brak pliku public/work/${file} (npm run work-image)`);
      continue;
    }
    const size = webpSize(path);
    if (!size) fail(project, `${file} nie jest plikiem WebP`);
    else if (size[0] !== width || size[1] !== width) fail(project, `${file} ma ${size[0]}×${size[1]}, oczekiwano ${width}×${width}`);
    const kb = stat.size / 1024;
    if (kb > MAX_KB[width]) warn(project, `${file} waży ${kb.toFixed(0)} KB (limit ${MAX_KB[width]} KB)`);
  }
}

for (const project of projects.filter((item) => item.live)) {
  const file = `${project.image}-live-480.mp4`;
  expectedFiles.add(file);
  try {
    const kb = statSync(join(WORK_DIR, file)).size / 1024;
    if (kb > 300) warn(project, `${file} waży ${kb.toFixed(0)} KB (limit 300 KB)`);
  } catch {
    fail(project, `live: true, ale brak pliku public/work/${file}`);
  }
}

const featured = projects.filter((project) => project.featured).length;
if (featured < 3 || featured > 9) warnings.push(`wyróżnionych prac jest ${featured} — rozdziały najlepiej działają przy 5–8`);

for (const file of readdirSync(WORK_DIR)) {
  if (!expectedFiles.has(file)) warnings.push(`osierocona grafika: public/work/${file}`);
}

for (const message of warnings) console.warn(`⚠ ${message}`);
for (const message of errors) console.error(`✖ ${message}`);
console.log(`\n${projects.length} projektów, ${featured} wyróżnionych · ${errors.length} błędów, ${warnings.length} ostrzeżeń`);
process.exit(errors.length ? 1 : 0);
