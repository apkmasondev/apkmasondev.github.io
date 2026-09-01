/**
 * Sprawdza dane projektów względem rzeczywistości: czy grafiki istnieją, są
 * kwadratowe i nie za ciężkie, czy identyfikatory i adresy się nie powtarzają,
 * czy kolory akcentu będą widoczne na czarnym tle.
 *
 * Uruchamiany przez `npm run validate` oraz przez `npm run check` przed buildem,
 * więc błędny wpis nie ma jak trafić na produkcję.
 *
 * Node 24 czyta plik .ts bezpośrednio — nie potrzeba tu żadnej zależności.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { projects } from '../src/data/projects.ts';

const PUBLIC_DIR = 'public';
const CATEGORIES = new Set(['story', 'spatial', 'product', 'app']);
const MAX_IMAGE_KB = 260;
const MAX_TAGS = 4;
const SQUARE_TOLERANCE = 0.02;

const errors = [];
const warnings = [];

const fail = (project, message) => errors.push(`${project.id}: ${message}`);
const warn = (project, message) => warnings.push(`${project.id}: ${message}`);

/** Wymiary WebP/JPEG/PNG czytane z nagłówka pliku — bez dekodowania obrazu. */
function readImageSize(path) {
  const bytes = readFileSync(path);

  if (bytes.subarray(0, 4).toString('ascii') === 'RIFF') {
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
  }

  return null;
}

/** Jasność względna wg WCAG — akcenty świecą na czerni, więc ciemne są bezużyteczne. */
function relativeLuminance(hex) {
  const channels = [1, 3, 5].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

const seenIds = new Map();
const seenLinks = new Map();
const seenImages = new Map();
const usedImages = new Set();

for (const project of projects) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(project.id)) {
    fail(project, 'identyfikator musi być zapisany małymi literami z myślnikami');
  }
  if (seenIds.has(project.id)) fail(project, 'identyfikator się powtarza');
  seenIds.set(project.id, true);

  if (!project.title.trim()) fail(project, 'brak tytułu');

  for (const language of ['pl', 'en']) {
    const text = project.description?.[language]?.trim() ?? '';
    if (!text) fail(project, `brak opisu w wersji ${language.toUpperCase()}`);
    else if (text.length < 40) warn(project, `opis ${language.toUpperCase()} jest bardzo krótki`);
    else if (text.length > 320) warn(project, `opis ${language.toUpperCase()} nie zmieści się w kadrze`);
  }

  if (project.description?.pl && project.description.pl === project.description.en) {
    warn(project, 'opis PL i EN są identyczne — brak tłumaczenia');
  }

  if (!CATEGORIES.has(project.category)) {
    fail(project, `nieznana kategoria „${project.category}"`);
  }

  if (!/^#[0-9a-f]{6}$/i.test(project.accent)) {
    fail(project, `accent musi być kolorem w formacie #rrggbb, jest „${project.accent}"`);
  } else if (relativeLuminance(project.accent) < 0.08) {
    warn(project, 'accent jest zbyt ciemny — zniknie na czarnym tle');
  }

  if (!Array.isArray(project.tags) || project.tags.length === 0) {
    fail(project, 'brak tagów');
  } else if (project.tags.length > MAX_TAGS) {
    warn(project, `${project.tags.length} tagów — powyżej ${MAX_TAGS} rozjeżdża kadr wybranych prac`);
  }

  try {
    const url = new URL(project.link);
    if (url.protocol !== 'https:') fail(project, 'adres projektu musi używać https');
  } catch {
    fail(project, `adres „${project.link}" nie jest poprawnym URL-em`);
  }
  if (seenLinks.has(project.link)) {
    fail(project, `adres powtarza się z projektem „${seenLinks.get(project.link)}"`);
  }
  seenLinks.set(project.link, project.id);

  if (!project.image.startsWith('/')) {
    fail(project, 'ścieżka grafiki musi zaczynać się od „/"');
    continue;
  }
  if (!project.image.endsWith('.webp')) warn(project, 'grafika nie jest w formacie WebP');

  if (seenImages.has(project.image)) {
    fail(project, `grafika jest już użyta przez „${seenImages.get(project.image)}"`);
  }
  seenImages.set(project.image, project.id);

  const file = join(PUBLIC_DIR, project.image.slice(1));
  usedImages.add(project.image.slice(1));

  let stats;
  try {
    stats = statSync(file);
  } catch {
    fail(project, `brak pliku ${file}`);
    continue;
  }

  const kilobytes = Math.round(stats.size / 1024);
  if (kilobytes > MAX_IMAGE_KB) {
    warn(project, `grafika waży ${kilobytes} KB (limit ${MAX_IMAGE_KB} KB) — użyj npm run mockup`);
  }

  const size = readImageSize(file);
  if (!size) {
    warn(project, 'nie udało się odczytać wymiarów grafiki');
  } else {
    const [width, height] = size;
    if (Math.abs(width / height - 1) > SQUARE_TOLERANCE) {
      fail(project, `grafika ${width}×${height} nie jest kwadratowa — układ zakłada proporcję 1:1`);
    } else if (width < 1000) {
      warn(project, `grafika ma tylko ${width} px boku — zalecane 1200–1400`);
    }
  }
}

const featuredCount = projects.filter((project) => project.featured).length;
if (featuredCount < 4 || featuredCount > 8) {
  warnings.push(
    `wybrane prace: ${featuredCount} — sekcja SELECTED jest projektowana pod 5–8 pozycji`,
  );
}

const orphans = readdirSync(PUBLIC_DIR)
  .filter((name) => name.endsWith('_mockup.webp') && !usedImages.has(name));

const report = (label, lines) => {
  if (lines.length === 0) return;
  console.log(`\n${label}`);
  for (const line of lines) console.log(`  ${line}`);
};

report('BŁĘDY', errors);
report('OSTRZEŻENIA', warnings);
report('GRAFIKI BEZ PROJEKTU (trafiają do dist, ale nie są nigdzie użyte)', orphans);

console.log(
  `\n${projects.length} projektów, ${featuredCount} wyróżnionych — ` +
    `${errors.length} błędów, ${warnings.length} ostrzeżeń, ${orphans.length} osieroconych grafik.`,
);

if (errors.length > 0) process.exit(1);
