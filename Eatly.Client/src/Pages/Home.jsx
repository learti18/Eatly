import React from "react";
import HeroSection from "../components/Home/HeroSection";
import StatsSection from "../components/Home/StatsSection";
import FeatureDownloadSection from "../components/Home/FeatureDownloadSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <StatsSection />
      <FeatureDownloadSection />
    </div>
  );
}
