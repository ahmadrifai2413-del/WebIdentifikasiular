// Run from frontend: node scripts/setup-earth.mjs
// Copies the installed Cesium runtime locally; does not alter application data/config.
import { cp, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(await readFile(join(root, 'node_modules/cesium/package.json'), 'utf8').catch(() => {
  throw Error('Cesium belum terpasang. Jalankan npm install cesium@1.127.0 di folder frontend.');
}));
if (pkg.version !== '1.127.0') throw Error(`Paket ini diuji dengan cesium@1.127.0, terpasang ${pkg.version}. Jalankan npm install cesium@1.127.0.`);
const destination = join(root, 'public/cesium');
await mkdir(destination, { recursive: true });
for (const name of ['Cesium.js', 'Assets', 'Widgets', 'Workers', 'ThirdParty']) {
  await cp(join(root, 'node_modules/cesium/Build/Cesium', name), join(destination, name), { recursive: true, force: true });
}
await cp(join(root, 'node_modules/cesium/LICENSE.md'), join(destination, 'LICENSE.md'));
console.log('Siap: runtime Cesium lokal tersimpan di public/cesium. Jalankan npm run build lalu npm run dev.');
