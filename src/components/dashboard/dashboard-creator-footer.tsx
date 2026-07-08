"use client";

import { useState } from "react";
import { CreatorLicense } from "@/components/landing/creator-license";
import { CreatorSignature } from "@/components/landing/creator-signature";

export function DashboardCreatorFooter() {
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  return (
    <>
      <footer className="flex justify-center">
        <CreatorSignature
          onOpenLicense={() => setIsLicenseOpen(true)}
          variant="dashboard"
        />
      </footer>
      <CreatorLicense
        open={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
      />
    </>
  );
}
