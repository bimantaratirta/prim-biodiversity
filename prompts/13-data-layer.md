# 13 — Data Layer

## Deskripsi
TypeScript types/interfaces, data imports, utility functions, dan constants. Ini adalah fondasi yang harus dibuat sebelum semua komponen lain.

---

## 1. TypeScript Types (`src/data/types.ts`)

```typescript
// Satu record bersih dari biodiversity_clean.csv
export interface BiodiversityRecord {
  tahun: number;
  sub_holding: SubHolding;
  sub_holding_original: SubHoldingOriginal;
  unit_operasi: string;
  wilayah_kerja: string | null;
  luasan_offsite_ha: number | null;
  luasan_overlap_ha: number | null;
  luasan_total_ha: number | null;
  location_adjacent: "yes" | "no" | null;
  location_overlapped: "yes" | "no" | null;
  biodiversity_score: number | null;
  biodiversity_category: BiodiversityCategory | null;
  fauna_names: string | null;
  fauna_released_count: number | null;
  flora_names: string | null;
}

export type SubHolding = "SH Upstream" | "SH Downstream" | "SH PNRE" | "SH Gas";
export type SubHoldingOriginal = "SH Upstream" | "SH R&P" | "SH C&T" | "SH PNRE" | "SH Gas" | "SH IML";
export type BiodiversityCategory = "Rendah" | "Sedang" | "Tinggi";
export type IUCNStatus = "CR" | "EN" | "VU" | "NT" | "LC" | "DD" | "NE" | "EX";

// Aggregated metrics per group
export interface AggregatedMetrics {
  total_units: number;
  units_with_data: number;
  area: {
    total_offsite_ha: number | null;
    total_overlap_ha: number | null;
    total_ha: number | null;
    units_with_area: number;
  };
  location: {
    adjacent_yes: number;
    adjacent_no: number;
    adjacent_null: number;
    overlapped_yes: number;
    overlapped_no: number;
    overlapped_null: number;
    both_yes: number;
  };
  biodiversity: {
    rendah: number;
    sedang: number;
    tinggi: number;
    null: number;
    avg_score: number | null;
    min_score: number | null;
    max_score: number | null;
    units_with_score: number;
  };
  fauna: {
    total_released: number;
    units_with_releases: number;
    unique_species_approx: number;
  };
}

// Summary JSON structure
export interface SummaryData {
  metadata: {
    total_records: number;
    years: number[];
    sub_holdings: SubHolding[];
    sub_holdings_original: SubHoldingOriginal[];
  };
  by_year: Record<string, AggregatedMetrics>;
  by_subholding: Record<SubHolding, Record<string, AggregatedMetrics>>;
  by_subholding_original: Record<SubHoldingOriginal, Record<string, AggregatedMetrics>>;
}

// SH metadata for display
export interface SubHoldingMeta {
  key: SubHolding;
  slug: string;
  label: string;
  labelFull: string;
  color: string;
  colorLight: string;
  mergedFrom?: SubHoldingOriginal[];
  sampleUnits: string[];
}

// Parsed species
export interface ParsedSpecies {
  commonName: string;
  latinName: string | null;
  iucnStatus: IUCNStatus | null;
  source: "fauna" | "flora";
  unitOperasi: string;
  subHolding: SubHolding;
}
```

---

## 2. Constants (`src/lib/constants.ts`)

```typescript
import { SubHoldingMeta, BiodiversityCategory, IUCNStatus } from "@/data/types";

// Sub-Holding metadata
export const SUB_HOLDINGS: SubHoldingMeta[] = [
  {
    key: "SH Upstream",
    slug: "sh-upstream",
    label: "SH Upstream",
    labelFull: "Sub-Holding Upstream",
    color: "#00539C",
    colorLight: "#00539C20",
    sampleUnits: ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"],
  },
  {
    key: "SH Downstream",
    slug: "sh-downstream",
    label: "SH Downstream",
    labelFull: "Sub-Holding Downstream",
    color: "#E31937",
    colorLight: "#E3193720",
    mergedFrom: ["SH R&P", "SH C&T", "SH IML"],
    sampleUnits: ["RU II Dumai", "RU III", "MOR I", "PT PIS"],
  },
  {
    key: "SH PNRE",
    slug: "sh-pnre",
    label: "SH PNRE",
    labelFull: "Sub-Holding Pertamina New & Renewable Energy",
    color: "#2E8540",
    colorLight: "#2E854020",
    sampleUnits: ["PGE Area Kamojang", "PGE Area Ulubelu", "PGE Area Lahendong"],
  },
  {
    key: "SH Gas",
    slug: "sh-gas",
    label: "SH Gas",
    labelFull: "Sub-Holding Gas",
    color: "#F5A623",
    colorLight: "#F5A62320",
    sampleUnits: ["PGN", "Perta Arun Gas", "SAKA Indonesia Pangkah Limited"],
  },
];

// SH color map (quick lookup)
export const SH_COLORS: Record<string, string> = {
  "SH Upstream": "#00539C",
  "SH Downstream": "#E31937",
  "SH PNRE": "#2E8540",
  "SH Gas": "#F5A623",
};

// Biodiversity category colors
export const BIO_CATEGORY_COLORS: Record<BiodiversityCategory, string> = {
  Rendah: "#E06919",
  Sedang: "#F5A623",
  Tinggi: "#006837",
};

// IUCN colors and labels
export const IUCN_CONFIG: Record<IUCNStatus, { color: string; label: string; labelId: string }> = {
  CR: { color: "#CC3333", label: "Critically Endangered", labelId: "Kritis" },
  EN: { color: "#E06919", label: "Endangered", labelId: "Terancam" },
  VU: { color: "#F0C400", label: "Vulnerable", labelId: "Rentan" },
  NT: { color: "#5B9BD5", label: "Near Threatened", labelId: "Hampir Terancam" },
  LC: { color: "#60B236", label: "Least Concern", labelId: "Risiko Rendah" },
  DD: { color: "#999999", label: "Data Deficient", labelId: "Data Kurang" },
  NE: { color: "#CCCCCC", label: "Not Evaluated", labelId: "Belum Dievaluasi" },
  EX: { color: "#000000", label: "Extinct", labelId: "Punah" },
};

// Slug to SH key mapping
export const SLUG_TO_SH: Record<string, string> = {
  "sh-upstream": "SH Upstream",
  "sh-downstream": "SH Downstream",
  "sh-pnre": "SH PNRE",
  "sh-gas": "SH Gas",
};

// Available years
export const YEARS = [2023, 2024] as const;
```

---

## 3. Data Index (`src/data/index.ts`)

```typescript
import summaryData from "./summary.json";
import cleanData from "./biodiversity_clean.json";
import type { SummaryData, BiodiversityRecord, SubHolding } from "./types";

// Type the imported JSON
export const summary: SummaryData = summaryData as SummaryData;
export const records: BiodiversityRecord[] = cleanData as BiodiversityRecord[];

// Helper: filter records by SH and year
export function getRecords(sh?: SubHolding, year?: number): BiodiversityRecord[] {
  return records.filter((r) => {
    if (sh && r.sub_holding !== sh) return false;
    if (year && r.tahun !== year) return false;
    return true;
  });
}

// Helper: get SH metrics for a year
export function getSHMetrics(sh: SubHolding, year: number) {
  return summary.by_subholding[sh]?.[String(year)] ?? null;
}

// Helper: get year metrics
export function getYearMetrics(year: number) {
  return summary.by_year[String(year)] ?? null;
}
```

**Catatan:** `biodiversity_clean.csv` perlu dikonversi ke JSON agar bisa di-import langsung. Tambahkan step di Python script untuk generate `biodiversity_clean.json`, atau buat script konversi terpisah. Alternatif: parse CSV di client-side, tapi JSON import lebih performant.

---

## 4. Utility Functions (`src/lib/utils.ts`)

```typescript
// Format angka Indonesia: 9747.28 -> "9.747,28"
export function formatNumber(value: number | null, decimals = 0): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Format area: 91365.51 -> "91.365,51 ha"
export function formatArea(value: number | null): string {
  if (value === null) return "—";
  return `${formatNumber(value, 2)} ha`;
}

// Format percentage change: (100, 50) -> "+100%"
export function formatChange(current: number | null, previous: number | null): string {
  if (current === null || previous === null || previous === 0) return "—";
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${formatNumber(change, 1)}%`;
}

// Classify change direction
export function changeDirection(current: number | null, previous: number | null): "up" | "down" | "neutral" {
  if (current === null || previous === null) return "neutral";
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
}

// Parse species name + IUCN from raw text line
// e.g., "1. Gajah Sumatera (Elephas maximus sumatranus) - CR"
export function parseSpeciesLine(line: string): { commonName: string; latinName: string | null; iucnStatus: string | null } | null {
  // Remove numbering
  const cleaned = line.replace(/^\d+\.\s*/, "").replace(/^[a-z]\.\s*/i, "").trim();
  if (!cleaned || cleaned === "-" || cleaned === "Tidak ada") return null;

  // Try to extract (Latin name) and - STATUS
  const match = cleaned.match(/^(.+?)\s*(?:\(([^)]+)\))?\s*[-–—]\s*(CR|EN|VU|NT|LC|DD|NE|EX|DL)\s*$/i);
  if (match) {
    return {
      commonName: match[1].trim(),
      latinName: match[2]?.trim() || null,
      iucnStatus: match[3].toUpperCase(),
    };
  }

  // Simpler: just name - STATUS
  const simpleMatch = cleaned.match(/^(.+?)\s*[-–—]\s*(CR|EN|VU|NT|LC|DD|NE|EX|DL)\s*$/i);
  if (simpleMatch) {
    return {
      commonName: simpleMatch[1].trim(),
      latinName: null,
      iucnStatus: simpleMatch[2].toUpperCase(),
    };
  }

  // Just name, no status
  return {
    commonName: cleaned,
    latinName: null,
    iucnStatus: null,
  };
}
```

---

## 5. Hooks

### `src/lib/hooks/useAnimatedValue.ts`

```typescript
// Custom hook: animate number from 0 to target
// Returns current value (animated)
// Triggers when element becomes visible
export function useAnimatedValue(target: number, duration = 1500): number;
```

Implementation:
- Uses `useRef` for requestAnimationFrame
- Uses `react-intersection-observer` for trigger
- Easing: ease-out cubic
- Returns `Math.round(current)` for integers, or with decimals for floats

### `src/lib/hooks/useScrollSection.ts`

```typescript
// Track which section is currently in viewport
// Returns active section id
export function useScrollSection(sectionIds: string[]): string | null;
```

Implementation:
- Creates IntersectionObserver for each section
- threshold: 0.3 (30% visible)
- Returns the id of the section most visible

---

## 6. Data Preparation

Tambahkan ke Python script atau buat script baru untuk generate `biodiversity_clean.json`:

```python
import csv
import json

with open("formatted/biodiversity_clean.csv") as f:
    reader = csv.DictReader(f)
    data = []
    for row in reader:
        record = {}
        for key, value in row.items():
            if value == "":
                record[key] = None
            elif key in ("tahun", "fauna_released_count"):
                record[key] = int(value) if value else None
            elif key in ("luasan_offsite_ha", "luasan_overlap_ha", "luasan_total_ha", "biodiversity_score"):
                record[key] = float(value) if value else None
            else:
                record[key] = value
        data.append(record)

with open("dashboard/src/data/biodiversity_clean.json", "w") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```
