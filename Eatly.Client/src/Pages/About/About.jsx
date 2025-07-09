import React from "react";
import PageTransition from "../../components/Shared/PageTransition";
import {
  AboutHero,
  AboutStats,
  AboutStory,
  AboutFeatures,
  AboutMission,
  AboutCTA,
} from "../../components/About";

export default function About() {
  return (
    <PageTransition>
      <div className="bg-background-main min-h-screen">
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutFeatures />
        <AboutMission />
        <AboutCTA />
      </div>
    </PageTransition>
  );
}
