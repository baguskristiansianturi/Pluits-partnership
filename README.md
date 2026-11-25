# PLUITS Partner

Dokumen ini adalah titik acuan awal proyek PLUITS Partner. Repository ini disiapkan untuk menyimpan arah produk, alur kerja, keputusan awal, dan dokumentasi sebelum implementasi kode serta publikasi GitHub Pages dimulai.

> Status: **Perencanaan awal — belum mulai coding dan belum menyiapkan GitHub Pages.**

## 1. Nama dan posisi produk

- Nama aplikasi: **PLUITS Partner**
- Nama repository yang dituju: `pluits-partner`
- Nama ekosistem mitra: **PLUITS Partner Network**
- Nama program kerja sama perusahaan: **PLUITS Partnership**

PLUITS Partner adalah aplikasi operasional terpisah dari aplikasi utama PLUITS. Aplikasi ini ditujukan bagi mitra yang menjalankan layanan transportasi dan pengantaran, serta operator/perusahaan yang bergabung ke ekosistem PLUITS.

## 2. Tujuan aplikasi

Menyediakan satu aplikasi mitra dengan tampilan dan fitur yang menyesuaikan peran, jenis layanan, organisasi, dan izin akun. Bukan aplikasi terpisah untuk setiap jenis pengemudi.

Aplikasi utama PLUITS tetap menjadi tempat pelanggan menggunakan social, marketplace, dan memesan layanan. PLUITS Partner menjadi tempat mitra menjalankan pekerjaan dan mengelola operasionalnya.

## 3. Jenis mitra dan peran

Tahap awal berfokus pada:

1. **Driver Ride** — pengemudi sepeda motor untuk layanan perjalanan.
2. **Driver Car** — pengemudi mobil untuk layanan perjalanan.
3. **Courier** — mitra kurir/pengantaran.

Fondasi produk juga harus mempertimbangkan ekspansi berikut:

4. **Transport Operator** — perusahaan/operator taksi atau transportasi yang memiliki armada dan pengemudi.
5. **Fleet / Company Manager** — pengelola perusahaan, armada, pengemudi, dan operasional.
6. **Admin perusahaan** — staf yang diberi kewenangan mengelola operasional sesuai izin.

Satu akun dapat memiliki lebih dari satu peran jika memenuhi persyaratan dan mendapat otorisasi. Antarmuka dan akses fitur ditentukan oleh role, organisasi, serta permission dari backend.

## 4. Model kemitraan

PLUITS Partner perlu mendukung dua jalur utama:

- **Mitra individu:** orang mendaftar sebagai pengemudi atau kurir secara langsung.
- **Mitra perusahaan/operator:** perusahaan mendaftar sebagai organisasi, mengelola armada dan pengemudinya, serta menerima pesanan melalui PLUITS.

Dalam jangka panjang, operator taksi dan perusahaan transportasi—termasuk operator besar seperti Bluebird maupun operator lokal Bali—dapat dipertimbangkan untuk bergabung. Ini merupakan target/kemungkinan kerja sama, **bukan klaim bahwa perusahaan tersebut sudah menjadi mitra resmi**.

Untuk operator yang sudah memiliki sistem sendiri, PLUITS dapat mempertimbangkan integrasi API agar sistem dispatch mereka dapat terhubung tanpa mewajibkan seluruh operasional internal berpindah ke PLUITS.

## 5. Cakupan fungsi operasional

Fungsi yang direncanakan untuk dikembangkan secara bertahap:

- Registrasi, verifikasi, dan onboarding mitra.
- Pemilihan jenis kemitraan dan pengelolaan profil.
- Status online/offline.
- Penerimaan, penolakan, dan penugasan order.
- Informasi penjemputan, tujuan, dan pengantaran.
- Perubahan status perjalanan/pengiriman.
- Peta, lokasi, dan navigasi.
- Riwayat pekerjaan dan pendapatan.
- Notifikasi operasional.
- Pengelolaan armada, kendaraan, dan pengemudi untuk organisasi.
- Pengaturan role dan permission untuk perusahaan.

Daftar ini adalah arah cakupan, bukan pernyataan bahwa fitur sudah dibangun.

## 6. Arsitektur dan prinsip teknis awal

- PLUITS Partner adalah frontend/aplikasi mitra yang terpisah dari aplikasi konsumen.
- Keduanya terhubung ke ekosistem backend PLUITS yang sama melalui API dan aturan akses yang jelas.
- Order, dispatch, identitas, dan status transaksi perlu memiliki sumber data yang konsisten.
- Backend awal PLUITS direncanakan menggunakan **Go (Golang)** dan **PostgreSQL**. Detail layanan dan skema akan ditetapkan setelah audit kebutuhan dan dokumentasi arsitektur induk.
- Akses data dan tindakan operasional wajib diverifikasi di backend; pemisahan aplikasi saja bukan pengamanan yang cukup.
- Arsitektur awal harus modular dan dapat dikembangkan tanpa memaksakan pemisahan microservices sebelum dibutuhkan.

## 7. Peta dan navigasi

Kebutuhan peta perlu mendukung pengalaman yang jelas dan mudah digunakan oleh pengemudi maupun pelanggan.

Rekomendasi awal: **Google Maps Platform** untuk peta, pencarian tempat, rute, dan navigasi. Pemilihan ini merupakan rekomendasi, belum integrasi atau aktivasi layanan.

Komponen yang perlu dievaluasi sesuai kebutuhan:

- Maps SDK untuk tampilan peta.
- Places API untuk pencarian tempat.
- Routes API untuk perhitungan rute.
- Navigation SDK untuk navigasi dalam aplikasi.

Biaya penggunaan harus dikendalikan melalui pembatasan API key, kuota, anggaran, dan monitoring. Mockup serta pengembangan frontend awal tidak perlu mengaktifkan layanan berbayar. Evaluasi alternatif dapat dilakukan jika kebutuhan dan skala berubah.

## 8. Pola kerja proyek

Pemilik produk menyampaikan ide dan kebutuhan menggunakan prompt/bahasa sehari-hari. Asisten bertanggung jawab menerjemahkan arahan menjadi pekerjaan teknis, dengan alur:

1. Memahami kebutuhan dan mengklarifikasi hal penting bila diperlukan.
2. Mengaudit repository, dokumentasi, design system, aset, dan keputusan yang sudah ada.
3. Menyusun spesifikasi dan alur sebelum implementasi.
4. Mengerjakan kode, struktur, dan integrasi.
5. Menguji hasil dan memperbaiki masalah.
6. Menyediakan preview yang dapat diuji melalui browser/perangkat.
7. Mencatat perubahan, hasil pengujian, dan status pekerjaan.

Pemilik produk tidak diwajibkan menulis kode atau melakukan pekerjaan engineering. Tindakan yang memang memerlukan otorisasi pemilik akun—misalnya persetujuan akses, billing, atau kredensial rahasia—akan dijelaskan dan dipandu secara bertahap.

## 9. Tahapan sebelum coding

Urutan kerja yang disepakati:

1. Menetapkan nama dan identitas repository.
2. Menyimpan dokumen arah produk dan alur kerja ini.
3. Mengaudit kebutuhan, struktur dokumentasi, dan rancangan UI/UX.
4. Menyepakati alur utama Driver Ride, Driver Car, dan Courier.
5. Menyiapkan mockup dan spesifikasi frontend.
6. Baru memulai implementasi frontend secara bertahap.
7. Menyiapkan GitHub Pages/preview setelah struktur dan kebutuhan awal siap.

**Belum ada persetujuan untuk langsung memulai coding atau menerbitkan GitHub Pages pada tahap dokumen ini.**

## 10. Batasan dan keputusan yang belum final

- Desain visual final belum disetujui.
- Detail persyaratan verifikasi mitra dan perusahaan belum ditetapkan.
- Tarif, komisi, pembayaran, settlement, dan kebijakan pembatalan belum ditetapkan.
- Integrasi resmi dengan perusahaan taksi belum ada dan tidak boleh diasumsikan.
- Pilihan final layanan peta dan estimasi biaya perlu diverifikasi sebelum integrasi produksi.
- Detail API, database, keamanan, dan deployment harus mengikuti audit arsitektur PLUITS induk.

## 11. Cara melanjutkan di chat baru

Jika melanjutkan proyek di percakapan baru, minta asisten membaca README ini terlebih dahulu, kemudian memeriksa kondisi repository terbaru. Gunakan dokumen ini sebagai konteks awal, bukan alasan untuk menganggap fitur sudah dibuat. Lanjutkan dari tahap perencanaan yang belum selesai dan jangan mulai coding atau menerbitkan GitHub Pages sebelum tahap persiapan diselesaikan.

---
Dokumen awal PLUITS Partner. Perbarui dokumen ini ketika keputusan produk berubah agar repository tetap menjadi sumber acuan proyek.
