"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { width: 120, height: 120, inner: 35, outer: 55 },
  md: { width: 200, height: 200, inner: 55, outer: 90 },
  lg: { width: 280, height: 280, inner: 80, outer: 130 },
};

export default function DonutChart({
  data,
  centerLabel,
  size = "md",
}: DonutChartProps) {
  const s = SIZES[size];

  return (
    <div
      className="relative mx-auto"
      style={{ width: s.width, height: s.height }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={s.inner}
            outerRadius={s.outer}
            dataKey="value"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} unit`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{centerLabel}</span>
        </div>
      )}
    </div>
  );
}
