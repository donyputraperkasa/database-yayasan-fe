"use client";

import { useState } from "react";
import { CreatorLicense } from "./creator-license";

export function CreatorFooter() {
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  return (
    <>
      <footer className="absolute inset-x-0 bottom-5 z-10 px-5">
        <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#d8e3f4] bg-white/82 px-4 py-3 text-xs text-[#617089] shadow-lg shadow-[#1f4f8f]/8 backdrop-blur sm:gap-3 sm:px-5 sm:text-sm">
          <span className="text-[#1f4f8f]">© 2026 MyBOPKRI Internal System v1.0</span>
          <span className="h-2 w-2 rounded-full bg-[#f2d35f]" />
          <span>Created by</span>
          <a
            href="https://portofolio-ku-gold.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#1f4f8f] underline-offset-4 transition hover:text-[#29328f]"
          >
            Dony Putra Perkasa
          </a>
          <span className="h-2 w-2 rounded-full bg-[#f2d35f]" />
          <button
            type="button"
            onClick={() => setIsLicenseOpen(true)}
            className="font-semibold text-[#1f4f8f] underline-offset-4 transition hover:text-[#29328f]"
          >
            License
          </button>
        </div>
      </footer>

      <CreatorLicense
        open={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
      />
    </>
  );
}
