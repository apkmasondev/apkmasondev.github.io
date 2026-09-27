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

const PLANS = {
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

(async () => {
  const [name, outDir] = process.argv.slice(2);
  const plan = PLANS[name];
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

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
  await page.waitForTimeout(plan.warm);

  const cdp = await context.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    frames.push({ data, t: metadata.timestamp });
    try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch {}
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: plan.w, maxHeight: plan.h, everyNthFrame: plan.nth || 1 });
  const started = Date.now();
  await plan.act(page, plan.seconds);
  const left = plan.seconds * 1000 - (Date.now() - started);
  if (left > 0) await page.waitForTimeout(left);
  await cdp.send('Page.stopScreencast');
  await browser.close();

  // Klatki mają nieregularne odstępy — zapisujemy je z czasami trwania do demuxera concat.
  let list = '';
  frames.forEach((frame, i) => {
    const file = `f${String(i).padStart(5, '0')}.jpg`;
    fs.writeFileSync(path.join(outDir, file), Buffer.from(frame.data, 'base64'));
    const next = frames[i + 1]?.t ?? frame.t + 1 / 30;
    list += `file '${file}'\nduration ${(next - frame.t).toFixed(4)}\n`;
  });
  list += `file 'f${String(frames.length - 1).padStart(5, '0')}.jpg'\n`;
  fs.writeFileSync(path.join(outDir, 'list.txt'), list);
  const span = frames.length ? frames.at(-1).t - frames[0].t : 0;
  console.log(`${name}: ${frames.length} klatek w ${span.toFixed(1)} s (${(frames.length / span).toFixed(1)} fps)`);
})();
