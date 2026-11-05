import { useState } from 'react';
import { ArrowRight, BookOpen, GitCompareArrows } from 'lucide-react';
import { species, type Species } from '../../data/species';
import { PageHeading, Empty } from '../ui/PageHeading';
import SpeciesCard from '../ui/SpeciesCard';

interface SimilarProps {
  onSelect: (s: Species) => void;
}

export default function Similar({ onSelect }: SimilarProps) {
  const [id, setId] = useState(species[0]?.id || '');
  const s = species.find(x => x.id === id) || species[0];

  return (
    <section className="content page-section">
      <PageHeading
        label="BEYOND FIRST IMPRESSIONS"
        title="Serupa, belum tentu sama."
        text="Kemiripan warna tidak menunjukkan tingkat bahaya. Jelajahi contoh spesies yang dapat terlihat mirip dalam koleksi ini."
      />

      <label className="field-label">
        Pilih spesies
        <select value={id} onChange={e => setId(e.target.value)}>
          {species.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <div className="similar-layout">
        <SpeciesCard s={s} onSelect={onSelect} />
        <div className="similar-explanation">
          <GitCompareArrows size={36} />
          <h2>Perhatikan lebih dari warna.</h2>
          <p>
            Pola tubuh, lokasi, dan variasi antarindividu perlu dipertimbangkan
            bersama oleh ahli. Jangan mendekati ular untuk memeriksa detail.
          </p>
          <a href="#compare" className="button secondary">
            Bandingkan detail <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <h3 className="subheading">Contoh yang tampak mirip</h3>
      <div className="species-grid">
        {species
          .filter(x => s.similar.includes(x.id))
          .map(x => (
            <SpeciesCard s={x} key={x.id} onSelect={onSelect} />
          ))}
      </div>

      {!s.similar.length && (
        <Empty
          icon={<BookOpen />}
          title="Belum ada pasangan dalam koleksi"
          text="Koleksi awal ini belum memuat contoh yang relevan untuk spesies tersebut."
        />
      )}
    </section>
  );
}

export { Similar };
