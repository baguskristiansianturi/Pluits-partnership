# Status Implementasi PLUITS Partner

Pembaruan: 25 November 2026

## Versi 0.1 — Frontend peta operasional

Status: frontend prototype awal telah ditambahkan ke repository.

### Fitur yang tersedia
- Peta vektor interaktif area Bali menggunakan MapLibre GL JS dan style Liberty dari OpenFreeMap.
- Titik jemput dan tujuan awal.
- Pemilihan titik langsung dengan menyentuh peta.
- Pencarian lokasi melalui Nominatim.
- Perhitungan rute melalui demo publik Valhalla dengan costing motor_scooter, motorcycle, dan auto.
- Ringkasan jarak dan estimasi waktu dari hasil routing.
- Izin lokasi browser untuk menampilkan posisi perangkat.
- Simulasi status pekerjaan: pesanan dibuat, diterima, tiba di penjemputan, perjalanan berlangsung, selesai.
- Simulasi marker pengemudi bergerak sepanjang geometri rute.
- Layout responsif untuk layar ponsel.

### Batasan prototype
- Order, status, dan pergerakan simulasi belum disimpan ke backend.
- Mode pelanggan/pengemudi belum tersinkronisasi antarperangkat.
- Belum ada autentikasi, dispatch nyata, WebSocket, atau integrasi Go + PostgreSQL/PostGIS.
- Peta dan routing menggunakan layanan publik. Layanan demo Valhalla memiliki kebijakan penggunaan wajar, rate limit, dan bukan jaminan produksi.
- Data OpenStreetMap perlu diperiksa untuk kelengkapan jalan dan akses sepeda motor di area pengujian.
- GitHub Pages hanya meng-host frontend statis. Backend Go harus di-deploy terpisah untuk uji dua perangkat.

## Teknologi
- MapLibre GL JS: renderer peta vektor.
- OpenFreeMap: style/tile peta.
- OpenStreetMap: data geografis.
- Valhalla: routing motor/motor scooter.
- Nominatim: pencarian tempat.
- HTML, CSS, JavaScript: frontend statis tanpa proses build.

## Pengujian berikutnya
1. Periksa pemuatan peta melalui Android dan koneksi seluler.
2. Bandingkan detail jalan Bali dengan Google Maps pada area yang sama.
3. Periksa rute motor di jalan nyata; jangan menganggap hasil routing selalu benar.
4. Uji GPS perangkat di lapangan.
5. Perbaiki detail peta, marker, instruksi, dan panel operasional berdasarkan hasil uji.
6. Setelah frontend disetujui, integrasikan API Go + PostgreSQL/PostGIS dan WebSocket untuk uji dua perangkat.

## Catatan layanan publik
Jangan memperlakukan endpoint demo sebagai layanan produksi. Sebelum aplikasi dipakai pengguna umum, evaluasi hosting tile/routing sendiri atau penyedia dengan kapasitas, ketentuan, dan SLA yang sesuai.
