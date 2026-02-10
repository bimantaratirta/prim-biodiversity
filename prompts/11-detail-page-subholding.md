# 11 — Detail Page Sub-Holding

## Deskripsi
Dynamic route `/[subholding]` yang menampilkan data detail per Sub-Holding: header, stat cards, tabel data per unit operasi, charts khusus SH, dan species list.

## Data yang Digunakan
- `summary.json` → `by_subholding[sh][year]` — stats aggregat
- `biodiversity_clean.csv` (di-import sebagai JSON) — row-level data, difilter per SH

## Route

```
src/app/[subholding]/page.tsx
```

Slug mapping:
- `/sh-upstream` → "SH Upstream"
- `/sh-downstream` → "SH Downstream"
- `/sh-pnre` → "SH PNRE"
- `/sh-gas` → "SH Gas"

Gunakan `generateStaticParams()` untuk static export.

## Layout

### 1. Header Banner
- Background: warna SH (gradient ke gelap)
- **Breadcrumb:** "Dashboard / SH Upstream"
- **Judul:** nama SH lengkap (e.g., "Sub-Holding Upstream")
- **Subtitle:** asal merger jika ada (e.g., "Gabungan SH R&P, SH C&T, dan SH IML" untuk Downstream)
- **Back link:** "← Kembali ke Dashboard"

### 2. Year Toggle (sticky di bawah header)

### 3. Stat Cards Row (4-5 cards)

| Card | Nilai |
|------|-------|
| Total Unit Operasi | `total_units` |
| Area Konservasi | `area.total_ha` ha |
| Rata-rata Bio Score | `biodiversity.avg_score` |
| Fauna Released | `fauna.total_released` |
| Kategori Tinggi | `biodiversity.tinggi` unit |

### 4. Area Breakdown Chart
- Horizontal bar chart: per unit operasi (top 10 berdasarkan luasan)
- Warna: SH color
- Tooltip: nama unit, luasan, wilayah kerja

### 5. Biodiversity Distribution
- Mini donut: distribusi kategori untuk SH ini
- List unit per kategori

### 6. Data Table — Unit Operasi

Tabel lengkap semua unit operasi dalam SH ini:

| Kolom | Deskripsi |
|-------|-----------|
| Unit Operasi | Nama unit |
| Wilayah Kerja | Nama entitas |
| Area (ha) | Total / Offsite + Overlap |
| Adjacent | Yes/No badge |
| Overlapped | Yes/No badge |
| Bio Score | Angka + kategori badge |
| Fauna Released | Jumlah |

- Sortable by column (klik header)
- Rows yang kosong: italic abu-abu "Belum ada data"
- Mobile: horizontal scroll

### 7. Species List

**Fauna yang Diidentifikasi:**
- Grouped by IUCN status (CR first, lalu EN, VU, dst.)
- Setiap species: nama umum, nama Latin, IUCN badge, unit operasi lokasi
- Menggunakan `SpeciesCard` compact version

**Flora yang Diidentifikasi:**
- Format sama dengan fauna

*Data di-parse dari `fauna_names` dan `flora_names` fields di `biodiversity_clean.csv`, di-deduplicate per SH.*

### 8. Back to Dashboard
- Button "← Kembali ke Dashboard Utama"
- Links ke SH lain: "Lihat juga: [SH Downstream] [SH PNRE] [SH Gas]"

## Komponen

| File | Export |
|------|--------|
| `src/app/[subholding]/page.tsx` | default |

Menggunakan komponen reusable dari prompt 12:
- `StatCard`, `DataTable`, `DonutChart`, `HorizontalBar`, `SpeciesCard`, `IUCNBadge`, `YearToggle`, `NarrativeBlock`

## Static Generation

```typescript
export function generateStaticParams() {
  return [
    { subholding: "sh-upstream" },
    { subholding: "sh-downstream" },
    { subholding: "sh-pnre" },
    { subholding: "sh-gas" },
  ];
}
```

## Catatan
- Halaman ini harus berfungsi baik meskipun SH tersebut memiliki sedikit/tidak ada data (e.g., SH Gas 2024)
- Tampilkan empty state yang informatif: "Belum ada data biodiversitas yang dilaporkan untuk tahun ini"
- Pastikan page title dan meta description dinamis per SH
