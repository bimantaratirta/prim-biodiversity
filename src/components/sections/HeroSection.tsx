"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TreePine, Building2, Bird, BarChart3, ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useAnimatedValue } from "@/lib/hooks/useAnimatedValue";
import { summary, getUniqueUnits } from "@/data";
import { formatNumber } from "@/lib/utils";

function AnimatedStat({
  target,
  label,
  icon: Icon,
  color,
  delay,
  inView,
}: {
  target: number;
  label: string;
  icon: typeof TreePine;
  color: string;
  delay: number;
  inView: boolean;
}) {
  const animated = useAnimatedValue(target, 1500, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"
    >
      <Icon className="mb-2 h-6 w-6" style={{ color }} />
      <p className="text-3xl font-bold text-white">
        {formatNumber(animated)}
      </p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </motion.div>
  );
}

export default function HeroSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const year2024 = summary.by_year?.["2024"];

  const stats = useMemo(() => {
    const units2024 = getUniqueUnits(undefined, 2024);
    const unitsWithScore = units2024.filter(
      (u) => u.biodiversity_score != null
    ).length;

    return [
      {
        target: year2024?.area.total_ha ?? 0,
        label: "Hektar Area Konservasi",
        icon: TreePine,
        color: "#00539C",
      },
      {
        target: units2024.length,
        label: "Unit Operasi Terpantau",
        icon: Building2,
        color: "#E31937",
      },
      {
        target: year2024?.fauna.total_released ?? 0,
        label: "Fauna Dibebasliarkan",
        icon: Bird,
        color: "#2E8540",
      },
      {
        target: unitsWithScore,
        label: "Unit dengan Biodiversity Index",
        icon: BarChart3,
        color: "#F5A623",
      },
    ];
  }, [year2024]);

  const scrollToOverview = () => {
    document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pertamina-dark via-pertamina-dark/95 to-sh-upstream/80"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur"
        >
          Data 2023 &amp; 2024
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Keanekaragaman Hayati
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-2xl text-white/80"
        >
          Pertamina Group
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/60"
        >
          Monitoring dan konservasi biodiversitas di seluruh unit operasi
          Pertamina, dari hulu hingga hilir.
        </motion.p>

        {/* Stat cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              {...stat}
              delay={0.4 + i * 0.1}
              inView={inView}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToOverview}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </button>
    </section>
  );
}
