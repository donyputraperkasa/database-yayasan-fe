"use client";

import { useState } from "react";
import { CreatorFooter } from "./creator-footer";
import { FloatingContact } from "./floating-contact";
import { HeroContent } from "./hero-content";
import { LandingHeader } from "./landing-header";
import { LoginModal } from "./login-modal";
import { SummaryPanel } from "./summary-panel";

export function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className="h-screen overflow-hidden bg-[#f5f8ff] text-[#172033]">
      <div
        className={`relative h-full transition duration-300 ${
          isLoginOpen ? "blur-[3px]" : ""
        }`}
      >
        <div className="absolute inset-0 bg-[url('/landing-dashboard-pattern.svg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/76" />

        <section className="relative mx-auto flex h-full max-w-7xl flex-col px-6 pb-20 pt-6 sm:px-10 lg:px-16">
          <LandingHeader onOpenLogin={() => setIsLoginOpen(true)} />

          <div className="grid min-h-0 flex-1 items-center gap-8 py-6 lg:grid-cols-[0.88fr_1.12fr]">
            <HeroContent onOpenLogin={() => setIsLoginOpen(true)} />
            <SummaryPanel />
          </div>
        </section>

        <CreatorFooter />
        <FloatingContact />
      </div>

      {isLoginOpen ? <LoginModal onClose={() => setIsLoginOpen(false)} /> : null}
    </main>
  );
}
