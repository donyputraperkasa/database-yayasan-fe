import { LockKeyhole } from "lucide-react";
import Image from "next/image";

type LandingHeaderProps = {
  onOpenLogin: () => void;
};

export function LandingHeader({ onOpenLogin }: LandingHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Image
          src="/logo-yayasan.png"
          alt="Logo Yayasan BOPKRI Yogyakarta"
          width={48}
          height={48}
          priority
          className="h-12 w-12 rounded-full object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold uppercase text-[#29328f]">
            YAYASAN BOPKRI
          </p>
          <p className="truncate text-xs font-medium text-[#617089]">
            Yogyakarta
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenLogin}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-[#c9d5ec] bg-white/80 px-3 text-sm font-semibold text-[#1f4f8f] shadow-sm transition hover:border-[#1f4f8f] hover:bg-white sm:px-4"
      >
        <LockKeyhole size={16} aria-hidden="true" />
        Masuk
      </button>
    </header>
  );
}
