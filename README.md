# PLUITS Partner

PLUITS Partner adalah aplikasi operasional mitra PLUITS. Aplikasi pelanggan dan aplikasi mitra dipisahkan, sementara data order dan operasional nantinya terhubung melalui backend PLUITS.

> **Status: Frontend prototype 0.1 tersedia.** GitHub Pages disiapkan melalui GitHub Actions. Backend Go + PostgreSQL belum di-deploy.

## Preview aplikasi

Setelah GitHub Pages aktif dan workflow deployment berhasil, aplikasi tersedia di:

https://baguskristiansianturi.github.io/Pluits-partnership/

## Fokus versi pertama

Prioritas pengujian adalah pekerjaan pengemudi dan pengalaman peta, bukan kelengkapan menu administratif.

- Peta vektor interaktif area Bali.
- Titik jemput dan tujuan.
- Pencarian tempat dan pemilihan titik langsung pada peta.
- Perhitungan rute dengan profil motor/motor scooter.
- Marker posisi perangkat dan simulasi pergerakan pengemudi.
- Alur simulasi: pesanan dibuat → diterima → tiba di jemput → perjalanan berlangsung → selesai.
- Layout responsif untuk pengujian melalui HP.

## Teknologi frontend dan peta

- **MapLibre GL JS** sebagai renderer peta.
- **OpenFreeMap** untuk style/tile peta berbasis OpenStreetMap.
- **Valhalla** untuk routing, termasuk costing `motor_scooter` dan `motorcycle`.
- **Nominatim** untuk pencarian tempat.
- HTML/CSS/JavaScript statis agar dapat langsung di-host GitHub Pages tanpa proses build.

Layanan publik digunakan untuk prototipe dan pengujian awal saja. Endpoint demo memiliki kebijakan penggunaan wajar dan bukan jaminan layanan produksi. Data jalan dan rute sepeda motor perlu divalidasi di lapangan.

## Backend — keputusan tetap

Backend PLUITS menggunakan **Go (Golang) + PostgreSQL**, dengan PostGIS untuk kebutuhan geospasial jika diperlukan. Tidak menggunakan Supabase.

GitHub Pages hanya meng-host frontend statis. Sinkronisasi order dan lokasi dua perangkat memerlukan backend Go yang dapat diakses melalui internet, database PostgreSQL, dan komunikasi real-time (misalnya WebSocket). Tahap ini belum aktif.

## Batasan prototype saat ini

- Status dan order hanya simulasi lokal di browser.
- Belum ada login atau data akun.
- Belum ada dispatch sungguhan atau sinkronisasi pelanggan-pengemudi lintas perangkat.
- Belum ada backend Go/PostgreSQL.
- GPS berjalan setelah pengguna memberi izin browser.
- Layanan peta/routing publik dapat membatasi permintaan.

## Dokumentasi

- [Status implementasi dan rencana pengujian](docs/APP-STATUS.md)

## Pola kerja

Pemilik produk menyampaikan ide dan kebutuhan. Pekerjaan audit repository, desain teknis, implementasi, pengujian, preview, dan dokumentasi ditangani sebagai pekerjaan engineering. Setiap perubahan penting dicatat di repository.

## Tahap berikutnya

1. Uji peta dan rute motor di Bali melalui HP.
2. Bandingkan detail peta dan kualitas rute dengan Google Maps.
3. Perbaiki peta dan alur operasional berdasarkan hasil uji.
4. Rancang kontrak API dan model data untuk Go + PostgreSQL/PostGIS.
5. Implementasikan backend dan WebSocket untuk pengujian dua perangkat.

## Struktur awal

- `.github/workflows/pages.yml` — deployment GitHub Pages.
- `docs/APP-STATUS.md` — status, batasan, dan rencana pengujian.
- `index.html` — aplikasi frontend.
- `README.md` — sumber acuan repository.
