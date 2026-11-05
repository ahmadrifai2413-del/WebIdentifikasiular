import { useState } from 'react';
import { Globe2, Leaf } from 'lucide-react';
import { species, type Species } from '../../data/species';
import { PageHeading } from '../ui/PageHeading';
import SpeciesCard from '../ui/SpeciesCard';

interface HabitatsProps {
  onSelect: (s: Species) => void;
}

export default function Habitats({ onSelect }: HabitatsProps) {
  const [habitat, setHabitat] = useState('Hutan');

  const habitatImages: Record<string, string> = {
    Hutan:
      species.find(s => s.id === 'gonyosoma-oxycephalum')?.image ||
      species[0]?.image ||
      '',
    pepohonan:
      species.find(s => s.id === 'trimeresurus-albolabris')?.image ||
      species[4]?.image ||
      '',
    sungai:
      species.find(s => s.id === 'malayopython-reticulatus')?.image ||
      species[2]?.image ||
      '',
    pertanian:
      species.find(s => s.id === 'bungarus-fasciatus')?.image ||
      species[3]?.image ||
      '',
    bakau:
      species.find(s => s.id === 'boiga-melanota')?.image ||
      species[5]?.image ||
      '',
  };

  const tabs = [
    { id: 'Hutan', label: 'Hutan tropis', icon: <Leaf /> },
    { id: 'pepohonan', label: 'Pepohonan & semak', icon: <Leaf /> },
    { id: 'sungai', label: 'Tepian sungai', icon: <Globe2 /> },
    { id: 'pertanian', label: 'Lahan pertanian', icon: <Globe2 /> },
    { id: 'bakau', label: 'Hutan bakau', icon: <Leaf /> },
  ];

  return (
    <section className="content page-section">
      <PageHeading
        label="A PLACE IN THE WILD"
        title="Their home. Our shared world."
        text="Ular menempati beragam lingkungan. Pilih habitat untuk melihat spesies terkait dalam koleksi."
      />

      <div className="habitat-tabs">
        {tabs.map((h, i) => (
          <button
            key={h.id}
            onClick={() => setHabitat(h.id)}
            className={habitat === h.id ? 'selected' : ''}
            type="button"
          >
            {habitatImages[h.id] ? (
              <img src={habitatImages[h.id]} alt="" loading="lazy" />
            ) : (
              <div className="image-placeholder">
                <Leaf size={20} />
              </div>
            )}
            <span className="habitat-number">0{i + 1}</span>
            {h.icon}
            <span>{h.label}</span>
            <span className="habitat-check">
              {habitat === h.id ? 'DIPILIH' : 'JELAJAHI ↗'}
            </span>
          </button>
        ))}
      </div>

      <div className="notice">
        <Leaf />
        <p>
          Persebaran tidak terbatas pada satu habitat. Kemunculan ular
          dipengaruhi ketersediaan mangsa, tempat berlindung, dan kondisi
          lingkungan.
        </p>
      </div>

      <div className="species-grid">
        {species
          .filter(s => s.habitat.toLowerCase().includes(habitat.toLowerCase()))
          .map(s => (
            <SpeciesCard key={s.id} s={s} onSelect={onSelect} />
          ))}
      </div>
    </section>
  );
}

export { Habitats };
