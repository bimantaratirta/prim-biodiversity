"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import YearToggle from "@/components/ui/YearToggle";
import StatCard from "@/components/ui/StatCard";
import DonutChart from "@/components/charts/DonutChart";
import { SUB_HOLDINGS, YEARS, BIO_CATEGORY_COLORS } from "@/lib/constants";
import { summary } from "@/data";
import { formatNumber } from "@/lib/utils";

export default function BiodiversityIndexSection() {
  const [year, setYear] = useState(2024);

  const yearData = summary.by_year?.[String(year)];
  const bio = yearData?.biodiversity;

  const donutData = [
    { name: "Rendah", value: bio?.rendah ?? 0, color: BIO_CATEGORY_COLORS.Rendah },
    { name: "Sedang", value: bio?.sedang ?? 0, color: BIO_CATEGORY_COLORS.Sedang },
    { name: "Tinggi", value: bio?.tinggi ?? 0, color: BIO_CATEGORY_COLORS.Tinggi },
  ];

  return (
    <SectionWrapper id="biodiversity-index" background="gray">
      <h2 className="section-title">Indeks Keanekaragaman Hayati</h2>
      <p className="section-subtitle">
        Distribusi Shannon-Wiener Diversity Index (H&apos;) per kategori
      </p>

      <div className="mt-6">
        <NarrativeBlock>
          <p>
            Indeks keanekaragaman hayati dihitung menggunakan Shannon-Wiener
            Diversity Index (H&apos;), yang mengukur keberagaman spesies di suatu
            area. Skor diklasifikasikan menjadi tiga kategori:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Rendah</strong> (H&apos; &le; 2): Keberagaman rendah,
              didominasi sedikit spesies
            </li>
            <li>
              <strong>Sedang</strong> (2 &lt; H&apos; &le; 3): Keberagaman moderat
            </li>
            <li>
              <strong>Tinggi</strong> (H&apos; &gt; 3): Keberagaman tinggi,
              ekosistem sehat
            </li>
          </ul>
        </NarrativeBlock>
      </div>

      <div className="mt-6">
        <YearToggle years={[...YEARS]} selectedYear={year} onChange={setYear} />
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          value={bio?.avg_score ?? null}
          label="Rata-rata Skor"
          format="decimal"
        />
        <StatCard
          value={bio?.max_score ?? null}
          label="Skor Tertinggi"
          format="decimal"
        />
        <StatCard
          value={bio?.units_with_score ?? null}
          label="Unit dengan Data"
          format="number"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Main donut */}
        <div className="card flex flex-col items-center">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Distribusi Kategori ({year})
          </h3>
          <DonutChart
            data={donutData}
            centerLabel={
              bio?.avg_score != null ? formatNumber(bio.avg_score, 2) : "\u2014"
            }
            size="lg"
          />
          <div className="mt-4 flex gap-4">
            {donutData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-gray-600">
                  {d.name}: {d.value}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {bio ? bio.rendah + bio.sedang + bio.tinggi : 0} unit dengan data,{" "}
            {bio?.null ?? 0} belum ada data
          </p>
        </div>

        {/* Small multiples per SH */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Per Sub-Holding ({year})
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {SUB_HOLDINGS.map((sh) => {
              const m = summary.by_subholding?.[sh.key]?.[String(year)];
              const b = m?.biodiversity;
              const miniData = [
                { name: "Rendah", value: b?.rendah ?? 0, color: BIO_CATEGORY_COLORS.Rendah },
                { name: "Sedang", value: b?.sedang ?? 0, color: BIO_CATEGORY_COLORS.Sedang },
                { name: "Tinggi", value: b?.tinggi ?? 0, color: BIO_CATEGORY_COLORS.Tinggi },
              ];
              return (
                <div key={sh.key} className="card flex flex-col items-center p-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: sh.color }}
                  >
                    {sh.label}
                  </p>
                  <DonutChart
                    data={miniData}
                    centerLabel={
                      b?.avg_score != null
                        ? formatNumber(b.avg_score, 1)
                        : "\u2014"
                    }
                    size="sm"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    {b ? b.rendah + b.sedang + b.tinggi : 0} unit
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <NarrativeBlock variant="insight">
          <p>
            Secara keseluruhan, <strong>42%</strong> unit operasi yang memiliki
            data menunjukkan indeks biodiversitas <strong>Tinggi</strong> di
            2024. SH Upstream memiliki variasi terbesar (skor 0 hingga 4,15),
            mencerminkan keragaman lokasi operasi dari hutan tropis dataran
            rendah hingga ekosistem pesisir.
          </p>
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
