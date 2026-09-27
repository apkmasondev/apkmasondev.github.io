// Nagrywa stronę przez CDP screencast (klatki z kompozytora, niezależne od zasłonięcia okna).
// Użycie: node record.cjs <plan> <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const scroll = (px = 1800) => async (page, t) => {
  await page.mouse.move(700, 450);
  const steps = 200;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, px / steps);
    await page.waitForTimeout((t * 1000) / steps);
  }
};
const idle = async (page) => { await page.mouse.move(5, 5); };

const clickThenScroll = (label, px) => async (page, t) => {
  await page.getByText(label, { exact: false }).first().click({ timeout: 5000 }).catch(() => undefined);
  await page.waitForTimeout(1500);
  await scroll(px)(page, t - 1.5);
};

// Sesja ręczna: skrypt tylko nagrywa, a w oknie gra człowiek.
const manual = async () => {};

const PLANS = {
  aeris: { url: 'https://apkmason.dev/aeris/', w: 1440, h: 900, warm: 20000, seconds: 45, nth: 2, act: manual },
  brixcore: {
    url: 'https://apkmason.dev/brixcore/', w: 1270, h: 900, warm: 3000, seconds: 30, quality: 80,
    // Intro z klockami, potem wybór rdzenia FORGE (pomarańczowy, lewy przycisk).
    act: async (page) => {
      await page.waitForTimeout(9000);
      await page.mouse.move(560, 470);
      await page.waitForTimeout(600);
      await page.mouse.click(560, 470);
    },
  },
  dual: { url: 'https://apkmason.dev/dual_choice/', w: 1370, h: 900, warm: 5000, seconds: 15, act: clickThenScroll('CONTINUE MUTED', 2000) },
  vault: { url: 'https://apkmason.dev/the_vault/', w: 1380, h: 900, warm: 5000, seconds: 14, act: clickThenScroll('ENTER MUTED', 1150) },
  watch: { url: 'https://apkmason.dev/time-v2/', w: 1494, h: 900, warm: 9000, seconds: 10, act: scroll(2200) },
  ostoja: { url: 'https://apkmason.dev/ostoja/', w: 1438, h: 900, warm: 3000, seconds: 14, act: idle },
  nexus: { url: 'https://apkmason.dev/nexus-game/', w: 1316, h: 900, warm: 6000, seconds: 22, act: idle, nth: 2 },
  prime: { url: 'https://apkmason.dev/prime/', w: 1330, h: 900, warm: 5000, seconds: 10, act: scroll(1800) },
  tsukimi: { url: 'https://apkmason.dev/pinball-3d/', w: 1294, h: 900, warm: 6000, seconds: 12, act: idle },
  veil: { url: 'https://apkmason.dev/veil/', w: 1404, h: 900, warm: 5000, seconds: 10, act: scroll(2000) },
  skincare: { url: 'https://apkmason.dev/skincare_demo/', w: 1404, h: 900, warm: 5000, seconds: 10, act: scroll(1600) },
  aurora: {
    url: 'https://apkmason.dev/aurora/', w: 1466, h: 1000, warm: 5000, seconds: 10,
    act: async (page) => { await page.mouse.move(1400, 960); },
  },
  zamek: {
    url: 'https://apkmason.dev/zamek/', w: 1484, h: 900, warm: 22000, seconds: 10,
    // Powolne przeciąganie: kamera obraca się wokół zamku.
    act: async (page, t) => {
      await page.mouse.move(1100, 520);
      await page.mouse.down();
      const steps = 300;
      for (let i = 1; i <= steps; i++) {
        await page.mouse.move(1100 - i * 1.3, 520 + Math.sin(i / 60) * 6);
        await page.waitForTimeout((t * 1000) / steps);
      }
      await page.mouse.up();
    },
  },
  spectrum: {
    url: 'https://apkmason.dev/spectrum/', w: 1440, h: 898, warm: 5000, seconds: 10,
    act: async (page, t) => {
      await page.mouse.move(720, 450);
      const steps = 200;
      for (let i = 0; i < steps; i++) {
        await page.mouse.wheel(0, 9);
        await page.waitForTimeout((t * 1000) / steps);
      }
    },
  },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Każda operacja na przeglądarce przy zamykaniu ma limit — nic nie może zawiesić zapisu.
const withTimeout = (promise, ms) => Promise.race([promise.catch(() => undefined), sleep(ms)]);

(async () => {
  const [name, outDir] = process.argv.slice(2);
  const plan = PLANS[name];
  fs.mkdirSync(outDir, { recursive: true });
  for (const file of fs.readdirSync(outDir)) fs.unlinkSync(path.join(outDir, file));

  const browser = await chromium.launch({
    // Zainstalowany Chrome (kodeki H.264, GPU); inną ścieżkę podaj w CHROME_PATH.
    executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: false,
    args: [
      '--disable-features=CalculateNativeWinOcclusion',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--autoplay-policy=no-user-gesture-required',
      '--mute-audio',
      '--hide-scrollbars',
    ],
  });
  const context = await browser.newContext({ viewport: { width: plan.w, height: plan.h }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(plan.url, { waitUntil: 'load', timeout: 90000 });

  // Odliczanie na pasku tytułu okna — widać je w oknie, ale nie ma go w nagraniu.
  const setTitle = (text) => page.evaluate((t) => { document.title = t; }, text).catch(() => undefined);
  for (let left = Math.round(plan.warm / 1000); left > 0; left--) {
    await setTitle(`○ START ZA ${left} s — przygotuj się`);
    await sleep(1000);
  }

  // Klatki trafiają na dysk od razu — w pamięci nie zbiera się nic.
  const times = [];
  let recording = true;
  const cdp = await context.newCDPSession(page);
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    if (recording) {
      fs.writeFileSync(path.join(outDir, `f${String(times.length).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
      times.push(metadata.timestamp);
    }
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => undefined);
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: plan.quality || 92, maxWidth: plan.w, maxHeight: plan.h, everyNthFrame: plan.nth || 1 });

  const started = Date.now();
  const actDone = withTimeout(plan.act(page, plan.seconds), plan.seconds * 1000);
  while (Date.now() - started < plan.seconds * 1000) {
    const left = Math.ceil((plan.seconds * 1000 - (Date.now() - started)) / 1000);
    await setTitle(`● REC 0:${String(left).padStart(2, '0')}`);
    await sleep(500);
  }
  recording = false;
  await withTimeout(actDone, 1000);
  await setTitle('■ KONIEC — dziękuję!');
  await withTimeout(cdp.send('Page.stopScreencast'), 3000);
  await sleep(800);
  await withTimeout(browser.close(), 5000);

  // Klatki mają nieregularne odstępy — zapisujemy je z czasami trwania do demuxera concat.
  let list = '';
  times.forEach((t, i) => {
    const next = times[i + 1] ?? t + 1 / 30;
    list += `file 'f${String(i).padStart(5, '0')}.jpg'\nduration ${(next - t).toFixed(4)}\n`;
  });
  if (times.length) list += `file 'f${String(times.length - 1).padStart(5, '0')}.jpg'\n`;
  fs.writeFileSync(path.join(outDir, 'list.txt'), list);
  const span = times.length ? times.at(-1) - times[0] : 0;
  console.log(`${name}: ${times.length} klatek w ${span.toFixed(1)} s (${(times.length / span).toFixed(1)} fps)`);
  process.exit(0);
})();
