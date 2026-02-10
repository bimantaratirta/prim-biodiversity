# 06 — Biodiversity Index Section

## Deskripsi
Visualisasi distribusi kategori biodiversity (Rendah/Sedang/Tinggi) menggunakan donut chart dan small multiples per SH. Perbandingan antar tahun.

## Data yang Digunakan
Dari `summary.json`:
- `by_year[year].biodiversity.rendah/sedang/tinggi/null`
- `by_subholding[sh][year].biodiversity.*`
- `by_year[year].biodiversity.avg_score/min_score/max_score`

## Layout

### Section Container
- id: `biodiversity-index`
- Background: `bg-gray-50`

### 1. Section Header
- **Judul:** "Indeks Keanekaragaman Hayati"
- **Subtitle:** "Distribusi Shannon-Wiener Diversity Index (H') per kategori"

### 2. Narasi
`NarrativeBlock`:
"Indeks keanekaragaman hayati dihitung menggunakan Shannon-Wiener Diversity Index (H'), yang mengukur keberagaman spesies di suatu area. Skor diklasifikasikan menjadi tiga kategori:
- **Rendah** (H' ≤ 2): Keberagaman rendah, didominasi sedikit spesies
- **Sedang** (2 < H' ≤ 3): Keberagaman moderat
- **Tinggi** (H' > 3): Keberagaman tinggi, ekosistem sehat"

### 3. Year Toggle

### 4. Overview Row (3 stat cards)

| Card | 2023 | 2024 |
|------|------|------|
| Rata-rata Skor | 2,765 | 2,340 |
| Skor Tertinggi | 4,131 | 4,150 |
| Unit dengan Data | 36 | 50 |

### 5. Main Visualization (2 kolom)

#### Kolom Kiri — Donut Chart (Overall)
- **Tipe:** Donut/Pie chart (Recharts `<PieChart>`)
- **Segmen:** Rendah, Sedang, Tinggi (+ "Belum ada data" di luar donut sebagai note)
- **Warna:**
  - Rendah: `#E06919`
  - Sedang: `#F5A623`
  - Tinggi: `#006837`
- **Center text:** rata-rata skor (e.g., "2,34")
- **Label di luar:** jumlah + persentase per kategori
- **Legend** di bawah donut

Data 2024:
| Kategori | Jumlah | % (dari yang punya data) |
|----------|--------|--------------------------|
| Rendah | 17 | 34% |
| Sedang | 12 | 24% |
| Tinggi | 21 | 42% |

#### Kolom Kanan — Small Multiples (Mini donuts per SH)
- 4 mini donut charts, satu per SH
- Setiap donut: header nama SH (warna SH), mini pie chart, avg score di center
- Grid 2x2

### 6. Insight
"Secara keseluruhan, **42%** unit operasi yang memiliki data menunjukkan indeks biodiversitas **Tinggi** di 2024. SH Upstream memiliki variasi terbesar (skor 0 hingga 4,15), mencerminkan keragaman lokasi operasi dari hutan tropis dataran rendah hingga ekosistem pesisir."

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/BiodiversityIndexSection.tsx` | `BiodiversityIndexSection` |
| `src/components/charts/DonutChart.tsx` | `DonutChart` |

## Chart Specs

### DonutChart
- Props: `data: { name: string; value: number; color: string }[]`, `centerLabel?: string`, `size?: "sm" | "md" | "lg"`
- Recharts: `<PieChart>` dengan `<Pie innerRadius outerRadius>`
- Custom label component di luar pie
- Center text menggunakan custom SVG `<text>` di tengah
- Responsive sizes: sm (120px), md (200px), lg (280px)
- Hover: segmen expand sedikit + tooltip

## Animasi
- Donut: segments animate dari 0 ke target angle saat visible
- Stat cards: counter animation
- Small multiples: stagger entry
