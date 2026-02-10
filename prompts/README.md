# Dashboard Prompts — Biodiversity Pertamina

Setiap file `.md` di folder ini adalah spec lengkap untuk membangun 1 bagian dashboard biodiversity Pertamina. Jalankan prompt secara berurutan sesuai execution order.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts + custom SVG (waffle chart) |
| Animation | Framer Motion |
| Scroll detection | react-intersection-observer |
| Icons | Lucide React |
| Font | Inter (next/font) |
| Data | Pre-processed JSON + CSV (`formatted/`) |

## Warna

### Sub-Holding
- SH Upstream: `#00539C` (biru)
- SH Downstream: `#E31937` (merah Pertamina)
- SH PNRE: `#2E8540` (hijau)
- SH Gas: `#F5A623` (amber)

### Biodiversity Category
- Rendah: `#E06919` (oranye)
- Sedang: `#F5A623` (amber)
- Tinggi: `#006837` (hijau tua)

### IUCN Status
- CR: `#CC3333`, EN: `#E06919`, VU: `#F0C400`, NT: `#5B9BD5`, LC: `#60B236`, DD: `#999999`

## Execution Order

| Urutan | File | Deskripsi |
|--------|------|-----------|
| 1 | `00-project-setup.md` | Init Next.js, install deps, Tailwind config, folder structure |
| 2 | `13-data-layer.md` | TypeScript types, data imports, constants, utility functions |
| 3 | `12-reusable-components.md` | StatCard, NarrativeBlock, IUCNBadge, YearToggle, DataTable, SpeciesCard |
| 4 | `01-layout-navigation.md` | Root layout, Navbar, Footer, ScrollProgress |
| 5 | `02-hero-section.md` | Hero banner + 4 headline stat cards |
| 6 | `03-overview-section.md` | Konteks biodiversity + infographic 4 SH |
| 7 | `04-area-konservasi-section.md` | Luasan area per SH: horizontal bar + stacked bar |
| 8 | `05-location-proximity-section.md` | Adjacent/overlapped analysis |
| 9 | `06-biodiversity-index-section.md` | Kategori donut + small multiples per SH |
| 10 | `07-species-highlight-section.md` | Flagship species + IUCN distribution |
| 11 | `08-subholding-comparison-section.md` | Summary table with inline bars |
| 12 | `09-year-over-year-section.md` | Trend 2023-2024 + slope chart |
| 13 | `10-closing-section.md` | Penutup narratif |
| 14 | `11-detail-page-subholding.md` | Dynamic route /[subholding] |

## Data Files

| File | Deskripsi |
|------|-----------|
| `formatted/biodiversity_clean.csv` | Data bersih per wilayah kerja (193 records) |
| `formatted/summary.json` | Pre-aggregated metrics per SH per tahun |
| `formatted/template_input.csv` | Template kosong untuk data tahun berikutnya |
