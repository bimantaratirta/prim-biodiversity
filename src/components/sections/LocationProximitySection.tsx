"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import YearToggle from "@/components/ui/YearToggle";
import StackedPercentBar from "@/components/charts/StackedPercentBar";
import { SUB_HOLDINGS, YEARS } from "@/lib/constants";
import { getUniqueUnits, getRecords } from "@/data";

export default function LocationProximitySection() {
  const [year, setYear] = useState(2024);

  const { adjacentData, overlappedData, bothYes, totalBothYes, insightText } =
    useMemo(() => {
      const adjData = SUB_HOLDINGS.map((sh) => {
        const units = getUniqueUnits(sh.key, year);
        return {
          name: sh.label,
          yes: units.filter((u) => u.location_adjacent === "yes").length,
          no: units.filter((u) => u.location_adjacent === "no").length,
          null_count: units.filter((u) => u.location_adjacent === null).length,
        };
      });

      const ovlData = SUB_HOLDINGS.map((sh) => {
        const units = getUniqueUnits(sh.key, year);
        return {
          name: sh.label,
          yes: units.filter((u) => u.location_overlapped === "yes").length,
          no: units.filter((u) => u.location_overlapped === "no").length,
          null_count: units.filter((u) => u.location_overlapped === null)
            .length,
        };
      });

      // "Both yes" must be checked at the wilayah_kerja (record) level:
      // A unit counts as "both yes" only if at least one of its WK records
      // has BOTH adjacent=yes AND overlapped=yes in the same row.
      const both = SUB_HOLDINGS.map((sh) => {
        const recs = getRecords(sh.key, year);
        // Group records by unit_operasi
        const byUnit = new Map<string, typeof recs>();
        for (const r of recs) {
          if (!byUnit.has(r.unit_operasi)) byUnit.set(r.unit_operasi, []);
          byUnit.get(r.unit_operasi)!.push(r);
        }
        // Count units where at least one WK has both yes
        let count = 0;
        Array.from(byUnit.values()).forEach((unitRecs) => {
          if (unitRecs.some(r => r.location_adjacent === "yes" && r.location_overlapped === "yes")) {
            count++;
          }
        });
        return { label: sh.label, color: sh.color, count };
      });

      const totalBoth = both.reduce((sum, d) => sum + d.count, 0);

      // Build dynamic insight text
      const shWithBoth = both.filter((d) => d.count > 0);
      let insight: string;
      if (shWithBoth.length > 0) {
        const shNames = shWithBoth
          .map((d) => `${d.label} (${d.count} unit)`)
          .join(" dan ");
        insight = `Pada ${year}, <strong>${totalBoth} unit</strong> dari ${shNames} memiliki lokasi yang berdekatan sekaligus tumpang tindih dengan kawasan lindung. Unit-unit ini memerlukan perhatian khusus dan memiliki program konservasi aktif sebagai bagian dari pengelolaan dampak lingkungan.`;
      } else {
        insight = `Pada ${year}, tidak ada unit operasi yang memiliki lokasi berdekatan sekaligus tumpang tindih dengan kawasan lindung berdasarkan data yang dilaporkan.`;
      }

      return {
        adjacentData: adjData,
        overlappedData: ovlData,
        bothYes: both,
        totalBothYes: totalBoth,
        insightText: insight,
      };
    }, [year]);

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
          <p dangerouslySetInnerHTML={{ __html: insightText }} />
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
