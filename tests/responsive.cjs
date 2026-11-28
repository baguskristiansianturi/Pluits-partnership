const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const sizes = [320, 360, 375, 390, 430, 600, 768, 1024, 1280, 1920];
  const pages = ['index.html', 'pluittrans.html', 'profil.html', 'motorbike.html', 'mobil.html', 'makanan.html', 'kopi.html', 'kurir.html', 'antar-barang.html', 'belanja.html', 'tiket.html', 'travel.html'];
  const failures = [];
  try {
    for (const width of sizes) {
      const page = await browser.newPage({ viewport: { width, height: 850 }, deviceScaleFactor: 1 });
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.hostname !== '127.0.0.1') return route.abort();
        return route.continue();
      });
      for (const path of pages) {
        try {
          await page.goto('http://127.0.0.1:4173/' + path, { waitUntil: 'domcontentloaded', timeout: 15000 });
          await page.waitForTimeout(100);
          const result = await page.evaluate(() => ({
            viewport: window.innerWidth,
            document: document.documentElement.scrollWidth,
            body: document.body ? document.body.scrollWidth : 0,
            url: location.pathname + location.hash,
            bottomNav: (() => {
              const el = document.querySelector('.bottom-nav, nav');
              if (!el) return null;
              const r = el.getBoundingClientRect();
              return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
            })(),
            serviceTiles: document.querySelectorAll('.service-tile').length,
            overflowElements: Array.from(document.querySelectorAll('body *')).map(el => ({tag: el.tagName, cls: typeof el.className === 'string' ? el.className.slice(0,90) : '', id: el.id, left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right), width: Math.round(el.getBoundingClientRect().width)})).filter(el => el.right > window.innerWidth + 1 || el.left < -1).slice(0,12),
            profileCard: !!document.querySelector('main .card')
          }));
          if (result.document > width + 1 || result.body > width + 1) failures.push({ width, path, ...result, issue: 'horizontal overflow' });
          if (result.bottomNav && (result.bottomNav.left < -1 || result.bottomNav.right > width + 1)) failures.push({ width, path, ...result, issue: 'bottom navigation outside viewport' });
          if (path === 'pluittrans.html' && result.serviceTiles < 4) failures.push({ width, path, ...result, issue: 'service grid not rendered' });
          if (path === 'profil.html' && !result.profileCard) failures.push({ width, path, ...result, issue: 'profile content not rendered' });
        } catch (error) {
          failures.push({ width, path, issue: 'page load/test error', error: String(error) });
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  if (failures.length) { console.error(JSON.stringify(failures, null, 2)); process.exit(1); }
  console.log('Responsive browser test passed: ' + pages.length + ' pages × ' + sizes.length + ' viewport widths (' + pages.length * sizes.length + ' checks).');
})().catch(error => { console.error(error); process.exit(1); });
