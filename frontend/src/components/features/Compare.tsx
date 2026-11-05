import { useState } from 'react';
import { ArrowUpRight, ImageIcon, Info } from 'lucide-react';
import { species, type Species } from '../../data/species';
import { PageHeading } from '../ui/PageHeading';

interface CompareProps {
  onSelect: (s: Species) => void;
}

export default function Compare({ onSelect }: CompareProps) {
  const [a, setA] = useState(species[0]?.id || '');
  const [b, setB] = useState(species[4]?.id || species[1]?.id || species[0]?.id || '');
  const first = species.find(s => s.id === a) || species[0];
  const second = species.find(s => s.id === b) || species[1] || species[0];

  return (
    <section className="content page-section">
      <PageHeading
        label="LOOK CLOSER"
        title="Similar looks. Different stories."
        text="Bandingkan dua spesies berdampingan. Perbandingan ini untuk belajar, bukan memastikan ular aman ditangani."
      />

      <div className="compare-picker">
        {[
          [a, setA],
          [b, setB],
        ].map(([value, setter], i) => (
          <label key={i}>
            <span className="eyebrow">SPESIES {i + 1}</span>
            <select
              value={value as string}
              onChange={e => (setter as (v: string) => void)(e.target.value)}
            >
              {species.map(s => (
                <option value={s.id} key={s.id}>
                  {s.name} — {s.scientific}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="compare-images">
        <span className="compare-vs" aria-hidden="true">
          VS
        </span>
        {[first, second].map((s, i) => (
          <button key={i} onClick={() => onSelect(s)} type="button">
            {s.image ? (
              <img src={s.image} alt={s.name} />
            ) : (
              <div className="image-placeholder">
                <ImageIcon size={28} opacity={0.6} />
                <span>Foto belum tersedia</span>
              </div>
            )}
            <div>
              <h2>{s.name}</h2>
              <i>{s.scientific}</i>
            </div>
            <ArrowUpRight />
          </button>
        ))}
      </div>

      {a === b && (
        <div className="notice">
          <Info />
          <p>
            Kedua pilihan adalah spesies yang sama. Pilih spesies lain untuk
            melihat perbedaannya.
          </p>
        </div>
      )}

      <div className="table-scroll">
        <table className="comparison">
          <thead>
            <tr>
              <th>Karakteristik</th>
              <th>{first.name}</th>
              <th>{second.name}</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                'family',
                'venomLabel',
                'length',
                'habitat',
                'activity',
                'diet',
                'regions',
                'traits',
              ] as const
            ).map((key, i) => (
              <tr key={key}>
                <th>
                  {
                    [
                      'Famili',
                      'Bisa',
                      'Panjang',
                      'Habitat',
                      'Aktivitas',
                      'Makanan',
                      'Persebaran',
                      'Ciri umum',
                    ][i]
                  }
                </th>
                {[first, second].map((s, j) => (
                  <td key={j}>
                    {Array.isArray(s[key])
                      ? (s[key] as string[]).join(' · ')
                      : s[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export { Compare };
