import Image from "next/image";

export function BuildingPhoto() {
  return (
    <section className="relative min-h-[280px] overflow-hidden rounded-[2rem] bg-[#dbe8f8] shadow-2xl shadow-[#1f4f8f]/16 sm:min-h-[380px] lg:min-h-[610px]">
      <div className="absolute -inset-6 bg-[#dfeaff] blur-3xl" />
      <Image
        src="/fotogedung.avif"
        alt="Gedung Yayasan BOPKRI Yogyakarta"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-[58%_50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f5f8ff]/55 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4f]/56 via-transparent to-white/8" />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/70" />

      <div className="absolute bottom-5 left-5 max-w-sm rounded-xl border border-white/28 bg-[#0f2a4f]/68 p-4 text-white shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#f2d35f]">
          myBOPKRI
        </p>
        <h2 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">
          Data yayasan dalam satu ruang kerja
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/82">
          Menghubungkan sekolah, kantor, dokumen, dan laporan operasional.
        </p>
      </div>
    </section>
  );
}
