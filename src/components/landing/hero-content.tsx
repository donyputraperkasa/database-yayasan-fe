import { ArrowRight } from "lucide-react";

type HeroContentProps = {
  onOpenLogin: () => void;
};

export function HeroContent({ onOpenLogin }: HeroContentProps) {
  return (
    <section className="max-w-2xl">
      <p className="mb-4 inline-flex rounded-md bg-[#f2d35f] px-4 py-2 text-sm font-semibold text-[#2d2a16] shadow-sm">
        Dashboard internal yayasan dan sekolah
      </p>

      <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-normal text-[#111827] sm:text-6xl">
        Database Yayasan
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-8 text-[#526078]">
        Satu tempat untuk mengelola data sekolah, siswa, guru, pegawai, aset,
        fasilitas, dokumen, dan ringkasan keuangan dengan akses sesuai role.
      </p>

      <button
        type="button"
        onClick={onOpenLogin}
        className="mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-md bg-[#1f4f8f] px-6 text-base font-semibold text-white shadow-lg shadow-[#1f4f8f]/20 transition hover:bg-[#193f72]"
      >
        Masuk Dashboard
        <ArrowRight size={19} aria-hidden="true" />
      </button>
    </section>
  );
}
