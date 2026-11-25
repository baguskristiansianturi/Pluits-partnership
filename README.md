# PLUITS Partner

PLUITS Partner adalah aplikasi operasional mitra PLUITS. Aplikasi pelanggan dan aplikasi mitra dipisahkan, sementara data order dan operasional nantinya terhubung melalui backend PLUITS.

> **Status: Frontend prototype 0.2 tersedia dan GitHub Pages aktif.** UI operasional telah diperbarui dan alur simulasi order dibuat berurutan. Backend Go + PostgreSQL belum di-deploy.

## Preview aplikasi

https://baguskristiansianturi.github.io/Pluits-partnership/

## Fokus versi pengujian 0.2

Pengujian dimulai dari sisi pelanggan dan diteruskan ke sisi pengemudi dalam satu browser/perangkat:

1. **Pelanggan — buat pesanan:** tentukan lokasi jemput dan tujuan, pilih kendaraan, hitung rute, lalu buat order.
2. **Pengemudi — order masuk:** pindah otomatis ke tab Pengemudi; order baru tampil pada daftar pekerjaan.
3. **Terima pesanan:** pengemudi menerima order.
4. **Menuju penjemputan:** status berubah dan peta menampilkan titik jemput.
5. **Tiba di penjemputan:** pengemudi mengonfirmasi kedatangan.
6. **Mulai perjalanan:** marker pengemudi bergerak mengikuti rute.
7. **Selesaikan pengantaran:** status order menjadi selesai.
8. **Atur ulang simulasi:** mulai kembali dari awal untuk mengulang tes.

## Fitur frontend

- UI responsif dengan panel operasional, mode Pelanggan/Pengemudi, status pekerjaan, dan progress tahapan.
- Peta vektor interaktif area Bali menggunakan MapLibre GL JS dan OpenFreeMap.
- Titik jemput dan tujuan; bisa dipilih dari peta.
- Pencarian lokasi dengan Nominatim (masih perlu ditingkatkan untuk autocomplete dan ketepatan POI).
- Perhitungan rute Valhalla dengan costing `motor_scooter`, `motorcycle`, dan `auto`.
- Estimasi jarak/waktu, GPS perangkat, marker, dan simulasi gerakan pengemudi.
- Tidak memerlukan proses build; frontend statis di-host melalui GitHub Pages.

## Teknologi dan batasan

- **MapLibre GL JS** sebagai renderer peta.
- **OpenFreeMap / OpenStreetMap** untuk style, tile, dan data geografis.
- **Valhalla** untuk routing.
- **Nominatim** untuk pencarian tempat saat ini.
- **Go + PostgreSQL** tetap menjadi keputusan backend; PostGIS dapat digunakan untuk data geospasial. Tidak menggunakan Supabase.

**Penting:** alur versi ini adalah simulasi frontend satu perangkat. Order, status, dan lokasi pengemudi belum disimpan atau disinkronkan melalui server. Tab Pelanggan dan Pengemudi berbagi state lokal di browser yang sama. Untuk uji dua HP/perangkat secara nyata, perlu backend Go + PostgreSQL/PostGIS dan komunikasi real-time (misalnya WebSocket). GitHub Pages hanya meng-host frontend statis.

Layanan publik peta, geocoding, dan routing ditujukan untuk prototipe/pengujian awal; perhatikan fair-use, rate limit, dan ketiadaan SLA. Data jalan, POI, serta rute motor harus divalidasi di lapangan.

## Dokumentasi

- [Status implementasi dan panduan pengujian](docs/APP-STATUS.md)

## Tahap berikutnya

1. Uji alur order dari awal hingga selesai di HP.
2. Catat masalah UI, peta, pencarian, dan rute.
3. Tingkatkan pencarian POI (autocomplete, nama gedung/tempat, bias lokasi, reverse geocoding).
4. Rancang kontrak API dan model data untuk Go + PostgreSQL/PostGIS.
5. Implementasikan backend dan WebSocket untuk uji dua perangkat.
