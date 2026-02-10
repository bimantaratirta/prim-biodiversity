# 01 — Layout & Navigation

## Deskripsi
Buat root layout dengan Navbar (sticky, transparent on hero), Footer, dan ScrollProgress indicator. Navbar memiliki link ke anchor sections di main page dan ke 4 detail pages Sub-Holding.

## Data yang Digunakan
- `constants.ts` — SH metadata (nama, warna, slug)

## Layout

### Navbar (`src/components/layout/Navbar.tsx`)

**Struktur:**
- Logo Pertamina (teks "Biodiversity Dashboard") di kiri
- Menu links di tengah/kanan:
  - "Overview" → scroll ke `#overview`
  - "Area Konservasi" → scroll ke `#area-konservasi`
  - "Biodiversity Index" → scroll ke `#biodiversity-index`
  - "Species" → scroll ke `#species`
  - Dropdown "Sub-Holding" → 4 links ke `/sh-upstream`, `/sh-downstream`, `/sh-pnre`, `/sh-gas`
- Mobile: hamburger menu

**Behavior:**
- Sticky top, z-50
- Background transparan saat di hero (scroll Y < 100), lalu `bg-white/95 backdrop-blur` setelahnya
- Active section highlight berdasarkan scroll position (gunakan IntersectionObserver)
- Transition smooth pada background change

**Styling:**
- Font weight: medium untuk links, bold untuk logo
- Text color: putih saat di hero, `text-gray-800` setelahnya
- Hover: underline offset-4

### Footer (`src/components/layout/Footer.tsx`)

**Struktur:**
- 3 kolom:
  1. "Biodiversity Dashboard" + deskripsi singkat
  2. "Navigasi" — links ke semua sections
  3. "Sub-Holding" — links ke detail pages
- Bottom bar: "Data: Kertas Kerja Environmental 2023 & 2024" + "© 2024 Pertamina"

**Styling:**
- Background: `bg-pertamina-dark` (dark navy)
- Text: white/gray-400

### ScrollProgress (`src/components/layout/ScrollProgress.tsx`)

- Bar tipis (3px) di paling atas viewport, fixed
- Warna: gradient dari `#00539C` ke `#2E8540`
- Width = scroll percentage (0-100%)
- z-index di atas navbar

### Root Layout Update (`src/app/layout.tsx`)

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## Komponen

| File | Export |
|------|--------|
| `src/components/layout/Navbar.tsx` | `Navbar` |
| `src/components/layout/Footer.tsx` | `Footer` |
| `src/components/layout/ScrollProgress.tsx` | `ScrollProgress` |

## Catatan
- Gunakan `"use client"` untuk Navbar dan ScrollProgress (butuh scroll events)
- Mobile menu: gunakan state toggle, animated slide-down
- Navbar links menggunakan smooth scroll (`document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`)
- Detail page links menggunakan Next.js `<Link>`
