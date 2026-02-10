# 04 — Area Konservasi Section

## Deskripsi
Visualisasi luasan area konservasi per Sub-Holding, membandingkan 2023 vs 2024, dan menunjukkan breakdown offsite vs overlap area (khusus 2024).

## Data yang Digunakan
Dari `summary.json`:
- `by_subholding[sh]["2023"].area.total_ha`
- `by_subholding[sh]["2024"].area.total_ha`
- `by_subholding[sh]["2024"].area.total_offsite_ha`
- `by_subholding[sh]["2024"].area.total_overlap_ha`
- `by_year["2024"].area.total_ha` — grand total

## Layout

### Section Container
- id: `area-konservasi`
- Background: `bg-gray-50`

### 1. Section Header
- **Judul:** "Luasan Area Konservasi"
- **Subtitle:** "Total area yang dikelola untuk pelestarian keanekaragaman hayati"

### 2. Narasi Atas
`NarrativeBlock`:
"Area konservasi mencakup wilayah yang dikelola secara khusus untuk pelestarian biodiversitas, baik di dalam maupun di luar wilayah kerja operasi. Pada tahun 2024, Pertamina mengelola total **100.593,89 hektar** area konservasi — peningkatan signifikan dari **21.284,46 hektar** di tahun 2023."

### 3. Year Toggle
Komponen `YearToggle` untuk switch antara 2023 dan 2024.

### 4. Chart Section (2 kolom di desktop)

#### Kolom Kiri — Horizontal Bar Chart (Total Area per SH)
- **Tipe:** Horizontal bar chart (Recharts `BarChart` layout="vertical")
- **Y-axis:** Nama SH (4 bars)
- **X-axis:** Luasan (ha)
- **Warna bars:** sesuai SH color
- **Label:** nilai di ujung bar (formatted: "91.365,51 ha")
- **Tooltip:** nama SH, luasan, persentase dari total

Data:
| SH | 2023 (ha) | 2024 (ha) |
|----|-----------|-----------|
| SH Upstream | 9.385,31 | 91.365,51 |
| SH Downstream | 11.790,69 | 9.173,78 |
| SH PNRE | 26,65 | 54,60 |
| SH Gas | 81,81 | — |

#### Kolom Kanan — Stacked Bar (Offsite vs Overlap, 2024 only)
- **Tipe:** Stacked horizontal bar chart
- **Y-axis:** Nama SH
- **Segmen:** Offsite (warna SH, opacity 100%) + Overlap (warna SH, opacity 50%)
- **Legend:** "Di luar Wilayah Kerja (Offsite)" dan "Beririsan dengan Wilayah Kerja (Overlap)"
- Hanya tampil saat tahun 2024 dipilih
- Saat 2023: tampilkan note "Data offsite/overlap tidak tersedia di tahun 2023"

Data 2024:
| SH | Offsite (ha) | Overlap (ha) |
|----|-------------|-------------|
| SH Upstream | 84.218,61 | 7.146,90 |
| SH Downstream | 8.701,03 | 472,75 |
| SH PNRE | 1,92 | 52,68 |
| SH Gas | — | — |

### 5. Insight Callout
Kartu insight di bawah charts:
"**SH Upstream** mendominasi luasan area konservasi (90,8% dari total 2024), didorong oleh area operasi Pertamina Hulu Rokan yang sangat luas. Peningkatan drastis dari 2023 ke 2024 mencerminkan perbaikan pendataan dan pelaporan, bukan hanya penambahan area baru."

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/AreaKonservasiSection.tsx` | `AreaKonservasiSection` |
| `src/components/charts/HorizontalBar.tsx` | `HorizontalBar` |
| `src/components/charts/StackedHorizontalBar.tsx` | `StackedHorizontalBar` |

## Chart Specs

### HorizontalBar
- Props: `data: { name: string; value: number; color: string }[]`
- Recharts: `<BarChart layout="vertical">` dengan `<Bar>` + `<LabelList>`
- Format angka: Indonesian locale (titik ribuan, koma desimal)
- Responsive height berdasarkan jumlah bars

### StackedHorizontalBar
- Props: `data: { name: string; offsite: number; overlap: number; color: string }[]`
- Recharts: `<BarChart layout="vertical" stackOffset="none">` dengan 2 `<Bar>` stacked
- Legend di bawah chart

## Animasi
- Bars grow dari kiri ke kanan saat section visible
- Angka label fade-in setelah bar selesai animasi
