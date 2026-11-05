'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, Globe2, Info, Leaf, MapPin, Maximize2, RotateCcw, Search, X } from 'lucide-react';
import { species, type Species } from '../../data/species';
import GlobeCanvas from './earth/GlobeCanvas';
import { REGIONS, type CameraTarget, type RegionChoice } from './earth/catalog';
import './ExploreMap.css';

function SpeciesPhoto({ item }: { item: Species }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [item.image]);
  return item.image && !failed ? <img src={item.image} alt="" loading="lazy" onError={() => setFailed(true)}/>
    : <span className="earth-photo-empty" aria-label="Foto belum tersedia"><Leaf size={21}/></span>;
}

type VenomFilter = 'all' | 'venomous' | 'nonvenomous' | 'unknown';

export default function ExploreMap({ onSelect }: { onSelect: (s: Species) => void }) {
  // No slice, fixed limit, or replacement data: every item in species.ts is included.
  const [region, setRegion] = useState<RegionChoice>('all');
  const [focus, setFocus] = useState('all');
  const [query, setQuery] = useState('');
  const [venomFilter, setVenomFilter] = useState<VenomFilter>('all');
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');
  const [target, setTarget] = useState<CameraTarget>({ revision: 0, kind: 'indonesia', regions: [] });
  const boardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = species.find(s => s.id === focus);
  const counts = useMemo(() => Object.fromEntries(REGIONS.map(r => [r.name,
    species.filter(s => s.regions.includes(r.name) && (focus === 'all' || s.id === focus)).length,
  ])), [focus]);
  const regionSpecies = useMemo(() => species.filter(s =>
    (region === 'all' || s.regions.includes(region)) && (focus === 'all' || s.id === focus)
  ), [region, focus]);
  const filtered = useMemo(() => regionSpecies.filter(s => {
    const match = `${s.name} ${s.scientific} ${s.family}`.toLocaleLowerCase('id-ID').includes(query.trim().toLocaleLowerCase('id-ID'));
    const venomMatches = venomFilter === 'all' ||
      (venomFilter === 'venomous' && s.venom === true) ||
      (venomFilter === 'nonvenomous' && s.venom === false) ||
      (venomFilter === 'unknown' && s.venom == null);
    return match && venomMatches;
  }), [regionSpecies, query, venomFilter]);
  const families = new Set(regionSpecies.map(s => s.family).filter(Boolean)).size;
  const regionCount = REGIONS.filter(r => counts[r.name] > 0).length;
  const hasFilter = region !== 'all' || focus !== 'all' || !!query || venomFilter !== 'all';

  function chooseRegion(next: RegionChoice) {
    setRegion(next); setQuery('');
    setTarget(t => ({ revision: t.revision + 1, kind: next === 'all' ? 'indonesia' : 'region', regions: next === 'all' ? [] : [next] }));
  }
  function chooseSpecies(id: string) {
    setFocus(id); setRegion('all'); setQuery(''); setVenomFilter('all');
    const item = species.find(s => s.id === id);
    setTarget(t => ({ revision: t.revision + 1, kind: item ? 'species' : 'indonesia', regions: item?.regions || [] }));
  }
  function resetFilters() {
    setFocus('all'); setRegion('all'); setQuery(''); setVenomFilter('all');
    setTarget(t => ({ revision: t.revision + 1, kind: 'indonesia', regions: [] }));
  }
  async function toggleFullscreen() {
    setFullscreenError('');
    try {
      if (document.fullscreenElement === boardRef.current) await document.exitFullscreen();
      else if (boardRef.current?.requestFullscreen) await boardRef.current.requestFullscreen();
      else setFullscreenError('Browser ini belum mendukung layar penuh.');
    } catch { setFullscreenError('Layar penuh belum diizinkan browser. Globe tetap bisa digunakan.'); }
  }
  async function openSpecies(item: Species) {
    // The application's modal lives outside this board, so exit fullscreen first.
    if (document.fullscreenElement === boardRef.current) {
      try { await document.exitFullscreen(); } catch { setFullscreenError('Keluar layar penuh dengan Esc untuk membuka detail.'); return; }
    }
    onSelect(item);
  }
  useEffect(() => {
    const change = () => setFullscreen(document.fullscreenElement === boardRef.current);
    document.addEventListener('fullscreenchange', change);
    return () => document.removeEventListener('fullscreenchange', change);
  }, []);
  useEffect(() => listRef.current?.scrollTo({ top: 0 }), [region, focus, query, venomFilter]);

  return <section className="content page-section earth-explorer earth-3d-explorer">
    <header className="earth-heading">
      <div><span className="earth-kicker"><span/> SERPENTA FIELD ATLAS <span className="earth-edition">/ EARTH EDITION</span></span>
        <h1>A world to explore.<br className="earth-mobile-break"/> <em>A species to discover.</em></h1>
        <p>Dari bumi ke kepulauan. Jelajahi seluruh koleksi ular Serpenta dalam satu atlas.</p>
      </div>
      <div className="earth-overview" aria-label="Ringkasan katalog">
        <div><b>{species.length}</b><span>Spesies di katalog</span></div>
        <div><b>07</b><span>Wilayah eksplorasi</span></div>
        <span className="earth-overview-icon"><Globe2 size={28} strokeWidth={1}/></span>
      </div>
    </header>
    <div className="earth-toolbar">
      <label className="earth-species-filter"><Leaf size={17}/><span>Jelajahi</span>
        <select value={focus} aria-label="Filter spesies pada globe" onChange={e => chooseSpecies(e.target.value)}>
          <option value="all">Semua {species.length} spesies</option>
          {species.map(s => <option key={s.id} value={s.id}>{s.name} — {s.scientific}</option>)}
        </select>
      </label>
      <div className="earth-toolbar-actions"><span className="earth-toolbar-note"><span/>{regionCount} wilayah dengan entri katalog</span>
        <button type="button" className="earth-reset-filter" disabled={!hasFilter} onClick={resetFilters}><RotateCcw size={13}/>Reset filter</button>
      </div>
    </div>
    <nav className="earth-region-tabs" aria-label="Pilih wilayah">
      <button type="button" className={region === 'all' ? 'is-active' : ''} aria-pressed={region === 'all'} onClick={() => chooseRegion('all')}><Globe2 size={13}/>Seluruh Indonesia<span>{focus === 'all' ? species.length : selected ? 1 : 0}</span></button>
      {REGIONS.map(r => <button type="button" key={r.name} className={region === r.name ? 'is-active' : ''} aria-pressed={region === r.name} onClick={() => chooseRegion(r.name)}>{r.name}<span>{counts[r.name]}</span></button>)}
    </nav>
    {selected && !REGIONS.some(r => selected.regions.includes(r.name)) && <div className="earth-range-note"><Info size={15}/>Spesies tetap ada dalam katalog, tetapi persebarannya belum cocok dengan tujuh wilayah peta. Tidak ada penanda lokasi yang dibuat otomatis.</div>}
    <div className="earth-board" ref={boardRef}>
      <GlobeCanvas region={region} counts={counts} target={target} onRegion={chooseRegion} onIndonesia={() => chooseRegion('all')}/>
      <aside className="earth-sidebar" aria-label="Daftar seluruh spesies atau hasil filter">
        <div className="earth-region-heading">
          <span className="earth-kicker"><MapPin size={12}/>{region === 'all' ? 'SELURUH KOLEKSI' : 'WILAYAH PILIHAN'}</span>
          <h2>{region === 'all' ? 'Indonesia' : region}</h2>
          <p>{region === 'all' ? 'Semua spesies katalog, siap untuk dijelajahi.' : 'Kenali spesies yang tercatat di wilayah ini.'}</p>
          <div className="earth-region-stats"><span><b>{regionSpecies.length}</b> Spesies</span><span><b>{families}</b> Famili</span>
            <button type="button" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? 'Keluar layar penuh' : 'Buka layar penuh'} title="Layar penuh">{fullscreen ? <X size={17}/> : <Maximize2 size={17}/>}</button>
          </div>
        </div>
        <label className="earth-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama atau famili…" aria-label="Cari spesies dalam daftar"/>{query && <button type="button" onClick={() => setQuery('')} aria-label="Hapus pencarian"><X size={14}/></button>}</label>
        <label className="earth-risk-filter"><span>Status bisa</span><select aria-label="Filter status bisa" value={venomFilter} onChange={e => setVenomFilter(e.target.value as VenomFilter)}><option value="all">Semua status</option><option value="venomous">Berbisa</option><option value="nonvenomous">Tidak berbisa</option><option value="unknown">Belum terverifikasi</option></select></label>
        <div className="earth-species-list" ref={listRef} tabIndex={0} aria-label="Daftar spesies, dapat digulir">
          {filtered.map((s, index) => <button type="button" key={s.id} className="earth-species-row" onClick={() => void openSpecies(s)}>
            <span className="earth-species-photo"><SpeciesPhoto item={s}/></span>
            <span className="earth-species-copy"><span className="earth-row-family">{String(index + 1).padStart(2, '0')} / {s.family || 'Famili belum tersedia'}</span><b>{s.name}</b><i>{s.scientific}</i>
              <span className={`earth-venom ${s.venom === true ? 'is-venomous' : s.venom === false ? 'is-nonvenomous' : 'is-unknown'}`}><span/>{s.venom == null ? 'Status bisa belum terverifikasi' : s.venomLabel}</span>
            </span><ChevronRight size={15} className="earth-row-arrow"/>
          </button>)}
          {!filtered.length && <div className="earth-list-empty"><Search size={26} strokeWidth={1}/><b>Belum ada entri yang cocok</b><p>Ubah pencarian atau filter. Daftar kosong tidak membuktikan suatu wilayah bebas ular.</p><button onClick={resetFilters}>Lihat semua {species.length} spesies</button></div>}
        </div>
        <div className="earth-list-footer"><span aria-live="polite">{filtered.length} dari {regionSpecies.length} spesies</span><span>Klik untuk detail <ArrowUpRight size={12}/></span></div>
      </aside>
      {fullscreenError && <div className="earth-control-error" role="status">{fullscreenError}<button aria-label="Tutup pesan" onClick={() => setFullscreenError('')}><X size={14}/></button></div>}
    </div>
    <footer className="earth-map-footer"><span><Info size={15}/>Penanda wilayah adalah ringkasan katalog, bukan lokasi satwa secara langsung.</span><span>Globe 3D · Citra satelit · Seluruh koleksi</span></footer>
  </section>;
}
