# 08 — Sub-Holding Comparison Section

## Deskripsi
Tabel ringkasan yang membandingkan semua metrik kunci antar 4 Sub-Holding, dengan inline bar visualizations di dalam sel tabel.

## Data yang Digunakan
Dari `summary.json` → `by_subholding[sh][year]`:
- Semua metrik aggregat per SH

## Layout

### Section Container
- id: `comparison`
- Background: `bg-gray-50`

### 1. Section Header
- **Judul:** "Perbandingan Sub-Holding"
- **Subtitle:** "Ringkasan metrik biodiversitas per Sub-Holding"

### 2. Year Toggle

### 3. Comparison Table

Tabel responsif (horizontal scroll di mobile) dengan struktur:

| Metrik | SH Upstream | SH Downstream | SH PNRE | SH Gas |
|--------|-------------|---------------|---------|--------|
| Total Unit | 49 | 28 | 7 | 20 |
| Unit dengan Data | 49 | 17 | 7 | 0 |
| Area Konservasi (ha) | 91.365 ▓▓▓▓▓▓▓▓▓ | 9.173 ▓▓ | 54 ▏ | — |
| Adjacent: Yes | 10 ▓▓▓ | 1 ▏ | 5 ▓▓ | 0 |
| Overlapped: Yes | 4 ▓ | 0 | 4 ▓ | 0 |
| Both Yes | 0 | 0 | 4 | 0 |
| Avg Bio Score | 2,17 | 3,13 | — | — |
| Kategori Tinggi | 14 ▓▓▓▓ | 7 ▓▓ | 0 | 0 |
| Fauna Released | 12.862 ▓▓▓▓▓▓▓ | 1.057 ▓ | 20 ▏ | 0 |

**Inline bars:**
- Setiap sel angka memiliki mini bar di belakangnya (CSS background)
- Lebar bar proporsional terhadap max value di row tersebut
- Warna bar: sesuai warna SH (opacity 20%)

**Header kolom:**
- Nama SH dengan color dot di sebelahnya
- Background header: warna SH (opacity 10%)

**Responsif:**
- Desktop: tabel penuh
- Mobile: first column sticky, horizontal scroll

### 4. Narasi Bawah
"SH Upstream memiliki cakupan data terluas dengan 49 unit operasi yang semuanya melaporkan data di 2024. SH Downstream menunjukkan peningkatan pelaporan signifikan dari 2023 ke 2024, terutama dari unit-unit MOR yang mulai melaporkan data luasan area. SH Gas masih memerlukan peningkatan pengumpulan data di 2024."

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/SubholdingComparisonSection.tsx` | `SubholdingComparisonSection` |
| `src/components/ui/DataTable.tsx` | `DataTable` — reusable table with inline bars |

## DataTable Specs

Props:
```typescript
interface DataTableProps {
  columns: {
    key: string;
    label: string;
    color?: string;
  }[];
  rows: {
    metric: string;
    values: Record<string, number | string | null>;
    format?: "number" | "decimal" | "percentage";
    showBar?: boolean;
  }[];
}
```

- Inline bars: absolute positioned `<div>` di belakang teks sel
- Nilai null/0: tampilkan "—" tanpa bar
- Format angka: Indonesian locale
- Hover row: background highlight

## Animasi
- Tabel fade-in saat visible
- Inline bars grow dari 0 saat visible (stagger per row)
