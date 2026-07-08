import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

type CreatorSignatureProps = {
  onOpenLicense: () => void;
  variant?: "floating" | "dashboard";
};

const baseClasses =
  "group relative isolate flex max-w-full flex-wrap items-center justify-center gap-2 overflow-hidden border border-[#d7e4f5] bg-white/88 text-[#60708b] shadow-lg shadow-[#1f4f8f]/10 backdrop-blur-xl";

const variants = {
  dashboard: "rounded-2xl px-4 py-3 text-xs sm:text-sm",
  floating: "rounded-full px-4 py-3 text-xs sm:gap-3 sm:px-5 sm:text-sm",
};

export function CreatorSignature({
  onOpenLicense,
  variant = "floating",
}: CreatorSignatureProps) {
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f2d35f] to-transparent opacity-80" />
      <span className="flex items-center gap-2 font-semibold text-[#1f4f8f]">
        <Sparkles className="h-4 w-4 text-[#f0c83d]" />
        MyBOPKRI v1.0
      </span>
      <Dot />
      <span>created by</span>
      <a
        href="https://portofolio-ku-gold.vercel.app/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 font-bold text-[#1f4f8f] transition hover:text-[#29328f]"
      >
        Dony Putra Perkasa
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <Dot />
      <button
        type="button"
        onClick={onOpenLicense}
        className="inline-flex items-center gap-1 font-semibold text-[#1f4f8f] transition hover:text-[#29328f]"
      >
        <ShieldCheck className="h-4 w-4" />
        License
      </button>
    </div>
  );
}

function Dot() {
  return (
    <span className="h-2 w-2 rounded-full bg-[#f2d35f] shadow-[0_0_0_4px_rgba(242,211,95,0.16)]" />
  );
}
