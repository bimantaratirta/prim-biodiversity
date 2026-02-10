import IUCNBadge from "./IUCNBadge";
import type { IUCNStatus } from "@/data/types";

interface SpeciesCardProps {
  commonName: string;
  latinName: string;
  iucnStatus: string;
  locations?: string[];
  releasedCount?: number;
  variant?: "full" | "compact";
}

export default function SpeciesCard({
  commonName,
  latinName,
  iucnStatus,
  locations,
  releasedCount,
  variant = "full",
}: SpeciesCardProps) {
  const validStatus = iucnStatus as IUCNStatus;

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 py-1">
        <span className="font-medium text-gray-900">{commonName}</span>
        {latinName && (
          <span className="text-sm italic text-gray-500">{latinName}</span>
        )}
        {iucnStatus && <IUCNBadge status={validStatus} size="sm" />}
      </div>
    );
  }

  return (
    <div className="relative rounded-xl bg-white p-4 ring-1 ring-gray-100">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{commonName}</h4>
          {latinName && (
            <p className="text-sm italic text-gray-500">{latinName}</p>
          )}
        </div>
        {iucnStatus && <IUCNBadge status={validStatus} size="md" />}
      </div>
      {locations && locations.length > 0 && (
        <p className="mt-2 line-clamp-2 text-xs text-gray-500">
          {locations.join(", ")}
        </p>
      )}
      {releasedCount !== undefined && releasedCount > 0 && (
        <span className="mt-2 inline-block rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
          {releasedCount.toLocaleString("id-ID")} dibebasliarkan
        </span>
      )}
    </div>
  );
}
