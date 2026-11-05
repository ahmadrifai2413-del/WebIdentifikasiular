# Serpenta — profil 125 kelas ular — pembaruan 25 Oktober 2026

Paket ini dibuat dari daftar label model yang Anda kirim. Semua 125 ID memiliki
ringkasan berbahasa Indonesia, nama ilmiah, keluarga, dan tautan sumber.
Kelas bukan-ular bukan spesies sehingga tidak dimasukkan ke katalog.

## Batas kelengkapan

Paket mencakup seluruh 125 label ular. Pembaruan ini menambahkan rujukan biologi
untuk 76 profil, namun **belum memenuhi semua rincian biologi pada seluruh spesies**.
Penjelasan tersedia untuk 125 profil; habitat 95, panjang 70, aktivitas/perilaku 61,
makanan 59, ciri fisik 71, dan status bisa yang terverifikasi dalam paket 40.
Informasi yang belum didukung sumber tetap ditandai, bukan diisi dengan tebakan.
Beberapa catatan diet secara eksplisit masih berupa dugaan dari sumber.
Lihat `coverage-report.json` untuk rincian per spesies. `KATALOG.html` dapat dibuka
langsung di browser untuk membaca seluruh profil sebelum mengimpor.

Nama lokal tidak ditebak: bila belum terverifikasi, nama ilmiah menjadi judul.
Data foto tidak disertakan. Popup menggunakan foto unggahan pengamatan.
Nilai image kosong berarti belum ada foto katalog, bukan foto spesies lain.
Nama/foto/deskripsi pribadi dipertahankan. Nilai bawaan paket lama yang belum Anda edit diperbarui menggunakan data baru.

## Pasang di Windows

1. Ekstrak ZIP ini. Ambil folder `serpenta-profil-125` yang berisi
   `import_profiles.py` dan `snakes-125.json`.
2. Letakkan folder tersebut di `C:\Serpenta\backend`.
   Hasilnya harus `C:\Serpenta\backend\serpenta-profil-125\import_profiles.py`.
3. PostgreSQL harus menyala dan `.env` backend harus sudah benar.
4. Sebaiknya hentikan backend sebentar dengan Ctrl+C agar tidak bersamaan
   dengan proses seed/perubahan profil lain. Buka terminal PowerShell:

```powershell
cd C:\Serpenta\backend
.\.venv\Scripts\python.exe .\serpenta-profil-125\import_profiles.py
```

Perintah pertama hanya menampilkan jumlah profil baru/diperbarui tanpa menulis.
Untuk menyimpan:

```powershell
.\.venv\Scripts\python.exe .\serpenta-profil-125\import_profiles.py --apply
```

Tidak perlu install paket, membuat database, mengganti model, atau training ulang.
Skrip memakai dependency backend yang sudah ada (SQLAlchemy dan driver PostgreSQL).
Jika virtual environment Anda bernama `venv`, gunakan `venv` menggantikan `.venv`.

5. Setelah pesan SELESAI muncul, jalankan backend:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

6. Refresh halaman web, lalu deteksi foto ular. Popup yang telah Anda kirim sudah
   melakukan GET `/api/v1/snakes/{id}`. Dengan route backend itu tersedia,
   penjelasan akan muncul melalui API; tidak perlu menambahkan 125 profil ke TSX.
7. Cek profil yang sebelumnya tidak ada:

```powershell
Invoke-RestMethod 'http://127.0.0.1:8000/api/v1/snakes/boiga-nigriceps' | ConvertTo-Json -Depth 6
```

Jika endpoint memberikan 404 walaupun impor berhasil, periksa implementasi route
`app/api/v1/snakes.py`; file itu tidak disertakan dalam kode yang tersedia untuk
pembuatan paket ini. Jika 401, gunakan mekanisme token aplikasi Anda.

## Yang dilakukan skrip

- Memvalidasi 125 ID, duplikat, deskripsi, dan kesesuaian daftar label.
- Memastikan koneksi benar-benar menggunakan PostgreSQL.
- Membaca tabel model `app.models.snake.Snake` dengan kolom `id` dan `data`.
- Mengisi profil baru dan melengkapi bidang profil lama yang kosong.
- Mempertahankan perubahan pribadi, foto lokal, dan nama lokal.
- Memperbarui teks bawaan versi lama; previous-profiles.json menjadi acuan pembanding.
- Menyimpan _profileDefaults agar impor berikutnya dapat membedakan data bawaan dari edit pribadi.
- Menyatukan referensi lama dan baru; memasukkan catatan perubahan taksonomi.
- Memperbarui `backend/data/snakes.json` sehingga data tetap tersedia untuk seed.
- Membuat backup tabel profil dan JSON lama di `backend/backups/profiles-...`.
- Tidak menghapus spesies lama, history, foto unggahan, atau bobot model.

Backup ini hanya backup profil, bukan pg_dump seluruh database. Jangan menjalankan
import bersamaan dengan penulisan profil lain. Jika terjadi masalah commit/koneksi,
periksa backup dan isi database sebelum mencoba ulang.

## Hubungan popup dan Snakepedia

Paket ini melengkapi data backend untuk popup. Daftar Snakepedia React yang masih
mengimpor array statis `frontend/src/data/species.ts` tidak otomatis berubah menjadi
125 kartu. Migrasi daftar itu ke API memerlukan pemeriksaan komponen dan tipenya.
Tombol Profil lengkap pada popup lama juga masih bergantung pada katalog statis.
Penjelasan kandidat dari backend tetap bisa tampil di tab Tentang/Habitat.

Jangan menafsirkan `venom: null` sebagai tidak berbisa. Popup yang Anda kirim memakai
pengecekan typeof boolean sehingga tidak memberi label bisa yang belum diketahui.
Jika komponen lain memakai ternary `snake.venom ? ... : 'Tidak berbisa'`, perbaiki
penanganan nilai null sebelum menampilkan profil-profil ini di komponen tersebut.

## Sumber dan catatan data

Referensi per spesies disimpan pada `source` dan `references`. Dasar taksonomi dan
sebaran adalah The Reptile Database; profil tertentu dilengkapi dari MyBIS, IPB,
Thai National Parks, Ecology Asia, IUCN, publikasi penelitian, dan sumber tambahan yang dicantumkan per profil. Ringkasan ditulis ulang, bukan salinan artikel lengkap.
Tanggal pembaruan: 25 Oktober 2026. Referensi dapat berubah mengikuti penelitian.

ID selalu sama dengan output model. Tiga perbedaan ejaan yang dicatat:

| ID model | Nama pada referensi yang diperiksa |
|---|---|
| asthenodipsas-tropidonotus | Asthenodipsas tropidonota |
| fowlea-melanzostus | Fowlea melanzosta |
| hypsiscopus-plumbea | Hypsiscopus plumbeus |

Ophiophagus hannah dipertahankan sebagai label model, dengan catatan pemisahan
kompleks king cobra termasuk O. bungarus. Tidak dilakukan relabel foto otomatis.
Catatan Indonesia untuk T. sabahi dipertanyakan sumber. Beberapa kompleks ular
lain juga memiliki catatan taksonomi di `taxonomyNote`.

`regions` hanya contoh wilayah yang disebut sumber, bukan daftar seluruh pulau,
bukan koordinat, dan bukan bukti tempat asal foto dataset. Borneo mencakup beberapa
negara. Untuk peta sebaran ilmiah, gunakan data lokasi yang telah diverifikasi.

## Verifikasi pembuatan paket

JSON dan cakupan 125 label diperiksa. Sintaks Python dan fungsi penggabungan diuji
secara lokal. Koneksi PostgreSQL, endpoint API, dan build React di komputer Anda
belum diuji dari lingkungan pembuat paket.
