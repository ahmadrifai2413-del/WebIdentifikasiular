import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown, ShieldCheck, X, Footprints, Hand, Heart, Users, Eye, Phone, Cross, Ban, House, Trees, BookOpen, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { species, safetySource } from '../../data/species';
import './Safety.css';

type Guide = { title: string; brief: string; icon: LucideIcon; steps: string[] };
const firstAid = [
  'Jauhkan korban dari jangkauan ular tanpa menangkapnya.',
  'Tenangkan korban dan batasi gerakan. Sangga anggota tubuh yang tergigit.',
  'Lepas cincin, gelang, atau benda ketat sebelum pembengkakan terjadi.',
  'Minta bantuan transportasi menuju fasilitas kesehatan segera. Jangan menunggu gejala atau hasil AI.',
];
const guides: Guide[] = [
  { title: 'Beri ruang. Jaga jarak.', brief: 'Mundur perlahan dan beri ular jalan untuk menjauh.', icon: Footprints, steps: ['Hentikan pendekatan dan mundur perlahan dari jangkauan ular.', 'Jangan menghalangi jalur ular atau mendekat untuk mengambil foto.', 'Tidak ada satu angka jarak yang menjamin aman untuk semua situasi.'] },
  { title: 'Jangan menangkapnya.', brief: 'Amati tanpa menyentuh, mengejar, atau membunuh.', icon: Hand, steps: ['Jangan menyentuh ular, termasuk yang tampak diam atau mati.', 'Hindari memojokkan atau mencoba memindahkannya sendiri.', 'Jika perlu pemindahan, hubungi petugas yang terlatih.'] },
  { title: 'Tenang itu penting.', brief: 'Hindari gerakan mendadak. Utamakan jalan menjauh.', icon: Heart, steps: ['Berhenti dan perhatikan jalan keluar yang aman.', 'Mundur dengan tenang; jangan mengusik ular.', 'Jika sudah tergigit, batasi gerakan dan minta orang lain membantu transportasi.'] },
  { title: 'Lindungi yang terdekat.', brief: 'Jauhkan anak-anak dan hewan peliharaan dari area.', icon: Users, steps: ['Arahkan anak-anak dan orang lain menjauh.', 'Amankan hewan peliharaan di tempat terpisah tanpa mendekati ular.', 'Jangan biarkan orang berkerumun untuk menonton.'] },
  { title: 'Kenali batas identifikasi.', brief: 'Warna dan bentuk kepala bukan jaminan keamanan.', icon: Eye, steps: ['Jangan menentukan keamanan hanya dari warna, pola, atau bentuk kepala.', 'Hasil AI adalah kandidat identifikasi, bukan kepastian.', 'Jangan memakai hasil aplikasi untuk memutuskan boleh menyentuh ular.'] },
  { title: 'Serahkan pada petugas.', brief: 'Hubungi layanan penyelamatan satwa setempat.', icon: Phone, steps: ['Hubungi petugas penyelamatan satwa atau pemadam setempat untuk arahan.', 'Sampaikan alamat, posisi terakhir ular, serta akses menuju lokasi.', 'Pantau dari tempat aman; jangan mengejar jika ular menghilang.'] },
  { title: 'Jika terjadi gigitan.', brief: 'Segera cari bantuan medis. Jangan tunggu gejala.', icon: Cross, steps: firstAid },
  { title: 'Hindari tindakan berisiko.', brief: 'Jangan menyayat, mengisap bisa, atau mengikat ketat.', icon: Ban, steps: ['Jangan menyayat luka, mengisap bisa, atau memasang torniket.', 'Jangan memakai ramuan atau pengobatan tradisional.', 'Jangan menunda perawatan demi menangkap atau mengidentifikasi ular.'] },
];
const situations = [
  { title: 'Ular di rumah', subtitle: 'Amankan area, bukan menangkap ular.', icon: House, steps: ['Jauhkan penghuni dan hewan peliharaan dari area ular.', 'Jika aman, batasi akses orang ke area tersebut.', 'Hubungi petugas setempat. Jangan meraih ke celah atau memindahkan barang di dekat ular.'] },
  { title: 'Bertemu di alam', subtitle: 'Berbagi ruang dengan tetap waspada.', icon: Trees, steps: ['Berhenti, beri ruang, dan biarkan ular menjauh.', 'Perhatikan pijakan serta tempat tangan bertumpu.', 'Gunakan alas kaki tertutup dan penerangan ketika berjalan di tempat gelap.'] },
  { title: 'Terjadi gigitan', subtitle: 'Pertolongan medis adalah prioritas.', icon: Cross, steps: firstAid },
];
const faqs = [
  ['Confidence AI tinggi berarti pasti benar?', 'Tidak. Model tetap bisa keliru meskipun confidence tinggi. Jangan menjadikan hasil aplikasi sebagai dasar untuk mendekati ular atau menunda perawatan.'],
  ['Ular tidak berbisa boleh disentuh?', 'Tidak. Gigitan tetap dapat menimbulkan cedera. Tetap amati dari jauh dan jangan mencoba memegangnya.'],
  ['Gigitan belum terasa sakit, boleh menunggu?', 'Jangan menunggu gejala. Segera menuju fasilitas kesehatan untuk pemeriksaan.'],
  ['Harus membawa ularnya ke rumah sakit?', 'Jangan menangkap atau membunuh ular untuk identifikasi. Utamakan keselamatan dan transportasi korban.'],
];

function GuideDialog({ guide, close }: { guide: Guide; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  const Icon = guide.icon;
  return <dialog
    className={`sg-dialog ${
      [0, 2, 5, 7].includes(guides.indexOf(guide))
        ? 'sg-dialog--cream'
        : 'sg-dialog--forest'
    }`}
    ref={ref}
    aria-labelledby="sg-dialog-title"
    onCancel={close}
    onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}>
    <button className="sg-close" onClick={close} aria-label="Tutup panduan" autoFocus><X /></button>
    <span className="sg-dialog-icon"><Icon size={35} /></span>
    <span className="sg-kicker">SERPENTA / FIELD GUIDE</span>
    <h2 id="sg-dialog-title">{guide.title}</h2><p>{guide.brief}</p>
    <ol>{guide.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <p className="sg-dialog-note">Jika tergigit, segera cari pertolongan medis. Jangan menunggu identifikasi aplikasi.</p>
    <a href={safetySource} target="_blank" rel="noopener noreferrer">Baca panduan WHO <ArrowUpRight size={17} /></a>
  </dialog>;
}

export default function Safety() {
  const [active, setActive] = useState<Guide | null>(null);
  const [situation, setSituation] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const photo = species.find(s => s.id === 'boiga-melanota' && s.image) || species.find(s => s.image);
  const image = photo?.image?.replace(/^assets\/images\//, '/images/');
  return <section className="content page-section sg-page">
    <header className="sg-hero">
      {image && !photoFailed && <img className="sg-hero-photo" src={image} alt="" onError={() => setPhotoFailed(true)} />}
      <div className="sg-hero-shade" />
      <div className="sg-hero-copy">
        <span className="sg-kicker"><span /> THE SERPENTA FIELD GUIDE</span>
        <h1>Kenali risikonya.<br /><em>Jaga jaraknya.</em></h1>
        <p>Panduan bertemu ular dengan tenang, menjaga keselamatan, dan menghormati kehidupan liar.</p>
        <a className="sg-explore" href="#sg-guidelines">Pelajari panduan <ArrowRight size={17} /></a>
      </div>
      <aside className="sg-quote"><Leaf size={24} /><p>Rasa ingin tahu.<br /><strong>Tetap dengan kehati-hatian.</strong></p><span>OBSERVE. RESPECT. PROTECT.</span></aside>
      {photo && !photoFailed && <span className="sg-photo-credit">{photo.scientific}{photo.credit ? ` · ${photo.credit}` : ''}{photo.license && <> · <a href={photo.license} target="_blank" rel="noopener noreferrer">Lisensi</a></>}{photo.source && <> · <a href={photo.source} target="_blank" rel="noopener noreferrer">Sumber</a></>}</span>}
    </header>

    <div className="sg-emergency">
      <span className="sg-emergency-icon"><Cross size={30} /></span>
      <div><span className="sg-kicker">JIKA TERJADI GIGITAN ULAR</span><h2>Segera menuju fasilitas kesehatan.</h2><p>Tenangkan korban, minimalkan gerakan, dan minta bantuan transportasi.</p></div>
      <button onClick={() => setActive(guides[6])}>Langkah darurat <ArrowUpRight size={18} /></button>
    </div>

    <div className="sg-section-head" id="sg-guidelines"><div><span className="sg-kicker">01 / DASAR KESELAMATAN</span><h2>Delapan cara menjaga diri.</h2></div><p>Langkah kecil. Perlindungan yang berarti.<br />Pilih kartu untuk membaca panduannya.</p></div>
    <div className="sg-grid">{guides.map((guide, i) => {
      const Icon = guide.icon;
      return <button key={guide.title} className={`sg-card ${[0, 2, 5, 7].includes(i) ? 'sg-card-light' : ''}`} onClick={() => setActive(guide)}>
        <span className="sg-card-top"><span className="sg-number">0{i + 1}</span><span className="sg-arrow"><ArrowUpRight size={19} /></span></span>
        <span className="sg-art"><Icon size={48} strokeWidth={1.3} /></span>
        <span className="sg-card-title">{guide.title}</span><span className="sg-card-desc">{guide.brief}</span>
      </button>;
    })}</div>

    <div className="sg-bottom">
      <section className="sg-situations" aria-labelledby="sg-situation-heading">
        <span className="sg-kicker">02 / SESUAI SITUASIMU</span><h2 id="sg-situation-heading">Apa yang sedang kamu hadapi?</h2>
        <div className="sg-situation-options">{situations.map((item, i) => { const Icon = item.icon; return <button key={item.title} aria-pressed={situation === i} onClick={() => setSituation(i)}><Icon size={25} /><span>{item.title}</span><ArrowUpRight size={16} /></button>; })}</div>
        <div className="sg-situation-content" aria-live="polite"><h3>{situations[situation].subtitle}</h3><ol>{situations[situation].steps.map(step => <li key={step}>{step}</li>)}</ol></div>
      </section>
      <aside className="sg-knowledge"><BookOpen size={27} /><span className="sg-kicker">PAHAMI, BUKAN MENEBAK</span><h2>Informasi yang tepat.<br /><em>Keputusan lebih bijak.</em></h2><p>Kenali batas identifikasi visual dan baca arahan pertolongan pertama dari sumber resmi.</p><a href={safetySource} target="_blank" rel="noopener noreferrer">Panduan resmi WHO <ArrowUpRight size={18} /></a><span className="sg-source-note">Rujukan pertolongan pertama</span></aside>
    </div>

    <section className="sg-faq"><div><span className="sg-kicker">03 / MITOS & FAKTA</span><h2>Jangan percaya<br /><em>semua anggapan.</em></h2><p>Kenali hal yang sering disalahpahami.</p></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}</div></section>
    <footer className="sg-footer"><ShieldCheck size={21} /><p>Panduan edukasi; bukan pengganti tenaga kesehatan. Dalam kasus gigitan, utamakan pertolongan medis tanpa menunggu hasil AI.</p><a href={safetySource} target="_blank" rel="noopener noreferrer">Sumber WHO <ArrowUpRight size={14} /></a></footer>
    {active && <GuideDialog guide={active} close={() => setActive(null)} />}
  </section>;
}

export { Safety };
