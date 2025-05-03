import React from "react";
import HeroSection from "../components/Home/HeroSection";
import StatsSection from "../components/Home/StatsSection";
import FeatureDownloadSection from "../components/Home/FeatureDownloadSection";
import TopRestaurantsSection from "../components/Home/TopRestaurantsSection";
import TopDishesSection from "../components/Home/TopDishesSection";
import TestimonialSection from "../components/Home/TestimonialsSection";
import PromoBannerSection from "../components/Shared/PromoBannerSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <StatsSection />
      <FeatureDownloadSection />
      <TopRestaurantsSection />
      <TopDishesSection />
      <TestimonialSection />
      <PromoBannerSection />
    </div>
  );
}
