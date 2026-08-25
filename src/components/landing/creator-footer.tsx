"use client";

import { useState } from "react";
import { CreatorLicense } from "./creator-license";
import { CreatorSignature } from "./creator-signature";

export function CreatorFooter() {
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  return (
    <>
      <footer className="relative mt-auto w-full px-4 pb-6 pt-4 lg:absolute lg:inset-x-0 lg:bottom-4 lg:z-10 lg:p-0">
        <div className="mx-auto w-fit max-w-full">
          <CreatorSignature onOpenLicense={() => setIsLicenseOpen(true)} />
        </div>
      </footer>

      <CreatorLicense
        open={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
      />
    </>
  );
}
