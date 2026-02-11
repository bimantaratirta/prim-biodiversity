"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import YearToggle from "@/components/ui/YearToggle";
import HorizontalBar from "@/components/charts/HorizontalBar";
import StackedHorizontalBar from "@/components/charts/StackedHorizontalBar";
import { SUB_HOLDINGS, YEARS } from "@/lib/constants";
import { summary } from "@/data";
import { formatNumber } from "@/lib/utils";

export default function AreaKonservasiSection() {
  const [year, setYear] = useState(2024);

  const barData = SUB_HOLDINGS.map((sh) => {
    const m = summary.by_subholding?.[sh.key]?.[String(year)];
    return {
      name: sh.label,
      value: m?.area.total_ha ?? 0,
      color: sh.color,
    };
  }).filter((d) => d.value > 0);

  const stackedData = SUB_HOLDINGS.map((sh) => {
    const m = summary.by_subholding?.[sh.key]?.["2024"];
    return {
      name: sh.label,
      offsite: m?.area.total_offsite_ha ?? 0,
      overlap: m?.area.total_overlap_ha ?? 0,
      color: sh.color,
    };
  }).filter((d) => d.offsite > 0 || d.overlap > 0);

  const total2024 = summary.by_year?.["2024"]?.area.total_ha ?? 0;
  const total2023 = summary.by_year?.["2023"]?.area.total_ha ?? 0;

  return (
    <SectionWrapper id="area-konservasi" background="gray">
      <h2 className="section-title">Luasan Area Konservasi</h2>
      <p className="section-subtitle">Total area yang dikelola untuk pelestarian keanekaragaman hayati</p>

      <div className="mt-6">
        <NarrativeBlock>
          <p>
            Area konservasi mencakup wilayah yang dikelola secara khusus untuk pelestarian biodiversitas, baik di dalam
            maupun di luar wilayah kerja operasi. Pada tahun 2024, Pertamina mengelola total{" "}
            <strong>{formatNumber(total2024, 2)} hektar</strong> area konservasi — peningkatan signifikan dari{" "}
            <strong>{formatNumber(total2023, 2)} hektar</strong> di tahun 2023.
          </p>
        </NarrativeBlock>
      </div>

      <div className="mt-6">
        <YearToggle years={[...YEARS]} selectedYear={year} onChange={setYear} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Total Area per Sub-Holding ({year})</h3>
          {barData.length > 0 ? (
            <HorizontalBar data={barData} total={summary.by_year?.[String(year)]?.area.total_ha} />
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">Tidak ada data area untuk tahun {year}</p>
          )}
        </div>

        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Offsite vs Overlap {year}</h3>
          {year === 2024 ? (
            <StackedHorizontalBar data={stackedData} />
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm italic text-gray-400">Data offsite/overlap tidak tersedia di tahun 2023</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <NarrativeBlock variant="insight">
          <p>
            <strong>SH Upstream</strong> mendominasi luasan area konservasi (90,8% dari total 2024), didorong oleh area
            operasi Pertamina Hulu Rokan yang sangat luas. Peningkatan drastis dari 2023 ke 2024 mencerminkan perbaikan
            pendataan dan pelaporan, bukan hanya penambahan area baru.
          </p>
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
