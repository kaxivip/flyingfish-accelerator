const fs = require('fs');
// Read the base64 data from the cache file
const raw = fs.readFileSync(
  'C:\\Users\\kaxue\\.qoder\\cache\\projects\\flyingfish-accelerator-739003c7\\agent-tools\\task-6fc\\d133cd6a.txt',
  'utf8'
);
// Extract the base64 part after "data:image/png;base64,"
const match = raw.match(/data:image\/png;base64,([A-Za-z0-9+/=\n\r]+)/);
if (!match) { console.error('No base64 found'); process.exit(1); }
const b64 = match[1].replace(/[\n\r]/g, '');
const buf = Buffer.from(b64, 'base64');
fs.writeFileSync('d:\\QODER.COM\\flyingfish-accelerator\\store-listing-images\\banner_1080.png', buf);
console.log('Saved! Size:', buf.length, 'bytes');
