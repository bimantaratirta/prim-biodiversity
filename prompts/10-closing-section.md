# 10 — Closing Section

## Deskripsi
Penutup narratif dashboard dengan ringkasan, call-to-action, dan navigasi ke detail pages.

## Layout

### Section Container
- Background: gradient dari `pertamina-dark` ke `#0A0A23`
- Teks putih
- Padding besar (py-24)

### 1. Closing Narrative

**Judul:** "Langkah Selanjutnya"

**Paragraf 1:**
"Dashboard ini merupakan langkah awal dalam memvisualisasikan komitmen Pertamina terhadap keanekaragaman hayati. Data 2023 dan 2024 menunjukkan fondasi yang kuat — dengan 193 unit operasi yang terpantau, lebih dari 100.000 hektar area konservasi yang teridentifikasi, dan ribuan fauna yang dibebasliarkan ke habitat aslinya."

**Paragraf 2:**
"Untuk tahun 2025 dan seterusnya, fokus akan diarahkan pada peningkatan standarisasi pelaporan, perluasan cakupan data di SH Gas dan SH Downstream, serta pengembangan metrik biodiversitas yang lebih komprehensif."

### 2. SH Navigation Cards

4 cards besar untuk navigasi ke detail pages:

| Card | Warna | Link |
|------|-------|------|
| SH Upstream | `#00539C` | `/sh-upstream` |
| SH Downstream | `#E31937` | `/sh-downstream` |
| SH PNRE | `#2E8540` | `/sh-pnre` |
| SH Gas | `#F5A623` | `/sh-gas` |

Setiap card:
- Nama SH
- 1 metrik headline (e.g., "49 Unit Operasi")
- "Lihat Detail →" link
- Hover: scale up sedikit + shadow

### 3. Data Source Attribution

Teks kecil di bawah:
"Sumber data: Kertas Kerja Environmental 2023 & 2024, Pertamina Group.
Dashboard dibuat untuk keperluan internal monitoring dan pelaporan biodiversitas."

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/ClosingSection.tsx` | `ClosingSection` |

## Animasi
- Fade-in-up untuk narasi
- Cards: stagger entry dari bawah
