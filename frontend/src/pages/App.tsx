'use client';

import AuthPage from '../auth/AuthPage';
import {useAuth} from '../auth/AuthContext';
import '../auth/auth.css';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ImageIcon,
  Info,
  ScanLine,
  Search,
  ShieldCheck,
  Globe2,
  X,
} from 'lucide-react';

import { species, type Species } from '../data/species';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';
import SpeciesCard from '../components/ui/SpeciesCard';
import SpeciesDetail from '../components/ui/SpeciesDetail';
import { PageHeading, Empty } from '../components/ui/PageHeading';

import Hero from '../components/features/Hero';
import Detector from '../components/features/Detector';
import HistoryPage from '../components/features/History';
import ExploreMap from '../components/features/ExploreMap';
import Compare from '../components/features/Compare';
import Similar from '../components/features/Similar';
import Habitats from '../components/features/Habitats';
import Safety from '../components/features/Safety';

const routes = [
  'login',
  'register',
  'home',
  'detector',
  'species',
  'compare',
  'gallery',
  'map',
  'similar',
  'habitats',
  'safety',
  'history',
];

export default function App() {
  const auth=useAuth();
  const [page, setPage] = useState('home');
  const [menu, setMenu] = useState('');
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'venom' | 'nonvenom'>('all');
  const [selected, setSelected] = useState<Species | null>(null);
  const [lightbox, setLightbox] = useState<Species | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const change = () => {
      const key = location.hash.slice(1).split('?')[0];
      setPage(routes.includes(key) ? key : 'home');
      setMenu('');
      setMobile(false);
    };
    change();
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  useEffect(() => {
    function close(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenu('');
        setMobile(false);
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const nav = (p: string) => {
    location.hash = p;
    setMenu('');
    setMobile(false);
  };

  // Filter pencarian dan status bisa
  // venom: null adalah unverified, tidak masuk ke filter nonvenom
  const results = species.filter(s => {
    const matchesQuery = (
      s.name +
      ' ' +
      s.english +
      ' ' +
      s.scientific +
      ' ' +
      s.regions.join(' ')
    )
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'venom' ? s.venom === true : s.venom === false);

    return matchesQuery && matchesFilter;
  });

  const privatePage = page === 'history' || page === 'detector';
  const next = new URLSearchParams(location.hash.split('?')[1] || '').get('next') || 'home';
  if (privatePage && auth.loading) return <main className="sa-session">Memeriksa sesi…</main>;
  if (privatePage && auth.error) return <main className="sa-session"><p>{auth.error}</p><button onClick={()=>void auth.refresh()}>Coba lagi</button><a href="#home">Kembali</a></main>;
  if (page === 'login' || page === 'register' || (privatePage && !auth.user)) {
    return <AuthPage key={page} mode={page === 'register' ? 'register' : 'login'} returnTo={privatePage ? page : next}/>;
  }
  return (
    <>
      <Header
        page={page}
        menu={menu}
        setMenu={setMenu}
        mobile={mobile}
        setMobile={setMobile}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main
        className={page === 'home' ? 'home-shell' : 'feature-shell'}
        data-page={page}
      >
        {page === 'home' ? (
          <>
            <Hero onSelect={setSelected} />

            <section className="home-intro content">
              <div>
                <span className="eyebrow">CURIOSITY. WITH A LITTLE CAUTION.</span>
                <h2>
                  Kenali dunia yang
                  <br />
                  <em>sering terlewatkan.</em>
                </h2>
              </div>
              <div>
                <p>
                  Dari rimbunnya hutan hingga halaman rumah. Temukan cerita,
                  ciri, dan habitat ular di sekitar kita—dan pelajari cara
                  berbagi ruang dengan aman.
                </p>
                <a href="#species" className="text-link">
                  Buka Snakepedia <ArrowUpRight size={18} />
                </a>
              </div>
            </section>

            <section className="feature-links content">
              <a href="#detector">
                <ScanLine />
                <span>01 / IDENTIFY</span>
                <h3>
                  Satu foto.
                  <br />
                  Awal sebuah penemuan.
                </h3>
                <p>Upload foto atau gunakan kamera untuk memulai pengamatan.</p>
                <ArrowUpRight className="corner" />
              </a>
              <a href="#map">
                <Globe2 />
                <span>02 / EXPLORE</span>
                <h3>
                  Setiap spesies,
                  <br />
                  punya rumah.
                </h3>
                <p>Telusuri ringkasan persebaran ular di kepulauan Indonesia.</p>
                <ArrowUpRight className="corner" />
              </a>
              <a href="#safety">
                <ShieldCheck />
                <span>03 / STAY SAFE</span>
                <h3>
                  Rasa ingin tahu.
                  <br />
                  Tetap jaga jarak.
                </h3>
                <p>
                  Kenali langkah aman saat berjumpa ular dan panduan darurat.
                </p>
                <ArrowUpRight className="corner" />
              </a>
            </section>

            <section className="featured content">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">FROM THE SNAKEPEDIA</span>
                  <h2>Meet the extraordinary.</h2>
                </div>
                <a href="#species" className="text-link">
                  Semua spesies <ArrowRight size={17} />
                </a>
              </div>
              <div className="species-grid">
                {species.slice(0, 3).map(s => (
                  <SpeciesCard key={s.id} s={s} onSelect={setSelected} />
                ))}
              </div>
            </section>
          </>
        ) : page === 'detector' ? (
          <Detector onSelect={setSelected} />
        ) : page === 'history' ? (
          <HistoryPage onSelect={setSelected} />
        ) : page === 'species' || page === 'gallery' ? (
          <section className="content page-section">
            <PageHeading
              label={
                page === 'gallery'
                  ? 'A DIFFERENT PERSPECTIVE'
                  : 'THE LIVING ENCYCLOPEDIA'
              }
              title={
                page === 'gallery'
                  ? 'Wild, in every frame.'
                  : 'A world worth knowing.'
              }
              text={
                page === 'gallery'
                  ? 'Lihat lebih dekat keragaman warna dan pola ular. Klik foto untuk memperbesar.'
                  : 'Jelajahi nama, ciri, habitat, dan persebaran ular. Mulai dari enam spesies dalam koleksi awal.'
              }
            />

            <div className="collection-intro">
              <div>
                <span className="eyebrow">THE COLLECTION</span>
                <h2>
                  {page === 'gallery'
                    ? 'Through a different lens.'
                    : 'Meet your wild neighbours.'}
                </h2>
              </div>
              <div className="collection-stats">
                <span>
                  <b>{species.length.toString().padStart(2, '0')}</b> Spesies
                </span>
                <span>
                  <b>
                    {new Set(species.map(s => s.family)).size
                      .toString()
                      .padStart(2, '0')}
                  </b>{' '}
                  Famili
                </span>
              </div>
            </div>

            <div className="toolbar">
              <label className="search-field">
                <Search size={18} />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Cari nama, nama ilmiah, atau wilayah…"
                  aria-label="Cari spesies"
                />
                {query && (
                  <button
                    className="icon-button"
                    onClick={() => setQuery('')}
                    aria-label="Hapus pencarian"
                    type="button"
                  >
                    <X size={16} />
                  </button>
                )}
              </label>

              <div className="segmented">
                {[
                  ['all', 'Semua'],
                  ['venom', 'Berbisa'],
                  ['nonvenom', 'Tidak berbisa'],
                ].map(([id, labelText]) => (
                  <button
                    key={id}
                    className={filter === id ? 'selected' : ''}
                    onClick={() =>
                      setFilter(id as 'all' | 'venom' | 'nonvenom')
                    }
                    type="button"
                  >
                    {labelText}
                  </button>
                ))}
              </div>
            </div>

            <div className="results-caption">
              <span>{results.length} spesies ditemukan</span>
              <span>
                <Info size={13} /> Identifikasi visual perlu konfirmasi ahli.
              </span>
            </div>

            <div className={page === 'gallery' ? 'gallery-grid' : 'species-grid'}>
              {results.map(s =>
                page === 'gallery' ? (
                  <button
                    key={s.id}
                    className="gallery-item"
                    onClick={() => setLightbox(s)}
                    type="button"
                  >
                    {s.image ? (
                      <img src={s.image} alt={s.name} loading="lazy" />
                    ) : (
                      <div className="image-placeholder">
                        <ImageIcon size={24} opacity={0.6} />
                        <span>Foto belum tersedia</span>
                      </div>
                    )}
                    <span>
                      <b>{s.name}</b>
                      <i>{s.scientific}</i>
                    </span>
                    <ImageIcon size={20} />
                  </button>
                ) : (
                  <SpeciesCard key={s.id} s={s} onSelect={setSelected} />
                )
              )}
            </div>

            {!results.length && (
              <Empty
                icon={<Search />}
                title="Belum ada yang cocok"
                text="Coba nama lain atau hapus filter pencarian."
              />
            )}

            <p className="footnote">
              Foto bersumber dari Thai National Parks dan kontributor; kredit serta
              lisensi tersedia pada setiap detail spesies.
            </p>
          </section>
        ) : page === 'compare' ? (
          <Compare onSelect={setSelected} />
        ) : page === 'map' ? (
          <ExploreMap onSelect={setSelected} />
        ) : page === 'similar' ? (
          <Similar onSelect={setSelected} />
        ) : page === 'habitats' ? (
          <Habitats onSelect={setSelected} />
        ) : (
          <Safety />
        )}
      </main>

      <Footer />

      {selected && (
        <Modal onClose={() => setSelected(null)} label={selected.name}>
          <SpeciesDetail
            s={selected}
            onCompare={() => {
              setSelected(null);
              nav('compare');
            }}
          />
        </Modal>
      )}

      {lightbox && (
        <Modal onClose={() => setLightbox(null)} label={lightbox.name} wide>
          <img
            className="lightbox-img"
            src={lightbox.image}
            alt={lightbox.name}
          />
          <div className="lightbox-caption">
            <div>
              <h2>{lightbox.name}</h2>
              <i>{lightbox.scientific}</i>
            </div>
            <div>
              {lightbox.source && (
                <a
                  href={lightbox.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Foto: {lightbox.credit || 'Kontributor'} ↗
                </a>
              )}
              {lightbox.license && (
                <a
                  href={lightbox.license}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lisensi Creative Commons ↗
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}

      {searchOpen && (
        <Modal onClose={() => setSearchOpen(false)} label="Cari spesies">
          <div className="search-modal">
            <PageHeading
              label="FIND YOUR CURIOSITY"
              title="Apa yang ingin kamu kenali?"
            />
            <label className="search-field">
              <Search />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Nama ular atau wilayah…"
              />
            </label>
            <div className="search-list">
              {species
                .filter(s =>
                  (s.name + s.scientific + s.regions.join(' '))
                    .toLowerCase()
                    .includes(query.toLowerCase())
                )
                .map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSearchOpen(false);
                      setSelected(s);
                    }}
                    type="button"
                  >
                    {s.image ? (
                      <img src={s.image} alt={s.name} />
                    ) : (
                      <div
                        style={{
                          width: 65,
                          height: 55,
                          background: '#121912',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#7e8b77',
                          flexShrink: 0,
                        }}
                      >
                        <ImageIcon size={18} opacity={0.5} />
                      </div>
                    )}
                    <span>
                      {s.name}
                      <i>{s.scientific}</i>
                    </span>
                    <ArrowUpRight size={20} />
                  </button>
                ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
