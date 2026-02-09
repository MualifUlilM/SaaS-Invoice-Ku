import type { Metadata } from "next";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingPreviewSection,
  FAQSection,
  CTASection,
} from "@/components/sections/home";

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Kelola Invoice Bisnis Lebih Mudah",
  description:
    "Buat, kirim, dan lacak invoice bisnis Anda dengan mudah. Dipercaya 10.000+ freelancer dan UKM Indonesia.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
