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
            profileCard: !!document.querySelector('main .card'),
            homeLayout: (() => {
              const home = document.querySelector('.home-screen');
              const grid = document.querySelector('.service-grid');
              const carousel = document.querySelector('.story-carousel');
              const firstStory = document.querySelector('.story-card');
              const firstSection = document.querySelector('.home-section');
              const bounds = el => {
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
              };
              return {
                home: bounds(home),
                grid: bounds(grid),
                columns: grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0,
                story: bounds(firstStory),
                carousel: bounds(carousel),
                sectionGap: firstSection ? parseFloat(getComputedStyle(firstSection).marginTop) : 0,
                tileCount: grid ? grid.querySelectorAll('.service-tile').length : 0
              };
            })()
          }));
          if (result.document > width + 1 || result.body > width + 1) failures.push({ width, path, ...result, issue: 'horizontal overflow' });
          if (result.bottomNav && (result.bottomNav.left < -1 || result.bottomNav.right > width + 1)) failures.push({ width, path, ...result, issue: 'bottom navigation outside viewport' });
          if (path === 'pluittrans.html' && result.serviceTiles < 9) failures.push({ width, path, ...result, issue: 'all service tiles not rendered' });
          if (path === 'pluittrans.html' && result.homeLayout && result.homeLayout.columns !== (width <= 360 ? 3 : 4)) failures.push({ width, path, ...result, issue: 'service grid column count is not responsive' });
          if (path === 'pluittrans.html' && result.homeLayout && result.homeLayout.story && (result.homeLayout.story.left < -1 || result.homeLayout.story.right > width + 1)) failures.push({ width, path, ...result, issue: 'story carousel card outside viewport' });
          if (path === 'pluittrans.html' && result.homeLayout && (result.homeLayout.sectionGap < 16 || result.homeLayout.sectionGap > 24)) failures.push({ width, path, ...result, issue: 'home section spacing outside design range' });
          if (path === 'profil.html' && !result.profileCard) failures.push({ width, path, ...result, issue: 'profile content not rendered' });
          if (path === 'pluittrans.html') {
            try {
              await page.locator('[data-story="food"]').first().click();
              await page.waitForSelector('.story-article .article-body p');
              const article = await page.evaluate(() => ({
                title: document.querySelector('.story-article h1')?.textContent || '',
                paragraphs: document.querySelectorAll('.story-article .article-body p').length,
                related: document.querySelectorAll('.story-related-carousel [data-story]').length,
                serviceCta: document.querySelector('.article-service [data-story-service]')?.getAttribute('data-story-service'),
                hash: location.hash
              }));
              if (!article.title || article.paragraphs < 3 || article.related < 2 || article.serviceCta !== 'food' || article.hash !== '#story-food') {
                failures.push({ width, path, issue: 'food article or relevant related-reading flow incomplete', article });
              }
              await page.locator('.story-article [data-open-stories]').click();
              const index = await page.evaluate(() => ({
                cards: document.querySelectorAll('.stories-index [data-story]').length,
                heading: document.querySelector('.stories-index h1')?.textContent || '',
                hash: location.hash
              }));
              if (index.cards !== 6 || index.heading !== 'Cerita & inspirasi' || index.hash !== '#stories') {
                failures.push({ width, path, issue: 'all-articles index did not render', index });
              }
              await page.locator('.stories-index [data-story="courier"]').click();
              const courier = await page.evaluate(() => ({
                title: document.querySelector('.story-article h1')?.textContent || '',
                service: document.querySelector('.article-service [data-story-service]')?.getAttribute('data-story-service'),
                paragraphs: document.querySelectorAll('.story-article .article-body p').length
              }));
              if (courier.service !== 'courier' || courier.paragraphs < 3 || !courier.title.includes('paket')) {
                failures.push({ width, path, issue: 'courier article is not relevant to courier service', courier });
              }
              await page.locator('.stories-index [data-story="coffee"]').click();
              const coffee = await page.evaluate(() => ({
                title: document.querySelector('.story-article h1')?.textContent || '',
                paragraphs: document.querySelectorAll('.story-article .article-body p').length,
                service: document.querySelector('.article-service [data-story-service]')?.getAttribute('data-story-service'),
                summary: document.querySelector('.story-article .article-summary')?.textContent || ''
              }));
              if (!coffee.title.toLowerCase().includes('secangkir kopi') || coffee.paragraphs < 4 || coffee.service !== 'marketplace' || !coffee.summary.toLowerCase().includes('usaha')) {
                failures.push({ width, path, issue: 'coffee story does not explain emotional local-business and marketplace purpose', coffee });
              }
              await page.locator('.story-article [data-story-service="marketplace"]').click();
              const marketplace = await page.evaluate(() => ({
                heading: document.querySelector('.nav-panel h1')?.textContent || '',
                status: document.querySelector('.nav-panel .price')?.textContent || ''
              }));
              if (marketplace.heading !== 'PLUITS Marketplace' || !marketplace.status.toLowerCase().includes('segera')) {
                failures.push({ width, path, issue: 'Marketplace ecosystem destination is unclear', marketplace });
              }
              await page.goBack();
              await page.waitForTimeout(30);
            } catch (error) {
              failures.push({ width, path, issue: 'editorial navigation test error', error: String(error) });
            }
          }
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
