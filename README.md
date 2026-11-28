# PLUITS Trans

**PLUITS Trans** adalah proyek mandiri untuk layanan mobilitas dan pengantaran di ekosistem PLUITS. Mulai sekarang, pekerjaan PLUITS Trans dikelola di repository ini, terpisah dari repository utama `pluits`.

## Preview

Saat repository diubah namanya menjadi `pluits-trans`, GitHub Pages akan tersedia di:

https://baguskristiansianturi.github.io/pluits-trans/

Sebelum rename repository selesai, URL Pages masih menggunakan nama repository saat ini:
https://baguskristiansianturi.github.io/Pluits-partnership/

## Cakupan proyek

- Ride / perjalanan penumpang
- Courier / pengantaran paket, dokumen, dan barang
- Pencarian tempat dan titik jemput/tujuan
- Peta, rute, status perjalanan, dan pengalaman pengemudi
- Fondasi untuk pengembangan modular layanan transportasi

## Teknologi frontend saat ini

- HTML, CSS, JavaScript — frontend statis, tanpa proses build
- MapLibre GL JS — renderer peta
- OpenStreetMap-based map tiles
- Photon — pencarian tempat dan POI
- OSRM public demo — perhitungan rute jalan

## Status dan batasan

Ini masih **prototipe frontend untuk pengujian UI/UX**. Driver dispatch, order lintas perangkat, GPS pengemudi real-time, akun, pembayaran, dan penyimpanan server belum terhubung. Garis rute dan simulasi pengemudi bukan layanan operasional nyata.

Layanan peta, geocoding, dan routing publik digunakan untuk prototipe; memiliki batas penggunaan dan tidak menjamin SLA produksi. Sebelum penggunaan produksi, PLUITS Trans memerlukan backend milik sendiri berbasis Go + PostgreSQL (PostGIS untuk data geospasial), provider data/routing yang sesuai, dan sistem real-time.

## Prinsip repository

- Semua perubahan PLUITS Trans dilakukan langsung pada repository proyek ini.
- Jangan menaruh pekerjaan fitur Trans kembali di repository utama PLUITS.
- Modul transportasi dikembangkan terpisah dan terstruktur agar mudah dipelihara.
- Tidak menggunakan Supabase sebagai ketergantungan backend.

## Halaman layanan

Beranda PLUITS Partner mengarahkan setiap layanan ke halaman HTML tersendiri:

- Motorbike: `motorbike.html`
- Mobil: `mobil.html`
- Makanan: `makanan.html`
- Kopi & Minuman: `kopi.html`
- Kurir: `kurir.html`
- Antar Barang: `antar-barang.html`
- Belanja: `belanja.html`
- Tiket & Aktivitas: `tiket.html`
- Travel: `travel.html`

Halaman-halaman layanan yang baru dibuat saat ini menyediakan alur antarmuka/pratinjau lokal. Integrasi pemesanan, pembayaran, dan penugasan mitra secara langsung masih memerlukan implementasi backend.
