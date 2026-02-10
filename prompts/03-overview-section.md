# 03 — Overview Section

## Deskripsi
Section yang memberikan konteks tentang program biodiversity Pertamina dan menampilkan infographic struktur 4 Sub-Holding post-merger.

## Data yang Digunakan
- `constants.ts` — SH metadata (nama, warna, deskripsi, unit operasi list)
- `summary.json` → `by_subholding` — jumlah unit per SH

## Layout

### Section Container
- id: `overview`
- Background: putih
- Max-width 7xl, padding standar

### Content (2 kolom di desktop)

#### Kolom Kiri — Narasi
Gunakan `NarrativeBlock` component:

**Judul:** "Komitmen Pertamina terhadap Keanekaragaman Hayati"

**Paragraf 1:**
"Pertamina Group sebagai perusahaan energi nasional memiliki komitmen kuat terhadap pelestarian keanekaragaman hayati (biodiversitas) di seluruh wilayah operasinya. Melalui Kertas Kerja Environmental, setiap unit operasi melaporkan data biodiversitas termasuk luasan area konservasi, indeks keanekaragaman hayati, serta upaya konservasi fauna dan flora."

**Paragraf 2:**
"Data yang ditampilkan dalam dashboard ini bersumber dari laporan tahun 2023 dan 2024, mencakup seluruh Sub-Holding Pertamina pasca-merger. Monitoring ini menjadi dasar bagi pengambilan keputusan strategis terkait pengelolaan lingkungan hidup yang berkelanjutan."

**Callout box:**
"Pasca-merger, Pertamina Group terdiri dari 4 Sub-Holding utama yang masing-masing memiliki karakteristik operasi dan tantangan biodiversitas yang berbeda."

#### Kolom Kanan — Infographic 4 SH

4 cards vertikal, masing-masing menampilkan:
- **Color bar** di sisi kiri (warna SH)
- **Nama SH** — bold
- **Asal merger** — teks kecil (e.g., "R&P + C&T + IML")
- **Jumlah unit operasi** — badge angka
- **Contoh unit** — 3-4 nama unit dalam teks kecil abu-abu

| SH | Warna | Asal | Unit Count (2024) |
|----|-------|------|-------------------|
| SH Upstream | `#00539C` | (tetap) | 49 |
| SH Downstream | `#E31937` | R&P + C&T + IML | 28 |
| SH PNRE | `#2E8540` | (tetap) | 7 |
| SH Gas | `#F5A623` | (tetap) | 20 |

### Data Maturity Note

Di bawah infographic, tambahkan note kecil:
"*Catatan: Kelengkapan data bervariasi antar Sub-Holding dan antar tahun. SH Upstream memiliki data paling komprehensif, sementara beberapa unit di SH lain masih dalam tahap pengumpulan data.*"

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/OverviewSection.tsx` | `OverviewSection` |

## Animasi
- Cards muncul satu per satu saat scroll ke section (stagger 0.15s)
- Fade-in-up untuk narasi
- Gunakan `react-intersection-observer` untuk trigger
