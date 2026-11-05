import { useEffect, useRef, useState } from 'react';
import type { Viewer, Entity } from 'cesium';
import { Compass, Globe2, Info, Layers, LoaderCircle, Minus, Pause, Play, Plus, RotateCcw } from 'lucide-react';
import { loadCesium, type CesiumAPI } from './loadCesium';
import { REGIONS, motionDuration, type CameraTarget, type RegionChoice, type RegionName } from './catalog';

type Props = {
  region: RegionChoice;
  counts: Record<string, number>;
  target: CameraTarget;
  onRegion: (name: RegionName) => void;
  onIndonesia: () => void;
};

export default function GlobeCanvas(props: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const apiRef = useRef<CesiumAPI | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const worldView = useRef(false);
  const introTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [boot, setBoot] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [imageryWarning, setImageryWarning] = useState('');
  const [imageryBusy, setImageryBusy] = useState(true);
  const [mode, setMode] = useState<'3D' | '2D'>('3D');
  const [morphing, setMorphing] = useState(false);
  const [orbit, setOrbit] = useState(false);
  const [basemap, setBasemap] = useState<'satellite' | 'atlas'>('satellite');
  const [tilted, setTilted] = useState(false);
  const [altitude, setAltitude] = useState(20000);
  const [help, setHelp] = useState(false);

  function cancelIntro() {
    if (introTimer.current) clearTimeout(introTimer.current);
    introTimer.current = null;
    viewerRef.current?.camera.cancelFlight();
  }

  function fly(target: CameraTarget, seconds = 1.7) {
    const C = apiRef.current; const v = viewerRef.current;
    if (!C || !v || v.isDestroyed()) return;
    worldView.current = false;
    cancelIntro(); setOrbit(false); setTilted(false);
    if (v.scene.mode === C.SceneMode.MORPHING) v.scene.completeMorph();
    const matches = REGIONS.filter(r => target.regions.includes(r.name));
    if (target.kind === 'region' && matches[0]) {
      const r = matches[0];
      if (v.scene.mode === C.SceneMode.SCENE3D) {
        v.camera.flyToBoundingSphere(new C.BoundingSphere(C.Cartesian3.fromDegrees(r.lon, r.lat), 0), {
          offset: new C.HeadingPitchRange(0, C.Math.toRadians(-68), r.range), duration: motionDuration(seconds),
        });
      } else v.camera.flyTo({ destination: C.Cartesian3.fromDegrees(r.lon, r.lat, r.range), duration: motionDuration(seconds) });
    } else {
      const extent = target.kind === 'species' && matches.length ? C.Rectangle.fromDegrees(
        Math.min(...matches.map(r => r.lon)) - 4, Math.min(...matches.map(r => r.lat)) - 3,
        Math.max(...matches.map(r => r.lon)) + 4, Math.max(...matches.map(r => r.lat)) + 3,
      ) : C.Rectangle.fromDegrees(94, -12, 142, 7);
      v.camera.flyTo({ destination: extent, duration: motionDuration(seconds) });
    }
    v.scene.requestRender();
  }

  function showGlobe() {
    const C = apiRef.current; const v = viewerRef.current;
    if (!C || !v) return;
    cancelIntro(); setOrbit(false); setTilted(false);
    worldView.current = true;
    if (v.scene.mode !== C.SceneMode.SCENE3D) {
      v.scene.morphTo3D(0); setMode('3D');
    }
    v.camera.flyTo({ destination: C.Cartesian3.fromDegrees(118, 12, 22000000),
      orientation: { heading: 0, pitch: -Math.PI / 2, roll: 0 }, duration: motionDuration(2) });
  }

  function changeMode(next: '3D' | '2D') {
    const v = viewerRef.current;
    if (!v || morphing || next === mode) return;
    cancelIntro(); setOrbit(false); setMode(next); setMorphing(true); setTilted(false);
    const remove = v.scene.morphComplete.addEventListener(() => {
      remove(); if (v.isDestroyed()) return;
      setMorphing(false); fly(latest.current.target, 0.7);
    });
    if (next === '2D') v.scene.morphTo2D(motionDuration(0.8));
    else v.scene.morphTo3D(motionDuration(0.8));
  }

  function zoom(direction: 1 | -1) {
    const v = viewerRef.current;
    if (!v) return;
    cancelIntro(); setOrbit(false);
    const amount = Math.max(100, v.camera.positionCartographic.height * 0.32);
    if (direction === 1) v.camera.zoomIn(amount); else v.camera.zoomOut(amount);
    v.scene.requestRender();
  }

  function tilt() {
    const C = apiRef.current; const v = viewerRef.current;
    if (!C || !v || mode !== '3D') return;
    cancelIntro(); setOrbit(false);
    const point = v.camera.pickEllipsoid(new C.Cartesian2(v.canvas.clientWidth / 2, v.canvas.clientHeight / 2), C.Ellipsoid.WGS84);
    if (!point) return;
    const distance = C.Cartesian3.distance(v.camera.positionWC, point);
    v.camera.flyToBoundingSphere(new C.BoundingSphere(point, 0), {
      offset: new C.HeadingPitchRange(0, C.Math.toRadians(tilted ? -90 : -45), distance), duration: motionDuration(1.2),
    });
    setTilted(!tilted);
  }

  useEffect(() => {
    let dead = false;
    let local: Viewer | null = null;
    let dispose = () => {};
    setReady(false); setError(''); setImageryWarning(''); setMode('3D'); setBasemap('satellite');
    setOrbit(false); setMorphing(false);
    async function start() {
      const C = await loadCesium();
      // The local Natural Earth layer keeps geography available if the internet fails.
      const base = await C.TileMapServiceImageryProvider.fromUrl(C.buildModuleUrl('Assets/Textures/NaturalEarthII'), {
        credit: new C.Credit('Natural Earth', true),
      });
      if (dead || !hostRef.current) return;
      const v = new C.Viewer(hostRef.current, {
        baseLayer: new C.ImageryLayer(base), baseLayerPicker: false,
        terrainProvider: new C.EllipsoidTerrainProvider(),
        animation: false, timeline: false, geocoder: false, homeButton: false,
        sceneModePicker: false, navigationHelpButton: false, fullscreenButton: false,
        infoBox: false, selectionIndicator: false, shouldAnimate: false,
        requestRenderMode: true, maximumRenderTimeChange: Infinity,
        sceneMode: C.SceneMode.SCENE3D, msaaSamples: 2,
        contextOptions: { webgl: { alpha: false, powerPreference: 'high-performance' } },
      });
      local = v; viewerRef.current = v; apiRef.current = C;
      v.useBrowserRecommendedResolution = false;
      v.resolutionScale = Math.min(1, 1.5 / window.devicePixelRatio);
      v.scene.globe.enableLighting = false;
      v.scene.backgroundColor = C.Color.fromCssColorString('#071311');
      v.scene.globe.baseColor = C.Color.fromCssColorString('#18332c');
      v.scene.globe.maximumScreenSpaceError = 2;
      v.scene.screenSpaceCameraController.minimumZoomDistance = 200;
      v.scene.screenSpaceCameraController.maximumZoomDistance = 40000000;
      v.scene.screenSpaceCameraController.tiltEventTypes = [C.CameraEventType.MIDDLE_DRAG, {
        eventType: C.CameraEventType.LEFT_DRAG, modifier: C.KeyboardEventModifier.CTRL,
      }];
      v.canvas.setAttribute('aria-label', 'Globe interaktif Serpenta. Gunakan tombol di sekeliling peta untuk navigasi.');
      v.canvas.tabIndex = 0;
      const satellite = new C.UrlTemplateImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maximumLevel: 17, tilingScheme: new C.WebMercatorTilingScheme(),
        credit: new C.Credit('Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a> — Esri, Vantor, Earthstar Geographics, and the GIS User Community', true),
      });
      v.imageryLayers.addImageryProvider(satellite);
      let failures = 0;
      let waitTimer: ReturnType<typeof setTimeout> | undefined;
      const removeError = satellite.errorEvent.addEventListener(() => {
        if (dead) return;
        failures += 1;
        if (failures >= 3) setImageryWarning('Sebagian citra satelit belum termuat. Coba muat ulang, atau gunakan Peta dasar.');
      });
      const removeProgress = v.scene.globe.tileLoadProgressEvent.addEventListener((pending: number) => {
        if (dead) return;
        setImageryBusy(pending > 0);
        if (!pending) {
          clearTimeout(waitTimer); waitTimer = undefined;
          if (!failures) setImageryWarning('');
        }
        else if (!waitTimer) waitTimer = setTimeout(() => {
          if (!dead) setImageryWarning('Pemuatan citra memerlukan waktu lebih lama. Periksa internet atau pilih Peta dasar.');
        }, 18000);
      });
      const updateAltitude = () => { if (!dead) setAltitude(Math.max(0, Math.round(v.camera.positionCartographic.height / 1000))); };
      const removeCamera = v.camera.moveEnd.addEventListener(updateAltitude);
      const removeRenderError = v.scene.renderError.addEventListener(() => {
        if (!dead) setError('Globe gagal dirender. Coba muat ulang dan aktifkan akselerasi grafis browser. Daftar spesies tetap dapat dibuka.');
      });
      const click = new C.ScreenSpaceEventHandler(v.canvas);
      click.setInputAction((movement: { position: import('cesium').Cartesian2 }) => {
        const picked = v.scene.pick(movement.position);
        if (picked?.id instanceof C.Entity) {
          const name = picked.id.name;
          if (REGIONS.some(r => r.name === name)) latest.current.onRegion(name as RegionName);
        }
      }, C.ScreenSpaceEventType.LEFT_CLICK);
      const stopMotion = () => { cancelIntro(); setOrbit(false); };
      v.canvas.addEventListener('pointerdown', stopMotion);
      v.canvas.addEventListener('wheel', stopMotion, { passive: true });
      let previousWidth = hostRef.current.clientWidth;
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      const observer = new ResizeObserver(() => {
        if (dead || v.isDestroyed()) return;
        v.resize();
        const width = hostRef.current?.clientWidth || 0;
        for (const entity of v.entities.values) {
          if (entity.label) entity.label.show = new C.ConstantProperty(width > 480 || entity.name === latest.current.region);
        }
        if (Math.abs(width - previousWidth) > 60) {
          previousWidth = width; clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (!dead && !v.isDestroyed() && !worldView.current) fly(latest.current.target, 0);
          }, 100);
        }
        v.scene.requestRender();
      });
      observer.observe(hostRef.current);
      v.camera.setView({ destination: C.Cartesian3.fromDegrees(118, 12, 22000000) });
      updateAltitude(); setReady(true);
      introTimer.current = setTimeout(() => {
        if (!dead && !v.isDestroyed()) fly(latest.current.target, 2.8);
      }, motionDuration(1) ? 1100 : 0);
      dispose = () => {
        clearTimeout(waitTimer); clearTimeout(resizeTimer); observer.disconnect(); click.destroy();
        removeError(); removeProgress(); removeCamera(); removeRenderError();
        v.canvas.removeEventListener('pointerdown', stopMotion);
        v.canvas.removeEventListener('wheel', stopMotion);
      };
    }
    void start().catch(e => {
      if (!dead) setError(e instanceof Error ? e.message : 'Globe belum dapat dimuat.');
    });
    return () => {
      dead = true;
      if (introTimer.current) clearTimeout(introTimer.current);
      introTimer.current = null;
      dispose();
      if (local && !local.isDestroyed()) { local.camera.cancelFlight(); local.destroy(); }
      viewerRef.current = null; apiRef.current = null;
    };
  }, [boot]);

  useEffect(() => {
    if (ready && props.target.revision > 0) fly(props.target);
  }, [ready, props.target]);

  useEffect(() => {
    const C = apiRef.current; const v = viewerRef.current;
    if (!C || !v || !ready) return;
    const markers: Entity[] = [];
    for (const r of REGIONS) {
      const selected = props.region === r.name;
      const count = props.counts[r.name] || 0;
      markers.push(v.entities.add({
        id: `serpenta-region-${r.name}`, name: r.name,
        position: C.Cartesian3.fromDegrees(r.lon, r.lat, 10000),
        point: { pixelSize: selected ? 12 : 8, color: C.Color.fromCssColorString(count ? '#d4ed9f' : '#9daea1'),
          outlineColor: C.Color.WHITE, outlineWidth: selected ? 3 : 1,
          distanceDisplayCondition: new C.DistanceDisplayCondition(0, 16000000) },
        label: { show: (hostRef.current?.clientWidth || 0) > 480 || selected, text: `${r.name}  ·  ${count}`, font: '12px sans-serif',
          fillColor: C.Color.fromCssColorString(selected ? '#213c2a' : '#edf5df'),
          showBackground: true, backgroundColor: C.Color.fromCssColorString(selected ? '#dceec2' : '#142d25dd'),
          backgroundPadding: new C.Cartesian2(9, 6), pixelOffset: new C.Cartesian2(0, 22),
          verticalOrigin: C.VerticalOrigin.TOP, horizontalOrigin: C.HorizontalOrigin.CENTER,
          distanceDisplayCondition: new C.DistanceDisplayCondition(0, 14000000),
        },
      }));
    }
    v.scene.requestRender();
    return () => { if (!v.isDestroyed()) for (const m of markers) v.entities.remove(m); };
  }, [ready, props.region, props.counts]);

  useEffect(() => {
    const v = viewerRef.current;
    if (!v || !ready) return;
    // Layer 0 = bundled Natural Earth. Layer 1 = remote satellite imagery.
    const layer = v.imageryLayers.get(1);
    if (layer) layer.show = basemap === 'satellite';
    if (basemap === 'atlas') { setImageryWarning(''); setImageryBusy(false); }
    v.scene.requestRender();
  }, [basemap, ready]);

  useEffect(() => {
    const C = apiRef.current; const v = viewerRef.current;
    if (!C || !v || !orbit || mode !== '3D' || !ready) return;
    cancelIntro();
    let frame = 0; let previous = performance.now();
    const spin = (now: number) => {
      if (v.isDestroyed()) return;
      const delta = Math.min((now - previous) / 1000, 0.05); previous = now;
      if (!document.hidden) { v.camera.rotate(C.Cartesian3.UNIT_Z, delta * 0.025); v.scene.requestRender(); }
      frame = requestAnimationFrame(spin);
    };
    frame = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frame);
  }, [orbit, mode, ready]);

  return <div className="earth-map-shell earth-globe-shell" data-globe-ready={ready} data-mode={mode}>
    <div className="earth-globe" ref={hostRef} />
    <div className="earth-map-top">
      <div className="earth-map-label"><Globe2 size={17}/><div><b>EARTH ATLAS</b><small>SERPENTA / INDONESIA</small></div></div>
      <div className="earth-layer-control" role="group" aria-label="Dimensi peta">
        {(['3D','2D'] as const).map(m => <button key={m} type="button" disabled={!ready || morphing} className={mode === m ? 'is-active' : ''} aria-pressed={mode === m} onClick={() => changeMode(m)}>{m === '3D' && <Globe2 size={13}/>} {m}</button>)}
      </div>
    </div>
    <div className="earth-map-tools">
      <div className="earth-zoom-tools">
        <button type="button" disabled={!ready || morphing} title="Perbesar" aria-label="Perbesar peta" onClick={() => zoom(1)}><Plus size={18}/></button>
        <button type="button" disabled={!ready || morphing} title="Perkecil" aria-label="Perkecil peta" onClick={() => zoom(-1)}><Minus size={18}/></button>
        <button type="button" disabled={!ready || morphing} title="Fokus Indonesia" aria-label="Fokus Indonesia" onClick={props.onIndonesia}><RotateCcw size={16}/></button>
      </div>
      <button type="button" className="earth-expand" disabled={!ready || morphing} title="Lihat bola bumi" aria-label="Lihat bola bumi" onClick={showGlobe}><Globe2 size={18}/></button>
      <button type="button" className={`earth-expand ${tilted ? 'is-on' : ''}`} disabled={!ready || morphing || mode === '2D'} title="Miringkan / tegakkan kamera" aria-label="Miringkan kamera" aria-pressed={tilted} onClick={tilt}><Compass size={18}/></button>
      <button type="button" className={`earth-expand ${orbit ? 'is-on' : ''}`} disabled={!ready || morphing || mode === '2D'} title={orbit ? 'Hentikan putaran' : 'Putar globe otomatis'} aria-label={orbit ? 'Hentikan putaran' : 'Putar globe otomatis'} aria-pressed={orbit} onClick={() => setOrbit(o => !o)}>{orbit ? <Pause size={17}/> : <Play size={17}/>}</button>
    </div>
    <div className="earth-basemap-bar">
      <Layers size={14}/><button type="button" disabled={!ready} className={basemap === 'satellite' ? 'is-active' : ''} aria-pressed={basemap === 'satellite'} onClick={() => setBasemap('satellite')}>Satelit</button>
      <button type="button" disabled={!ready} className={basemap === 'atlas' ? 'is-active' : ''} aria-pressed={basemap === 'atlas'} onClick={() => setBasemap('atlas')}>Peta dasar</button>
      <button type="button" aria-label="Cara menggunakan globe" aria-expanded={help} onClick={() => setHelp(!help)}><Info size={14}/></button>
    </div>
    <div className="earth-globe-readout"><span>{mode} EXPLORER</span><b>{altitude.toLocaleString('id-ID')} <small>km</small></b><span>Ketinggian kamera</span></div>
    {help && <div className="earth-help"><b>Cara menjelajah</b><p>Drag untuk menggeser atau memutar bumi. Scroll atau cubit layar untuk zoom. Ctrl + drag untuk memiringkan kamera pada mode 3D.</p><p>Penanda menunjukkan wilayah persebaran dalam katalog, bukan lokasi penemuan satwa.</p><button onClick={() => setHelp(false)}>Mengerti</button></div>}
    {!ready && !error && <div className="earth-boot" role="status"><Globe2 size={40} strokeWidth={1}/><b>Menyiapkan bumi untuk dijelajahi</b><span><LoaderCircle size={15} className="earth-spin"/> Memuat globe 3D…</span></div>}
    {ready && imageryBusy && !imageryWarning && !error && basemap === 'satellite' && <div className="earth-globe-loading" role="status"><LoaderCircle size={13} className="earth-spin"/>Memuat citra…</div>}
    {imageryWarning && !error && basemap === 'satellite' && <div className="earth-map-alert" role="status"><Info size={18}/><div><b>Citra satelit belum lengkap</b><p>{imageryWarning}</p><button onClick={() => setBoot(n => n + 1)}>Muat ulang</button><button onClick={() => setBasemap('atlas')}>Peta dasar</button><button onClick={() => setImageryWarning('')}>Tutup pesan</button></div></div>}
    {error && <div className="earth-boot earth-boot-error" role="alert"><Info size={30}/><b>Globe belum bisa dibuka</b><p>{error}</p><button onClick={() => setBoot(n => n + 1)}>Coba lagi</button></div>}
  </div>;
}
