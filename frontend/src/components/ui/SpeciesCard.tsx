import { useState } from 'react';
import { ArrowUpRight, ImageIcon, MapPin } from 'lucide-react';
import type { Species } from '../../data/species';

interface SpeciesCardProps {
  s: Species;
  onSelect: (s: Species) => void;
}

export default function SpeciesCard({ s, onSelect }: SpeciesCardProps) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = typeof s.image === 'string' && s.image.trim().length > 0 && !imgErr;

  return (
    <button className="species-card" onClick={() => onSelect(s)} type="button">
      <div className="species-image">
        {hasImg ? (
          <img
            src={s.image}
            alt={s.name}
            loading="lazy"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="image-placeholder">
            <ImageIcon size={28} strokeWidth={1.5} opacity={0.6} />
            <span>Foto belum tersedia</span>
          </div>
        )}
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
          <span />
          {s.venomLabel}
        </span>
        <span className="round-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="species-card-copy">
        <span className="eyebrow">{s.family}</span>
        <h3>{s.name}</h3>
        <i>{s.scientific}</i>
        <div className="card-location">
          <MapPin size={13} />
          {s.regions.slice(0, 3).join(' · ')}
        </div>
      </div>
    </button>
  );
}

export { SpeciesCard };
