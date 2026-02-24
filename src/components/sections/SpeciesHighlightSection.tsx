"use client";

import { useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import SpeciesCard from "@/components/ui/SpeciesCard";
import IUCNDistributionBar from "@/components/charts/IUCNDistributionBar";
import StatCard from "@/components/ui/StatCard";
import { summary, records } from "@/data";
import { parseSpeciesLine, formatNumber } from "@/lib/utils";

const FLAGSHIP_FAUNA = [
  { commonName: "Gajah Sumatera", latinName: "Elephas maximus sumatranus", iucnStatus: "CR" },
  { commonName: "Harimau Sumatera", latinName: "Panthera tigris sumatrae", iucnStatus: "EN" },
  { commonName: "Tuntong Laut", latinName: "Batagur borneoensis", iucnStatus: "CR" },
  { commonName: "Elang Jawa", latinName: "Nisaetus bartelsi", iucnStatus: "EN" },
  { commonName: "Owa Ungko", latinName: "Hylobates agilis", iucnStatus: "EN" },
  { commonName: "Orangutan Kalimantan", latinName: "Pongo pygmaeus", iucnStatus: "CR" },
];

const FLAGSHIP_FLORA = [
  { commonName: "Gaharu", latinName: "Aquilaria malaccensis", iucnStatus: "CR" },
  { commonName: "Meranti Merah", latinName: "Shorea johorensis", iucnStatus: "CR" },
  { commonName: "Ulin", latinName: "Eusideroxylon zwageri", iucnStatus: "VU" },
  { commonName: "Kantong Semar Sumatera", latinName: "Nepenthes sumatrana", iucnStatus: "CR" },
  { commonName: "Jati", latinName: "Tectona grandis", iucnStatus: "EN" },
  { commonName: "Anggrek Bulan Sumatra", latinName: "Phalaenopsis sumatrana", iucnStatus: "VU" },
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

  /* ── Flora statistics from raw records ── */
  const floraStats = useMemo(() => {
    const byYear: Record<string, { unitsWithFlora: number; uniqueSpecies: Set<string> }> = {};
    for (const rec of records) {
      const yr = String(rec.tahun);
      if (!byYear[yr]) byYear[yr] = { unitsWithFlora: 0, uniqueSpecies: new Set() };

      if (rec.flora_names && rec.flora_names !== "0") {
        byYear[yr].unitsWithFlora += 1;
        for (const line of rec.flora_names.split("\n")) {
          const parsed = parseSpeciesLine(line.trim());
          if (parsed) {
            const key = parsed.latinName?.toLowerCase() || parsed.commonName.toLowerCase();
            byYear[yr].uniqueSpecies.add(key);
          }
        }
      }
    }
    return {
      "2023": {
        unitsWithFlora: byYear["2023"]?.unitsWithFlora ?? 0,
        uniqueSpecies: byYear["2023"]?.uniqueSpecies.size ?? 0,
      },
      "2024": {
        unitsWithFlora: byYear["2024"]?.unitsWithFlora ?? 0,
        uniqueSpecies: byYear["2024"]?.uniqueSpecies.size ?? 0,
      },
    };
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

      {/* ═══════════════ FAUNA SUBSECTION ═══════════════ */}
      <div className="mt-10">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-base">🐾</span>
          Fauna Unggulan
        </h3>

        {/* Flagship fauna cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLAGSHIP_FAUNA.map((sp) => (
            <SpeciesCard
              key={sp.commonName}
              commonName={sp.commonName}
              latinName={sp.latinName}
              iucnStatus={sp.iucnStatus}
            />
          ))}
        </div>

        {/* Fauna Released Stats */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
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
      </div>

      {/* ═══════════════ FLORA SUBSECTION ═══════════════ */}
      <div className="mt-14">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-base">🌿</span>
          Flora Unggulan
        </h3>

        <NarrativeBlock>
          <p>
            Program konservasi flora meliputi penanaman, pemeliharaan, dan identifikasi berbagai spesies tumbuhan, termasuk
            spesies langka yang masuk dalam <strong>IUCN Red List</strong>. Identifikasi flora dilakukan di wilayah operasi
            untuk menjaga keberagaman ekosistem.
          </p>
        </NarrativeBlock>

        {/* Flagship flora cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLAGSHIP_FLORA.map((sp) => (
            <SpeciesCard
              key={sp.commonName}
              commonName={sp.commonName}
              latinName={sp.latinName}
              iucnStatus={sp.iucnStatus}
            />
          ))}
        </div>

        {/* Flora Stats */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <StatCard
            value={floraStats["2024"].unitsWithFlora}
            label="Unit operasi yang melaporkan data flora (2024)"
            format="number"
            previousValue={floraStats["2023"].unitsWithFlora}
            className="!shadow-md"
          />
          <div className="card">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Ringkasan Flora per Tahun</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Unit dengan data flora (2023)</span>
                <span className="font-semibold">{floraStats["2023"].unitsWithFlora}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Unit dengan data flora (2024)</span>
                <span className="font-semibold">{floraStats["2024"].unitsWithFlora}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jenis flora unik teridentifikasi (2024)</span>
                <span className="font-semibold">{floraStats["2024"].uniqueSpecies}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ IUCN DISTRIBUTION (Combined) ═══════════════ */}
      <div className="mt-14">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Distribusi Status IUCN (Fauna &amp; Flora)</h3>
        <IUCNDistributionBar data={iucnCounts} />
      </div>
    </SectionWrapper>
  );
}
