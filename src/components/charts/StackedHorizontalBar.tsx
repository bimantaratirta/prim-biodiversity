"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { formatNumber } from "@/lib/utils";

interface StackedHorizontalBarProps {
  data: { name: string; offsite: number; overlap: number; color: string }[];
}

export default function StackedHorizontalBar({
  data,
}: StackedHorizontalBarProps) {
  return (
    <ResponsiveContainer width="100%" height={data.length * 60 + 60}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 13 }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            `${formatNumber(value, 2)} ha`,
            name === "offsite"
              ? "Di luar Wilayah Kerja"
              : "Beririsan dengan Wilayah Kerja",
          ]}
        />
        <Legend
          formatter={(value: string) =>
            value === "offsite"
              ? "Di luar Wilayah Kerja (Offsite)"
              : "Beririsan dengan Wilayah Kerja (Overlap)"
          }
        />
        <Bar dataKey="offsite" stackId="a" radius={[0, 0, 0, 0]} barSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
        <Bar dataKey="overlap" stackId="a" radius={[0, 6, 6, 0]} barSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.5} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
