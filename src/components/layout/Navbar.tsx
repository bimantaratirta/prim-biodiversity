"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { SUB_HOLDINGS } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Area Konservasi", href: "#area-konservasi" },
  { label: "Biodiversity Index", href: "#biodiversity-index" },
  { label: "Species", href: "#species" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shDropdownOpen, setSHDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const textClass = scrolled ? "text-gray-800" : "text-white";
  const logoClass = scrolled ? "text-gray-900" : "text-white";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className={`text-lg font-bold ${logoClass} transition-colors`}>
          Biodiversity Dashboard
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm font-medium ${textClass} transition-colors hover:underline underline-offset-4`}
            >
              {link.label}
            </button>
          ))}

          {/* SH Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSHDropdownOpen(true)}
            onMouseLeave={() => setSHDropdownOpen(false)}
          >
            <button
              className={`inline-flex items-center gap-1 text-sm font-medium ${textClass} transition-colors hover:underline underline-offset-4`}
            >
              Sub-Holding
              <ChevronDown className="h-3 w-3" />
            </button>
            {shDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-100">
                {SUB_HOLDINGS.map((sh) => (
                  <Link
                    key={sh.slug}
                    href={`/${sh.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: sh.color }}
                    />
                    {sh.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${textClass}`}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-2 border-t border-gray-100 pt-2">
            <p className="py-1 text-xs font-medium uppercase text-gray-400">
              Sub-Holding
            </p>
            {SUB_HOLDINGS.map((sh) => (
              <Link
                key={sh.slug}
                href={`/${sh.slug}`}
                className="flex items-center gap-2 py-2 text-sm text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: sh.color }}
                />
                {sh.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
