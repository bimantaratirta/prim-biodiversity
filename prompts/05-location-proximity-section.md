# 05 — Location Proximity Section

## Deskripsi
Analisis kedekatan lokasi operasi dengan kawasan lindung (adjacent) dan tumpang tindih (overlapped). Menampilkan distribusi yes/no/null dan highlight unit yang both adjacent AND overlapped.

## Data yang Digunakan
Dari `summary.json`:
- `by_subholding[sh][year].location.adjacent_yes/no/null`
- `by_subholding[sh][year].location.overlapped_yes/no/null`
- `by_subholding[sh][year].location.both_yes`

## Layout

### Section Container
- id: `location-proximity`
- Background: putih

### 1. Section Header
- **Judul:** "Kedekatan dengan Kawasan Lindung"
- **Subtitle:** "Analisis lokasi operasi terhadap area biodiversitas tinggi"

### 2. Narasi
`NarrativeBlock`:
"Setiap unit operasi dievaluasi berdasarkan dua aspek: (1) apakah lokasi **berdekatan** (adjacent) dengan kawasan lindung atau area biodiversitas tinggi, dan (2) apakah wilayah kerja **tumpang tindih** (overlapped) dengan kawasan tersebut. Unit yang memiliki kedua kondisi ini memerlukan perhatian khusus dalam pengelolaan dampak lingkungan."

### 3. Year Toggle

### 4. Visualisasi (2 baris)

#### Baris 1 — Stacked Percentage Bars (2 chart side by side)

**Chart A: Adjacent to Protected Areas**
- Per SH, horizontal 100% stacked bar
- 3 segmen: "Yes" (hijau `#2E8540`), "No" (abu `#CBD5E1`), "Belum Dilaporkan" (putih dengan border dashed)
- Label persentase di dalam segmen (jika cukup lebar)

**Chart B: Overlapped with Protected Areas**
- Format sama dengan Chart A
- Warna "Yes": `#E06919` (oranye, lebih attention-grabbing karena overlap = risiko lebih tinggi)

#### Baris 2 — Both Yes Highlight

Card khusus yang menampilkan:
- **Angka besar:** jumlah unit yang both adjacent=yes AND overlapped=yes
- **Label:** "Unit dengan lokasi berdekatan DAN tumpang tindih dengan kawasan lindung"
- **Breakdown per SH:** mini badges menunjukkan berapa unit per SH
- Background: gradient ringan kuning-oranye sebagai visual warning

Data 2024:
| SH | Both Yes |
|----|----------|
| SH Upstream | 0 |
| SH Downstream | 0 |
| SH PNRE | 4 |
| SH Gas | 0 |
| **Total** | **4** |

### 5. Insight
"Pada 2024, **4 unit** dari SH PNRE (PGE Areas) memiliki lokasi yang berdekatan sekaligus tumpang tindih dengan kawasan lindung. Hal ini umum terjadi di area geotermal yang memang seringkali berada di kawasan pegunungan dengan biodiversitas tinggi. Unit-unit ini memiliki program konservasi aktif sebagai bagian dari pengelolaan dampak lingkungan."

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/LocationProximitySection.tsx` | `LocationProximitySection` |
| `src/components/charts/StackedPercentBar.tsx` | `StackedPercentBar` |

## Chart Specs

### StackedPercentBar
- Props: `data: { name: string; yes: number; no: number; null: number; color: string }[]`, `label: string`
- Recharts: `<BarChart layout="vertical" stackOffset="expand">`
- 3 `<Bar>` components stacked
- Percentage labels inside bars
- Responsive
- Custom tooltip menampilkan angka absolut + persentase

## Animasi
- Bars animate dari 0% ke 100% width saat section visible
- Both-yes card: angka counter animation
