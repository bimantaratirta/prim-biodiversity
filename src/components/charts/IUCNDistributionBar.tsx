"use client";

import { IUCN_CONFIG } from "@/lib/constants";
import type { IUCNStatus } from "@/data/types";

interface IUCNDistributionBarProps {
  data: Record<string, number>;
}

const STATUS_ORDER: IUCNStatus[] = ["CR", "EN", "VU", "NT", "LC", "DD"];

export default function IUCNDistributionBar({
  data,
}: IUCNDistributionBarProps) {
  const total = STATUS_ORDER.reduce((sum, s) => sum + (data[s] || 0), 0);
  if (total === 0) return null;

  return (
    <div>
      {/* Bar */}
      <div className="flex h-8 overflow-hidden rounded-full">
        {STATUS_ORDER.map((status) => {
          const count = data[status] || 0;
          if (count === 0) return null;
          const pct = (count / total) * 100;
          const config = IUCN_CONFIG[status];
          return (
            <div
              key={status}
              className="flex items-center justify-center text-xs font-bold text-white transition-all"
              style={{
                width: `${pct}%`,
                backgroundColor: config.color,
                minWidth: pct > 3 ? undefined : "20px",
                color:
                  status === "VU" || status === "NE" ? "#1A1A2E" : "white",
              }}
              title={`${config.label}: ${count} (${pct.toFixed(0)}%)`}
            >
              {pct > 5 ? status : ""}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {STATUS_ORDER.map((status) => {
          const count = data[status] || 0;
          if (count === 0) return null;
          const config = IUCN_CONFIG[status];
          return (
            <div key={status} className="flex items-center gap-1.5 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-gray-600">
                {status} — {config.labelId} ({count})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
