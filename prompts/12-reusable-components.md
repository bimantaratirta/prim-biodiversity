# 12 — Reusable Components

## Deskripsi
Komponen UI reusable yang digunakan di seluruh dashboard. Semua komponen berada di `src/components/ui/`.

---

## 1. StatCard

**File:** `src/components/ui/StatCard.tsx`

Kartu statistik dengan angka besar, label, dan opsional icon + perubahan YoY.

```typescript
interface StatCardProps {
  value: number | string | null;
  label: string;
  icon?: React.ReactNode;
  format?: "number" | "decimal" | "percentage" | "area";
  suffix?: string;
  previousValue?: number | null;  // untuk YoY comparison
  animate?: boolean;
  className?: string;
}
```

**Visual:**
- Card background putih, rounded-2xl, shadow-sm
- Angka: text-3xl font-bold
- Label: text-sm text-gray-500
- Icon: pojok kanan atas, opacity 30%, ukuran besar (32px)
- YoY badge: jika `previousValue` disediakan, tampilkan badge "+12%" hijau atau "-5%" merah
- Null value: tampilkan "—" abu-abu

**Format angka:**
- `number`: titik ribuan (e.g., "13.939")
- `decimal`: satu desimal + koma (e.g., "2,34")
- `percentage`: satu desimal + "%" (e.g., "42,0%")
- `area`: titik ribuan + " ha" (e.g., "91.365 ha")

---

## 2. NarrativeBlock

**File:** `src/components/ui/NarrativeBlock.tsx`

Blok teks naratif dengan styling konsisten untuk storytelling.

```typescript
interface NarrativeBlockProps {
  children: React.ReactNode;
  variant?: "default" | "callout" | "insight" | "warning";
  className?: string;
}
```

**Variants:**
- `default`: paragraf standar, max-w-3xl, text-gray-600, leading-relaxed
- `callout`: left border (4px) biru, background `bg-blue-50`, padding
- `insight`: left border hijau, background `bg-green-50`, icon lightbulb
- `warning`: left border oranye, background `bg-amber-50`, icon alert

**Styling:**
- Semua variant: rounded-lg, padding 4-6
- Bold text dalam children: `font-semibold text-gray-900`
- Links dalam children: underline, warna biru

---

## 3. IUCNBadge

**File:** `src/components/ui/IUCNBadge.tsx`

Badge kecil menampilkan status IUCN dengan warna yang sesuai.

```typescript
interface IUCNBadgeProps {
  status: "CR" | "EN" | "VU" | "NT" | "LC" | "DD" | "NE" | "EX";
  showLabel?: boolean;  // jika true, tampilkan "Critically Endangered" di samping
  size?: "sm" | "md";
}
```

**Visual:**
- Pill-shaped badge (rounded-full)
- Background: warna IUCN sesuai status
- Text: putih, bold, uppercase
- Size sm: text-xs px-1.5 py-0.5
- Size md: text-sm px-2 py-1
- Hover tooltip: label lengkap (e.g., "Critically Endangered")

**Warna:**
- CR: `#CC3333`, EN: `#E06919`, VU: `#F0C400` (text dark), NT: `#5B9BD5`, LC: `#60B236`, DD: `#999999`, NE: `#CCCCCC` (text dark), EX: `#000000`

---

## 4. YearToggle

**File:** `src/components/ui/YearToggle.tsx`

Toggle switch untuk memilih tahun data.

```typescript
interface YearToggleProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}
```

**Visual:**
- Pill group (seperti segmented control)
- Background: `bg-gray-100`, rounded-full
- Active pill: `bg-white`, shadow, `text-gray-900`, font-semibold
- Inactive pill: `text-gray-500`
- Transition: smooth slide untuk active indicator

---

## 5. DataTable

**File:** `src/components/ui/DataTable.tsx`

Tabel data reusable dengan sorting, inline bars, dan format angka.

```typescript
interface Column {
  key: string;
  label: string;
  format?: "number" | "decimal" | "text" | "badge";
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  emptyMessage?: string;
  showInlineBars?: boolean;
  barColorField?: string;  // field name for bar color
}
```

**Visual:**
- Rounded-xl, overflow hidden
- Header: `bg-gray-50`, text-sm uppercase, font-medium
- Rows: alternating `bg-white` / `bg-gray-50/50`
- Hover row: `bg-blue-50/50`
- Inline bars: absolute positioned div, SH color at 15% opacity
- Null values: "—" italic gray
- Sort indicator: chevron up/down di header

**Badge format:**
- "yes" → green badge
- "no" → gray badge
- null → "—"

**Responsive:**
- Desktop: full table
- Mobile: first column sticky, horizontal scroll
- Minimum width per column configurable

---

## 6. SpeciesCard

**File:** `src/components/ui/SpeciesCard.tsx`

Card untuk menampilkan satu spesies.

```typescript
interface SpeciesCardProps {
  commonName: string;
  latinName: string;
  iucnStatus: string;
  locations?: string[];
  releasedCount?: number;
  variant?: "full" | "compact";
}
```

**Visual (full):**
- Card putih, rounded-xl, p-4
- Nama umum: text-lg font-semibold
- Nama Latin: text-sm italic text-gray-500
- IUCN badge: di kanan atas
- Locations: text-xs, comma-separated, max 2 lines
- Released count: jika ada, badge "XX dibebasliarkan"

**Visual (compact):**
- Inline row, tanpa card wrapper
- Nama umum + Latin + IUCN badge inline
- Untuk digunakan di list/tabel

---

## 7. SectionWrapper

**File:** `src/components/ui/SectionWrapper.tsx`

Wrapper untuk setiap section yang handles intersection observer dan fade-in animation.

```typescript
interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "dark";
}
```

**Behavior:**
- Wraps content dalam `<section>` dengan id
- Applies `section-container` class
- Uses `react-intersection-observer` untuk detect visibility
- Framer Motion: fade-in-up animation on first visible
- Background variants: white (`bg-white`), gray (`bg-gray-50`), dark (`bg-pertamina-dark text-white`)
