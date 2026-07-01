import { LockKeyhole } from "lucide-react";
import Image from "next/image";

type LandingHeaderProps = {
  onOpenLogin: () => void;
};

export function LandingHeader({ onOpenLogin }: LandingHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-yayasan.png"
          alt="Logo Yayasan BOPKRI Yogyakarta"
          width={48}
          height={48}
          priority
          className="h-12 w-12 rounded-full object-contain"
        />
        <div>
          <p className="text-sm font-semibold uppercase text-[#29328f]">
            Yayasan BOPKRI
          </p>
          <p className="text-xs font-medium text-[#617089]">Yogyakarta</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenLogin}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[#c9d5ec] bg-white/80 px-4 text-sm font-semibold text-[#1f4f8f] shadow-sm transition hover:border-[#1f4f8f] hover:bg-white"
      >
        <LockKeyhole size={16} aria-hidden="true" />
        Masuk
      </button>
    </header>
  );
}
