import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { Features } from "@/components/features";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ProcessTracker } from "@/components/ui/process-tracker";

export default function HomePage() {
  return (
    <>
      
      <main>
        <Hero />
        <CategoryGrid />
        <ProcessTracker/>
        <CTASection />
      </main>
      
    </>
  );
}
