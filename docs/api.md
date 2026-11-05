# API v1

Base lokal: http://localhost:8000. Dokumentasi interaktif: /docs.
Semua endpoint /api/v1 menerima Authorization: Bearer TOKEN jika API_TOKEN backend diisi. /health tidak memerlukan token.

| Method | Path | Fungsi |
|---|---|---|
| GET | /health | Status server |
| GET | /api/v1/snakes?q=&region= | Katalog |
| GET | /api/v1/snakes/{id} | Detail spesies |
| GET | /api/v1/snakes/{id}/similar | Kemiripan |
| GET | /api/v1/compare?a=ID&b=ID | Dua spesies |
| GET | /api/v1/distribution | Wilayah dan ID spesies |
| GET | /api/v1/distribution/habitats | Habitat |
| GET | /api/v1/gallery | Aset dan kredit foto |
| GET | /api/v1/safety | Panduan dan sumber |
| GET | /api/v1/detections/status | Kesiapan model, ambang |
| POST | /api/v1/detections | multipart image + note; inferensi dan simpan |
| POST | /api/v1/history | multipart image + note; simpan manual |
| GET | /api/v1/history | Maks. 500 record terbaru |
| GET | /api/v1/history/{id}/image | Foto JPEG |
| PATCH | /api/v1/history/{id} | JSON {"note":"..."} |
| DELETE | /api/v1/history/{id} | Hapus record dan foto, 204 |

Record deteksi: id, species_id (nullable), confidence (nullable), status, filename, note, created_at ISO-8601, predictions[], image_url. Prediction berisi species_id, confidence 0..1, opsional box [x1,y1,x2,y2] relatif gambar 0..1.

Batas: foto 8 MB dan 20 MP; JPEG/PNG/WEBP; note 2000 karakter. Error: 400 invalid image, 401 token, 404 data, 413 terlalu besar, 415 format, 422 validasi, 503 model belum tersedia.
Timeout frontend tidak membatalkan pekerjaan server yang sudah berjalan; cek History sebelum mengulang request deteksi.
