"use client";

import { useAnimatedValue, useInView } from "@/lib/hooks/useAnimatedValue";
import { formatNumber, formatChange, changeDirection } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  value: number | string | null;
  label: string;
  icon?: React.ReactNode;
  format?: "number" | "decimal" | "percentage" | "area";
  suffix?: string;
  previousValue?: number | null;
  animate?: boolean;
  className?: string;
}

function formatValue(
  value: number | string | null,
  format: StatCardProps["format"],
  suffix?: string
): string {
  if (value === null || value === undefined) return "\u2014";
  if (typeof value === "string") return value;

  let formatted: string;
  switch (format) {
    case "decimal":
      formatted = formatNumber(value, 1);
      break;
    case "percentage":
      formatted = `${formatNumber(value, 1)}%`;
      break;
    case "area":
      formatted = `${formatNumber(value, 0)} ha`;
      break;
    default:
      formatted = formatNumber(value, 0);
  }

  return suffix ? `${formatted} ${suffix}` : formatted;
}

export default function StatCard({
  value,
  label,
  icon,
  format = "number",
  suffix,
  previousValue,
  animate = true,
  className = "",
}: StatCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const numericValue = typeof value === "number" ? value : 0;
  const animatedValue = useAnimatedValue(
    animate && typeof value === "number" ? numericValue : 0,
    1500,
    inView
  );

  const displayValue =
    animate && typeof value === "number" && inView
      ? formatValue(animatedValue, format, suffix)
      : formatValue(value, format, suffix);

  const direction =
    previousValue !== undefined
      ? changeDirection(typeof value === "number" ? value : null, previousValue)
      : null;
  const changeText =
    previousValue !== undefined
      ? formatChange(typeof value === "number" ? value : null, previousValue)
      : null;

  return (
    <div ref={ref} className={`card relative overflow-hidden ${className}`}>
      {icon && (
        <div className="absolute right-4 top-4 text-gray-300 opacity-30">
          <div className="h-8 w-8">{icon}</div>
        </div>
      )}
      <div className="relative z-10">
        <p className="text-3xl font-bold text-gray-900">{displayValue}</p>
        <p className="mt-1 text-sm text-gray-500">{label}</p>
        {changeText && changeText !== "\u2014" && (
          <div
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              direction === "up"
                ? "bg-green-50 text-green-700"
                : direction === "down"
                  ? "bg-red-50 text-red-700"
                  : "bg-gray-50 text-gray-600"
            }`}
          >
            {direction === "up" && <TrendingUp className="h-3 w-3" />}
            {direction === "down" && <TrendingDown className="h-3 w-3" />}
            {direction === "neutral" && <Minus className="h-3 w-3" />}
            {changeText}
          </div>
        )}
      </div>
    </div>
  );
}
