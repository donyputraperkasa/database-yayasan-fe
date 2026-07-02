import { ArrowRight } from "lucide-react";

type HeroContentProps = {
  onOpenLogin: () => void;
};

export function HeroContent({ onOpenLogin }: HeroContentProps) {
  return (
    <section className="max-w-2xl">
      <p className="mb-4 inline-flex rounded-md bg-[#f2d35f] px-3 py-2 text-xs font-semibold text-[#2d2a16] shadow-sm sm:px-4 sm:text-sm">
        Dashboard internal yayasan dan sekolah
      </p>

      <h1 className="max-w-2xl text-4xl font-semibold leading-[1.06] tracking-normal text-[#111827] sm:text-5xl xl:text-6xl">
        MyBOPKRI
      </h1>

      <p className="mt-4 max-w-xl text-base leading-7 text-[#526078] sm:text-lg sm:leading-8">
        Satu tempat untuk mengelola data sekolah, siswa, guru, pegawai, aset,
        fasilitas, dokumen, dan ringkasan keuangan dengan akses sesuai role.
      </p>

      <button
        type="button"
        onClick={onOpenLogin}
        className="mt-6 inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#1f4f8f] px-5 text-sm font-semibold text-white shadow-lg shadow-[#1f4f8f]/20 transition hover:bg-[#193f72] sm:h-13 sm:px-6 sm:text-base"
      >
        Masuk MyBOPKRI
        <ArrowRight size={19} aria-hidden="true" />
      </button>
    </section>
  );
}
