import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import AreaKonservasiSection from "@/components/sections/AreaKonservasiSection";
import LocationProximitySection from "@/components/sections/LocationProximitySection";
import BiodiversityIndexSection from "@/components/sections/BiodiversityIndexSection";
import SpeciesHighlightSection from "@/components/sections/SpeciesHighlightSection";
import SubholdingComparisonSection from "@/components/sections/SubholdingComparisonSection";
import YearOverYearSection from "@/components/sections/YearOverYearSection";
import ClosingSection from "@/components/sections/ClosingSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <OverviewSection />
      <AreaKonservasiSection />
      <LocationProximitySection />
      <BiodiversityIndexSection />
      <SpeciesHighlightSection />
      <SubholdingComparisonSection />
      <YearOverYearSection />
      <ClosingSection />
    </div>
  );
}
