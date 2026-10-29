import { cp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'packages/ui');
const web = path.join(root, 'apps/web/dist');
const mobile = path.join(root, 'apps/mobile/www');
for (const dest of [web, mobile]) {
  const relative = path.relative(root, dest).split(path.sep).join('/');
  if (!dest.startsWith(root + path.sep) || !['apps/web/dist', 'apps/mobile/www'].includes(relative)) throw new Error('Unexpected output path');
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  for (const name of await readdir(source)) {
    if (name !== 'package.json') await cp(path.join(source, name), path.join(dest, name), { recursive: true });
  }
}
let html = await readFile(path.join(source, 'index.html'), 'utf8');
html = html.replace('</head>', '<link rel="apple-touch-icon" href="assets/icon-192.png"></head>');
await writeFile(path.join(web, 'index.html'), html.replace('</body>', '<script src="pwa.js"></script></body>'));
await writeFile(path.join(web, 'pwa.js'), `if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) { navigator.serviceWorker.register('./sw.js').catch(console.warn); }\n`);
const assets = [];
async function walk(folder, prefix = '') {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const rel = `${prefix}${entry.name}`;
    if (entry.isDirectory()) await walk(path.join(folder, entry.name), rel + '/');
    else if (entry.name !== 'sw.js') assets.push(rel);
  }
}
await walk(web);
const hash = createHash('sha256');
for (const asset of assets.sort()) hash.update(await readFile(path.join(web, asset)));
const version = hash.digest('hex').slice(0, 12);
await writeFile(path.join(web, 'sw.js'), `const CACHE='little-days-${version}';\nconst ASSETS=${JSON.stringify(['./',...assets.map(a=>'./'+a)])};\nself.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('little-days-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));});\n`);
await build({ absWorkingDir: root, tsconfigRaw: {}, entryPoints: [path.join(root, 'apps/mobile/src/native-bridge.js')], bundle: true, format: 'iife', target: 'es2020', outfile: path.join(mobile, 'native-bridge.js'), minify: true });
await writeFile(path.join(mobile, 'index.html'), html.replace('<script src="app.js">', '<script src="native-bridge.js"></script><script src="app.js">'));
console.log(`Built Web/PWA and mobile assets (${version}).`);
