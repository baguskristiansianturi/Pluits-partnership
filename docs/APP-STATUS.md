# Status Implementasi PLUITS Trans

Pembaruan: 28 November 2026

## Pemisahan repository

PLUITS Trans kini dipindahkan menjadi proyek frontend mandiri dari `pluits`. Repository ini menjadi sumber utama seluruh pekerjaan PLUITS Trans; fitur transportasi tidak lagi dikembangkan di folder Design Studio repository utama.

## Status aplikasi

- Prototipe frontend untuk pengujian mobile UI/UX.
- Pencarian lokasi otomatis dengan prioritas Indonesia dan hasil lokal berdasarkan titik jemput/peta.
- Pin pickup dan destination; hasil pilihan tersimpan otomatis.
- Peta dan garis rute ditampilkan untuk alur perjalanan.
- Panel status perjalanan dan simulasi kendaraan tersedia.

## Teknologi yang digunakan

- MapLibre GL JS.
- Peta raster OpenStreetMap.
- Photon geocoder.
- OSRM public demo routing.
- HTML, CSS, JavaScript statis.

## Batasan penting

- Order dan dispatch belum berjalan di backend.
- Posisi driver bukan GPS real-time; animasi driver adalah simulasi frontend.
- Tidak ada sinkronisasi lintas perangkat, login, pembayaran, atau penyimpanan server.
- OSRM public demo dan Photon merupakan layanan publik untuk prototipe; tidak memiliki SLA produksi.
- Rute dapat gagal atau tidak akurat untuk kendaraan motor/akses lokal; perlu validasi lapangan.
- GitHub Pages hanya meng-host frontend statis.

## Arsitektur berikutnya

1. Modularisasi Ride, Courier, driver workflow, dan shared map/location.
2. Backend Go + PostgreSQL/PostGIS.
3. API order, assignment, status perjalanan, dan driver location.
4. WebSocket atau mekanisme real-time untuk uji multi-perangkat.
5. Provider geocoding/routing/traffic yang dapat diandalkan untuk skala produksi.

## Deployment

Workflow `.github/workflows/pages.yml` menerbitkan isi repository dari branch `main` ke GitHub Pages.
