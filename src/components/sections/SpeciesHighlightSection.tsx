"use client";

import { useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import SpeciesCard from "@/components/ui/SpeciesCard";
import IUCNDistributionBar from "@/components/charts/IUCNDistributionBar";
import StatCard from "@/components/ui/StatCard";
import { summary, records } from "@/data";
import { parseSpeciesLine, formatNumber } from "@/lib/utils";

const FLAGSHIP_SPECIES = [
  { commonName: "Gajah Sumatera", latinName: "Elephas maximus sumatranus", iucnStatus: "CR" },
  { commonName: "Harimau Sumatera", latinName: "Panthera tigris sumatrae", iucnStatus: "EN" },
  { commonName: "Tuntong Laut", latinName: "Batagur borneoensis", iucnStatus: "CR" },
  { commonName: "Elang Jawa", latinName: "Nisaetus bartelsi", iucnStatus: "EN" },
  { commonName: "Owa Ungko", latinName: "Hylobates agilis", iucnStatus: "EN" },
  { commonName: "Orangutan Kalimantan", latinName: "Pongo pygmaeus", iucnStatus: "CR" },
];

export default function SpeciesHighlightSection() {
  const iucnCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const rec of records) {
      const texts = [rec.fauna_names, rec.flora_names].filter(Boolean);
      for (const text of texts) {
        if (!text) continue;
        for (const line of text.split("\n")) {
          const parsed = parseSpeciesLine(line.trim());
          if (parsed?.iucnStatus) {
            counts[parsed.iucnStatus] = (counts[parsed.iucnStatus] || 0) + 1;
          }
        }
      }
    }
    return counts;
  }, []);

  const fauna2024 = summary.by_year?.["2024"]?.fauna;
  const fauna2023 = summary.by_year?.["2023"]?.fauna;

  return (
    <SectionWrapper id="species" background="white">
      <h2 className="section-title">Spesies yang Dilindungi</h2>
      <p className="section-subtitle">Fauna dan flora yang dikonservasi di wilayah operasi Pertamina</p>

      <div className="mt-6">
        <NarrativeBlock>
          <p>
            Pertamina mengidentifikasi dan melindungi berbagai spesies yang masuk dalam <strong>IUCN Red List</strong> di
            area operasinya. Program konservasi mencakup identifikasi spesies, perlindungan habitat, dan pelepasliaran fauna
            ke habitat aslinya.
          </p>
        </NarrativeBlock>
      </div>

      {/* Flagship species cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLAGSHIP_SPECIES.map((sp) => (
          <SpeciesCard key={sp.commonName} commonName={sp.commonName} latinName={sp.latinName} iucnStatus={sp.iucnStatus} />
        ))}
      </div>

      {/* IUCN Distribution */}
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Distribusi Status IUCN</h3>
        <IUCNDistributionBar data={iucnCounts} />
      </div>

      {/* Fauna Released Stats */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <StatCard
            value={fauna2024?.total_released ?? null}
            label="Individu fauna dibebasliarkan ke habitat aslinya (2024)"
            format="number"
            previousValue={fauna2023?.total_released ?? null}
            className="!shadow-md"
          />
          <p className="mt-3 text-sm text-gray-500">
            Meningkat dari {formatNumber(fauna2023?.total_released ?? 0)} di tahun 2023
          </p>
        </div>

        <div className="card">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Ringkasan Fauna per Tahun</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Unit dengan rilis (2023)</span>
            <span className="font-semibold">{fauna2023?.units_with_releases ?? 0}</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Unit dengan rilis (2024)</span>
              <span className="font-semibold">{fauna2024?.units_with_releases ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Spesies unik teridentifikasi (2024)</span>
              <span className="font-semibold">{fauna2024?.unique_species_approx ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flora note */}
      <div className="mt-8">
        <NarrativeBlock variant="callout">
          <p>
            Program konservasi flora meliputi penanaman dan pemeliharaan berbagai spesies, termasuk spesies langka seperti{" "}
            <strong>Gaharu</strong> (<em>Aquilaria malaccensis</em> — CR), <strong>Padma Raksasa</strong> (
            <em>Rafflesia arnoldii</em>), dan <strong>Meranti Merah</strong> (<em>Shorea johorensis</em> — CR).
          </p>
        </NarrativeBlock>
      </div>
    </SectionWrapper>
  );
}
