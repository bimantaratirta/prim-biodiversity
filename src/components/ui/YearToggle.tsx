"use client";

interface YearToggleProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}

export default function YearToggle({
  years,
  selectedYear,
  onChange,
}: YearToggleProps) {
  return (
    <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            year === selectedYear
              ? "bg-white text-gray-900 shadow-sm font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
