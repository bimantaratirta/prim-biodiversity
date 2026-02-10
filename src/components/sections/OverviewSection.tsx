"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NarrativeBlock from "@/components/ui/NarrativeBlock";
import { SUB_HOLDINGS } from "@/lib/constants";
import { summary } from "@/data";

export default function OverviewSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="overview" background="white">
      <div ref={ref} className="grid gap-12 lg:grid-cols-2">
        {/* Left — Narrative */}
        <div>
          <h2 className="section-title">
            Komitmen Pertamina terhadap Keanekaragaman Hayati
          </h2>
          <div className="mt-6 space-y-4">
            <NarrativeBlock>
              <p>
                <strong>Pertamina Group</strong> sebagai perusahaan energi
                nasional memiliki komitmen kuat terhadap pelestarian
                keanekaragaman hayati (biodiversitas) di seluruh wilayah
                operasinya. Melalui{" "}
                <strong>Kertas Kerja Environmental</strong>, setiap unit operasi
                melaporkan data biodiversitas termasuk luasan area konservasi,
                indeks keanekaragaman hayati, serta upaya konservasi fauna dan
                flora.
              </p>
            </NarrativeBlock>
            <NarrativeBlock>
              <p>
                Data yang ditampilkan dalam dashboard ini bersumber dari laporan
                tahun <strong>2023</strong> dan <strong>2024</strong>, mencakup
                seluruh Sub-Holding Pertamina pasca-merger. Monitoring ini
                menjadi dasar bagi pengambilan keputusan strategis terkait
                pengelolaan lingkungan hidup yang berkelanjutan.
              </p>
            </NarrativeBlock>
            <NarrativeBlock variant="callout">
              <p>
                Pasca-merger, Pertamina Group terdiri dari{" "}
                <strong>4 Sub-Holding utama</strong> yang masing-masing memiliki
                karakteristik operasi dan tantangan biodiversitas yang berbeda.
              </p>
            </NarrativeBlock>
          </div>
        </div>

        {/* Right — SH Infographic */}
        <div className="space-y-4">
          {SUB_HOLDINGS.map((sh, i) => {
            const metrics =
              summary.by_subholding?.[sh.key]?.["2024"];
            const unitCount = metrics?.total_units ?? 0;

            return (
              <motion.div
                key={sh.key}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex overflow-hidden rounded-xl bg-white ring-1 ring-gray-100"
              >
                <div
                  className="w-1.5 flex-shrink-0"
                  style={{ backgroundColor: sh.color }}
                />
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{sh.label}</h3>
                      {sh.mergedFrom && (
                        <p className="text-xs text-gray-500">
                          {sh.mergedFrom.join(" + ")}
                        </p>
                      )}
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-sm font-semibold text-white"
                      style={{ backgroundColor: sh.color }}
                    >
                      {unitCount} unit
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    {sh.sampleUnits.join(", ")}
                  </p>
                </div>
              </motion.div>
            );
          })}

          <p className="mt-4 text-xs italic text-gray-400">
            *Catatan: Kelengkapan data bervariasi antar Sub-Holding dan antar
            tahun. SH Upstream memiliki data paling komprehensif, sementara
            beberapa unit di SH lain masih dalam tahap pengumpulan data.*
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
