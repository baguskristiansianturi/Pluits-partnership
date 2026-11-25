# Status Implementasi PLUITS Partner

Pembaruan: 25 November 2026

## Status deployment

**GitHub Pages aktif dan deployment berhasil.** Workflow terbaru sebelumnya selesai dengan conclusion `success`; URL preview:

https://baguskristiansianturi.github.io/Pluits-partnership/

Workflow: `.github/workflows/pages.yml` — deploy frontend statis dari root repository ke GitHub Pages.

## Versi 0.2 — UI operasional dan alur uji order

Status: implementasi frontend diperbarui di `index.html`.

### Perubahan UI
- Struktur visual diperbarui menjadi operations console dengan header produk, panel peta, panel kerja, hierarki informasi, status, dan tombol aksi yang konsisten.
- Layout desktop menggunakan peta sebagai area utama dan panel operasional di sisi kanan.
- Layout mobile menggunakan peta di bagian atas dan panel operasional yang nyaman diakses dari bawah.
- Mode Pelanggan dan Pengemudi dibuat sebagai dua tampilan operasional yang berbeda dalam prototipe.
- Progress lima tahap pengemudi ditampilkan agar posisi alur uji mudah dipahami.
- Peta MapLibre/OpenFreeMap yang sudah ada dipertahankan.

### Alur pengujian yang tersedia

1. Buka tab **Pelanggan**.
2. Periksa titik jemput dan tujuan; ubah melalui pencarian atau tombol pilih titik di peta.
3. Pilih jenis kendaraan dan tekan **Hitung rute perjalanan**.
4. Setelah rute tampil, tekan **Buat pesanan sekarang**.
5. Aplikasi berpindah ke tab **Pengemudi**; periksa order masuk dan detail lokasi.
6. Tekan **Terima pesanan**.
7. Tekan **Mulai menuju penjemputan**.
8. Setelah simulasi tiba, tekan **Konfirmasi tiba di penjemputan**.
9. Tekan **Mulai perjalanan**; marker bergerak mengikuti geometri rute.
10. Tekan **Selesaikan pengantaran**; status menjadi selesai.
11. Gunakan **Atur ulang simulasi** untuk mengulang dari awal.

### Status tahapan
- Order pelanggan dibuat: tersedia.
- Order tampil pada tampilan pengemudi: tersedia dalam state lokal browser.
- Penerimaan order: tersedia.
- Perjalanan menuju lokasi jemput: status tersedia; marker berada di lokasi jemput (belum simulasi navigasi jalan terpisah menuju pickup).
- Konfirmasi tiba di lokasi jemput: tersedia.
- Mulai perjalanan dan animasi marker sepanjang rute: tersedia.
- Selesaikan pengantaran: tersedia.

## Batasan yang harus dipahami saat pengujian

- Ini **simulasi frontend satu perangkat/browser**, bukan dispatch atau transaksi nyata.
- Pelanggan dan pengemudi berbagi state lokal; belum ada komunikasi antar dua perangkat.
- Order dan riwayat belum disimpan di database.
- Belum ada login, akun, validasi identitas, pembayaran, atau notifikasi.
- Backend tetap menggunakan **Go + PostgreSQL** (PostGIS bila diperlukan); belum di-deploy. Tidak menggunakan Supabase.
- GitHub Pages hanya untuk frontend statis; backend perlu hosting terpisah agar dapat diuji lintas perangkat.
- Pencarian saat ini masih Nominatim satu hasil; autocomplete POI, bias lokasi, dan reverse geocoding lengkap masih perlu ditingkatkan.
- Layanan publik peta/routing/geocoding memiliki fair-use/rate limit dan bukan SLA produksi.

## Teknologi
- MapLibre GL JS — renderer peta.
- OpenFreeMap + OpenStreetMap — style/tile/data.
- Valhalla — routing `motor_scooter`, `motorcycle`, dan `auto`.
- Nominatim — geocoding pencarian saat ini.
- HTML, CSS, JavaScript — frontend statis tanpa proses build.

## Prioritas setelah uji awal

1. Perbaiki temuan UI/UX dari pengujian HP.
2. Validasi akurasi POI, bangunan, jalan, dan rute motor terhadap kondisi nyata.
3. Tingkatkan pencarian tempat menjadi autocomplete dengan pemilihan hasil dan reverse geocoding.
4. Buat kontrak API untuk order, status perjalanan, driver assignment, dan koordinat.
5. Implementasikan backend Go + PostgreSQL/PostGIS serta komunikasi real-time untuk uji dua perangkat.
