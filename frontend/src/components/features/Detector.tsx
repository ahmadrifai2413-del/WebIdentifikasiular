"use client";

import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Camera,
  ScanLine,
  ShieldCheck,
  ArrowUpRight,
  Check,
  LoaderCircle,
  Info,
  X,
  Save,
  VideoOff,
  RefreshCw,
  History,
} from "lucide-react";

import { apiFetch } from "../../services/api";
import "./Detector.css";
import DetectionResultModal from "./DetectionResultModal";
import { getSpecies, species } from "../../data/species";
import type { Species } from "../../data/species";

type Prediction = {
  species_id: string;
  confidence: number;
  box?: number[];
};

type Result = {
  predictions: Prediction[];
  status: string;
  id?: string;
};

function normalizeLabel(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
}

function isNotSnakeLabel(value: string) {
  return normalizeLabel(value) === "bukan-ular";
}

function readableName(id: string) {
  const name = id.replace(/[-_]+/g, " ").trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function validPredictions(value: unknown): Prediction[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (p): p is Prediction =>
        p !== null &&
        typeof p === "object" &&
        typeof p.species_id === "string" &&
        p.species_id.trim().length > 0 &&
        typeof p.confidence === "number" &&
        Number.isFinite(p.confidence) &&
        p.confidence >= 0 &&
        p.confidence <= 1,
    )
    .sort((a, b) => b.confidence - a.confidence);
}

function hasValidBox(prediction: Prediction) {
  const box = prediction.box;

  return (
    Array.isArray(box) &&
    box.length === 4 &&
    box.every(
      (value) =>
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0 &&
        value <= 1,
    ) &&
    box[0] < box[2] &&
    box[1] < box[3]
  );
}

function PhotoPreview({
  src,
  predictions,
  showBoxes,
  busy,
  onError,
}: {
  src: string;
  predictions: Prediction[];
  showBoxes: boolean;
  busy: boolean;
  onError: () => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<"cover" | "contain">("cover");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [natural, setNatural] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setFit("cover");
    setNatural({ width: 0, height: 0 });
  }, [src]);
  useEffect(() => {
    if (!frame.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);
  const scale =
    natural.width && natural.height
      ? Math[fit === "cover" ? "max" : "min"](
          size.width / natural.width,
          size.height / natural.height,
        )
      : 0;
  const width = natural.width * scale,
    height = natural.height * scale;
  const left = (size.width - width) / 2,
    top = (size.height - height) / 2;
  return (
    <div className="ds2-preview" ref={frame}>
      <img
        src={src}
        alt="Foto yang akan dianalisis"
        style={{ objectFit: fit }}
        onLoad={(event) =>
          setNatural({
            width: event.currentTarget.naturalWidth,
            height: event.currentTarget.naturalHeight,
          })
        }
        onError={onError}
      />
      {showBoxes &&
        scale > 0 &&
        predictions.map((prediction, index) => {
          const b = prediction.box!;
          return (
            <div
              key={index}
              className="detection-box"
              style={{
                left: left + b[0] * width,
                top: top + b[1] * height,
                width: (b[2] - b[0]) * width,
                height: (b[3] - b[1]) * height,
              }}
            >
              <span>
                {getSpecies(prediction.species_id)?.name ||
                  readableName(prediction.species_id)}{" "}
                · {(prediction.confidence * 100).toFixed(1)}%
              </span>
            </div>
          );
        })}
      {busy && <div className="scan-line" />}
      <div className="ds2-fit" aria-label="Tampilan foto">
        <button
          type="button"
          aria-pressed={fit === "cover"}
          onClick={() => setFit("cover")}
          title="Isi bingkai; tepi foto mungkin terpotong"
        >
          Penuhi bingkai
        </button>
        <button
          type="button"
          aria-pressed={fit === "contain"}
          onClick={() => setFit("contain")}
        >
          Foto utuh
        </button>
      </div>
    </div>
  );
}

export default function Detector({
  onSelect,
}: {
  onSelect: (species: Species) => void;
}) {
  const [mode, setMode] = useState("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const [configured, setConfigured] = useState<boolean | null>(null);
  const [statusError, setStatusError] = useState(false);

  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [result, setResult] = useState<Result | null>(null);
  const [resultOpen, setResultOpen] = useState(false);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [boxes, setBoxes] = useState(true);
  const [note, setNote] = useState("");
  const [dragging, setDragging] = useState(false);

  const input = useRef<HTMLInputElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const alive = useRef(true);
  const operation = useRef(false);
  const statusDialog = useRef<HTMLDialogElement>(null);

  const locked = busy || saving || cameraLoading;

  const predictions = result?.predictions || [];
  const best = predictions[0];
  const topIsNotSnake = best ? isNotSnakeLabel(best.species_id) : false;

  // Status backend menentukan hasil akhir.
  // Jangan memilih kandidat ular berikutnya saat kelas teratas bukan ular.
  const isNotSnake = result?.status === "not_snake";

  const accepted =
    !topIsNotSnake &&
    (result?.status === "predicted" || result?.status === "identified");

  const profile = accepted && best ? getSpecies(best.species_id) : undefined;

  const candidateName = isNotSnake
    ? "Bukan ular"
    : accepted && best
      ? profile?.name || readableName(best.species_id)
      : "Belum dapat dipastikan";

  const resultDescription = isNotSnake
    ? "Model mengelompokkan foto ini sebagai bukan ular. Tidak ada identifikasi spesies ular yang ditampilkan."
    : accepted
      ? "Lihat penjelasan spesies dan kandidat lain di hasil analisis."
      : "Hasil model belum memenuhi syarat identifikasi. Coba foto lain yang lebih jelas.";

  const snakePredictions = predictions.filter(
    (prediction) => !isNotSnakeLabel(prediction.species_id),
  );

  const boxPredictions = accepted ? snakePredictions.filter(hasValidBox) : [];

  async function checkStatus() {
    setConfigured(null);
    setStatusError(false);

    try {
      const response = await apiFetch("/api/detect");

      if (!response.ok) {
        throw new Error("Status model tidak tersedia.");
      }

      const data = await response.json();

      if (alive.current) {
        setConfigured(Boolean(data.configured ?? data.ready));
      }
    } catch {
      if (alive.current) {
        setConfigured(false);
        setStatusError(true);
      }
    }
  }

  useEffect(() => {
    alive.current = true;
    void checkStatus();

    return () => {
      alive.current = false;
      stream.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (cameraOn && video.current && stream.current) {
      video.current.srcObject = stream.current;

      video.current.play().catch(() => {
        if (alive.current) {
          setError("Kamera belum dapat diputar. Coba aktifkan ulang.");
        }
      });
    }
  }, [cameraOn]);

  useEffect(() => {
    const dialog = statusDialog.current;
    if (!dialog) return;

    const shouldOpen =
      resultOpen && Boolean(result) && Boolean(preview) && !accepted;

    if (shouldOpen && !dialog.open) {
      dialog.showModal();
    } else if (!shouldOpen && dialog.open) {
      dialog.close();
    }
  }, [resultOpen, result, preview, accepted]);

  function stopCamera() {
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    setCameraOn(false);
  }

  function resetResult() {
    setResultOpen(false);
    setResult(null);
    setSaved(false);
  }

  function clearImage() {
    if (operation.current) return;

    resetResult();
    setFile(null);
    setError("");
  }

  function acceptFile(nextFile?: File) {
    if (!nextFile || operation.current) return;

    setError("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) {
      setError("Format belum didukung. Pilih JPG, PNG, atau WEBP.");
      return;
    }

    if (nextFile.size > 8 * 1024 * 1024) {
      setError("Gambar terlalu besar. Maksimal 8 MB.");
      return;
    }

    resetResult();
    setFile(nextFile);
    stopCamera();
  }

  async function startCamera() {
    if (operation.current) return;

    operation.current = true;
    setError("");
    setCameraLoading(true);
    setResultOpen(false);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Kamera tidak tersedia di browser ini.");
      }

      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
        },
        audio: false,
      });

      if (!alive.current) {
        cameraStream.getTracks().forEach((track) => track.stop());
        return;
      }

      stream.current?.getTracks().forEach((track) => track.stop());
      stream.current = cameraStream;

      resetResult();
      setFile(null);
      setCameraOn(true);
    } catch (err) {
      if (alive.current) {
        setError(
          err instanceof DOMException && err.name === "NotAllowedError"
            ? "Izin kamera ditolak. Izinkan kamera atau gunakan upload foto."
            : "Kamera tidak tersedia atau sedang digunakan. Gunakan upload foto.",
        );
      }
    } finally {
      operation.current = false;

      if (alive.current) {
        setCameraLoading(false);
      }
    }
  }

  function capture() {
    if (!video.current?.videoWidth || operation.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.current.videoWidth;
    canvas.height = video.current.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video.current, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob && alive.current) {
          acceptFile(
            new File([blob], `camera-${Date.now()}.jpg`, {
              type: "image/jpeg",
            }),
          );
        }
      },
      "image/jpeg",
      0.9,
    );
  }

  async function analyze() {
    if (!file || operation.current || !configured) return;

    operation.current = true;
    setError("");
    setBusy(true);
    setResultOpen(false);
    setResult(null);
    setSaved(false);

    try {
      const form = new FormData();
      form.append("image", file);
      form.append("note", note);

      const response = await apiFetch("/api/detect", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : typeof data.detail === "string"
              ? data.detail
              : "Analisis gagal. Coba lagi.",
        );
      }

      if (!alive.current) return;

      setResult({
        id: typeof data.id === "string" ? data.id : undefined,
        status: String(data.status || "unknown"),
        predictions: validPredictions(data.predictions),
      });

      setSaved(Boolean(data.id));
      setResultOpen(true);
    } catch (err) {
      if (alive.current) {
        setError(
          err instanceof Error ? err.message : "Koneksi terputus. Coba lagi.",
        );
      }
    } finally {
      operation.current = false;

      if (alive.current) {
        setBusy(false);
      }
    }
  }

  async function saveObservation() {
    if (!file || saved || result || operation.current) return;

    operation.current = true;
    setSaving(true);
    setError("");

    try {
      const form = new FormData();
      form.append("image", file);
      form.append("note", note);

      const response = await apiFetch("/api/history", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : typeof data.detail === "string"
              ? data.detail
              : "Gagal menyimpan pengamatan.",
        );
      }

      if (alive.current) {
        setSaved(true);
      }
    } catch (err) {
      if (alive.current) {
        setError(err instanceof Error ? err.message : "Koneksi terputus.");
      }
    } finally {
      operation.current = false;

      if (alive.current) {
        setSaving(false);
      }
    }
  }

  const hero =
    getSpecies("gonyosoma-oxycephalum") || species.find((item) => item.image);
  const scene = (id: string) =>
    (getSpecies(id)?.image || "").replace(/^assets\/images\//, "/images/");

  return (
    <section className="content page-section ds2-page">
      <header className="ds2-hero">
        <div className="ds2-hero-art" aria-hidden="true">
          {hero?.image && (
            <img
              src={hero.image.replace(/^assets\/images\//, "/images/")}
              alt=""
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />
          )}
        </div>
        <div className="ds2-hero-copy">
          <span>SNAKE IDENTIFICATION STUDIO</span>
          <h1>
            A closer look
            <br />
            <em>starts here.</em>
          </h1>
          <p>
            Mulai dari satu foto. Gunakan kamera atau upload gambar ular
            <br /> yang sudah kamu ambil dari jarak aman.
          </p>
          <small>
            OBSERVE <i>·</i> UNDERSTAND <i>·</i> COEXIST
          </small>
        </div>
        {hero && (
          <div className="ds2-credit">
            {hero.scientific} · {hero.credit}{" "}
            {hero.source && (
              <a href={hero.source} target="_blank" rel="noreferrer">
                Sumber ↗
              </a>
            )}{" "}
            {hero.license && (
              <a href={hero.license} target="_blank" rel="noreferrer">
                Lisensi ↗
              </a>
            )}
          </div>
        )}
      </header>

      <div className="detector-layout">
        <div className="scanner-card">
          <div className="scanner-tabs">
            <button
              className={mode === "upload" ? "selected" : ""}
              disabled={locked}
              onClick={() => {
                setMode("upload");
                stopCamera();
              }}
            >
              <Upload size={17} /> Upload Gambar
            </button>

            <button
              className={mode === "camera" ? "selected" : ""}
              disabled={locked}
              onClick={() => setMode("camera")}
            >
              <Camera size={17} /> Kamera Langsung
            </button>

            <span className="scanner-label">SNAKE IDENTIFICATION</span>
          </div>

          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            disabled={locked}
            onChange={(event) => {
              acceptFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />

          <div
            className={`scan-area ${dragging ? "dragging" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              if (!locked) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);

              if (!locked) {
                acceptFile(event.dataTransfer.files[0]);
              }
            }}
          >
            {cameraOn ? (
              <div className="camera-preview">
                <video ref={video} playsInline muted />

                <span className="camera-indicator">
                  <span className="live-dot" /> CAMERA ACTIVE
                </span>

                <div className="camera-actions">
                  <button
                    className="button primary"
                    onClick={capture}
                    disabled={locked}
                  >
                    <Camera size={18} /> Ambil foto
                  </button>

                  <button
                    className="button secondary"
                    onClick={stopCamera}
                    disabled={locked}
                  >
                    <VideoOff size={17} /> Matikan
                  </button>
                </div>
              </div>
            ) : preview ? (
              <div className="image-preview">
                <PhotoPreview
                  src={preview}
                  predictions={boxPredictions}
                  showBoxes={boxes}
                  busy={busy}
                  onError={() => {
                    resetResult();
                    setFile(null);
                    setError(
                      "Gambar rusak atau tidak dapat dibaca. Pilih gambar lain.",
                    );
                  }}
                />

                <button
                  className="replace-image"
                  onClick={clearImage}
                  disabled={locked}
                  aria-label="Hapus gambar"
                >
                  <X size={18} />
                </button>

                <span className="file-name">{file?.name}</span>
              </div>
            ) : (
              <div className="upload-empty">
                <div className="scan-frame">
                  <ScanLine size={42} strokeWidth={1} />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <h2>
                  {mode === "camera"
                    ? "Lihat melalui kameramu."
                    : "Tarik gambar ke sini"}
                </h2>

                <p>
                  {mode === "camera"
                    ? "Aktifkan kamera, lalu ambil satu frame untuk dianalisis."
                    : "atau pilih dari perangkatmu."}
                </p>

                <button
                  className="button primary"
                  onClick={
                    mode === "camera"
                      ? startCamera
                      : () => input.current?.click()
                  }
                  disabled={locked}
                >
                  {cameraLoading ? (
                    <LoaderCircle className="spin" size={17} />
                  ) : mode === "camera" ? (
                    <Camera size={17} />
                  ) : (
                    <Upload size={17} />
                  )}

                  {cameraLoading
                    ? "Membuka kamera…"
                    : mode === "camera"
                      ? "Aktifkan kamera"
                      : "Pilih gambar"}
                </button>

                <small>JPG, PNG, WEBP · Maksimal 8 MB</small>
              </div>
            )}
          </div>

          <div className="scanner-bottom">
            <span>
              <ShieldCheck size={15} /> Jangan mendekati ular demi foto.
            </span>

            {file && (
              <button
                className="text-link"
                disabled={locked}
                onClick={() => input.current?.click()}
              >
                Ganti foto <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        <aside className="analysis-panel">
          <div className="section-heading">
            <span className="eyebrow">IDENTIFICATION</span>
            <ScanLine size={18} />
          </div>

          <h2>Kenali, dengan hati-hati.</h2>

          <div className={`model-state ${configured ? "ready" : ""}`}>
            <span className="live-dot" />

            {statusError
              ? "Koneksi status gagal"
              : configured === null
                ? "Memeriksa model…"
                : configured
                  ? "Model terhubung"
                  : "Model belum terhubung"}

            <button
              className="icon-button"
              onClick={checkStatus}
              disabled={locked || configured === null}
              aria-label="Periksa ulang model"
            >
              <RefreshCw size={13} />
            </button>
          </div>

          {!configured && (
            <p className="muted small-copy">
              {statusError
                ? "Layanan identifikasi belum dapat dihubungi. Coba lagi."
                : configured === null
                  ? "Sedang memeriksa kesiapan model."
                  : "Identifikasi belum tersedia. Kamu tetap bisa menyimpan foto dan catatan."}
            </p>
          )}

          {boxPredictions.length > 0 && (
            <label className="checkbox">
              <input
                type="checkbox"
                checked={boxes}
                onChange={(event) => setBoxes(event.target.checked)}
              />
              <span>Tampilkan kotak deteksi</span>
            </label>
          )}

          <p className="muted small-copy">
            Hasil analisis otomatis tersimpan di History.
          </p>

          <label className="field-label">
            Catatan pengamatan <span className="optional">opsional</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Contoh: terlihat di kebun, sore hari…"
              maxLength={2000}
              rows={3}
              disabled={locked}
            />
          </label>

          <button
            className="button primary full"
            disabled={!file || locked || !configured}
            onClick={analyze}
          >
            {busy ? (
              <LoaderCircle className="spin" size={17} />
            ) : (
              <ScanLine size={17} />
            )}

            {busy
              ? "Menganalisis…"
              : result
                ? "Analisis ulang"
                : "Identifikasi gambar"}

            <ArrowUpRight size={16} />
          </button>

          <button
            className="button secondary full"
            disabled={!file || locked || saved || Boolean(result)}
            onClick={saveObservation}
          >
            {saving ? (
              <LoaderCircle className="spin" size={17} />
            ) : saved ? (
              <Check size={17} />
            ) : (
              <Save size={17} />
            )}

            {saved
              ? "Tersimpan di History"
              : saving
                ? "Menyimpan…"
                : "Simpan pengamatan"}
          </button>

          {!saved && !result && (
            <small className="save-explainer">
              Simpan pengamatan hanya menyimpan foto dan catatan tanpa
              menjalankan AI.
            </small>
          )}

          {saved && (
            <a href="#history" className="text-link success">
              <History size={15} /> Lihat riwayat pengamatan
              <ArrowUpRight size={14} />
            </a>
          )}

          {error && (
            <div className="error-message" role="alert">
              <Info size={17} />
              {error}
            </div>
          )}

          {result && (
            <div className="result-card" aria-live="polite">
              <span className="eyebrow">
                {isNotSnake
                  ? "HASIL ANALISIS"
                  : accepted
                    ? "KANDIDAT SPESIES DARI AI"
                    : "IDENTIFIKASI BELUM PASTI"}
              </span>

              <h3>{candidateName}</h3>

              {accepted && best && (
                <i>{profile?.scientific || readableName(best.species_id)}</i>
              )}

              {best && (accepted || isNotSnake) && (
                <>
                  <div className="confidence">
                    <span>Skor prediksi model</span>
                    <b>{(best.confidence * 100).toFixed(1)}%</b>
                  </div>

                  <div className="confidence-bar">
                    <span style={{ width: `${best.confidence * 100}%` }} />
                  </div>
                </>
              )}

              <p className="muted small-copy">{resultDescription}</p>

              <button
                className="button primary full"
                onClick={() => setResultOpen(true)}
                disabled={locked || !preview}
                aria-haspopup="dialog"
              >
                <ScanLine size={17} />
                Lihat hasil analisis
                <ArrowUpRight size={16} />
              </button>

              <p className="muted small-copy" style={{ marginTop: 12 }}>
                Hasil AI bisa keliru dan bukan dasar untuk menyatakan objek aman
                disentuh.
              </p>
            </div>
          )}
        </aside>
      </div>

      <div className="ds2-tips">
        {[
          {
            title: "Foto yang jelas",
            text: "Gunakan gambar asli yang memperlihatkan tubuh dan pola dengan cukup terang.",
            id: "naja-sumatrana",
          },
          {
            title: "Jarak tetap aman",
            text: "Gunakan foto yang sudah ada atau zoom. Jangan mendekati atau memegang ular.",
            id: "gonyosoma-oxycephalum",
          },
          {
            title: "Konfirmasi ke ahli",
            text: "Identifikasi AI bersifat dugaan. Untuk gigitan, segera cari bantuan medis.",
            id: "malayopython-reticulatus",
          },
        ].map((tip, index) => (
          <article key={tip.id} className="ds2-tip">
            {scene(tip.id) && (
              <img
                src={scene(tip.id)}
                alt=""
                aria-hidden="true"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            )}
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </div>
          </article>
        ))}
      </div>

      {accepted && (
        <DetectionResultModal
          open={resultOpen && Boolean(result) && Boolean(preview)}
          image={preview}
          predictions={snakePredictions}
          saved={saved}
          onClose={() => setResultOpen(false)}
          onSelect={(species) => {
            setResultOpen(false);
            onSelect(species);
          }}
        />
      )}

      <dialog
        ref={statusDialog}
        className="serpenta-status-dialog"
        aria-labelledby="serpenta-status-title"
        aria-describedby="serpenta-status-description"
        onCancel={() => setResultOpen(false)}
        onClose={() => setResultOpen(false)}
      >
        <div className="serpenta-status-header">
          <span className="eyebrow">SERPENTA / ANALYSIS</span>

          <button
            type="button"
            className="serpenta-status-close"
            aria-label="Tutup hasil analisis"
            onClick={() => setResultOpen(false)}
            autoFocus
          >
            <X size={20} />
          </button>
        </div>

        {preview && (
          <div className="serpenta-status-image">
            <img src={preview} alt="Foto yang dianalisis" />
          </div>
        )}

        <div className="serpenta-status-body">
          <div className="serpenta-status-label">
            {isNotSnake ? <ScanLine size={16} /> : <Info size={16} />}
            <span>{isNotSnake ? "HASIL KLASIFIKASI" : "PERLU FOTO LAIN"}</span>
          </div>

          <h2 id="serpenta-status-title">{candidateName}</h2>

          <p
            id="serpenta-status-description"
            className="serpenta-status-description"
          >
            {resultDescription}
          </p>

          {isNotSnake && best && (
            <div className="serpenta-status-score">
              <div>
                <span>Skor prediksi bukan ular</span>
                <strong>{(best.confidence * 100).toFixed(1)}%</strong>
              </div>

              <div className="serpenta-status-meter">
                <span style={{ width: `${best.confidence * 100}%` }} />
              </div>
            </div>
          )}

          {saved && (
            <p className="serpenta-status-saved">
              <Check size={16} />
              Foto dan hasil tersimpan di History
            </p>
          )}

          <div className="serpenta-status-notice">
            <Info size={17} />
            <p>
              Prediksi dapat keliru. Jika objek diduga ular, tetap jaga jarak
              dan jangan menyentuhnya.
            </p>
          </div>

          <button
            type="button"
            className="serpenta-status-return"
            onClick={() => setResultOpen(false)}
          >
            Kembali ke foto
            <ArrowUpRight size={17} />
          </button>
        </div>
      </dialog>
    </section>
  );
}
