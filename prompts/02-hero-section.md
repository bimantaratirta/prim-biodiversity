# 02 — Hero Section

## Deskripsi
Hero banner full-viewport dengan background visual, judul besar, dan 4 headline stat cards yang menampilkan angka-angka utama dengan animated counters.

## Data yang Digunakan
Dari `summary.json` → `by_year["2024"]`:
- `area.total_ha` — Total luasan area konservasi
- `total_units` — Total unit operasi
- `fauna.total_released` — Total fauna dibebasliarkan
- `biodiversity.units_with_score` — Unit dengan data biodiversity index

## Layout

### Hero Container
- Full viewport height (`min-h-screen`)
- Background: gradient overlay gelap (`from-pertamina-dark/90 to-pertamina-dark/60`) di atas pattern/gambar
- Centered content vertically

### Content Stack
1. **Badge** — "Data 2023 & 2024" dalam pill/badge kecil
2. **Title** — "Keanekaragaman Hayati" (h1, text-5xl/6xl, white, font-bold)
3. **Subtitle** — "Pertamina Group" (text-2xl, white/80)
4. **Description** — 1-2 kalimat: "Monitoring dan konservasi biodiversitas di seluruh unit operasi Pertamina, dari hulu hingga hilir." (text-lg, white/60)
5. **Stat Cards Row** — 4 cards horizontal (responsive: 2x2 di mobile)

### Stat Cards
Setiap card menampilkan:
- **Angka besar** — animated counter (0 → target, duration 1.5s)
- **Label** — deskripsi singkat
- **Icon** — dari Lucide React

| Card | Angka | Label | Icon |
|------|-------|-------|------|
| 1 | `100.593` | Hektar Area Konservasi | `TreePine` |
| 2 | `193` | Unit Operasi Terpantau | `Building2` |
| 3 | `13.939` | Fauna Dibebasliarkan | `Bird` |
| 4 | `50` | Unit dengan Biodiversity Index | `BarChart3` |

**Styling cards:**
- Background: `white/10` dengan `backdrop-blur`
- Border: `white/20`
- Angka: `text-3xl font-bold text-white`
- Label: `text-sm text-white/70`
- Icon: warna accent tiap card berbeda (biru, merah, hijau, amber — sesuai SH colors)

### Scroll Indicator
- Chevron down icon di bottom, animated bounce
- Klik → scroll ke `#overview`

## Komponen

| File | Export |
|------|--------|
| `src/components/sections/HeroSection.tsx` | `HeroSection` |

## Animasi
- Stat cards: stagger animation (tiap card muncul 0.1s setelah sebelumnya) menggunakan Framer Motion
- Counter: gunakan custom hook `useAnimatedValue(target, duration)` yang count dari 0 ke target
- Parallax ringan pada background saat scroll (opsional)

## Hook yang Dibutuhkan
- `useAnimatedValue(target: number, duration?: number)` — dari `src/lib/hooks/useAnimatedValue.ts`
  - Menggunakan `requestAnimationFrame`
  - Trigger saat elemen visible (IntersectionObserver)
  - Return current animated value
