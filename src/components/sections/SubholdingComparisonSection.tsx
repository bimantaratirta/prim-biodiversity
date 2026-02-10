"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import YearToggle from "@/components/ui/YearToggle";
import { SUB_HOLDINGS, YEARS } from "@/lib/constants";
import { summary } from "@/data";
import { formatNumber } from "@/lib/utils";

interface MetricRow {
  metric: string;
  getValue: (sh: string, year: string) => number | null;
  format: "number" | "decimal";
  showBar: boolean;
}

const METRIC_ROWS: MetricRow[] = [
  {
    metric: "Total Unit",
    getValue: (sh, y) => summary.by_subholding?.[sh]?.[y]?.total_units ?? null,
    format: "number",
    showBar: true,
  },
  {
    metric: "Unit dengan Data",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.units_with_data ?? null,
    format: "number",
    showBar: true,
  },
  {
    metric: "Area Konservasi (ha)",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.area.total_ha ?? null,
    format: "decimal",
    showBar: true,
  },
  {
    metric: "Adjacent: Yes",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.location.adjacent_yes ?? null,
    format: "number",
    showBar: true,
  },
  {
    metric: "Overlapped: Yes",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.location.overlapped_yes ?? null,
    format: "number",
    showBar: true,
  },
  {
    metric: "Both Yes",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.location.both_yes ?? null,
    format: "number",
    showBar: false,
  },
  {
    metric: "Avg Bio Score",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.biodiversity.avg_score ?? null,
    format: "decimal",
    showBar: false,
  },
  {
    metric: "Kategori Tinggi",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.biodiversity.tinggi ?? null,
    format: "number",
    showBar: true,
  },
  {
    metric: "Fauna Released",
    getValue: (sh, y) =>
      summary.by_subholding?.[sh]?.[y]?.fauna.total_released ?? null,
    format: "number",
    showBar: true,
  },
];

export default function SubholdingComparisonSection() {
  const [year, setYear] = useState(2024);
  const yearStr = String(year);

  const maxPerRow = useMemo(() => {
    return METRIC_ROWS.map((row) => {
      let max = 0;
      for (const sh of SUB_HOLDINGS) {
        const v = row.getValue(sh.key, yearStr);
        if (v && v > max) max = v;
      }
      return max;
    });
  }, [yearStr]);

  return (
    <SectionWrapper id="subholding-comparison" background="gray">
      <h2 className="section-title">Perbandingan Sub-Holding</h2>
      <p className="section-subtitle">
        Ringkasan metrik biodiversitas per Sub-Holding
      </p>

      <div className="mt-6">
        <YearToggle years={[...YEARS]} selectedYear={year} onChange={setYear} />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Metrik
                </th>
                {SUB_HOLDINGS.map((sh) => (
                  <th
                    key={sh.key}
                    className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider"
                    style={{
                      backgroundColor: `${sh.color}10`,
                      color: sh.color,
                    }}
                  >
                    <span className="flex items-center justify-end gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: sh.color }}
                      />
                      {sh.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRIC_ROWS.map((row, ri) => (
                <tr
                  key={row.metric}
                  className={`transition-colors hover:bg-blue-50/50 ${
                    ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-3 font-medium text-gray-700">
                    {row.metric}
                  </td>
                  {SUB_HOLDINGS.map((sh) => {
                    const val = row.getValue(sh.key, yearStr);
                    const max = maxPerRow[ri];
                    const barPct =
                      row.showBar && val && max ? (val / max) * 100 : 0;

                    return (
                      <td
                        key={sh.key}
                        className="relative px-4 py-3 text-right"
                      >
                        {barPct > 0 && (
                          <div
                            className="absolute inset-y-0 right-0 opacity-15"
                            style={{
                              width: `${barPct}%`,
                              backgroundColor: sh.color,
                            }}
                          />
                        )}
                        <span className="relative z-10">
                          {val === null || val === 0
                            ? "\u2014"
                            : row.format === "decimal"
                              ? formatNumber(val, 2)
                              : formatNumber(val)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <NarrativeBlock>
          <p>
            SH Upstream memiliki cakupan data terluas dengan 49 unit operasi
            yang semuanya melaporkan data di 2024. SH Downstream menunjukkan
            peningkatan pelaporan signifikan dari 2023 ke 2024, terutama dari
            unit-unit MOR yang mulai melaporkan data luasan area. SH Gas masih
            memerlukan peningkatan pengumpulan data di 2024.
          </p>
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
