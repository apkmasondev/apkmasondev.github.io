// Renderuje stronę HTML do PNG: node og.cjs <plik.html> <wyjście.png> [szer] [wys]
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');

(async () => {
  const [file, out, w = '1200', h = '630'] = process.argv.slice(2);
  const b = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--allow-file-access-from-files'],
  });
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 })).newPage();
  await p.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(800);
  await p.screenshot({ path: out });
  await b.close();
})();
