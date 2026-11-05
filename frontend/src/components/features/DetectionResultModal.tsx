"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Maximize2,
  Minimize2,
  ShieldCheck,
  X,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import "./DetectionResultModal.css";
import { species as catalog } from "../../data/species";
import type { Species } from "../../data/species";

type Prediction = {
  species_id: string;
  confidence: number;
};

type Reference = {
  label: string;
  url: string;
};

type Profile = Partial<Species> & {
  id: string;
  references?: Reference[];
};

type Props = {
  open: boolean;
  image: string;
  predictions: Prediction[];
  saved: boolean;
  onClose: () => void;
  onSelect: (species: Species) => void;
};

type RemoteProfile = {
  id: string;
  profile?: Profile;
  state: "loading" | "done" | "error";
};

/*
 * Profil cadangan untuk popup.
 * Data backend tetap menjadi prioritas saat tersedia.
 */
const extraProfiles: Record<string, Profile> = {
  "ahaetulla-prasina": {
    id: "ahaetulla-prasina",
    name: "Ular Pucuk",
    scientific: "Ahaetulla prasina",
    english: "Oriental Whip Snake",
    venom: true,
    venomLabel: "Berbisa",
    activity: "Aktif pada siang hari",
    habitat: "Pepohonan, semak, dan kebun di wilayah tropis",
    diet: "Burung kecil, katak, cecak, bunglon, dan kadal lainnya",
    regions: ["Indonesia", "Wilayah Asia Tenggara lainnya"],
    description:
      "Ular Pucuk merupakan ular bertubuh panjang dan ramping yang hidup di antara pepohonan dan semak. Warna hijaunya membantu menyamarkan tubuh di antara dedaunan. Spesies ini aktif pada siang hari dan memangsa hewan kecil, termasuk katak, cecak, kadal, serta burung kecil. Di Indonesia, ular ini dapat dijumpai di lingkungan bervegetasi, termasuk kebun. Kemiripan warna dengan ular lain membuat identifikasi tidak cukup berdasarkan warna hijau saja.",
    traits: [
      "Tubuh panjang dan ramping",
      "Warna hijau membantu kamuflase di dedaunan",
      "Sering beraktivitas di pepohonan dan semak",
    ],
    source: "https://www.ipb.ac.id/news/index/2025/10/ular-pucuk/",
    references: [
      {
        label: "IPB University — Ular Pucuk",
        url: "https://www.ipb.ac.id/news/index/2025/10/ular-pucuk/",
      },
    ],
  },

  "bungarus-flaviceps": {
    id: "bungarus-flaviceps",
    name: "Bungarus flaviceps",
    scientific: "Bungarus flaviceps",
    english: "Red-headed Krait",
    family: "Elapidae",
    venom: true,
    venomLabel: "Berbisa",
    length: "Umumnya 1,2–1,5 m; hingga 2,1 m",
    activity: "Terutama malam",
    habitat: "Hutan hujan, termasuk kawasan perbukitan",
    diet: "Terutama ular lain; juga vertebrata kecil",
    regions: ["Sumatra", "Bangka", "Belitung", "Borneo"],
    description:
      "Bungarus flaviceps adalah anggota keluarga Elapidae yang dikenal sebagai red-headed krait. Kepala dan ekornya dapat berwarna merah hingga jingga, dengan tubuh dominan gelap. Spesies ini hidup di kawasan hutan hujan dan terutama aktif pada malam hari. Warna saja tidak cukup untuk membedakannya dari ular lain yang tampak mirip.",
    traits: [
      "Kepala dan ekor berwarna merah hingga jingga",
      "Tubuh dominan gelap dengan sisik halus",
      "Dapat menyerupai beberapa ular berkepala merah lainnya",
    ],
    source: "https://reptile-database.reptarium.cz/Bungarus/flaviceps",
    references: [
      {
        label: "The Reptile Database",
        url: "https://reptile-database.reptarium.cz/Bungarus/flaviceps",
      },
      {
        label: "Thai National Parks",
        url: "https://www.thainationalparks.com/species/bungarus-flaviceps",
      },
    ],
  },
};

function slug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
}

function readable(value: string) {
  const name = value.replace(/[-_]+/g, " ").trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function localSpecies(id: string) {
  return catalog.find(
    (species) => slug(species.id) === id || slug(species.scientific) === id,
  );
}

function localProfile(id: string): Profile | undefined {
  const extra = extraProfiles[id];
  const existing = localSpecies(id);

  if (existing) return { ...extra, ...existing };
  return extra;
}

function safeLink(value?: string) {
  if (!value) return undefined;

  try {
    const url = new URL(value);

    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function readProfile(value: unknown, id: string): Profile | undefined {
  if (!value || typeof value !== "object") return undefined;

  const raw = value as Record<string, unknown>;

  const matches = [raw.id, raw.scientific].some(
    (field) => typeof field === "string" && slug(field) === id,
  );

  if (!matches) return undefined;

  const out: Record<string, unknown> = { id };

  const stringFields = [
    "name",
    "scientific",
    "english",
    "family",
    "venomLabel",
    "length",
    "activity",
    "habitat",
    "diet",
    "description",
    "source",
  ];

  for (const key of stringFields) {
    const field = raw[key];

    if (typeof field === "string" && field.trim()) {
      out[key] = field.trim();
    }
  }

  for (const key of ["regions", "traits"]) {
    const field = raw[key];

    if (Array.isArray(field)) {
      const values = field.filter(
        (item): item is string =>
          typeof item === "string" && Boolean(item.trim()),
      );

      if (values.length) {
        out[key] = values.map((item) => item.trim());
      }
    }
  }

  if (typeof raw.venom === "boolean") {
    out.venom = raw.venom;
  }

  if (Array.isArray(raw.references)) {
    const references: Reference[] = [];

    for (const item of raw.references) {
      if (!item || typeof item !== "object") continue;

      const reference = item as Record<string, unknown>;

      if (
        typeof reference.label === "string" &&
        reference.label.trim() &&
        typeof reference.url === "string"
      ) {
        const url = safeLink(reference.url);

        if (url) {
          references.push({
            label: reference.label.trim(),
            url,
          });
        }
      }
    }

    if (references.length) out.references = references;
  }

  return out as Profile;
}

export default function DetectionResultModal({
  open,
  image,
  predictions,
  saved,
  onClose,
  onSelect,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const titleId = useId();

  const [tab, setTab] = useState<"about" | "habitat" | "candidates">("about");

  const [zoom, setZoom] = useState(false);
  const [retry, setRetry] = useState(0);

  const [remote, setRemote] = useState<RemoteProfile>({
    id: "",
    state: "done",
  });

  const ranked = predictions
    .filter(
      (prediction) =>
        prediction &&
        typeof prediction.species_id === "string" &&
        prediction.species_id.trim() &&
        Number.isFinite(prediction.confidence) &&
        prediction.confidence >= 0 &&
        prediction.confidence <= 1,
    )
    .slice()
    .sort((a, b) => b.confidence - a.confidence);

  const top = ranked[0];
  const id = top ? slug(top.species_id) : "";
  const notSnake = id === "bukan-ular";

  const cached = localProfile(id);

  const profile: Profile | undefined =
    remote.id === id && remote.profile
      ? { ...cached, ...remote.profile }
      : cached;

  const loading = remote.id === id && remote.state === "loading";

  const failed = remote.id === id && remote.state === "error";

  const name = notSnake
    ? "Bukan ular"
    : profile?.name || readable(id) || "Belum ada kandidat";

  const scientific = profile?.scientific || readable(id);
  const existingSpecies = localSpecies(id);

  const referenceMap = new Map<string, Reference>();

  for (const reference of profile?.references || []) {
    const url = safeLink(reference.url);

    if (url) {
      referenceMap.set(url, { ...reference, url });
    }
  }

  const sourceUrl = safeLink(profile?.source);

  if (sourceUrl && !referenceMap.has(sourceUrl)) {
    referenceMap.set(sourceUrl, {
      label: "Sumber profil spesies",
      url: sourceUrl,
    });
  }

  const references = Array.from(referenceMap.values());

  useEffect(() => {
    if (!open) return;

    setTab("about");
    setZoom(false);
  }, [open, id, image]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    if (!open) {
      if (element.open) element.close();
      return;
    }

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    if (!element.open) element.showModal();
    document.body.style.overflow = "hidden";

    const cancel = (event: Event) => {
      event.preventDefault();
      closeRef.current();
    };

    element.addEventListener("cancel", cancel);

    return () => {
      element.removeEventListener("cancel", cancel);

      if (element.open) element.close();

      document.body.style.overflow = previousOverflow;

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open || !id || notSnake) return;

    const controller = new AbortController();
    let active = true;

    const timer = window.setTimeout(() => controller.abort(), 8000);

    setRemote({ id, state: "loading" });

    async function load() {
      try {
        // Native fetch: adapter apiFetch lama belum menangani
        // endpoint profil ular.
        const response = await fetch(
          `/api/v1/snakes/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );

        let found: Profile | undefined;

        if (response.ok) {
          found = readProfile(await response.json(), id);
        } else if (response.status === 404) {
          const list = await fetch(
            `/api/v1/snakes?q=${encodeURIComponent(readable(id))}`,
            { signal: controller.signal },
          );

          if (!list.ok) {
            throw new Error("Profil tidak dapat dimuat.");
          }

          const rows: unknown = await list.json();

          if (Array.isArray(rows)) {
            for (const row of rows) {
              const candidate = readProfile(row, id);

              if (candidate) {
                found = candidate;
                break;
              }
            }
          }
        } else {
          throw new Error("Profil tidak dapat dimuat.");
        }

        if (active) {
          setRemote({ id, profile: found, state: "done" });
        }
      } catch {
        if (active) {
          setRemote({ id, state: "error" });
        }
      } finally {
        window.clearTimeout(timer);
      }
    }

    void load();

    return () => {
      active = false;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, id, retry, notSnake]);

  return (
    <dialog
      ref={dialog}
      className={`sr2-dialog ${zoom ? "sr2-dialog--zoom" : ""}`}
      aria-labelledby={zoom ? undefined : titleId}
      aria-label={zoom ? "Foto pengamatan diperbesar" : undefined}
    >
      <header className="sr2-header">
        <div className="sr2-brand">
          serpenta<span>.</span>
          <small>IDENTIFICATION / FIELD NOTES</small>
        </div>
        <div className="sr2-header-end">
          <span className="sr2-finished">
            <i /> Analisis selesai
          </span>
          <button
            className="sr2-icon"
            onClick={onClose}
            aria-label="Tutup hasil identifikasi"
            autoFocus
          >
            <X size={19} />
          </button>
        </div>
      </header>
      <div className="sr2-scroll">
        <div className="sr2-layout">
          <section className="sr2-visual" aria-label="Foto pengamatan">
            <div className="sr2-photo">
              {image ? (
                <img src={image} alt="Foto pengamatan yang dianalisis" />
              ) : (
                <p>Foto tidak tersedia.</p>
              )}
              <div className="sr2-photo-tools">
                <span>FOTO PENGAMATAN</span>
                <button
                  className="sr2-icon"
                  onClick={() => setZoom((value) => !value)}
                  aria-label={zoom ? "Kembalikan ukuran foto" : "Perbesar foto"}
                  aria-pressed={zoom}
                >
                  {zoom ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
              {!zoom && (
                <span className="sr2-photo-caption">
                  Observe closely. <em>Respect always.</em>
                </span>
              )}
            </div>
            {!zoom && top && (
              <div className="sr2-score">
                <div>
                  <span>CONFIDENCE MODEL</span>
                  <strong>
                    {(top.confidence * 100).toFixed(1)}
                    <small>%</small>
                  </strong>
                </div>
                <p>
                  {notSnake ? "Kelas bukan ular" : "Kandidat teratas"}
                  <br />
                  <span>Bukan jaminan identifikasi benar.</span>
                </p>
                <div className="sr2-meter">
                  <span style={{ width: `${top.confidence * 100}%` }} />
                </div>
              </div>
            )}
          </section>
          {!zoom && (
            <section
              className="sr2-details"
              aria-label="Hasil dan profil kandidat"
            >
              <span className="sr2-kicker">
                {top && !notSnake
                  ? "KANDIDAT SPESIES / PREDIKSI AI"
                  : "HASIL ANALISIS"}
              </span>
              <h1 id={titleId}>{name}</h1>
              {top && !notSnake && (
                <p className="sr2-latin">
                  {name !== scientific
                    ? scientific
                    : profile?.english || "Identitas belum dikonfirmasi"}
                </p>
              )}
              {!notSnake && (
                <div className="sr2-tags">
                  {profile?.family && <span>{profile.family}</span>}
                  {typeof profile?.venom === "boolean" && (
                    <span className={profile.venom ? "sr2-venom" : ""}>
                      {profile.venomLabel ||
                        (profile.venom ? "Berbisa" : "Tidak berbisa")}
                      <small> · profil spesies</small>
                    </span>
                  )}
                </div>
              )}
              {notSnake ? (
                <div className="sr2-info">
                  <h2>Objek diprediksi bukan ular</h2>
                  <p>
                    Model menempatkan foto ini pada kelas bukan ular. Hasil ini
                    tidak menampilkan profil spesies ular.
                  </p>
                </div>
              ) : top ? (
                <>
                  <div className="sr2-tabs" aria-label="Bagian informasi">
                    {(
                      [
                        ["about", "Tentang"],
                        ["habitat", "Habitat & sebaran"],
                        ["candidates", "Kandidat lain"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setTab(key)}
                        aria-pressed={tab === key}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="sr2-info">
                    {tab === "about" && (
                      <>
                        <p className="sr2-description">
                          {profile?.description ||
                            (loading
                              ? "Sedang mengambil penjelasan spesies…"
                              : "Penjelasan spesies ini belum tersedia. Nama di atas merupakan kandidat model, bukan identifikasi terkonfirmasi.")}
                        </p>
                        <dl className="sr2-facts">
                          <div>
                            <dt>Panjang</dt>
                            <dd>{profile?.length || "Belum tersedia"}</dd>
                          </div>
                          <div>
                            <dt>Aktivitas</dt>
                            <dd>{profile?.activity || "Belum tersedia"}</dd>
                          </div>
                        </dl>
                        {!!profile?.traits?.length && (
                          <div className="sr2-traits">
                            <span className="sr2-kicker">
                              CIRI PADA PROFIL SPESIES
                            </span>
                            <ul>
                              {profile.traits.map((trait, index) => (
                                <li key={index}>{trait}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                    {tab === "habitat" && (
                      <>
                        <dl className="sr2-habitat">
                          <div>
                            <dt>Habitat</dt>
                            <dd>
                              {profile?.habitat ||
                                "Informasi habitat belum tersedia."}
                            </dd>
                          </div>
                          <div>
                            <dt>Makanan</dt>
                            <dd>
                              {profile?.diet ||
                                "Informasi pakan belum tersedia."}
                            </dd>
                          </div>
                        </dl>
                        <span className="sr2-kicker">SEBARAN PADA PROFIL</span>
                        <div className="sr2-regions">
                          {profile?.regions?.length ? (
                            profile.regions.map((region, index) => (
                              <span key={index}>{region}</span>
                            ))
                          ) : (
                            <p>Informasi sebaran belum tersedia.</p>
                          )}
                        </div>
                        <p className="sr2-fine">
                          Sebaran spesies bukan lokasi pengambilan foto.
                        </p>
                      </>
                    )}
                    {tab === "candidates" && (
                      <>
                        <p className="sr2-fine">
                          Kandidat dari foto yang sama. Skor bukan jaminan
                          identitas benar.
                        </p>
                        <div className="sr2-candidates">
                          {ranked.map((candidate, index) => {
                            const candidateId = slug(candidate.species_id);
                            const candidateName =
                              candidateId === "bukan-ular"
                                ? "Bukan ular"
                                : candidateId === id
                                  ? name
                                  : localProfile(candidateId)?.name ||
                                    readable(candidate.species_id);
                            return (
                              <div key={`${candidateId}-${index}`}>
                                <span>
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <strong>{candidateName}</strong>
                                  <div className="sr2-meter">
                                    <span
                                      style={{
                                        width: `${candidate.confidence * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                                <b>
                                  {(candidate.confidence * 100).toFixed(1)}%
                                </b>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {tab !== "candidates" && (
                      <>
                        {loading && (
                          <p className="sr2-load" role="status">
                            <LoaderCircle size={13} className="sr2-spin" />{" "}
                            Memperbarui profil…
                          </p>
                        )}
                        {failed && (
                          <div className="sr2-load">
                            {profile
                              ? "Menampilkan profil yang tersedia di aplikasi."
                              : "Profil belum dapat dimuat."}
                            <button
                              onClick={() => setRetry((value) => value + 1)}
                            >
                              <RefreshCw size={12} /> Coba lagi
                            </button>
                          </div>
                        )}
                        {references.length > 0 && (
                          <div className="sr2-sources">
                            {references.map((reference) => (
                              <a
                                key={reference.url}
                                href={reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {reference.label}
                                <ArrowUpRight size={12} />
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p className="sr2-description">
                  Belum ada kandidat yang bisa ditampilkan. Coba foto lain yang
                  lebih jelas.
                </p>
              )}
            </section>
          )}
        </div>
      </div>
      <footer className="sr2-footer">
        <div className="sr2-caution">
          <ShieldCheck size={17} />
          <p>
            Amati dari jarak aman.
            <span>Jangan menangani ular berdasarkan hasil AI.</span>
          </p>
        </div>
        <div className="sr2-actions">
          <span className="sr2-saved">
            {saved ? (
              <>
                <Check size={13} /> Tersimpan di History
              </>
            ) : (
              "Penyimpanan belum dikonfirmasi"
            )}
          </span>
          <button
            className="sr2-primary"
            onClick={() => {
              if (existingSpecies && !notSnake) {
                onClose();
                onSelect(existingSpecies);
              } else onClose();
            }}
          >
            {existingSpecies && !notSnake ? "Profil lengkap" : "Selesai"}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </footer>
    </dialog>
  );
}
