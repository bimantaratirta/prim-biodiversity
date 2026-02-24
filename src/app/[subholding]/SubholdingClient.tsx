"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SUB_HOLDINGS, SLUG_TO_SH, YEARS, BIO_CATEGORY_COLORS } from "@/lib/constants";
import { summary, getRecords } from "@/data";
import type { SubHolding } from "@/data/types";
import { formatNumber, parseSpeciesLine } from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import YearToggle from "@/components/ui/YearToggle";
import DataTable from "@/components/ui/DataTable";
import DonutChart from "@/components/charts/DonutChart";
import HorizontalBar from "@/components/charts/HorizontalBar";
import SpeciesCard from "@/components/ui/SpeciesCard";

export default function SubholdingClient({ slug }: { slug: string }) {
  const [year, setYear] = useState(2024);
  const shKey = SLUG_TO_SH[slug] as SubHolding;
  const shMeta = SUB_HOLDINGS.find((s) => s.key === shKey);

  const metrics = shMeta ? summary.by_subholding?.[shKey]?.[String(year)] : null;
  const records = useMemo(
    () => (shMeta ? getRecords(shKey, year) : []),
    [shMeta, shKey, year]
  );

  const areaData = useMemo(
    () =>
      records
        .filter((r) => r.luasan_total_ha && r.luasan_total_ha > 0)
        .sort((a, b) => (b.luasan_total_ha ?? 0) - (a.luasan_total_ha ?? 0))
        .slice(0, 10)
        .map((r) => ({
          name: r.unit_operasi,
          value: r.luasan_total_ha ?? 0,
          color: shMeta?.color ?? "#888",
        })),
    [records, shMeta?.color]
  );

  const speciesList = useMemo(() => {
    const seen = new Set<string>();
    const species: {
      commonName: string;
      latinName: string;
      iucnStatus: string;
      source: "fauna" | "flora";
    }[] = [];

    for (const rec of records) {
      for (const [field, source] of [
        ["fauna_names", "fauna"],
        ["flora_names", "flora"],
      ] as const) {
        const text = rec[field];
        if (!text) continue;
        for (const line of text.split("\n")) {
          const parsed = parseSpeciesLine(line.trim());
          if (!parsed) continue;
          const key = `${parsed.commonName}-${source}`;
          if (seen.has(key)) continue;
          seen.add(key);
          species.push({
            commonName: parsed.commonName,
            latinName: parsed.latinName || "",
            iucnStatus: parsed.iucnStatus || "",
            source,
          });
        }
      }
    }
    return species;
  }, [records]);

  if (!shMeta) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Sub-Holding tidak ditemukan</p>
      </div>
    );
  }

  const bio = metrics?.biodiversity;
  const donutData = [
    { name: "Rendah", value: bio?.rendah ?? 0, color: BIO_CATEGORY_COLORS.Rendah },
    { name: "Sedang", value: bio?.sedang ?? 0, color: BIO_CATEGORY_COLORS.Sedang },
    { name: "Tinggi", value: bio?.tinggi ?? 0, color: BIO_CATEGORY_COLORS.Tinggi },
  ];

  const tableData = records.map((r) => ({
    unit_operasi: r.unit_operasi,
    wilayah_kerja: r.wilayah_kerja,
    luasan_total_ha: r.luasan_total_ha,
    location_adjacent: r.location_adjacent,
    location_overlapped: r.location_overlapped,
    biodiversity_score: r.biodiversity_score,
    biodiversity_category: r.biodiversity_category,
    fauna_released_count: r.fauna_released_count,
  }));

  const otherSH = SUB_HOLDINGS.filter((s) => s.key !== shKey);

  return (
    <div>
      {/* Header Banner */}
      <div
        className="pb-8 pt-20"
        style={{
          background: `linear-gradient(135deg, ${shMeta.color}, ${shMeta.color}DD, #1A1A2E)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-white">{shMeta.label}</span>
          </div>
          <h1 className="mt-2 text-4xl font-bold text-white">
            {shMeta.labelFull}
          </h1>
          {shMeta.mergedFrom && (
            <p className="mt-1 text-white/70">
              Gabungan {shMeta.mergedFrom.join(", ")}
            </p>
          )}
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Year Toggle */}
        <div className="mb-8">
          <YearToggle years={[...YEARS]} selectedYear={year} onChange={setYear} />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <StatCard value={metrics?.total_unit_operasi ?? null} label="Unit Operasi" format="number" />
          <StatCard value={metrics?.total_wilayah_kerja ?? null} label="Wilayah Kerja" format="number" />
          <StatCard value={metrics?.area.total_ha ?? null} label="Area Konservasi" format="area" />
          <StatCard value={bio?.tinggi ?? null} label="Bio Kategori Tinggi" format="number" suffix="unit" />
          <StatCard value={metrics?.fauna.total_released ?? null} label="Fauna Released" format="number" />
          <StatCard value={bio?.sedang ?? null} label="Bio Kategori Sedang" format="number" suffix="unit" />
        </div>

        {records.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-gray-50 p-12 text-center">
            <p className="text-lg text-gray-500">
              Belum ada data biodiversitas yang dilaporkan untuk tahun {year}
            </p>
          </div>
        ) : (
          <>
            {/* Area Breakdown + Donut */}
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="card">
                <h3 className="mb-4 text-sm font-semibold text-gray-700">
                  Top 10 Area Konservasi (ha)
                </h3>
                {areaData.length > 0 ? (
                  <HorizontalBar data={areaData} />
                ) : (
                  <p className="py-8 text-center text-sm text-gray-400">
                    Tidak ada data area
                  </p>
                )}
              </div>
              <div className="card flex flex-col items-center">
                <h3 className="mb-4 text-sm font-semibold text-gray-700">
                  Distribusi Biodiversitas
                </h3>
                <DonutChart
                  data={donutData}
                  centerLabel={
                    bio ? `${bio.tinggi + bio.sedang + bio.rendah}` : "\u2014"
                  }
                  size="md"
                />
                <div className="mt-4 flex gap-4">
                  {donutData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-gray-600">{d.name}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Data per Unit Operasi
              </h3>
              <DataTable
                columns={[
                  { key: "unit_operasi", label: "Unit Operasi", sortable: true, width: "200px" },
                  { key: "wilayah_kerja", label: "Wilayah Kerja", sortable: true },
                  { key: "luasan_total_ha", label: "Area (ha)", format: "decimal", sortable: true, align: "right" },
                  { key: "location_adjacent", label: "Adjacent", format: "badge", align: "center" },
                  { key: "location_overlapped", label: "Overlapped", format: "badge", align: "center" },
                  { key: "biodiversity_score", label: "Bio Score", format: "decimal", sortable: true, align: "right" },
                  { key: "fauna_released_count", label: "Fauna Released", format: "number", sortable: true, align: "right" },
                ]}
                data={tableData}
              />
            </div>

            {/* Species list */}
            {speciesList.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Spesies Teridentifikasi
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {speciesList.slice(0, 30).map((sp, i) => (
                    <SpeciesCard
                      key={i}
                      commonName={sp.commonName}
                      latinName={sp.latinName}
                      iucnStatus={sp.iucnStatus}
                      variant="compact"
                    />
                  ))}
                </div>
                {speciesList.length > 30 && (
                  <p className="mt-4 text-sm text-gray-400">
                    ...dan {speciesList.length - 30} spesies lainnya
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Back + other SH links */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard Utama
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Lihat juga:</span>
            {otherSH.map((sh) => (
              <Link
                key={sh.slug}
                href={`/${sh.slug}`}
                className="rounded-full px-3 py-1 text-sm font-medium text-white"
                style={{ backgroundColor: sh.color }}
              >
                {sh.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
