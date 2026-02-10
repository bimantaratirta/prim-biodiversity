import type { SummaryData, BiodiversityRecord, SubHolding } from "./types";

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
