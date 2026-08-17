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
    <main className="min-h-screen overflow-x-hidden bg-[#eef3fb] text-[#172033] lg:h-screen lg:overflow-hidden">
      <div
        className={`relative min-h-screen transition duration-300 lg:h-full ${
          isLoginOpen ? "blur-[3px]" : ""
        }`}
      >
        {/* Background pattern utama */}
        <div className="absolute inset-0 bg-[url('/landing-dashboard-pattern.svg')] bg-cover bg-center" />
        {/* Overlay putih semi-transparan — lebih tipis agar pattern terlihat */}
        <div className="absolute inset-0 bg-white/68" />

        {/* Ornamen klasik: garis diagonal */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="classic-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40 L40 0" stroke="#1f4f8f" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#classic-lines)" />
        </svg>

        {/* Ornamen klasik: lingkaran aksen kanan atas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-28 h-[480px] w-[480px] rounded-full border border-[#1f4f8f]/8 bg-[#dbeafe]/30 blur-3xl"
        />
        {/* Ornamen klasik: lingkaran aksen kiri bawah */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-[360px] w-[360px] rounded-full border border-[#f2d35f]/20 bg-[#f2d35f]/10 blur-2xl"
        />
        {/* Garis emas horizontal dekoratif — atas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f2d35f]/60 to-transparent"
        />
        {/* Garis emas horizontal dekoratif — bawah */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f2d35f]/40 to-transparent"
        />

        <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-28 pt-5 sm:px-10 lg:h-full lg:px-16 lg:pb-20 lg:pt-6">
          <LandingHeader onOpenLogin={() => setIsLoginOpen(true)} />

          <div className="grid flex-1 items-center gap-8 py-8 lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
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
