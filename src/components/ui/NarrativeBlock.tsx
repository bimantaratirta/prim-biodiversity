import { Lightbulb, AlertTriangle, Info } from "lucide-react";

interface NarrativeBlockProps {
  children: React.ReactNode;
  variant?: "default" | "callout" | "insight" | "warning";
  className?: string;
}

const variantStyles = {
  default: "",
  callout: "border-l-4 border-blue-500 bg-blue-50 rounded-lg px-6 py-4",
  insight: "border-l-4 border-green-500 bg-green-50 rounded-lg px-6 py-4",
  warning: "border-l-4 border-amber-500 bg-amber-50 rounded-lg px-6 py-4",
};

const variantIcons = {
  default: null,
  callout: <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />,
  insight: <Lightbulb className="h-5 w-5 text-green-600 flex-shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />,
};

export default function NarrativeBlock({
  children,
  variant = "default",
  className = "",
}: NarrativeBlockProps) {
  const icon = variantIcons[variant];

  if (variant === "default") {
    return (
      <div
        className={`max-w-3xl text-gray-600 leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:underline ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      <div className="flex gap-3">
        {icon}
        <div className="text-gray-700 leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
