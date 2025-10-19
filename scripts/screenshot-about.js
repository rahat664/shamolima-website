const { chromium } = require('playwright');

(async () => {
  const url = process.env.URL || 'http://localhost:5199/about';
  const out = process.env.OUT || 'screenshots/about_page.png';

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    // Wait for hero to ensure main content rendered
    await page.waitForSelector('section.about-hero, .about-hero');
    await page.screenshot({ path: out, fullPage: true });
    console.log('Saved screenshot to', out);
  } finally {
    await browser.close();
  }
})();

