"use client";

import { useState } from "react";
import { CreatorLicense } from "@/components/landing/creator-license";

export function DashboardCreatorFooter() {
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  return (
    <>
      <footer className="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-[#dbe5f4] bg-white px-4 py-3 text-xs text-[#617089] shadow-sm sm:text-sm">
        <span className="text-[#1f4f8f]">
          © 2026 MyBOPKRI Internal System
        </span>
        <span className="h-2 w-2 rounded-full bg-[#f2d35f]" />
        <span>Created by</span>
        <a
          href="https://portofolio-ku-gold.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#1f4f8f] hover:text-[#29328f]"
        >
          Dony Putra Perkasa
        </a>
        <span className="h-2 w-2 rounded-full bg-[#f2d35f]" />
        <button
          type="button"
          onClick={() => setIsLicenseOpen(true)}
          className="font-semibold text-[#1f4f8f] hover:text-[#29328f]"
        >
          License
        </button>
      </footer>
      <CreatorLicense
        open={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
      />
    </>
  );
}
