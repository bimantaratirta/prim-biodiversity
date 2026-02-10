"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { formatNumber } from "@/lib/utils";

interface HorizontalBarProps {
  data: { name: string; value: number; color: string }[];
}

export default function HorizontalBar({ data }: HorizontalBarProps) {
  return (
    <ResponsiveContainer width="100%" height={data.length * 60 + 40}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 80 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 13 }}
        />
        <Tooltip
          formatter={(value: number) => [
            `${formatNumber(value, 2)} ha`,
            "Luasan",
          ]}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v: number) => `${formatNumber(v, 2)} ha`}
            style={{ fontSize: 12, fill: "#6B7280" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
