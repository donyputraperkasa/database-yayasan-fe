"use client";

import { useState } from "react";
import { BuildingPhoto } from "./building-photo";
import { CreatorFooter } from "./creator-footer";
import { FloatingContact } from "./floating-contact";
import { HeroContent } from "./hero-content";
import { LandingHeader } from "./landing-header";
import { LoginModal } from "./login-modal";

export function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8ff] text-[#172033] lg:h-screen lg:overflow-hidden">
      <div
        className={`relative min-h-screen transition duration-300 lg:h-full ${
          isLoginOpen ? "blur-[3px]" : ""
        }`}
      >
        <div className="absolute inset-0 bg-[url('/landing-dashboard-pattern.svg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/76" />

        <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-28 pt-5 sm:px-10 lg:h-full lg:px-16 lg:pb-20 lg:pt-6">
          <LandingHeader onOpenLogin={() => setIsLoginOpen(true)} />

          <div className="grid flex-1 items-center gap-8 py-8 lg:min-h-0 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
            <div>
              <HeroContent onOpenLogin={() => setIsLoginOpen(true)} />
            </div>
            <BuildingPhoto />
          </div>
        </section>

        <CreatorFooter />
        <FloatingContact />
      </div>

      {isLoginOpen ? <LoginModal onClose={() => setIsLoginOpen(false)} /> : null}
    </main>
  );
}
