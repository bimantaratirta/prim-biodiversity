"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, type TooltipProps } from "recharts";

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

/* ── Darken a hex colour for use as readable text ── */
function darkenHex(hex: string, amount = 0.35): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let hue = 0,
    sat = 0;
  const lum = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    sat = lum > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const newLum = Math.max(0, lum - amount);

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let rr: number, gg: number, bb: number;
  if (sat === 0) {
    rr = gg = bb = newLum;
  } else {
    const q = newLum < 0.5 ? newLum * (1 + sat) : newLum + sat - newLum * sat;
    const p = 2 * newLum - q;
    rr = hue2rgb(p, q, hue + 1 / 3);
    gg = hue2rgb(p, q, hue);
    bb = hue2rgb(p, q, hue - 1 / 3);
  }

  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
}

/* ── Color map helpers ── */
const NO_COLOR = "#64748B";
const NULL_COLOR = "#ebebebff";

function getColors(yesColor: string) {
  return {
    yes: { fill: yesColor, text: darkenHex(yesColor) },
    no: { fill: NO_COLOR, text: darkenHex(NO_COLOR) },
    null_count: { fill: NULL_COLOR, text: "#6B7280" },
  };
}

const LABEL_MAP: Record<string, string> = {
  yes: "Ya",
  no: "Tidak",
  null_count: "Belum Dilaporkan",
};

export default function StackedPercentBar({ data, label, yesColor = "#2E8540" }: StackedPercentBarProps) {
  const colors = getColors(yesColor);

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

  /* ── Custom Legend with dark text colours ── */
  const renderLegend = () => (
    <div className="flex items-center justify-center gap-5 pt-2 text-xs">
      {(["yes", "no", "null_count"] as const).map((key) => (
        <div key={key} className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colors[key].fill }} />
          <span style={{ color: colors[key].text }} className="font-medium">
            {LABEL_MAP[key]}
          </span>
        </div>
      ))}
    </div>
  );

  /* ── Custom Tooltip with dark text colours ── */
  const renderTooltip = ({ active, payload, label: ttLabel }: TooltipProps<number, string>) => {
    if (!active || !payload?.length) return null;

    const rawMap: Record<string, string> = {
      yes: "rawYes",
      no: "rawNo",
      null_count: "rawNull",
    };

    return (
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
        <p className="mb-1.5 font-semibold text-gray-800">{ttLabel}</p>
        {payload.map((entry) => {
          const key = String(entry.dataKey) as keyof typeof colors;
          const raw = (entry.payload as Record<string, number>)?.[rawMap[key]];
          return (
            <div key={key} className="flex items-center gap-2 py-0.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: colors[key].fill }} />
              <span style={{ color: colors[key].text }} className="font-medium">
                {LABEL_MAP[key]}:
              </span>
              <span className="text-gray-700">
                {raw} unit ({(Number(entry.value) || 0).toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-700">{label}</p>
      <ResponsiveContainer width="100%" height={data.length * 50 + 50}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }} stackOffset="none">
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ fill: "rgba(59, 130, 246, 0.08)" }} content={renderTooltip} />
          <Legend content={renderLegend} />
          <Bar dataKey="yes" stackId="a" fill={colors.yes.fill} barSize={24} radius={[0, 0, 0, 0]} />
          <Bar dataKey="no" stackId="a" fill={colors.no.fill} barSize={24} radius={[0, 0, 0, 0]} />
          <Bar
            dataKey="null_count"
            stackId="a"
            fill={colors.null_count.fill}
            stroke="#94A3B8"
            strokeWidth={0}
            barSize={24}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
