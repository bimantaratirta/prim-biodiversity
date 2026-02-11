"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface StackedPercentBarProps {
  data: {
    name: string;
    yes: number;
    no: number;
    null_count: number;
  }[];
  label: string;
  yesColor?: string;
}

export default function StackedPercentBar({ data, label, yesColor = "#2E8540" }: StackedPercentBarProps) {
  const chartData = data.map((d) => {
    const total = d.yes + d.no + d.null_count;
    return {
      name: d.name,
      yes: total > 0 ? (d.yes / total) * 100 : 0,
      no: total > 0 ? (d.no / total) * 100 : 0,
      null_count: total > 0 ? (d.null_count / total) * 100 : 0,
      rawYes: d.yes,
      rawNo: d.no,
      rawNull: d.null_count,
      total,
    };
  });

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-700">{label}</p>
      <ResponsiveContainer width="100%" height={data.length * 50 + 50}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }} stackOffset="none">
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string, props) => {
              const row = props.payload;
              const rawMap: Record<string, number> = {
                yes: row.rawYes,
                no: row.rawNo,
                null_count: row.rawNull,
              };
              const label = name === "yes" ? "Ya" : name === "no" ? "Tidak" : "Belum Dilaporkan";
              return [`${rawMap[name]} unit (${value.toFixed(0)}%)`, label];
            }}
          />
          <Legend formatter={(value: string) => (value === "yes" ? "Ya" : value === "no" ? "Tidak" : "Belum Dilaporkan")} />
          <Bar dataKey="yes" stackId="a" fill={yesColor} barSize={24} />
          <Bar dataKey="no" stackId="a" fill="#94A3B8" barSize={24} />
          <Bar dataKey="null_count" stackId="a" fill="#CBD5E1" stroke="#64748B" strokeDasharray="3 3" barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
