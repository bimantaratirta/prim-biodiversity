# 09 — Year-over-Year Section

## Deskripsi
Perbandingan tren 2023 → 2024 menggunakan slope chart dan narasi tentang peningkatan maturitas data.

## Data yang Digunakan
Dari `summary.json`:
- `by_year["2023"]` vs `by_year["2024"]` — semua metrik
- `by_subholding[sh]["2023"]` vs `by_subholding[sh]["2024"]`

## Layout

### Section Container
- id: `year-over-year`
- Background: putih

### 1. Section Header
- **Judul:** "Tren 2023 — 2024"
- **Subtitle:** "Perkembangan monitoring biodiversitas tahun ke tahun"

### 2. Narasi
`NarrativeBlock`:
"Perbandingan data 2023 dan 2024 menunjukkan perkembangan signifikan dalam monitoring biodiversitas Pertamina. Peningkatan terbesar terlihat pada jumlah unit yang melaporkan data, luasan area yang teridentifikasi, dan jumlah fauna yang dibebasliarkan."

### 3. Key Changes Cards (4 cards horizontal)

| Metrik | 2023 | 2024 | Perubahan |
|--------|------|------|-----------|
| Area Konservasi | 21.284 ha | 100.594 ha | +372% ↑ |
| Unit dengan Data | 53 | 73 | +38% ↑ |
| Fauna Released | 3.169 | 13.939 | +340% ↑ |
| Bio Score Avg | 2,77 | 2,34 | -15% ↓ |

Setiap card:
- Angka 2023 (kecil, abu)
- Arrow / slope line visual
- Angka 2024 (besar, bold)
- Persentase perubahan (hijau jika naik, merah jika turun)
- Icon yang relevan

### 4. Slope Chart

**Tipe:** Slope chart (line dari kiri ke kanan)
- Sumbu kiri: nilai 2023
- Sumbu kanan: nilai 2024
- 4 garis (satu per SH), warna sesuai SH
- Metrik yang ditampilkan: Area Konservasi Total (ha)

Implementasi:
- Bisa menggunakan Recharts `<LineChart>` dengan 2 data points per line
- Atau custom SVG untuk kontrol lebih baik
- Dot/circle di setiap endpoint
- Label nama SH di ujung kanan
- Tooltip on hover

### 5. Data Maturity Narrative

Paragraf penjelasan:
"**Catatan penting:** Peningkatan angka antara 2023 dan 2024 tidak selalu mencerminkan perubahan kondisi di lapangan. Sebagian besar peningkatan disebabkan oleh **perbaikan sistem pelaporan dan pendataan**. Contohnya, penurunan rata-rata skor biodiversitas dari 2,77 ke 2,34 justru menunjukkan bahwa lebih banyak unit melaporkan data (termasuk unit dengan skor rendah yang sebelumnya tidak terdata)."

"Di sisi lain, peningkatan area konservasi dari ~21.000 ha ke ~100.000 ha didominasi oleh pendataan ulang area Pertamina Hulu Rokan (PHR) yang sebelumnya belum tercatat lengkap."

### 6. Improvement Highlight

List 3 poin dengan icon checkmark:
1. "Format pelaporan 2024 memisahkan area offsite dan overlap — granularitas data meningkat"
2. "Jumlah unit yang melaporkan data naik 38% — coverage lebih luas"
3. "SH C&T dan SH IML mulai melaporkan data area konservasi — sebelumnya nihil"

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/YearOverYearSection.tsx` | `YearOverYearSection` |
| `src/components/charts/SlopeChart.tsx` | `SlopeChart` |

## Chart Specs

### SlopeChart
- Props: `data: { name: string; value2023: number; value2024: number; color: string }[]`
- Custom SVG atau Recharts LineChart
- Responsive width, fixed height ~300px
- Hover: highlight satu line, fade lainnya
- Axis labels: "2023" dan "2024"

## Animasi
- Lines draw dari kiri ke kanan (SVG stroke-dasharray animation)
- Change cards: counter animation + arrow slide
