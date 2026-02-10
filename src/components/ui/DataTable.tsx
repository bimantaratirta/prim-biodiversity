"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  format?: "number" | "decimal" | "text" | "badge";
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  emptyMessage?: string;
  showInlineBars?: boolean;
  barColorField?: string;
}

function formatCell(value: unknown, format?: Column["format"]): string {
  if (value === null || value === undefined || value === "") return "\u2014";
  switch (format) {
    case "number":
      return formatNumber(Number(value), 0);
    case "decimal":
      return formatNumber(Number(value), 2);
    default:
      return String(value);
  }
}

function BadgeCell({ value }: { value: unknown }) {
  if (value === null || value === undefined || value === "")
    return <span className="italic text-gray-400">&mdash;</span>;
  const isYes = String(value).toLowerCase() === "yes";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
        isYes ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      {isYes ? "Yes" : "No"}
    </span>
  );
}

export default function DataTable({
  columns,
  data,
  emptyMessage = "Tidak ada data",
  showInlineBars = false,
  barColorField,
}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const maxValues = useMemo(() => {
    if (!showInlineBars) return {};
    const maxes: Record<string, number> = {};
    for (const col of columns) {
      if (col.format === "number" || col.format === "decimal") {
        let max = 0;
        for (const row of data) {
          const v = Number(row[col.key]) || 0;
          if (v > max) max = v;
        }
        maxes[col.key] = max;
      }
    }
    return maxes;
  }, [data, columns, showInlineBars]);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const cmp =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                        ? "text-center"
                        : "text-left"
                  } ${col.sortable ? "cursor-pointer select-none hover:text-gray-700" : ""}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="inline-flex flex-col">
                        {sortKey === col.key ? (
                          sortDir === "asc" ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-3 w-3 opacity-40" />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                className={`transition-colors hover:bg-blue-50/50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                {columns.map((col) => {
                  const raw = row[col.key];
                  const barMax = maxValues[col.key];
                  const barWidth =
                    showInlineBars && barMax
                      ? ((Number(raw) || 0) / barMax) * 100
                      : 0;
                  const barColor =
                    barColorField && row[barColorField]
                      ? String(row[barColorField])
                      : "#00539C";

                  return (
                    <td
                      key={col.key}
                      className={`relative whitespace-nowrap px-4 py-3 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                            ? "text-center"
                            : "text-left"
                      } ${raw === null || raw === undefined || raw === "" ? "italic text-gray-400" : ""}`}
                    >
                      {showInlineBars && barWidth > 0 && (
                        <div
                          className="absolute inset-y-0 left-0 opacity-15"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: barColor,
                          }}
                        />
                      )}
                      <span className="relative z-10">
                        {col.format === "badge" ? (
                          <BadgeCell value={raw} />
                        ) : (
                          formatCell(raw, col.format)
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
