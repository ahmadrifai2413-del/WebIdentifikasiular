import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Pause,
  Play,
} from 'lucide-react';
import { species, type Species } from '../../data/species';

interface HeroProps {
  onSelect: (s: Species) => void;
}

export default function Hero({ onSelect }: HeroProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const start = useRef<number | null>(null);
  const suppressClickUntil = useRef(0);

  // Maksimal 10 spesies untuk Home; katalog Snakepedia tetap utuh.
  const homeSpecies = species
    .filter(
      s =>
        typeof s.image === 'string' &&
        s.image.trim().length > 0 &&
        !failedImages.includes(s.id)
    )
    .slice(0, 10);

  const total = homeSpecies.length;
  const index = total > 0 ? active % total : 0;
  const current = homeSpecies[index];
  const canRotate = total > 1;
  const autoRunning = playing && !hover && !focused && visible && canRotate;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) setPlaying(false);
    const onPreferenceChange = () => {
      if (media.matches) setPlaying(false);
    };
    const onVisibilityChange = () => setVisible(!document.hidden);
    onVisibilityChange();
    media.addEventListener('change', onPreferenceChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      media.removeEventListener('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!autoRunning) return;
    const timer = window.setInterval(() => {
      setActive(previous => (previous + 1) % total);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [autoRunning, total, active]);

  function move(direction: number) {
    if (canRotate) setActive(previous => (previous + direction + total) % total);
  }

  function skipBrokenImage(id: string) {
    setFailedImages(previous =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }

  if (!current) {
    return (
      <section className="hero" aria-label="Serpenta">
        <div className="empty-state">
          <BookOpen size={38} />
          <h1>Jelajahi dunia ular.</h1>
          <p>Foto untuk koleksi Home belum tersedia.</p>
          <a className="button primary" href="#species">
            Buka Snakepedia <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" aria-label="Jelajahi spesies ular">
      <div className="hero-backdrops" aria-hidden="true">
        {homeSpecies.map((snake, i) => (
          <div
            key={snake.id}
            className={i === index ? 'hero-bg shown' : 'hero-bg'}
            style={{ backgroundImage: `url(${JSON.stringify(snake.image)})` }}
          />
        ))}
      </div>
      <div className="hero-vignette" />
      <div className="hero-top">
        <span>
          <span className="live-dot" /> A FIELD GUIDE TO THE EXTRAORDINARY
        </span>
        <span>
          INDONESIA & BEYOND <Globe2 size={13} />
        </span>
      </div>

      <div
        className="carousel"
        aria-roledescription="carousel"
        aria-label="Koleksi pilihan Serpenta"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setFocused(false);
          }
        }}
        onTouchStart={event => {
          start.current = event.touches[0].clientX;
        }}
        onTouchCancel={() => {
          start.current = null;
        }}
        onTouchEnd={event => {
          if (start.current === null) return;
          const distance = event.changedTouches[0].clientX - start.current;
          start.current = null;
          if (Math.abs(distance) > 45) {
            suppressClickUntil.current = Date.now() + 500;
            move(distance < 0 ? 1 : -1);
          }
        }}
        onKeyDown={event => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            move(1);
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="carousel-stage">
          {homeSpecies.map((snake, i) => {
            let distance = (i - index + total) % total;
            if (distance > total / 2) distance -= total;
            const shown = Math.abs(distance) <= 2;
            const position =
              distance < 0 ? `m${Math.abs(distance)}` : String(distance);
            return (
              <button
                key={snake.id}
                type="button"
                className={`snake-panel position-${position}`}
                style={!shown ? { display: 'none' } : undefined}
                aria-hidden={!shown}
                aria-label={
                  distance === 0
                    ? `Lihat profil ${snake.name}`
                    : `Tampilkan ${snake.name}`
                }
                aria-current={distance === 0 ? 'true' : undefined}
                tabIndex={shown ? 0 : -1}
                onClick={() => {
                  if (Date.now() < suppressClickUntil.current) return;
                  if (distance === 0) onSelect(snake);
                  else setActive(i);
                }}
              >
                <img
                  src={snake.image}
                  alt={snake.name || snake.scientific}
                  draggable={false}
                  onError={() => skipBrokenImage(snake.id)}
                />
                <span className="panel-shade" />
                <span className="panel-top">
                  <span>{snake.family.toUpperCase()}</span>
                  <ArrowUpRight size={15} />
                </span>
                <span className="panel-label">{snake.name}</span>
              </button>
            );
          })}
        </div>
        <div
          key={current.id}
          className="hero-copy"
          aria-live={autoRunning ? 'off' : 'polite'}
          aria-atomic="true"
        >
          <span className="eyebrow">{current.scientific}</span>
          <h1>{current.name}</h1>
          {current.english && <p>{current.english}</p>}
          <button
            type="button"
            className="hero-cta"
            onClick={() => onSelect(current)}
          >
            Explore this species <ArrowUpRight size={14} />
          </button>
        </div>
        {canRotate && (
          <>
            <button
              type="button"
              className="carousel-arrow prev"
              onClick={() => move(-1)}
              aria-label="Spesies sebelumnya"
            >
              <ChevronLeft size={23} />
            </button>
            <button
              type="button"
              className="carousel-arrow next"
              onClick={() => move(1)}
              aria-label="Spesies berikutnya"
            >
              <ChevronRight size={23} />
            </button>
          </>
        )}
      </div>

      <div className="hero-bottom">
        <div className="hero-species-meta">
          <span className="eyebrow">CURRENTLY EXPLORING</span>
          <span>
            {current.english || current.name} <ArrowUpRight size={13} />
          </span>
        </div>
        <div className="carousel-controls">
          <span className="slide-number">
            {String(index + 1).padStart(2, '0')}
            <small> / {String(total).padStart(2, '0')}</small>
          </span>
          <div className="slide-dots">
            {homeSpecies.map((snake, i) => (
              <button
                key={snake.id}
                type="button"
                className={i === index ? 'active' : ''}
                aria-label={`Tampilkan ${snake.name}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          {canRotate && (
            <button
              type="button"
              className="icon-button"
              onClick={() => setPlaying(previous => !previous)}
              aria-label={
                playing ? 'Jeda rotasi otomatis' : 'Mulai rotasi otomatis'
              }
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          )}
        </div>
        <a href="#species" className="scroll-link">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
      </div>
    </section>
  );
}

export { Hero };
