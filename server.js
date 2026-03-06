// ─────────────────────────────────────────────
//  NSG Group 
//  Node.js Server  |  server.js
// ─────────────────────────────────────────────

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Simple MIME type map
const MIME_TYPES = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.pdf':  'application/pdf',
};

const server = http.createServer((req, res) => {
  // Default to index.html
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext    = path.extname(filePath);
  const mime   = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback: serve index.html for unknown routes (SPA-style)
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, fallback) => {
        if (err2) {
          res.writeHead(500);
          res.end('Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallback);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   NSG Group   ║');
  console.log('  ║   Server running on port ' + PORT + '         ║');
  console.log('  ║   Open → http://localhost:' + PORT + '        ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
});
