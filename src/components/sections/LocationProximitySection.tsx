"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import YearToggle from "@/components/ui/YearToggle";
import StackedPercentBar from "@/components/charts/StackedPercentBar";
import { SUB_HOLDINGS, YEARS } from "@/lib/constants";
import { summary } from "@/data";

export default function LocationProximitySection() {
  const [year, setYear] = useState(2024);

  const adjacentData = SUB_HOLDINGS.map((sh) => {
    const m = summary.by_subholding?.[sh.key]?.[String(year)];
    return {
      name: sh.label,
      yes: m?.location.adjacent_yes ?? 0,
      no: m?.location.adjacent_no ?? 0,
      null_count: m?.location.adjacent_null ?? 0,
    };
  });

  const overlappedData = SUB_HOLDINGS.map((sh) => {
    const m = summary.by_subholding?.[sh.key]?.[String(year)];
    return {
      name: sh.label,
      yes: m?.location.overlapped_yes ?? 0,
      no: m?.location.overlapped_no ?? 0,
      null_count: m?.location.overlapped_null ?? 0,
    };
  });

  const bothYes = SUB_HOLDINGS.map((sh) => {
    const m = summary.by_subholding?.[sh.key]?.[String(year)];
    return { label: sh.label, color: sh.color, count: m?.location.both_yes ?? 0 };
  });
  const totalBothYes = bothYes.reduce((sum, d) => sum + d.count, 0);

  return (
    <SectionWrapper id="location-proximity" background="white">
      <h2 className="section-title">Kedekatan dengan Kawasan Lindung</h2>
      <p className="section-subtitle">
        Analisis lokasi operasi terhadap area biodiversitas tinggi
      </p>

      <div className="mt-6">
        <NarrativeBlock>
          <p>
            Setiap unit operasi dievaluasi berdasarkan dua aspek: (1) apakah
            lokasi <strong>berdekatan</strong> (adjacent) dengan kawasan lindung
            atau area biodiversitas tinggi, dan (2) apakah wilayah kerja{" "}
            <strong>tumpang tindih</strong> (overlapped) dengan kawasan tersebut.
            Unit yang memiliki kedua kondisi ini memerlukan perhatian khusus
            dalam pengelolaan dampak lingkungan.
          </p>
        </NarrativeBlock>
      </div>

      <div className="mt-6">
        <YearToggle years={[...YEARS]} selectedYear={year} onChange={setYear} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card">
          <StackedPercentBar
            data={adjacentData}
            label="Adjacent to Protected Areas"
            yesColor="#2E8540"
          />
        </div>
        <div className="card">
          <StackedPercentBar
            data={overlappedData}
            label="Overlapped with Protected Areas"
            yesColor="#E06919"
          />
        </div>
      </div>

      {/* Both Yes Highlight */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 ring-1 ring-amber-200">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-4xl font-bold text-amber-700">{totalBothYes}</p>
            <p className="mt-1 text-sm text-gray-600">
              Unit dengan lokasi berdekatan DAN tumpang tindih dengan kawasan
              lindung
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {bothYes
              .filter((d) => d.count > 0)
              .map((d) => (
                <span
                  key={d.label}
                  className="rounded-full px-3 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: d.color }}
                >
                  {d.label}: {d.count}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <NarrativeBlock variant="insight">
          <p>
            Pada {year}, <strong>{totalBothYes} unit</strong> dari SH PNRE (PGE
            Areas) memiliki lokasi yang berdekatan sekaligus tumpang tindih
            dengan kawasan lindung. Hal ini umum terjadi di area geotermal yang
            memang seringkali berada di kawasan pegunungan dengan biodiversitas
            tinggi. Unit-unit ini memiliki program konservasi aktif sebagai
            bagian dari pengelolaan dampak lingkungan.
          </p>
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
