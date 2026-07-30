const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { data, filename } = JSON.parse(body);
        const buf = Buffer.from(data, 'base64');
        const filePath = path.join('d:\\QODER.COM\\flyingfish-accelerator\\store-listing-images', filename || 'banner_1080.png');
        fs.writeFileSync(filePath, buf);
        console.log('Saved to', filePath, 'size:', buf.length);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ok: true, path: filePath}));
        server.close();
      } catch(e) {
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(9876, '127.0.0.1', () => {
  console.log('Save server ready at http://127.0.0.1:9876');
});

// Auto-close after 30s
setTimeout(() => { server.close(); process.exit(0); }, 30000);
