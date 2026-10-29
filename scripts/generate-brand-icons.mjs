/**
 * Rebuild app icon PNGs and splash assets from the vector master.
 * Tooling dependency only: sharp (not part of the shipped app).
 * Usage: node scripts/generate-brand-icons.mjs --sharp-module /path/to/sharp
 * With sharp installed locally, omit --sharp-module.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const option = process.argv.indexOf('--sharp-module');
const sharp = require(option >= 0 ? process.argv[option + 1] : 'sharp');
const blue = '#123e91';
const master = await readFile(path.join(root, 'packages/ui/assets/icon.svg'), 'utf8');
const outlines = master.match(/<g id="monogram"[^>]*>([\s\S]*?)<\/g>/)?.[1];
if (!outlines) throw new Error('Expected the monogram group in the vector master.');
const marks = (transform = '') => `<g fill="#ffffff" fill-rule="evenodd"${transform ? ` transform="${transform}"` : ''}>${outlines}</g>`;
const svg = (body, viewBox = '0 0 128 128') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`;
const square = svg(`<rect width="128" height="128" fill="${blue}"/>${marks()}`);
const maskable = svg(`<rect width="128" height="128" fill="${blue}"/>${marks('translate(6.4 6.4) scale(0.9)')}`);
const rounded = svg(`<rect width="128" height="128" rx="30" fill="${blue}"/>${marks()}`);
const circular = svg(`<circle cx="64" cy="64" r="64" fill="${blue}"/>${marks()}`);
// Adaptive icons use a 108 dp canvas. The master is centered at 76 dp,
// keeping the letter silhouettes inside the central 66 dp safe circle.
const adaptive = svg(marks('translate(16 16) scale(0.59375)'), '0 0 108 108');
const res = 'apps/mobile/android/app/src/main/res';
const ios = 'apps/mobile/ios/App/App/Assets.xcassets';
const jobs = [];
async function png(relative, source, width, height = width, opaque = false) {
  const dest = path.join(root, relative);
  await mkdir(path.dirname(dest), { recursive: true });
  let pipeline = sharp(Buffer.from(source), { density: Math.max(288, Math.ceil(Math.max(width, height) * 144 / 128)) }).resize(width, height);
  if (opaque) pipeline = pipeline.flatten({ background: blue });
  await pipeline.png().toFile(dest);
}
for (const size of [192, 512, 1024]) {
  jobs.push(png(`packages/ui/assets/icon-${size}.png`, maskable, size, size, true));
}
const densities = { mdpi: [48, 108], hdpi: [72, 162], xhdpi: [96, 216], xxhdpi: [144, 324], xxxhdpi: [192, 432] };
for (const [density, [legacy, foreground]] of Object.entries(densities)) {
  jobs.push(png(`${res}/mipmap-${density}/ic_launcher.png`, rounded, legacy));
  jobs.push(png(`${res}/mipmap-${density}/ic_launcher_round.png`, circular, legacy));
  jobs.push(png(`${res}/mipmap-${density}/ic_launcher_foreground.png`, adaptive, foreground));
}
jobs.push(png(`${ios}/AppIcon.appiconset/AppIcon-512@2x.png`, square, 1024, 1024, true));
const splashes = {
  drawable: [480, 320],
  'drawable-land-mdpi': [480, 320], 'drawable-land-hdpi': [800, 480],
  'drawable-land-xhdpi': [1280, 720], 'drawable-land-xxhdpi': [1600, 960],
  'drawable-land-xxxhdpi': [1920, 1280],
  'drawable-port-mdpi': [320, 480], 'drawable-port-hdpi': [480, 800],
  'drawable-port-xhdpi': [720, 1280], 'drawable-port-xxhdpi': [960, 1600],
  'drawable-port-xxxhdpi': [1280, 1920]
};
async function splash(relative, width, height) {
  const iconSize = Math.round(Math.min(width, height) * 0.23);
  const logo = await sharp(Buffer.from(rounded), { density: Math.max(288, Math.ceil(iconSize * 144 / 128)) }).resize(iconSize).png().toBuffer();
  const output = path.join(root, relative);
  await sharp({ create: { width, height, channels: 4, background: '#ffffff' } })
    .composite([{ input: logo, left: Math.round((width - iconSize) / 2), top: Math.round((height - iconSize) / 2) }])
    .png().toFile(output);
}
for (const [folder, [width, height]] of Object.entries(splashes)) jobs.push(splash(`${res}/${folder}/splash.png`, width, height));
for (const file of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
  jobs.push(splash(`${ios}/Splash.imageset/${file}`, 2732, 2732));
}
await Promise.all(jobs);
const background = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">
    <path android:fillColor="#123E91" android:pathData="M0,0h108v108H0z"/>
</vector>
`;
const androidPaths = [...outlines.matchAll(/<path d="([^"]+)"\s*\/>/g)]
  .map(m => `        <path android:fillColor="#FFFFFF" android:fillType="evenOdd" android:pathData="${m[1]}"/>`).join('\n');
const foreground = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">
    <group android:translateX="16" android:translateY="16" android:scaleX="0.59375" android:scaleY="0.59375">
${androidPaths}
    </group>
</vector>
`;
await writeFile(path.join(root, res, 'drawable/ic_launcher_background.xml'), background);
await writeFile(path.join(root, res, 'drawable-v24/ic_launcher_foreground.xml'), foreground);
await writeFile(path.join(root, res, 'values/ic_launcher_background.xml'), '<?xml version="1.0" encoding="utf-8"?>\n<resources><color name="ic_launcher_background">#123E91</color></resources>\n');
const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
    <monochrome android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`;
await mkdir(path.join(root, res, 'mipmap-anydpi-v33'), { recursive: true });
for (const name of ['ic_launcher.xml', 'ic_launcher_round.xml']) await writeFile(path.join(root, res, 'mipmap-anydpi-v33', name), adaptiveXml);
console.log('Generated day todo Web/PWA, Android launcher/adaptive/themed icons and Android/iOS splash assets.');

