import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'belle-house-niger');
const types = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.css': 'text/css', '.js': 'text/javascript' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    const safe = normalize(pathname).replace(/^([.][.][/\\])+/, '');
    const file = join(root, pathname === '/' ? 'index.html' : safe);
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});
server.listen(4173, '127.0.0.1', () => console.log('Belle House preview: http://127.0.0.1:4173'));
