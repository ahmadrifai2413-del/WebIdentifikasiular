import { useState } from 'react';
import {
  ArrowUpRight,
  GitCompareArrows,
  ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import type { Species } from '../../data/species';

interface SpeciesDetailProps {
  s: Species;
  onCompare: () => void;
}

export default function SpeciesDetail({ s, onCompare }: SpeciesDetailProps) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = typeof s.image === 'string' && s.image.trim().length > 0 && !imgErr;

  return (
    <>
      <div className="detail-image">
        {hasImg ? (
          <img src={s.image} alt={s.name} onError={() => setImgErr(true)} />
        ) : (
          <div className="image-placeholder">
            <ImageIcon size={36} strokeWidth={1.5} opacity={0.6} />
            <span>Foto belum tersedia</span>
          </div>
        )}
        <div>
          <span
            className={
              'badge ' +
              (s.venom === true
                ? 'amber'
                : s.venom === false
                ? 'green'
                : 'neutral')
            }
          >
            {s.venomLabel}
          </span>
          <h2>{s.name}</h2>
          <i>{s.scientific}</i>
        </div>
      </div>

      <div className="detail-body">
        <span className="eyebrow">GET TO KNOW THE SPECIES</span>
        <p>{s.description}</p>

        <div className="detail-facts">
          {[
            ['Famili', s.family],
            ['Panjang', s.length],
            ['Habitat', s.habitat],
            ['Aktivitas', s.activity],
          ].map(([key, val]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{val}</strong>
            </div>
          ))}
        </div>

        <h3>Ciri umum</h3>
        <ul>
          {s.traits.length > 0 ? (
            s.traits.map(t => <li key={t}>{t}</li>)
          ) : (
            <li>Belum terverifikasi dalam paket ini</li>
          )}
        </ul>

        <h3>Persebaran di Indonesia</h3>
        <div className="tags">
          {s.regions.map(r => (
            <span key={r}>{r}</span>
          ))}
        </div>

        <h3>Makanan</h3>
        <p>{s.diet}.</p>

        <div className="notice">
          <ShieldCheck size={20} />
          <p>
            Jaga jarak dan jangan menyentuh. Ciri visual dan foto tidak cukup
            untuk memastikan identitas atau keamanan seekor ular.
          </p>
        </div>

        <button
          className="button secondary"
          onClick={onCompare}
          type="button"
        >
          <GitCompareArrows size={17} /> Bandingkan spesies
        </button>

        <div className="source-note">
          {s.source ? (
            <a href={s.source} target="_blank" rel="noreferrer">
              Sumber spesies & foto: {s.credit || 'Kontributor'}{' '}
              <ArrowUpRight size={12} />
            </a>
          ) : (
            <span>Sumber: {s.credit || 'Kontributor'}</span>
          )}
          {s.license && (
            <a href={s.license} target="_blank" rel="noreferrer">
              Lisensi foto (dipotong pada tampilan) ↗
            </a>
          )}
          <span>Ringkasan edukasi · diperiksa Oktober 2026</span>
        </div>
      </div>
    </>
  );
}

export { SpeciesDetail };
