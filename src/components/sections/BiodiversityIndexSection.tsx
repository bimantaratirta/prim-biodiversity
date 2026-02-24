"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import YearToggle from "@/components/ui/YearToggle";
import DonutChart from "@/components/charts/DonutChart";
import { SUB_HOLDINGS, YEARS, BIO_CATEGORY_COLORS } from "@/lib/constants";
import { getRecords } from "@/data";

export default function BiodiversityIndexSection() {
  const [year, setYear] = useState(2024);

  const { totalWithData, totalNull, shData, insightText } = useMemo(() => {
    const allRecs = getRecords(undefined, year);
    const withCategory = allRecs.filter((r) => r.biodiversity_category != null);

    const rendah = withCategory.filter((r) => r.biodiversity_category === "Rendah").length;
    const sedang = withCategory.filter((r) => r.biodiversity_category === "Sedang").length;
    const tinggi = withCategory.filter((r) => r.biodiversity_category === "Tinggi").length;
    const nullCount = allRecs.filter((r) => r.biodiversity_category == null).length;

    // Per-SH data (each record = individual wilayah kerja, not grouped)
    const perSH = SUB_HOLDINGS.map((sh) => {
      const shRecs = getRecords(sh.key, year);
      const shWithCategory = shRecs.filter((r) => r.biodiversity_category != null);

      return {
        key: sh.key,
        label: sh.label,
        color: sh.color,
        rendah: shWithCategory.filter((r) => r.biodiversity_category === "Rendah").length,
        sedang: shWithCategory.filter((r) => r.biodiversity_category === "Sedang").length,
        tinggi: shWithCategory.filter((r) => r.biodiversity_category === "Tinggi").length,
        totalWithData: shWithCategory.length,
      };
    });

    // Dynamic insight
    const tinggiPct = withCategory.length > 0 ? Math.round((tinggi / withCategory.length) * 100) : 0;

    // Find SH with most "Tinggi" records
    const topSH = perSH.reduce((best, sh) => (sh.tinggi > best.tinggi ? sh : best), perSH[0]);

    let insight = `Secara keseluruhan, <strong>${tinggiPct}%</strong> wilayah kerja yang memiliki data menunjukkan indeks biodiversitas <strong>Tinggi</strong> di ${year}.`;
    if (topSH && topSH.tinggi > 0) {
      insight += ` ${topSH.label} memiliki jumlah wilayah kerja dengan kategori Tinggi terbanyak (${topSH.tinggi}).`;
    }

    return {
      totalWithData: rendah + sedang + tinggi,
      totalNull: nullCount,
      shData: perSH,
      insightText: insight,
    };
  }, [year]);

  return (
    <SectionWrapper id="biodiversity-index" background="gray">
      <h2 className="section-title">Indeks Keanekaragaman Hayati</h2>
      <p className="section-subtitle">Distribusi Shannon-Wiener Diversity Index (H&apos;) per kategori</p>

      <div className="mt-6">
        <NarrativeBlock>
          <p>
            Indeks keanekaragaman hayati dihitung menggunakan Shannon-Wiener Diversity Index (H&apos;), yang mengukur
            keberagaman spesies di suatu area. Skor diklasifikasikan menjadi tiga kategori:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Rendah</strong> (H&apos; &le; 1): Keberagaman rendah, didominasi sedikit spesies
            </li>
            <li>
              <strong>Sedang</strong> (1 &lt; H&apos; &le; 3): Keberagaman moderat
            </li>
            <li>
              <strong>Tinggi</strong> (H&apos; &gt; 3): Keberagaman tinggi, ekosistem sehat
            </li>
          </ul>
        </NarrativeBlock>
      </div>

      <div className="mt-6">
        <YearToggle years={[...YEARS]} selectedYear={year} onChange={setYear} />
      </div>

      {/* Per Sub-Holding Pie Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shData.map((sh) => {
          const chartData = [
            {
              name: "Tinggi",
              value: sh.tinggi,
              color: BIO_CATEGORY_COLORS.Tinggi,
            },
            {
              name: "Sedang",
              value: sh.sedang,
              color: BIO_CATEGORY_COLORS.Sedang,
            },
            {
              name: "Rendah",
              value: sh.rendah,
              color: BIO_CATEGORY_COLORS.Rendah,
            },
          ];
          return (
            <div key={sh.key} className="card flex flex-col items-center p-5">
              <p className="mb-3 text-sm font-bold" style={{ color: sh.color }}>
                {sh.label}
              </p>
              <DonutChart data={chartData} centerLabel={`${sh.totalWithData}`} size="md" />
              {/* Legend */}
              <div className="mt-4 w-full space-y-1.5">
                {chartData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{d.value} unit</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400">{sh.totalWithData} unit dengan data</p>
            </div>
          );
        })}
      </div>

      {/* Overall summary */}
      <p className="mt-4 text-center text-xs text-gray-400">
        Total: {totalWithData} unit dengan data, {totalNull} belum ada data
      </p>

      <div className="mt-8">
        <NarrativeBlock variant="insight">
          <p dangerouslySetInnerHTML={{ __html: insightText }} />
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
