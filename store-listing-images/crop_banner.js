const { execSync } = require('child_process');
const path = require('path');

// Use puppeteer to screenshot just the banner element
const script = `
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 200 });
  await page.goto('file:///d:/QODER.COM/flyingfish-accelerator/store-listing-images/banner_export.html', { waitUntil: 'networkidle0' });
  const el = await page.$('.banner');
  await el.screenshot({ path: 'd:/QODER.COM/flyingfish-accelerator/store-listing-images/banner_1080.png' });
  await browser.close();
  console.log('DONE');
})();
`;

require('fs').writeFileSync('_tmp_banner.js', script);
try {
  execSync('node _tmp_banner.js', { stdio: 'inherit' });
} finally {
  require('fs').unlinkSync('_tmp_banner.js');
}
