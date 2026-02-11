import type {
  SummaryData,
  BiodiversityRecord,
  BiodiversityCategory,
  SubHolding,
} from "./types";

import summaryData from "./summary.json";
import cleanData from "./biodiversity_clean.json";

export const summary: SummaryData = summaryData as unknown as SummaryData;
export const records: BiodiversityRecord[] =
  cleanData as unknown as BiodiversityRecord[];

export function getRecords(
  sh?: SubHolding,
  year?: number
): BiodiversityRecord[] {
  return records.filter((r) => {
    if (sh && r.sub_holding !== sh) return false;
    if (year && r.tahun !== year) return false;
    return true;
  });
}

export function getSHMetrics(sh: SubHolding, year: number) {
  return summary.by_subholding?.[sh]?.[String(year)] ?? null;
}

export function getYearMetrics(year: number) {
  return summary.by_year?.[String(year)] ?? null;
}

// --- Unique-unit helpers ---
// Groups records by unit_operasi and aggregates per-unit metrics.
// Same-named unit_operasi within an SH/year counts as 1 unit.

export interface UnitRecord {
  unit_operasi: string;
  sub_holding: SubHolding;
  tahun: number;
  wilayah_kerja: string[];
  luasan_total_ha: number | null;
  luasan_offsite_ha: number | null;
  luasan_overlap_ha: number | null;
  location_adjacent: "yes" | "no" | null;
  location_overlapped: "yes" | "no" | null;
  biodiversity_score: number | null;
  biodiversity_category: BiodiversityCategory | null;
  fauna_released_count: number | null;
  has_data: boolean;
}

function classifyScore(score: number): BiodiversityCategory {
  if (score <= 2) return "Rendah";
  if (score <= 3) return "Sedang";
  return "Tinggi";
}

export function getUniqueUnits(
  sh?: SubHolding,
  year?: number
): UnitRecord[] {
  const filtered = getRecords(sh, year);
  const grouped = new Map<string, BiodiversityRecord[]>();

  for (const r of filtered) {
    const key = `${r.sub_holding}|${r.unit_operasi}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(r);
  }

  return Array.from(grouped.values()).map((recs) => {
    const first = recs[0];

    const totalAreas = recs
      .filter((r) => r.luasan_total_ha != null)
      .map((r) => r.luasan_total_ha!);
    const offsiteAreas = recs
      .filter((r) => r.luasan_offsite_ha != null)
      .map((r) => r.luasan_offsite_ha!);
    const overlapAreas = recs
      .filter((r) => r.luasan_overlap_ha != null)
      .map((r) => r.luasan_overlap_ha!);

    // Take the highest score (per user rule: ambil yang paling besar)
    const scores = recs
      .filter((r) => r.biodiversity_score != null)
      .map((r) => r.biodiversity_score!);
    const maxScore =
      scores.length > 0 ? Math.max(...scores) : null;

    const adjacent: "yes" | "no" | null = recs.some(
      (r) => r.location_adjacent === "yes"
    )
      ? "yes"
      : recs.some((r) => r.location_adjacent === "no")
        ? "no"
        : null;
    const overlapped: "yes" | "no" | null = recs.some(
      (r) => r.location_overlapped === "yes"
    )
      ? "yes"
      : recs.some((r) => r.location_overlapped === "no")
        ? "no"
        : null;

    const faunaCounts = recs
      .filter((r) => r.fauna_released_count != null)
      .map((r) => r.fauna_released_count!);

    const hasData = recs.some(
      (r) =>
        r.luasan_total_ha != null ||
        r.location_adjacent != null ||
        r.biodiversity_score != null ||
        r.biodiversity_category != null ||
        r.fauna_names != null ||
        r.flora_names != null
    );

    return {
      unit_operasi: first.unit_operasi,
      sub_holding: first.sub_holding,
      tahun: first.tahun,
      wilayah_kerja: recs
        .map((r) => r.wilayah_kerja)
        .filter(Boolean) as string[],
      luasan_total_ha:
        totalAreas.length > 0
          ? totalAreas.reduce((a, b) => a + b, 0)
          : null,
      luasan_offsite_ha:
        offsiteAreas.length > 0
          ? offsiteAreas.reduce((a, b) => a + b, 0)
          : null,
      luasan_overlap_ha:
        overlapAreas.length > 0
          ? overlapAreas.reduce((a, b) => a + b, 0)
          : null,
      location_adjacent: adjacent,
      location_overlapped: overlapped,
      biodiversity_score: maxScore,
      biodiversity_category:
        maxScore !== null
          ? classifyScore(maxScore)
          : recs.find((r) => r.biodiversity_category != null)
              ?.biodiversity_category ?? null,
      fauna_released_count:
        faunaCounts.length > 0
          ? faunaCounts.reduce((a, b) => a + b, 0)
          : null,
      has_data: hasData,
    };
  });
}
