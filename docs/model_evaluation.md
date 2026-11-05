# Dataset dan evaluasi

Tidak ada dataset training atau bobot model terlatih di ZIP. Enam foto katalog adalah aset edukasi berlisensi, bukan dataset training yang memadai. Jangan mengklaim akurasi sebelum menguji model pada data yang terpisah.

1. Tentukan kelas menggunakan training/configs/classes.json. ID harus cocok backend/data/snakes.json. Untuk kelas tambahan, perluas katalog dan kontrak label.
2. Kumpulkan foto dengan izin yang sesuai, variasi sudut, latar, pencahayaan dan individu. Verifikasi label spesies bersama sumber/ahli yang dapat dipercaya.
3. Untuk object detection, anotasi bounding box YOLO: class_index x_center y_center width height (0..1). Foto negatif tanpa ular memakai label kosong yang telah diverifikasi.
4. Jalankan prepare_dataset.py. Script memvalidasi label dan membuang duplikat identik. Tinjau near-duplicate secara manual, kelompokkan foto satu individu/rekaman/sumber pada split yang sama, dan pastikan setiap kelas terwakili.
5. Train pada train, pilih hyperparameter/threshold pada val. Test hanya untuk evaluasi final. Jangan mencampurkan test ke training.
6. Gunakan checkpoint lokal tepercaya. File .pt tidak boleh berasal dari sumber tak dikenal.
7. Laporkan precision, recall, mAP50, mAP50-95 per kelas untuk detector; confusion matrix dan top-1 accuracy untuk classifier. Catat jumlah foto tiap split, hardware, latency, kegagalan pada foto tanpa ular, low-light, blur, dan spesies di luar kelas.
8. Copy best.pt yang sudah dievaluasi ke backend/ai/weights/best.pt; install requirements-ai.txt dan restart.

Threshold default 0.65 bukan jaminan kebenaran atau nilai yang sudah dikalibrasi. Confidence bukan probabilitas keselamatan. Model classification tertutup dapat menebak spesies pada foto non-ular; uji negatif dan pertimbangkan kelas unknown/non-snake atau tahap detector. Tidak ada angka akurasi buatan di aplikasi.

Detector dan classifier adalah dua pilihan pipeline, bukan otomatis berjalan berurutan. Deteksi mendukung beberapa kotak pada satu foto; ringkasan riwayat menggunakan kandidat berconfidence tertinggi dan menyimpan daftar prediksi untuk detail.
