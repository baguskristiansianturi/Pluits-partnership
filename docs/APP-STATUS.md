# Status Implementasi PLUITS Partner

Pembaruan: 25 November 2026

## Audit deployment GitHub Pages

Status: **menunggu satu kali aktivasi Pages di pengaturan repository**.

- Repository publik, default branch `main`.
- File aplikasi tersedia di root: `index.html`.
- Workflow tersedia: `.github/workflows/pages.yml`.
- Workflow pertama gagal pada langkah `Configure Pages`, karena repository belum memiliki Pages site (`has_pages: false` / API Pages mengembalikan 404).
- Kegagalan bukan disebabkan oleh file HTML atau proses upload artifact.
- Workflow telah diperbarui ke `checkout@v6`, `configure-pages@v5`, `upload-pages-artifact@v4`, dan `deploy-pages@v4`.
- `configure-pages` tidak diberi `enablement: true` karena input tersebut membutuhkan token selain `GITHUB_TOKEN`; aktivasi paling aman dilakukan satu kali melalui Settings repository.

### Aktivasi yang diperlukan
Buka repository → Settings → Pages → Build and deployment → Source → pilih **GitHub Actions**. Setelah disimpan, jalankan ulang workflow **Deploy PLUITS Partner to GitHub Pages** pada tab Actions, atau lakukan push commit berikutnya. GitHub akan memberikan URL Pages saat deployment berhasil.

## Versi 0.1 — Frontend peta operasional

Status: frontend prototype awal tersedia di `index.html`.

### Fitur yang tersedia
- Peta vektor interaktif area Bali menggunakan MapLibre GL JS dan style Liberty dari OpenFreeMap.
- Titik jemput dan tujuan awal.
- Pemilihan titik langsung dengan menyentuh peta.
- Pencarian lokasi saat ini menggunakan Nominatim (belum memenuhi target pencarian POI/autocomplete presisi).
- Perhitungan rute melalui demo publik Valhalla dengan costing `motor_scooter`, `motorcycle`, dan `auto`.
- Ringkasan jarak dan estimasi waktu dari hasil routing.
- Izin lokasi browser untuk menampilkan posisi perangkat.
- Simulasi status pekerjaan: pesanan dibuat, diterima, tiba di penjemputan, perjalanan berlangsung, selesai.
- Simulasi marker pengemudi bergerak sepanjang geometri rute.
- Layout responsif untuk layar ponsel.

### Audit teknis dan batasan
- Order, status, dan pergerakan simulasi belum disimpan ke backend.
- Mode pelanggan/pengemudi belum tersinkronisasi antarperangkat.
- Belum ada autentikasi, dispatch nyata, WebSocket, atau integrasi Go + PostgreSQL/PostGIS.
- Pencarian tempat saat ini belum menyediakan autocomplete hasil banyak, ranking berdasarkan posisi pengguna, dan reverse geocoding yang lengkap. Perlu ditingkatkan ke Photon atau geocoder setara; layanan publik tetap memiliki fair-use dan tanpa SLA.
- Peta dan routing menggunakan layanan publik. Layanan demo Valhalla memiliki kebijakan penggunaan wajar, rate limit, dan bukan jaminan produksi.
- Data OpenStreetMap perlu diperiksa untuk kelengkapan bangunan, POI, jalan, dan akses sepeda motor di area pengujian.
- GitHub Pages hanya meng-host frontend statis. Backend Go harus di-deploy terpisah untuk uji dua perangkat.

## Teknologi
- MapLibre GL JS: renderer peta vektor.
- OpenFreeMap: style/tile peta.
- OpenStreetMap: data geografis.
- Valhalla: routing motor/motor scooter.
- Nominatim (saat ini): pencarian tempat; perlu ditingkatkan.
- HTML, CSS, JavaScript: frontend statis tanpa proses build.

## Pengujian berikutnya
1. Aktifkan dan verifikasi deployment GitHub Pages.
2. Periksa pemuatan peta melalui Android dan koneksi seluler.
3. Tingkatkan pencarian POI: autocomplete, nama gedung/hotel/restoran, alamat, lokasi bias Bali, dan reverse geocoding.
4. Bandingkan detail bangunan, nama tempat, jalan, dan kualitas rute dengan Google Maps pada area yang sama.
5. Periksa rute motor di jalan nyata; jangan menganggap hasil routing selalu benar.
6. Uji GPS perangkat di lapangan.
7. Setelah frontend disetujui, integrasikan API Go + PostgreSQL/PostGIS dan WebSocket untuk uji dua perangkat.

## Catatan layanan publik
Jangan memperlakukan endpoint demo sebagai layanan produksi. Sebelum aplikasi dipakai pengguna umum, evaluasi hosting tile/routing/geocoding sendiri atau penyedia dengan kapasitas, ketentuan, dan SLA yang sesuai.
