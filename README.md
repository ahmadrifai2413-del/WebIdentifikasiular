# Serpenta — React + FastAPI + PostgreSQL

Versi React untuk demo kelas. Desain, CSS, carousel, dan foto dari versi React asli dipertahankan. Frontend dipisahkan dari backend; file hosting Cloudflare, D1/SQLite, contoh starter, dan komponen tak terpakai tidak ikut paket ini.

## Struktur

| Folder | Tanggung jawab |
|---|---|
| frontend/src/pages/App.tsx | Halaman dan navigasi, Home, katalog, detail, perbandingan, habitat, keselamatan |
| frontend/src/components/features | Detector, History, peta, judul halaman |
| frontend/src/styles | CSS desain asli |
| frontend/src/data | Katalog ensiklopedia bawaan React |
| frontend/src/services/api.ts | Koneksi serta pemetaan respons FastAPI ke tampilan React |
| frontend/public | Foto, ikon, dan peta |
| backend/app/api/v1 | Endpoint API |
| backend/app/models, schemas, repositories, services | Tabel, validasi, akses database, proses aplikasi |
| backend/app/core, db | Konfigurasi dan koneksi PostgreSQL |
| backend/ai | Pipeline identifikasi, model belum disertakan |
| backend/alembic | Migrasi tabel PostgreSQL |
| backend/storage/uploads | Foto pengamatan yang disimpan |
| scripts | Pemeriksaan koneksi, seed, persiapan dataset |
| training | Training dan evaluasi (opsional, setelah demo) |
| docs | Panduan API, kredit sumber, evaluasi model |

## Mulai di Windows / Antigravity

Gunakan Node.js 22.13+ (Vite 8: Node 22.12+) dan Python 3.11/3.12. PostgreSQL harus berjalan. Ekstrak ke folder baru; jangan timpa versi Flutter.

1. Buka folder utama proyek di Antigravity.
2. Salin backend/.env.example menjadi backend/.env. Isi DB_PASSWORD sendiri. DB_NAME=serpenta, DB_PORT=5432, DB_USER=postgres mengikuti database yang sudah dibuat. Biarkan API_TOKEN kosong untuk demo lokal. Jangan bagikan .env.
3. Bila database serpenta belum ada, buat dari pgAdmin: `CREATE DATABASE serpenta;`. Bila sudah ada, jangan buat/hapus ulang.
4. Terminal backend, mulai dari folder utama:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe ..\scripts\check_database.py
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

5. Terminal baru, mulai dari folder utama:

```powershell
cd frontend
npm install
npm run dev
```

Buka http://127.0.0.1:5173. API docs: http://127.0.0.1:8000/docs.
Jika PowerShell memblokir npm.ps1, gunakan `npm.cmd install` dan `npm.cmd run dev`.
Frontend meneruskan /api ke port 8000 lewat proxy Vite sehingga port browser tidak menyebabkan masalah CORS. Ganti target melalui frontend/.env (salin .env.example) bila port backend berbeda. Restart Vite setelah perubahan.

## Jika backend Flutter masih berjalan

Boleh gunakan backend FastAPI Flutter yang sama di port 8000: jangan nyalakan backend kedua di port itu. Database serpenta dan format API sama, sehingga riwayat keduanya dibagikan. Perubahan/hapus riwayat terlihat di kedua versi. Untuk demo terpisah, buat database serpenta_react lalu sesuaikan DB_NAME pada backend baru.

## Alur demo kelas

1. Home: carousel otomatis, pilih foto, lihat nama dan detail.
2. Snakepedia: cari spesies; bandingkan; buka galeri dan peta.
3. Detector: upload JPG/PNG/WEBP <=8 MB, isi catatan, Simpan pengamatan.
4. History: muat ulang, lihat foto, edit catatan, refresh browser, export CSV.
5. Hapus hanya data tes melalui tombol hapus dan konfirmasi.
6. Tunjukkan Swagger dan PostgreSQL untuk menjelaskan frontend → API → database.

Katalog React berasal dari data kurasi lokal frontend/src/data/species.ts untuk mempertahankan tampilan lama. Riwayat, catatan, dan metadata foto benar-benar memakai PostgreSQL; file foto berada di backend/storage/uploads. API katalog juga tersedia di backend, tetapi perubahan katalognya belum otomatis menyinkronkan katalog lokal React.

Model AI belum tersedia: tombol identifikasi tetap nonaktif; penyimpanan manual tetap berjalan. Tidak ada hasil AI palsu. Kamera perlu izin browser dan localhost/HTTPS. Desain memakai Google Fonts sehingga font fallback dapat terlihat bila internet mati.

Ini konfigurasi demo lokal, belum autentikasi multiuser atau deployment produksi. `npm run build` membuat dist; produksi membutuhkan reverse proxy /api ke backend. `npm run preview` bukan pengganti setup API produksi.
