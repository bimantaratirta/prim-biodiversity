// TypeScript types — see prompts/13-data-layer.md

export type SubHolding = "SH Upstream" | "SH Downstream" | "SH PNRE" | "SH Gas";

export type SubHoldingOriginal =
  | "SH Upstream"
  | "SH R&P"
  | "SH C&T"
  | "SH PNRE"
  | "SH Gas"
  | "SH IML";

export type BiodiversityCategory = "Rendah" | "Sedang" | "Tinggi";

export type IUCNStatus = "CR" | "EN" | "VU" | "NT" | "LC" | "DD" | "NE" | "EX";

export interface BiodiversityRecord {
  tahun: number;
  sub_holding: SubHolding;
  sub_holding_original: SubHoldingOriginal;
  unit_operasi: string;
  wilayah_kerja: string | null;
  luasan_offsite_ha: number | null;
  luasan_overlap_ha: number | null;
  luasan_total_ha: number | null;
  location_adjacent: "yes" | "no" | null;
  location_overlapped: "yes" | "no" | null;
  biodiversity_score: number | null;
  biodiversity_category: BiodiversityCategory | null;
  fauna_names: string | null;
  fauna_released_count: number | null;
  flora_names: string | null;
}

export interface AggregatedMetrics {
  total_units: number;
  units_with_data: number;
  area: {
    total_offsite_ha: number | null;
    total_overlap_ha: number | null;
    total_ha: number | null;
    units_with_area: number;
  };
  location: {
    adjacent_yes: number;
    adjacent_no: number;
    adjacent_null: number;
    overlapped_yes: number;
    overlapped_no: number;
    overlapped_null: number;
    both_yes: number;
  };
  biodiversity: {
    rendah: number;
    sedang: number;
    tinggi: number;
    null: number;
    max_score: number | null;
    units_with_score: number;
  };
  fauna: {
    total_released: number;
    units_with_releases: number;
    unique_species_approx: number;
  };
}

export interface SummaryData {
  metadata: {
    total_records: number;
    years: number[];
    sub_holdings: SubHolding[];
    sub_holdings_original: SubHoldingOriginal[];
  };
  by_year: Record<string, AggregatedMetrics>;
  by_subholding: Record<string, Record<string, AggregatedMetrics>>;
  by_subholding_original: Record<string, Record<string, AggregatedMetrics>>;
}

export interface SubHoldingMeta {
  key: SubHolding;
  slug: string;
  label: string;
  labelFull: string;
  color: string;
  colorLight: string;
  mergedFrom?: SubHoldingOriginal[];
  sampleUnits: string[];
}

export interface ParsedSpecies {
  commonName: string;
  latinName: string | null;
  iucnStatus: IUCNStatus | null;
  source: "fauna" | "flora";
  unitOperasi: string;
  subHolding: SubHolding;
}
