"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDownUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Image as ImageIcon,
  Leaf,
  LoaderCircle,
  Maximize2,
  Pencil,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { apiFetch } from "../../services/api";
import { getSpecies, species } from "../../data/species";
import type { Species } from "../../data/species";
import "./History.css";

type Prediction = {
  species_id?: string;
  speciesId?: string;
  confidence?: number;
};
type Observation = {
  id: string;
  speciesId: string | null;
  confidence: number | null;
  status: string;
  filename: string;
  note: string;
  createdAt: number;
  image: string;
  predictions: Prediction[];
};
type ResultKind = "snake" | "not-snake" | "unknown" | "manual";
type DialogState = { kind: "detail" | "edit" | "delete"; row: Observation };
type RawRow = Partial<Observation> & {
  species_id?: string | null;
  created_at?: string;
  image_url?: string;
};

const PAGE_SIZE = 8;
const labels: Record<ResultKind, string> = {
  snake: "Kandidat ular",
  "not-snake": "Diprediksi bukan ular",
  unknown: "Belum teridentifikasi",
  manual: "Disimpan manual",
};

function resultKind(status: string): ResultKind {
  const value = status.toLowerCase().replace(/[_\s]+/g, "-");
  if (["identified", "predicted", "snake"].includes(value)) return "snake";
  if (["not-snake", "non-snake", "nonsnake", "bukan-ular"].includes(value))
    return "not-snake";
  if (value === "manual") return "manual";
  return "unknown";
}

function score(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
    ? value
    : null;
}

function normalize(row: RawRow): Observation {
  const date =
    row.createdAt ??
    (row.created_at ? new Date(row.created_at).getTime() : NaN);
  return {
    id: String(row.id ?? ""),
    speciesId: row.speciesId ?? row.species_id ?? null,
    confidence: score(row.confidence),
    status: String(row.status ?? "unknown"),
    filename: row.filename ?? "Foto pengamatan",
    note: row.note ?? "",
    createdAt: Number.isFinite(Number(date)) ? Number(date) : NaN,
    image: row.image ?? row.image_url ?? "",
    predictions: Array.isArray(row.predictions) ? row.predictions : [],
  };
}

function nameFromId(id: string) {
  return id
    .replace(/[-_]/g, " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function rowTitle(row: Observation) {
  const kind = resultKind(row.status);
  if (kind === "not-snake") return "Objek bukan ular";
  if (kind === "manual") return "Catatan lapangan";
  if (kind === "snake" && row.speciesId) {
    return getSpecies(row.speciesId)?.name || nameFromId(row.speciesId);
  }
  return "Identitas belum dipastikan";
}

function dateLabel(value: number) {
  return Number.isFinite(value)
    ? new Date(value).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Tanggal tidak tersedia";
}

function localDay(value: number) {
  if (!Number.isFinite(value)) return "";
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function imagePath(value: string) {
  return value.startsWith("assets/images/")
    ? value.replace("assets/images/", "/images/")
    : value;
}

function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return src && !failed ? (
    <img
      className={className}
      src={imagePath(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <span
      className={`hj-photo-placeholder ${className}`}
      role="img"
      aria-label={alt}
    >
      <ImageIcon size={28} strokeWidth={1.3} />
      <span>Foto tidak tersedia</span>
    </span>
  );
}

function Confidence({
  value,
  kind,
}: {
  value: number | null;
  kind: ResultKind;
}) {
  const percent = value === null ? null : value * 100;
  return (
    <div
      className={`hj-confidence hj-confidence--${kind}`}
      title="Skor model, bukan jaminan kebenaran identifikasi"
    >
      <span
        className="hj-ring"
        style={{ "--hj-score": `${percent ?? 0}%` } as CSSProperties}
        aria-hidden="true"
      />
      <span>
        <strong>{percent === null ? "—" : `${percent.toFixed(1)}%`}</strong>
        <small>Confidence AI</small>
      </span>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="hj-modal"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        )
          onClose();
      }}
    >
      <button
        className="hj-icon-button hj-close"
        onClick={onClose}
        aria-label="Tutup dialog"
        autoFocus
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}

export default function HistoryPage({
  onSelect,
}: {
  onSelect: (s: Species) => void;
}) {
  const [rows, setRows] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [dateOpen, setDateOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [note, setNote] = useState("");
  const [working, setWorking] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const request = useRef<AbortController | null>(null);

  async function load() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError("");
    try {
      const response = await apiFetch("/api/history", {
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          response.status === 401
            ? "Akses riwayat ditolak. Periksa konfigurasi API_TOKEN."
            : data.error || data.detail || "Riwayat gagal dimuat.",
        );
      const list: RawRow[] = Array.isArray(data) ? data : data.observations;
      if (!Array.isArray(list))
        throw new Error("Format respons riwayat tidak dikenali.");
      if (!controller.signal.aborted) setRows(list.map(normalize));
    } catch (reason) {
      if (!controller.signal.aborted)
        setError(
          reason instanceof Error
            ? reason.message
            : "Tidak dapat terhubung ke server.",
        );
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    return () => request.current?.abort();
  }, []);

  useEffect(() => setPage(1), [query, filter, speciesFilter, sort, from, to]);

  const hero =
    species.find((s) => s.id === "malayopython-reticulatus" && s.image) ??
    species.find((s) => s.image);
  const counts = {
    snake: rows.filter((row) => resultKind(row.status) === "snake").length,
    notSnake: rows.filter((row) => resultKind(row.status) === "not-snake")
      .length,
    days: new Set(rows.map((row) => localDay(row.createdAt)).filter(Boolean))
      .size,
  };
  const availableSpecies = useMemo(
    () =>
      Array.from(
        new Set(
          rows.map((row) => row.speciesId).filter((id): id is string => !!id),
        ),
      )
        .map((id) => ({ id, name: getSpecies(id)?.name || nameFromId(id) }))
        .sort((a, b) => a.name.localeCompare(b.name, "id")),
    [rows],
  );

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return rows
      .filter((row) => {
        const speciesData = getSpecies(row.speciesId || "");
        const text = [
          row.filename,
          row.note,
          rowTitle(row),
          speciesData?.scientific,
          labels[resultKind(row.status)],
        ]
          .join(" ")
          .toLowerCase();
        const day = localDay(row.createdAt);
        return (
          text.includes(search) &&
          (filter === "all" || resultKind(row.status) === filter) &&
          (speciesFilter === "all" || row.speciesId === speciesFilter) &&
          (!from || (!!day && day >= from)) &&
          (!to || (!!day && day <= to))
        );
      })
      .sort((a, b) => {
        if (sort === "confidence")
          return (b.confidence ?? -1) - (a.confidence ?? -1);
        const aDate = Number.isFinite(a.createdAt) ? a.createdAt : 0;
        const bDate = Number.isFinite(b.createdAt) ? b.createdAt : 0;
        return sort === "oldest" ? aDate - bDate : bDate - aDate;
      });
  }, [rows, query, filter, speciesFilter, sort, from, to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const hasFilters =
    !!query || filter !== "all" || speciesFilter !== "all" || !!from || !!to;

  function resetFilters() {
    setQuery("");
    setFilter("all");
    setSpeciesFilter("all");
    setFrom("");
    setTo("");
    setPage(1);
  }

  function openDialog(kind: DialogState["kind"], row: Observation) {
    setActionError("");
    setNote(row.note);
    setDialog({ kind, row });
  }

  async function mutate() {
    if (!dialog || working) return;
    const { row, kind } = dialog;
    setWorking(true);
    setActionError("");
    try {
      const response =
        kind === "delete"
          ? await apiFetch(`/api/history?id=${encodeURIComponent(row.id)}`, {
              method: "DELETE",
            })
          : await apiFetch("/api/history", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: row.id, note }),
            });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          body.error || body.detail || "Perubahan gagal disimpan.",
        );
      }
      setRows((old) =>
        kind === "delete"
          ? old.filter((item) => item.id !== row.id)
          : old.map((item) => (item.id === row.id ? { ...item, note } : item)),
      );
      setDialog(null);
      setNotice(
        kind === "delete"
          ? "Pengamatan berhasil dihapus."
          : "Catatan berhasil disimpan.",
      );
    } catch (reason) {
      setActionError(
        reason instanceof Error
          ? reason.message
          : "Permintaan gagal. Coba lagi.",
      );
    } finally {
      setWorking(false);
    }
  }

  function exportCSV() {
    const cell = (value: unknown) => {
      let text = String(value ?? "");
      if (/^[\s]*[=+@\-]/.test(text)) text = `'${text}`;
      return `"${text.replace(/"/g, '""')}"`;
    };
    const csv =
      "\uFEFF" +
      [
        [
          "Tanggal",
          "File",
          "Hasil",
          "ID Spesies",
          "Confidence",
          "Status",
          "Catatan",
        ],
        ...filtered.map((row) => [
          Number.isFinite(row.createdAt)
            ? new Date(row.createdAt).toISOString()
            : "",
          row.filename,
          rowTitle(row),
          row.speciesId,
          row.confidence,
          row.status,
          row.note,
        ]),
      ]
        .map((line) => line.map(cell).join(","))
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "serpenta-observations.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const selected = dialog?.row;
  const selectedSpecies =
    selected && resultKind(selected.status) === "snake"
      ? getSpecies(selected.speciesId || "")
      : undefined;

  return (
    <section className="content page-section hj-page">
      <header className="hj-hero">
        <div className="hj-hero-art" aria-hidden="true">
          {hero && <Photo src={hero.image} alt="" />}
        </div>
        <div className="hj-hero-copy">
          <span className="hj-eyebrow">
            <span /> YOUR OBSERVATION JOURNAL
          </span>
          <h1>
            Every encounter,
            <br />
            <em>remembered.</em>
          </h1>
          <p>
            Foto, hasil AI, dan cerita kecil dari setiap pertemuan.
            <br className="hj-desktop-break" /> Semua tersimpan dalam jurnal
            pengamatanmu.
          </p>
          <span className="hj-motto">
            OBSERVE <span>·</span> UNDERSTAND <span>·</span> COEXIST
          </span>
        </div>
        <aside className="hj-quote">
          <span>“</span>
          <p>
            Setiap pertemuan
            <br />
            adalah bagian dari
            <br />
            <em>cerita alam.</em>
          </p>
        </aside>
        {hero && (
          <div className="hj-credit">
            {hero.scientific}
            {hero.credit && ` · ${hero.credit}`}
            {hero.source && (
              <>
                {" "}
                ·{" "}
                <a href={hero.source} target="_blank" rel="noreferrer">
                  Sumber
                </a>
              </>
            )}
            {hero.license && (
              <>
                {" "}
                ·{" "}
                <a href={hero.license} target="_blank" rel="noreferrer">
                  Lisensi
                </a>
              </>
            )}
          </div>
        )}
      </header>

      <div className="hj-body">
        <div className="hj-stats" aria-label="Ringkasan pengamatan tersimpan">
          {[
            {
              label: "Total pengamatan",
              value: rows.length,
              text: "Semua hasil yang tersimpan",
              icon: FileText,
              color: "lavender",
            },
            {
              label: "Kandidat ular",
              value: counts.snake,
              text: "Prediksi spesies dari model",
              icon: Leaf,
              color: "sage",
            },
            {
              label: "Diprediksi bukan ular",
              value: counts.notSnake,
              text: "Objek lain dalam pengamatan",
              icon: ImageIcon,
              color: "sand",
            },
            {
              label: "Hari aktif",
              value: counts.days,
              text: "Hari dengan catatan tersimpan",
              icon: CalendarDays,
              color: "blue",
            },
          ].map(({ label, value, text, icon: Icon, color }) => (
            <div className={`hj-stat hj-stat--${color}`} key={label}>
              <span className="hj-stat-icon">
                <Icon size={22} strokeWidth={1.7} />
              </span>
              <div>
                <strong>{loading && !rows.length ? "—" : value}</strong>
                <h2>{label}</h2>
                <p>{text}</p>
              </div>
              <Leaf
                className="hj-stat-leaf"
                size={74}
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <div className="hj-toolbar">
          <label className="hj-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari spesies, file, atau catatan…"
              aria-label="Cari pengamatan"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Kosongkan pencarian"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <select
            aria-label="Filter hasil"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">Semua hasil</option>
            <option value="snake">Kandidat ular</option>
            <option value="not-snake">Bukan ular</option>
            <option value="unknown">Belum teridentifikasi</option>
            <option value="manual">Disimpan manual</option>
          </select>
          <select
            aria-label="Filter spesies"
            value={speciesFilter}
            onChange={(event) => setSpeciesFilter(event.target.value)}
          >
            <option value="all">Semua spesies</option>
            {availableSpecies.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            className={`hj-button hj-date-toggle ${dateOpen || from || to ? "is-active" : ""}`}
            onClick={() => setDateOpen(!dateOpen)}
            aria-expanded={dateOpen}
            aria-controls="hj-date-filter"
          >
            <CalendarDays size={16} /> Tanggal
          </button>
          <label className="hj-sort">
            <ArrowDownUp size={16} />
            <select
              aria-label="Urutkan pengamatan"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="confidence">Confidence tertinggi</option>
            </select>
          </label>
          <button
            className="hj-button hj-button--green"
            onClick={exportCSV}
            disabled={loading || !filtered.length}
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            className="hj-icon-button"
            onClick={() => void load()}
            disabled={loading}
            aria-label="Muat ulang riwayat"
          >
            <RefreshCw size={18} className={loading ? "hj-spin" : ""} />
          </button>
        </div>

        {dateOpen && (
          <div className="hj-date-panel" id="hj-date-filter">
            <label>
              Dari tanggal
              <input
                type="date"
                value={from}
                max={to || undefined}
                onChange={(event) => setFrom(event.target.value)}
              />
            </label>
            <span>—</span>
            <label>
              Sampai tanggal
              <input
                type="date"
                value={to}
                min={from || undefined}
                onChange={(event) => setTo(event.target.value)}
              />
            </label>
            <button
              className="hj-text-button"
              onClick={() => {
                setFrom("");
                setTo("");
              }}
            >
              Hapus tanggal
            </button>
          </div>
        )}
        {error && (
          <div className="hj-alert" role="alert">
            <p>{error}</p>
            <button className="hj-button" onClick={() => void load()}>
              Coba lagi
            </button>
          </div>
        )}
        {notice && (
          <div className="hj-notice" role="status">
            <Check size={17} />
            {notice}
            <button
              onClick={() => setNotice("")}
              aria-label="Tutup pemberitahuan"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="hj-list-heading">
          <span>
            {filtered.length} PENGAMATAN{" "}
            {hasFilters ? "DITEMUKAN" : "TERSIMPAN"}
          </span>
          {hasFilters ? (
            <button className="hj-text-button" onClick={resetFilters}>
              <X size={13} /> Reset filter
            </button>
          ) : (
            <span>{PAGE_SIZE} per halaman · Maks. 500 terbaru</span>
          )}
        </div>

        {loading ? (
          <div className="hj-empty" role="status">
            <LoaderCircle className="hj-spin" size={30} />
            <h2>Membuka jurnalmu…</h2>
            <p>Sedang memuat pengamatan dari server.</p>
          </div>
        ) : error && !rows.length ? (
          <div className="hj-empty">
            <FileText size={36} />
            <h2>Jurnal belum dapat ditampilkan.</h2>
            <p>Coba muat ulang setelah koneksi backend tersedia.</p>
          </div>
        ) : !visible.length ? (
          <div className="hj-empty">
            <SlidersHorizontal size={36} strokeWidth={1.2} />
            <h2>
              {hasFilters
                ? "Belum ada hasil yang cocok."
                : "Setiap cerita dimulai dari satu pertemuan."}
            </h2>
            <p>
              {hasFilters
                ? "Coba kata kunci atau rentang tanggal lainnya."
                : "Simpan pengamatan pertamamu melalui AI Detector."}
            </p>
            {hasFilters ? (
              <button className="hj-button" onClick={resetFilters}>
                Reset filter
              </button>
            ) : (
              <a className="hj-button hj-button--green" href="#detector">
                Mulai pengamatan <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        ) : (
          <div className="hj-list">
            {visible.map((row, index) => {
              const kind = resultKind(row.status);
              const snake =
                kind === "snake" ? getSpecies(row.speciesId || "") : undefined;
              const description =
                snake?.description ||
                (kind === "not-snake"
                  ? "Model memprediksi objek dalam foto ini bukan ular. Hasil AI tetap dapat keliru."
                  : kind === "manual"
                    ? "Pengamatan disimpan sebagai catatan lapangan tanpa hasil identifikasi."
                    : kind === "snake"
                      ? "Kandidat spesies tersedia. Informasi lengkap belum tersedia di katalog."
                      : "Identitas belum dapat dipastikan. Buka detail untuk melihat hasil dan kandidat dari model.");
              return (
                <article className="hj-row" key={row.id}>
                  <button
                    className="hj-thumb"
                    onClick={() => openDialog("detail", row)}
                    aria-label={`Perbesar foto ${row.filename}`}
                  >
                    <Photo
                      src={row.image}
                      alt={`Pengamatan: ${row.filename}`}
                    />
                    <span className="hj-photo-number">
                      {String(
                        (currentPage - 1) * PAGE_SIZE + index + 1,
                      ).padStart(2, "0")}
                    </span>
                    <span className="hj-expand">
                      <Maximize2 size={14} />
                    </span>
                  </button>
                  <div className="hj-identity">
                    <time
                      dateTime={
                        Number.isFinite(row.createdAt)
                          ? new Date(row.createdAt).toISOString()
                          : undefined
                      }
                    >
                      {dateLabel(row.createdAt)}
                    </time>
                    <h2>{rowTitle(row)}</h2>
                    {snake && <em>{snake.scientific}</em>}
                    <p title={row.filename}>
                      <FileText size={12} />
                      {row.filename}
                    </p>
                  </div>
                  <div className="hj-row-info">
                    <div className="hj-badges">
                      <span className={`hj-badge hj-badge--${kind}`}>
                        <span />
                        {labels[kind]}
                      </span>
                      {snake && (
                        <span
                          className={`hj-badge ${snake.venom ? "hj-badge--venom" : "hj-badge--neutral"}`}
                        >
                          {snake.venomLabel ||
                            (snake.venom ? "Berbisa" : "Tidak berbisa")}
                        </span>
                      )}
                    </div>
                    <p>{description}</p>
                    <button
                      className="hj-note"
                      onClick={() => openDialog("edit", row)}
                    >
                      <Pencil size={12} />
                      <span>{row.note || "Tambah catatan pengamatan"}</span>
                    </button>
                  </div>
                  <div className="hj-row-end">
                    <div className="hj-row-top">
                      <Confidence value={row.confidence} kind={kind} />
                      <button
                        className="hj-icon-button hj-delete"
                        onClick={() => openDialog("delete", row)}
                        aria-label={`Hapus pengamatan ${row.filename}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <button
                      className="hj-button hj-detail-button"
                      onClick={() => openDialog("detail", row)}
                    >
                      Lihat detail <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <nav className="hj-pagination" aria-label="Halaman riwayat">
            <span>
              Menampilkan {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} dari{" "}
              {filtered.length} pengamatan
            </span>
            <div>
              <button
                className="hj-icon-button"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft size={18} />
              </button>
              <span>
                Halaman <strong>{currentPage}</strong> / {totalPages}
              </span>
              <button
                className="hj-icon-button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(currentPage + 1)}
                aria-label="Halaman selanjutnya"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </nav>
        )}
        <footer className="hj-footnote">
          <ShieldCheck size={17} />
          <p>
            Hasil AI adalah kandidat untuk edukasi. Confidence tinggi tidak
            menjamin identifikasi benar.
          </p>
          <span>SERPENTA / FIELD JOURNAL</span>
        </footer>
      </div>

      {dialog && selected && (
        <Modal
          title={
            dialog.kind === "detail"
              ? "Detail pengamatan"
              : dialog.kind === "edit"
                ? "Edit catatan"
                : "Hapus pengamatan"
          }
          onClose={() => {
            if (!working) setDialog(null);
          }}
        >
          {dialog.kind === "detail" ? (
            <>
              <div className="hj-modal-photo">
                <Photo src={selected.image} alt={`Foto ${selected.filename}`} />
              </div>
              <div className="hj-modal-body">
                <span className="hj-eyebrow">
                  OBSERVATION / {dateLabel(selected.createdAt)}
                </span>
                <div className="hj-modal-title">
                  <h2>{rowTitle(selected)}</h2>
                  <Confidence
                    value={selected.confidence}
                    kind={resultKind(selected.status)}
                  />
                </div>
                {selectedSpecies && (
                  <em className="hj-latin">{selectedSpecies.scientific}</em>
                )}
                <span
                  className={`hj-badge hj-badge--${resultKind(selected.status)}`}
                >
                  {labels[resultKind(selected.status)]}
                </span>
                {selectedSpecies ? (
                  <>
                    <p className="hj-description">
                      {selectedSpecies.description}
                    </p>
                    <dl className="hj-facts">
                      <div>
                        <dt>Habitat spesies</dt>
                        <dd>{selectedSpecies.habitat || "Belum tersedia"}</dd>
                      </div>
                      <div>
                        <dt>Makanan</dt>
                        <dd>{selectedSpecies.diet || "Belum tersedia"}</dd>
                      </div>
                      <div>
                        <dt>Aktivitas</dt>
                        <dd>{selectedSpecies.activity || "Belum tersedia"}</dd>
                      </div>
                      <div>
                        <dt>Informasi bisa</dt>
                        <dd>
                          {selectedSpecies.venomLabel || "Belum tersedia"}
                        </dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <p className="hj-description">
                    {resultKind(selected.status) === "not-snake"
                      ? "Model memprediksi objek ini bukan ular. Prediksi ini bukan jaminan bahwa objek aman didekati."
                      : "Informasi spesies belum tersedia untuk hasil ini. Catatan dan foto tetap tersimpan di jurnal."}
                  </p>
                )}
                <div className="hj-saved-note">
                  <span>CATATAN LAPANGAN</span>
                  <p>
                    {selected.note || "Belum ada catatan untuk pengamatan ini."}
                  </p>
                  <button
                    className="hj-text-button"
                    onClick={() => openDialog("edit", selected)}
                  >
                    <Pencil size={14} /> Edit catatan
                  </button>
                </div>
                {selected.predictions.length > 0 && (
                  <details className="hj-candidates">
                    <summary>Lihat kandidat dari model</summary>
                    {selected.predictions
                      .slice(0, 5)
                      .map((prediction, index) => {
                        const id =
                          prediction.species_id ||
                          prediction.speciesId ||
                          "unknown";
                        const confidence = score(prediction.confidence);
                        return (
                          <div key={`${id}-${index}`}>
                            <span>
                              {getSpecies(id)?.name || nameFromId(id)}
                            </span>
                            <b>
                              {confidence === null
                                ? "—"
                                : `${(confidence * 100).toFixed(1)}%`}
                            </b>
                          </div>
                        );
                      })}
                  </details>
                )}
                <p className="hj-disclaimer">
                  Hasil AI dapat keliru. Informasi habitat adalah profil
                  spesies, bukan lokasi pengambilan foto.
                </p>
                <div className="hj-modal-actions">
                  <button
                    className="hj-button"
                    onClick={() => openDialog("delete", selected)}
                  >
                    <Trash2 size={15} /> Hapus
                  </button>
                  {selectedSpecies && (
                    <button
                      className="hj-button hj-button--green"
                      onClick={() => {
                        setDialog(null);
                        onSelect(selectedSpecies);
                      }}
                    >
                      Profil spesies <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="hj-modal-body hj-form-body">
              <span className="hj-eyebrow">YOUR FIELD NOTES</span>
              <h2>
                {dialog.kind === "edit"
                  ? "Simpan ceritanya."
                  : "Hapus pengamatan ini?"}
              </h2>
              <p>
                {dialog.kind === "edit"
                  ? selected.filename
                  : "Foto dan catatan ini akan dihapus dari riwayat. Tindakan ini tidak dapat dibatalkan."}
              </p>
              {dialog.kind === "edit" && (
                <label className="hj-note-input">
                  Catatan pengamatan
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    maxLength={2000}
                    rows={6}
                    placeholder="Tulis cerita pengamatanmu…"
                  />
                  <small>{note.length} / 2000 karakter</small>
                </label>
              )}
              {actionError && (
                <p className="hj-form-error" role="alert">
                  {actionError}
                </p>
              )}
              <div className="hj-modal-actions">
                <button
                  className="hj-button"
                  disabled={working}
                  onClick={() => setDialog(null)}
                >
                  Batal
                </button>
                <button
                  className={`hj-button ${dialog.kind === "delete" ? "hj-button--danger" : "hj-button--green"}`}
                  disabled={working}
                  onClick={() => void mutate()}
                >
                  {working ? (
                    <LoaderCircle size={16} className="hj-spin" />
                  ) : dialog.kind === "delete" ? (
                    <Trash2 size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                  {working
                    ? "Memproses…"
                    : dialog.kind === "delete"
                      ? "Ya, hapus"
                      : "Simpan catatan"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
}

export { HistoryPage };
