// Type-only import: the runtime is served locally from public/cesium.
export type CesiumAPI = typeof import('cesium');
declare global {
  interface Window { Cesium?: CesiumAPI; CESIUM_BASE_URL?: string; }
}
let pending: Promise<CesiumAPI> | null = null;

export function loadCesium(): Promise<CesiumAPI> {
  if (window.Cesium) return Promise.resolve(window.Cesium);
  if (pending) return pending;
  const base = new URL('cesium/', document.baseURI).href;
  window.CESIUM_BASE_URL = base;
  pending = new Promise((resolve, reject) => {
    const cssId = 'serpenta-cesium-style';
    let style = document.getElementById(cssId) as HTMLLinkElement | null;
    if (!style) {
      style = document.createElement('link');
      style.id = cssId; style.rel = 'stylesheet'; style.href = base + 'Widgets/widgets.css';
      document.head.append(style);
    }
    const script = document.createElement('script');
    script.src = base + 'Cesium.js'; script.async = true;
    const fail = () => {
      clearTimeout(timer); script.remove(); pending = null;
      reject(Error('Runtime globe belum tersedia. Jalankan node scripts/setup-earth.mjs di folder frontend, lalu muat ulang.'));
    };
    const timer = window.setTimeout(fail, 25000);
    script.onerror = fail;
    script.onload = () => {
      if (!window.Cesium) { fail(); return; }
      clearTimeout(timer); resolve(window.Cesium);
    };
    document.head.append(script);
  });
  return pending;
}
