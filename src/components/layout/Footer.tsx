import Link from "next/link";
import { SUB_HOLDINGS } from "@/lib/constants";

const SECTION_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Area Konservasi", href: "#area-konservasi" },
  { label: "Biodiversity Index", href: "#biodiversity-index" },
  { label: "Species", href: "#species" },
  { label: "Perbandingan SH", href: "#subholding-comparison" },
  { label: "Year-over-Year", href: "#year-over-year" },
];

export default function Footer() {
  return (
    <footer className="bg-pertamina-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold">Biodiversity Dashboard</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Visualisasi data keanekaragaman hayati di seluruh unit operasi
              Pertamina Group berdasarkan Kertas Kerja Environmental.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigasi
            </h4>
            <ul className="mt-3 space-y-2">
              {SECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Sub-Holding
            </h4>
            <ul className="mt-3 space-y-2">
              {SUB_HOLDINGS.map((sh) => (
                <li key={sh.slug}>
                  <Link
                    href={`/${sh.slug}`}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: sh.color }}
                    />
                    {sh.labelFull}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Data: Kertas Kerja Environmental 2023 &amp; 2024
          </p>
          <p className="text-xs text-gray-500">
            &copy; 2024 Pertamina
          </p>
        </div>
      </div>
    </footer>
  );
}
