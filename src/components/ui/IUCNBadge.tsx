"use client";

import { useState } from "react";
import { IUCN_CONFIG } from "@/lib/constants";
import type { IUCNStatus } from "@/data/types";

interface IUCNBadgeProps {
  status: IUCNStatus;
  showLabel?: boolean;
  size?: "sm" | "md";
}

const needsDarkText = new Set<IUCNStatus>(["VU", "NE"]);

export default function IUCNBadge({
  status,
  showLabel = false,
  size = "sm",
}: IUCNBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = IUCN_CONFIG[status];
  if (!config) return null;

  const textColor = needsDarkText.has(status) ? "text-gray-900" : "text-white";
  const sizeClasses =
    size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2 py-1";

  return (
    <span className="relative inline-flex items-center gap-1.5">
      <span
        className={`inline-block rounded-full font-bold uppercase ${textColor} ${sizeClasses}`}
        style={{ backgroundColor: config.color }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {status}
      </span>
      {showLabel && (
        <span className="text-sm text-gray-600">{config.label}</span>
      )}
      {showTooltip && !showLabel && (
        <span className="absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
          {config.label}
        </span>
      )}
    </span>
  );
}
