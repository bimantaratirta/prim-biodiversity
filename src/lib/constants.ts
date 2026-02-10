// Constants — see prompts/13-data-layer.md

import type {
  SubHoldingMeta,
  BiodiversityCategory,
  IUCNStatus,
} from "@/data/types";

export const SUB_HOLDINGS: SubHoldingMeta[] = [
  {
    key: "SH Upstream",
    slug: "sh-upstream",
    label: "SH Upstream",
    labelFull: "Sub-Holding Upstream",
    color: "#00539C",
    colorLight: "#00539C20",
    sampleUnits: [
      "Region 1",
      "Region 2",
      "Region 3",
      "Region 4",
      "Region 5",
    ],
  },
  {
    key: "SH Downstream",
    slug: "sh-downstream",
    label: "SH Downstream",
    labelFull: "Sub-Holding Downstream",
    color: "#E31937",
    colorLight: "#E3193720",
    mergedFrom: ["SH R&P", "SH C&T", "SH IML"],
    sampleUnits: ["RU II Dumai", "RU III", "MOR I", "PT PIS"],
  },
  {
    key: "SH PNRE",
    slug: "sh-pnre",
    label: "SH PNRE",
    labelFull: "Sub-Holding Pertamina New & Renewable Energy",
    color: "#2E8540",
    colorLight: "#2E854020",
    sampleUnits: [
      "PGE Area Kamojang",
      "PGE Area Ulubelu",
      "PGE Area Lahendong",
    ],
  },
  {
    key: "SH Gas",
    slug: "sh-gas",
    label: "SH Gas",
    labelFull: "Sub-Holding Gas",
    color: "#F5A623",
    colorLight: "#F5A62320",
    sampleUnits: [
      "PGN",
      "Perta Arun Gas",
      "SAKA Indonesia Pangkah Limited",
    ],
  },
];

export const SH_COLORS: Record<string, string> = {
  "SH Upstream": "#00539C",
  "SH Downstream": "#E31937",
  "SH PNRE": "#2E8540",
  "SH Gas": "#F5A623",
};

export const BIO_CATEGORY_COLORS: Record<BiodiversityCategory, string> = {
  Rendah: "#E06919",
  Sedang: "#F5A623",
  Tinggi: "#006837",
};

export const IUCN_CONFIG: Record<
  IUCNStatus,
  { color: string; label: string; labelId: string }
> = {
  CR: { color: "#CC3333", label: "Critically Endangered", labelId: "Kritis" },
  EN: { color: "#E06919", label: "Endangered", labelId: "Terancam" },
  VU: { color: "#F0C400", label: "Vulnerable", labelId: "Rentan" },
  NT: {
    color: "#5B9BD5",
    label: "Near Threatened",
    labelId: "Hampir Terancam",
  },
  LC: { color: "#60B236", label: "Least Concern", labelId: "Risiko Rendah" },
  DD: { color: "#999999", label: "Data Deficient", labelId: "Data Kurang" },
  NE: {
    color: "#CCCCCC",
    label: "Not Evaluated",
    labelId: "Belum Dievaluasi",
  },
  EX: { color: "#000000", label: "Extinct", labelId: "Punah" },
};

export const SLUG_TO_SH: Record<string, string> = {
  "sh-upstream": "SH Upstream",
  "sh-downstream": "SH Downstream",
  "sh-pnre": "SH PNRE",
  "sh-gas": "SH Gas",
};

export const YEARS = [2023, 2024] as const;
