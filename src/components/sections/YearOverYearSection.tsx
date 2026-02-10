"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import StatCard from "@/components/ui/StatCard";
import SlopeChart from "@/components/charts/SlopeChart";
import { SUB_HOLDINGS } from "@/lib/constants";
import { summary } from "@/data";
import { TreePine, Building2, Bird, BarChart3, Check } from "lucide-react";

export default function YearOverYearSection() {
  const y23 = summary.by_year?.["2023"];
  const y24 = summary.by_year?.["2024"];

  const slopeData = SUB_HOLDINGS.map((sh) => ({
    name: sh.label,
    value2023: summary.by_subholding?.[sh.key]?.["2023"]?.area.total_ha ?? 0,
    value2024: summary.by_subholding?.[sh.key]?.["2024"]?.area.total_ha ?? 0,
    color: sh.color,
  }));

  const improvements = [
    "Format pelaporan 2024 memisahkan area offsite dan overlap — granularitas data meningkat",
    "Jumlah unit yang melaporkan data naik 38% — coverage lebih luas",
    "SH C&T dan SH IML mulai melaporkan data area konservasi — sebelumnya nihil",
  ];

  return (
    <SectionWrapper id="year-over-year" background="white">
      <h2 className="section-title">Tren 2023 — 2024</h2>
      <p className="section-subtitle">
        Perkembangan monitoring biodiversitas tahun ke tahun
      </p>

      <div className="mt-6">
        <NarrativeBlock>
          <p>
            Perbandingan data 2023 dan 2024 menunjukkan perkembangan signifikan
            dalam monitoring biodiversitas Pertamina. Peningkatan terbesar
            terlihat pada jumlah unit yang melaporkan data, luasan area yang
            teridentifikasi, dan jumlah fauna yang dibebasliarkan.
          </p>
        </NarrativeBlock>
      </div>

      {/* Key change cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={y24?.area.total_ha ?? null}
          label="Area Konservasi (ha)"
          icon={<TreePine className="h-8 w-8" />}
          format="area"
          previousValue={y23?.area.total_ha ?? null}
        />
        <StatCard
          value={y24?.units_with_data ?? null}
          label="Unit dengan Data"
          icon={<Building2 className="h-8 w-8" />}
          format="number"
          previousValue={y23?.units_with_data ?? null}
        />
        <StatCard
          value={y24?.fauna.total_released ?? null}
          label="Fauna Released"
          icon={<Bird className="h-8 w-8" />}
          format="number"
          previousValue={y23?.fauna.total_released ?? null}
        />
        <StatCard
          value={y24?.biodiversity.avg_score ?? null}
          label="Avg Biodiversity Score"
          icon={<BarChart3 className="h-8 w-8" />}
          format="decimal"
          previousValue={y23?.biodiversity.avg_score ?? null}
        />
      </div>

      {/* Slope chart */}
      <div className="mt-10 card">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Area Konservasi per Sub-Holding (ha)
        </h3>
        <SlopeChart data={slopeData} />
      </div>

      {/* Data maturity narrative */}
      <div className="mt-8 space-y-4">
        <NarrativeBlock variant="warning">
          <p>
            <strong>Catatan penting:</strong> Peningkatan angka antara 2023 dan
            2024 tidak selalu mencerminkan perubahan kondisi di lapangan. Sebagian
            besar peningkatan disebabkan oleh{" "}
            <strong>perbaikan sistem pelaporan dan pendataan</strong>. Contohnya,
            penurunan rata-rata skor biodiversitas dari 2,77 ke 2,34 justru
            menunjukkan bahwa lebih banyak unit melaporkan data (termasuk unit
            dengan skor rendah yang sebelumnya tidak terdata).
          </p>
        </NarrativeBlock>
        <NarrativeBlock>
          <p>
            Di sisi lain, peningkatan area konservasi dari ~21.000 ha ke
            ~100.000 ha didominasi oleh pendataan ulang area Pertamina Hulu Rokan
            (PHR) yang sebelumnya belum tercatat lengkap.
          </p>
        </NarrativeBlock>
      </div>

      {/* Improvement highlights */}
      <div className="mt-8 space-y-3">
        {improvements.map((text, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
              <Check className="h-3.5 w-3.5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
