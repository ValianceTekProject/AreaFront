"use client";

import { Moon, ArrowUp, Type, Palette } from "lucide-react";
import Footer from "../Components/Footer";
import Banner from "../Components/Area_banner";
import Navbar from "../Components/Navbar";
import AccessibilityCard from "../Components/AccessibilityCard";
import { useAccessibility } from "../Hooks/useAccessibility";

export default function AccessibilityPage() {
  const {
    toggleLargeText,
    toggleDyslexic,
    colorBlind1,
    colorBlind2,
    colorBlind3,
  } = useAccessibility();

  return (
    <div className="min-h-screen bg-[#FFFAFA] flex flex-col">
      <Banner />
      <div className="mt-10">
        <Navbar />
      </div>

      <main className="flex-1 w-full px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1400px] mx-auto">

          <AccessibilityCard
          icon={<ArrowUp size={36} />}
          title="Increase font size"
          onClick={toggleLargeText} />

          <AccessibilityCard
          icon={<Type size={36} />}
          title="Dyslexic mode"
          onClick={toggleDyslexic} />

          <AccessibilityCard
          icon={<Palette size={36} />}
          title="Colour blind mode 1"
          onClick={colorBlind1} />

          <AccessibilityCard
          icon={<Palette size={36} />}
          title="Colour blind mode 2"
          onClick={colorBlind2} />

          <AccessibilityCard
          icon={<Palette size={36} />}
          title="Colour blind mode 3"
          onClick={colorBlind3} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
