# 07 — Species Highlight Section

## Deskripsi
Highlight spesies flagship, distribusi status IUCN, dan data fauna yang dibebasliarkan. Section ini bersifat edukatif dan visual.

## Data yang Digunakan
Dari `biodiversity_clean.csv`:
- `fauna_names` — parsing nama species + status IUCN
- `fauna_released_count` — jumlah dibebasliarkan
- `flora_names` — parsing nama species + status IUCN

Dari `summary.json`:
- `by_year[year].fauna.total_released`
- `by_year[year].fauna.unique_species_approx`

## Layout

### Section Container
- id: `species`
- Background: putih

### 1. Section Header
- **Judul:** "Spesies yang Dilindungi"
- **Subtitle:** "Fauna dan flora yang dikonservasi di wilayah operasi Pertamina"

### 2. Narasi
`NarrativeBlock`:
"Pertamina mengidentifikasi dan melindungi berbagai spesies yang masuk dalam IUCN Red List di area operasinya. Program konservasi mencakup identifikasi spesies, perlindungan habitat, dan pelepasliaran fauna ke habitat aslinya."

### 3. Flagship Species Cards (horizontal scroll di mobile)

Tampilkan 6 spesies flagship dalam cards besar:
- Setiap card memiliki:
  - **Nama umum** — bold (e.g., "Gajah Sumatera")
  - **Nama Latin** — italic (e.g., *Elephas maximus sumatranus*)
  - **IUCN Badge** — menggunakan `IUCNBadge` component (e.g., "CR" merah)
  - **Ditemukan di** — nama unit/region (e.g., "Region 1, PHR")
  - **Icon/emoji** — representasi visual sederhana

Spesies flagship (dipilih manual berdasarkan data):
1. Gajah Sumatera (*Elephas maximus sumatranus*) — CR
2. Harimau Sumatera (*Panthera tigris sumatrae*) — EN
3. Tuntong Laut (*Batagur borneoensis*) — CR
4. Elang Jawa (*Nisaetus bartelsi*) — EN
5. Owa Ungko (*Hylobates agilis*) — EN
6. Orangutan Kalimantan (*Pongo pygmaeus*) — CR

### 4. IUCN Distribution Bar

Horizontal stacked bar menampilkan distribusi status IUCN dari semua spesies yang teridentifikasi:

| Status | Label | Warna | Keterangan |
|--------|-------|-------|------------|
| CR | Critically Endangered | `#CC3333` | Kritis |
| EN | Endangered | `#E06919` | Terancam |
| VU | Vulnerable | `#F0C400` | Rentan |
| NT | Near Threatened | `#5B9BD5` | Hampir Terancam |
| LC | Least Concern | `#60B236` | Risiko Rendah |
| DD | Data Deficient | `#999999` | Data Kurang |

Bar menunjukkan proporsi relatif. Di bawah bar, legend dengan keterangan Bahasa Indonesia.

*Catatan: Data IUCN dihitung dari parsing `fauna_names` dan `flora_names` di `biodiversity_clean.csv`. Lakukan counting per status (CR, EN, VU, NT, LC, DD) dari semua records.*

### 5. Fauna Released Stats

Dua kolom:

**Kolom Kiri — Stat besar:**
- "13.939 Individu" (2024) — animated counter
- "fauna dibebasliarkan ke habitat aslinya"
- Perbandingan: "Meningkat dari 3.169 di tahun 2023"

**Kolom Kanan — Top species released (bar chart):**
- Top 5 spesies dengan jumlah rilis terbanyak
- Mini horizontal bars
- Data diextract dari `fauna_released_count` field, grouped by species name

### 6. Flora Note
Kartu kecil di bawah:
"Program konservasi flora meliputi penanaman dan pemeliharaan berbagai spesies, termasuk spesies langka seperti **Gaharu** (*Aquilaria malaccensis* — CR), **Padma Raksasa** (*Rafflesia arnoldii*), dan **Meranti Merah** (*Shorea johorensis* — CR)."

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/SpeciesHighlightSection.tsx` | `SpeciesHighlightSection` |
| `src/components/ui/SpeciesCard.tsx` | `SpeciesCard` |
| `src/components/ui/IUCNBadge.tsx` | `IUCNBadge` |
| `src/components/charts/IUCNDistributionBar.tsx` | `IUCNDistributionBar` |

## Animasi
- Species cards: horizontal scroll with snap di mobile, grid di desktop
- IUCN bar: segments grow dari kiri saat visible
- Counter: animated count-up
