"use client";

import { formatNumber } from "@/lib/utils";

interface SlopeChartProps {
  data: {
    name: string;
    value2023: number;
    value2024: number;
    color: string;
  }[];
}

export default function SlopeChart({ data }: SlopeChartProps) {
  const allValues = data.flatMap((d) => [d.value2023, d.value2024]);
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues.filter((v) => v > 0));

  const W = 500;
  const H = 300;
  const PAD_LEFT = 80;
  const PAD_RIGHT = 140;
  const PAD_Y = 30;

  const scale = (v: number) => {
    if (maxVal === minVal) return H / 2;
    return PAD_Y + (H - 2 * PAD_Y) * (1 - (v - minVal) / (maxVal - minVal));
  };

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xl mx-auto">
        {/* Axis labels */}
        <text x={PAD_LEFT} y={18} textAnchor="middle" className="fill-gray-400 text-xs">
          2023
        </text>
        <text x={W - PAD_RIGHT} y={18} textAnchor="middle" className="fill-gray-400 text-xs">
          2024
        </text>

        {/* Vertical lines */}
        <line
          x1={PAD_LEFT} y1={PAD_Y} x2={PAD_LEFT} y2={H - PAD_Y}
          stroke="#E5E7EB" strokeWidth={1}
        />
        <line
          x1={W - PAD_RIGHT} y1={PAD_Y} x2={W - PAD_RIGHT} y2={H - PAD_Y}
          stroke="#E5E7EB" strokeWidth={1}
        />

        {/* Lines and dots */}
        {data.map((d) => {
          const y1 = scale(d.value2023);
          const y2 = scale(d.value2024);
          return (
            <g key={d.name}>
              <line
                x1={PAD_LEFT} y1={y1} x2={W - PAD_RIGHT} y2={y2}
                stroke={d.color} strokeWidth={2.5} opacity={0.8}
              />
              <circle cx={PAD_LEFT} cy={y1} r={4} fill={d.color} />
              <circle cx={W - PAD_RIGHT} cy={y2} r={4} fill={d.color} />
              {/* Left label */}
              <text
                x={PAD_LEFT - 8} y={y1 + 4}
                textAnchor="end"
                style={{ fontSize: 10, fill: "#6B7280" }}
              >
                {formatNumber(d.value2023, 0)}
              </text>
              {/* Right label + name */}
              <text
                x={W - PAD_RIGHT + 8} y={y2 + 4}
                style={{ fontSize: 10, fill: d.color, fontWeight: 600 }}
              >
                {formatNumber(d.value2024, 0)} — {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
