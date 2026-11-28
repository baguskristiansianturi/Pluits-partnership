# PLUITS Trans

**PLUITS Trans** adalah proyek mandiri untuk layanan mobilitas dan pengantaran di ekosistem PLUITS. Pengembangan dilakukan langsung pada branch `main`; tidak menggunakan alur pull request untuk perubahan rutin.

## Live preview

https://baguskristiansianturi.github.io/Pluits-partnership/

## Fondasi peta dan lokasi

- **MapLibre GL JS** sebagai renderer peta interaktif.
- **OpenFreeMap Liberty vector tiles** untuk peta jalan, label tempat, dan data bangunan yang tersedia pada sumber OpenStreetMap.
- **Photon (Komoot)** untuk autocomplete nama tempat/POI dan reverse geocoding. Hasil Indonesia diprioritaskan berdasarkan jarak dari titik pencarian; pencarian titik jemput dibatasi pada radius lokal agar hasil kota yang jauh tidak mendominasi.
- **Valhalla routing** dengan costing `motor_scooter` untuk rute roda dua dan `auto` untuk mobil.
- **Browser Geolocation** untuk membaca posisi perangkat setelah pengguna memberikan izin.
- Pin lokasi dapat dipilih pada peta dan digeser untuk menyesuaikan titik jemput atau tujuan.

## Batasan yang perlu diketahui

Peta, nama bangunan, dan POI bergantung pada kelengkapan data OpenStreetMap di area tersebut. Photon dan endpoint Valhalla publik adalah layanan komunitas/prototipe, bukan SLA produksi; ketersediaan, batas pemakaian, dan akurasi rute harus diuji di lapangan. Jika layanan rute gagal, aplikasi tidak boleh mengarang jarak, ETA, atau garis rute untuk dianggap sebagai hasil navigasi nyata.

Belum ada backend operasional untuk akun, pemesanan lintas perangkat, pencocokan driver, GPS driver real-time, pembayaran, maupun penyimpanan perjalanan. Simulasi UI yang ada bukan data armada aktif. Untuk produksi, PLUITS memerlukan layanan Go + PostgreSQL/PostGIS, kanal real-time, serta penyedia peta/geocoding/routing dengan ketentuan dan kapasitas yang sesuai.

## Struktur layanan

- Motorbike: `motorbike.html`
- Mobil: `mobil.html`
- Makanan: `makanan.html`
- Kopi & Minuman: `kopi.html`
- Kurir: `kurir.html`
- Antar Barang: `antar-barang.html`
- Belanja: `belanja.html`
- Tiket & Aktivitas: `tiket.html`
- Travel: `travel.html`

## Prinsip repository

- Modul Trans dikelola terpisah dari repository utama PLUITS.
- Perubahan fitur dilakukan langsung ke `main`, tanpa PR.
- Identitas visual menggunakan aset logo resmi PLUITS.
- Tidak menggunakan Supabase sebagai ketergantungan backend.
