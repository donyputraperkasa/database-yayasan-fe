import Image from "next/image";

export function BuildingPhoto() {
  return (
    <section className="relative min-h-[280px] overflow-hidden rounded-[2rem] bg-[#dbe8f8] shadow-2xl shadow-[#1f4f8f]/20 sm:min-h-[380px] lg:min-h-[610px]">
      {/* Blur glow background */}
      <div className="absolute -inset-6 bg-[#dfeaff] blur-3xl" />

      {/* Foto gedung */}
      <Image
        src="/fotogedung.avif"
        alt="Gedung Yayasan BOPKRI Yogyakarta"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover object-[58%_50%]"
      />

      {/* Gradien overlay kiri */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#eef3fb]/60 via-transparent to-transparent" />
      {/* Gradien overlay bawah */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4f]/65 via-transparent to-white/5" />

      {/* Ring frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/60" />
      {/* Garis emas dalam */}
      <div className="pointer-events-none absolute inset-[6px] rounded-[1.6rem] ring-1 ring-[#f2d35f]/25" />

      {/* Ornamen sudut klasik — kiri atas */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-4 h-10 w-10 text-[#f2d35f]/70"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 38 L2 2 L38 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* Ornamen sudut klasik — kanan bawah */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 text-[#f2d35f]/70"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M38 2 L38 38 L2 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Caption card */}
      <div className="absolute bottom-5 left-5 max-w-sm rounded-xl border border-white/25 bg-[#0f2a4f]/72 p-4 text-white shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7">
        {/* Garis emas di atas caption */}
        <div className="mb-3 h-px bg-gradient-to-r from-[#f2d35f]/80 to-transparent" />
        <p className="text-xs font-semibold tracking-widest uppercase text-[#f2d35f]">
          MyBOPKRI
        </p>
        <h2 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">
          Data yayasan dalam satu ruang kerja
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Menghubungkan sekolah, kantor, dokumen, dan laporan operasional.
        </p>
      </div>
    </section>
  );
}

