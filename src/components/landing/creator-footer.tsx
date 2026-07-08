"use client";

import { useState } from "react";
import { CreatorLicense } from "./creator-license";
import { CreatorSignature } from "./creator-signature";

export function CreatorFooter() {
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  return (
    <>
      <footer className="absolute inset-x-0 bottom-5 z-10 px-5">
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
