"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SUB_HOLDINGS } from "@/lib/constants";
import { getUniqueUnits } from "@/data";

export default function ClosingSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const shUnitCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const sh of SUB_HOLDINGS) {
      counts[sh.key] = getUniqueUnits(sh.key, 2024).length;
    }
    return counts;
  }, []);

  return (
    <section className="bg-gradient-to-b from-pertamina-dark to-[#0A0A23] text-white">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Langkah Selanjutnya</h2>

          <div className="mt-6 max-w-3xl space-y-4 text-gray-300 leading-relaxed">
            <p>
              Dashboard ini merupakan langkah awal dalam memvisualisasikan komitmen Pertamina terhadap keanekaragaman hayati.
              Data 2023 dan 2024 menunjukkan fondasi yang kuat — dengan{" "}
              <strong className="text-white">{Object.values(shUnitCounts).reduce((a, b) => a + b, 0)} unit operasi</strong>{" "}
              yang terpantau, lebih dari <strong className="text-white">100.000 hektar</strong> area konservasi yang
              teridentifikasi, dan ribuan fauna yang dibebasliarkan ke habitat aslinya.
            </p>
            <p>
              Untuk tahun 2025 dan seterusnya, fokus akan diarahkan pada peningkatan standarisasi pelaporan, perluasan
              cakupan data di SH Gas dan SH Downstream, serta pengembangan metrik biodiversitas yang lebih komprehensif.
            </p>
          </div>
        </motion.div>

        {/* SH Navigation Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUB_HOLDINGS.map((sh, i) => {
            const unitCount = shUnitCounts[sh.key] ?? 0;

            return (
              <motion.div
                key={sh.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <Link
                  href={`/${sh.slug}`}
                  className="group block rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    backgroundColor: `${sh.color}20`,
                    borderLeft: `4px solid ${sh.color}`,
                  }}
                >
                  <h3 className="text-lg font-bold text-white">{sh.label}</h3>
                  <p className="mt-1 text-sm text-gray-400">{unitCount} Unit Operasi</p>
                  <div
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    style={{ color: sh.color }}
                  >
                    Lihat Detail
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Attribution */}
        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-xs text-gray-500">
            Sumber data: Kertas Kerja Environmental 2023 &amp; 2024, Pertamina Group. Dashboard dibuat untuk keperluan
            internal monitoring dan pelaporan biodiversitas.
          </p>
        </div>
      </div>
    </section>
  );
}
