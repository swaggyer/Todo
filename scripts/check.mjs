import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = async p => readFile(path.join(root,p),'utf8');
const exists = async p => access(path.join(root,p));
for (const name of ['packages/ui/app.js','apps/mobile/src/native-bridge.js','scripts/build.mjs','scripts/serve.mjs','scripts/package.mjs']) {
  const result=spawnSync(process.execPath,['--check',path.join(root,name)],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
}
for (const name of ['package.json','apps/web/package.json','apps/mobile/package.json','packages/ui/package.json','packages/ui/manifest.webmanifest']) JSON.parse(await read(name));
const config=JSON.parse(await read('apps/mobile/capacitor.config.json'));
assert.equal(config.appId,'com.swaggyer.littledays');
assert.equal(config.webDir,'www');
assert.equal(config.server?.url,undefined,'Native app must bundle local assets');
const ui=await read('packages/ui/app.js');
assert(ui.includes("indexedDB.open('little-days-v1',1)"),'Keep the existing local data identity');
assert(ui.includes('nativeBridge.capturePhoto()')&&ui.includes('nativeBridge.exportBackup(state,today)'));
const manifest=JSON.parse(await read('packages/ui/manifest.webmanifest'));
for (const icon of manifest.icons) {
  const data=await readFile(path.join(root,'packages/ui',icon.src));
  const size=Number(icon.sizes.split('x')[0]);
  assert.equal(data.readUInt32BE(16),size);assert.equal(data.readUInt32BE(20),size);
}
const plist=await read('apps/mobile/ios/App/App/Info.plist');
for (const key of ['NSCameraUsageDescription','NSPhotoLibraryUsageDescription','NSPhotoLibraryAddUsageDescription']) assert(plist.includes(key));
assert((await read('apps/mobile/ios/App/App/PrivacyInfo.xcprivacy')).includes('C617.1'));
assert((await read('apps/mobile/ios/App/App.xcodeproj/project.pbxproj')).includes('PrivacyInfo.xcprivacy in Resources'));
assert((await read('apps/mobile/android/app/build.gradle')).includes('com.swaggyer.littledays'));
for (const file of ['apps/mobile/android/gradlew','apps/mobile/android/gradlew.bat','apps/mobile/android/gradle/wrapper/gradle-wrapper.jar','apps/mobile/ios/App/CapApp-SPM/Package.swift','pnpm-lock.yaml']) await exists(file);
// Validate built assets if a build is available; check can also run before build in CI.
let built=false;try{await exists('apps/web/dist/index.html');built=true;}catch{}
if(built){
  for(const target of ['apps/web/dist','apps/mobile/www']){
    const html=await read(`${target}/index.html`);
    for(const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){
      if(!/^(https?:|data:)/.test(match[1]))await exists(`${target}/${match[1]}`);
    }
  }
  const worker=await read('apps/web/dist/sw.js');
  const assets=JSON.parse(worker.match(/const ASSETS=(\[[^;]+\]);/)[1]);
  assert(assets.includes('./index.html')&&assets.includes('./manifest.webmanifest'));
  for(const asset of assets.filter(x=>x!=='./'))await exists(`apps/web/dist/${asset.slice(2)}`);
  assert((await read('apps/mobile/www/index.html')).includes('native-bridge.js'));
  assert(!(await read('apps/mobile/www/index.html')).includes('pwa.js'));
}
const storageRegression=spawnSync(process.execPath,[path.join(root,'scripts/storage-regression.mjs')],{encoding:'utf8'});
assert.equal(storageRegression.status,0,storageRegression.stderr||storageRegression.stdout);
process.stdout.write(storageRegression.stdout);
console.log('Passed JavaScript, asset, manifest, native config and data compatibility checks.');
