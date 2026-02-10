// Utility functions — see prompts/13-data-layer.md

export function formatNumber(value: number | null, decimals = 0): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatArea(value: number | null): string {
  if (value === null) return "—";
  return `${formatNumber(value, 2)} ha`;
}

export function formatChange(
  current: number | null,
  previous: number | null
): string {
  if (current === null || previous === null || previous === 0) return "—";
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${formatNumber(change, 1)}%`;
}

export function changeDirection(
  current: number | null,
  previous: number | null
): "up" | "down" | "neutral" {
  if (current === null || previous === null) return "neutral";
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
}

export function parseSpeciesLine(
  line: string
): {
  commonName: string;
  latinName: string | null;
  iucnStatus: string | null;
} | null {
  const cleaned = line
    .replace(/^\d+\.\s*/, "")
    .replace(/^[a-z]\.\s*/i, "")
    .trim();
  if (!cleaned || cleaned === "-" || cleaned === "Tidak ada") return null;

  const match = cleaned.match(
    /^(.+?)\s*(?:\(([^)]+)\))?\s*[-–—]\s*(CR|EN|VU|NT|LC|DD|NE|EX|DL)\s*$/i
  );
  if (match) {
    return {
      commonName: match[1].trim(),
      latinName: match[2]?.trim() || null,
      iucnStatus: match[3].toUpperCase(),
    };
  }

  const simpleMatch = cleaned.match(
    /^(.+?)\s*[-–—]\s*(CR|EN|VU|NT|LC|DD|NE|EX|DL)\s*$/i
  );
  if (simpleMatch) {
    return {
      commonName: simpleMatch[1].trim(),
      latinName: null,
      iucnStatus: simpleMatch[2].toUpperCase(),
    };
  }

  return {
    commonName: cleaned,
    latinName: null,
    iucnStatus: null,
  };
}
