"use client";

import { formatNumber } from "@/lib/utils";

interface GroupedBarChartProps {
  data: {
    name: string;
    value2023: number;
    value2024: number;
    color: string;
  }[];
}

export default function GroupedBarChart({ data }: GroupedBarChartProps) {
  const maxVal = Math.max(...data.flatMap((d) => [d.value2023, d.value2024]));

  const BAR_H = 28;
  const GAP = 6;
  const GROUP_GAP = 28;
  const LABEL_W = 140;
  const CHANGE_W = 70;
  const W = 800;
  const groupHeight = BAR_H * 2 + GAP;
  const H = data.length * (groupHeight + GROUP_GAP) - GROUP_GAP + 10;

  // Minimum bar width for text to be inside
  const MIN_BAR_FOR_LABEL = 40;

  const fmtVal = (v: number) => (v > 0 ? formatNumber(v, v < 100 ? 2 : 0) : "—");

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: 900 }}>
        {data.map((d, i) => {
          const groupY = i * (groupHeight + GROUP_GAP);
          const barAreaW = W - LABEL_W - CHANGE_W;
          const w2023 = maxVal > 0 ? (d.value2023 / maxVal) * barAreaW : 0;
          const w2024 = maxVal > 0 ? (d.value2024 / maxVal) * barAreaW : 0;

          const bar2023Wide = w2023 >= MIN_BAR_FOR_LABEL;
          const bar2024Wide = w2024 >= MIN_BAR_FOR_LABEL;

          return (
            <g key={d.name}>
              {/* SH label */}
              <text
                x={LABEL_W - 10}
                y={groupY + groupHeight / 2 + 1}
                textAnchor="end"
                dominantBaseline="central"
                style={{ fontSize: 12, fill: "#374151", fontWeight: 600 }}
              >
                {d.name}
              </text>

              {/* 2023 bar */}
              <rect x={LABEL_W} y={groupY} width={Math.max(w2023, 2)} height={BAR_H} rx={4} fill={d.color} opacity={0.3} />
              {bar2023Wide && (
                <text
                  x={LABEL_W + 8}
                  y={groupY + BAR_H / 2}
                  dominantBaseline="central"
                  style={{ fontSize: 9, fill: "#6B7280", fontWeight: 500 }}
                >
                  2023
                </text>
              )}
              {/* 2023 value (always outside bar) */}
              <text
                x={LABEL_W + Math.max(w2023, 2) + 8}
                y={groupY + BAR_H / 2}
                dominantBaseline="central"
                style={{ fontSize: 11, fill: "#6B7280" }}
              >
                {!bar2023Wide ? `2023 · ${fmtVal(d.value2023)}` : fmtVal(d.value2023)}
              </text>

              {/* 2024 bar */}
              <rect
                x={LABEL_W}
                y={groupY + BAR_H + GAP}
                width={Math.max(w2024, 2)}
                height={BAR_H}
                rx={4}
                fill={d.color}
                opacity={0.85}
              />
              {bar2024Wide && (
                <text
                  x={LABEL_W + 8}
                  y={groupY + BAR_H + GAP + BAR_H / 2}
                  dominantBaseline="central"
                  style={{ fontSize: 9, fill: "#fff", fontWeight: 600 }}
                >
                  2024
                </text>
              )}
              {/* 2024 value (always outside bar) */}
              <text
                x={LABEL_W + Math.max(w2024, 2) + 8}
                y={groupY + BAR_H + GAP + BAR_H / 2}
                dominantBaseline="central"
                style={{ fontSize: 11, fill: "#374151", fontWeight: 600 }}
              >
                {!bar2024Wide ? `2024 · ${fmtVal(d.value2024)}` : fmtVal(d.value2024)}
              </text>

              {/* Change indicator */}
              {d.value2023 > 0 &&
                d.value2024 > 0 &&
                (() => {
                  const pct = ((d.value2024 - d.value2023) / d.value2023) * 100;
                  const isUp = pct > 0;
                  const color = isUp ? "#16a34a" : pct < 0 ? "#dc2626" : "#6B7280";
                  const sign = isUp ? "+" : "";
                  return (
                    <text
                      x={W - 8}
                      y={groupY + groupHeight / 2 + 1}
                      textAnchor="end"
                      dominantBaseline="central"
                      style={{ fontSize: 10, fill: color, fontWeight: 600 }}
                    >
                      {sign}
                      {formatNumber(pct, 1)}%
                    </text>
                  );
                })()}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
