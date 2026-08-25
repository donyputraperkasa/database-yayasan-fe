import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

type CreatorSignatureProps = {
  onOpenLicense: () => void;
  variant?: "floating" | "dashboard";
};

export function CreatorSignature({
  onOpenLicense,
  variant = "floating",
}: CreatorSignatureProps) {
  const isDashboard = variant === "dashboard";

  return (
    <div
      className={`group relative isolate flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 overflow-hidden border border-[#d6e3f4] bg-white/92 text-xs text-[#526078] shadow-lg shadow-[#1f4f8f]/8 backdrop-blur-xl transition sm:gap-x-4 sm:text-sm ${
        isDashboard
          ? "w-full max-w-3xl rounded-xl px-4 py-3"
          : "rounded-full px-5 py-2.5 shadow-md"
      }`}
    >
      {/* Top subtle golden hairline */}
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f2d35f] to-transparent opacity-90" />

      {/* Brand & Version */}
      <div className="flex items-center gap-1.5 font-semibold text-[#1f4f8f]">
        <Sparkles className="h-3.5 w-3.5 text-[#e5b224]" />
        <span>MyBOPKRI</span>
        <span className="rounded-md bg-[#eef4fc] px-1.5 py-0.5 text-[10px] font-bold text-[#1f4f8f]">
          v1.0
        </span>
      </div>

      <span className="text-[#cbd5e1]">•</span>

      {/* Author Attribution */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-[#64748b] sm:text-xs">
          Karya & Hak Cipta oleh
        </span>
        <a
          href="https://portofolio-ku-gold.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-bold text-[#1f4f8f] transition hover:text-[#143763] hover:underline"
        >
          <span>Dony Putra Perkasa</span>
          <ExternalLink className="h-3.5 w-3.5 text-[#e5b224]" />
        </a>
      </div>

      <span className="text-[#cbd5e1]">•</span>

      {/* License Button */}
      <button
        type="button"
        onClick={onOpenLicense}
        className="inline-flex items-center gap-1 rounded-md border border-[#d6e3f4] bg-[#f8fbff] px-2 py-0.5 text-[11px] font-semibold text-[#1f4f8f] transition hover:border-[#1f4f8f] hover:bg-[#eef4fc] sm:text-xs"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-[#1f4f8f]" />
        <span>Lisensi Resmi</span>
      </button>
    </div>
  );
}
