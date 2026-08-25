import Image from "next/image";

export function BuildingPhoto() {
  return (
    <section className="flex items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Soft background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-full bg-[#1f4f8f]/8 blur-2xl"
        />

        <Image
          src="/logo-yayasan.png"
          alt="Logo Yayasan BOPKRI Yogyakarta"
          width={460}
          height={460}
          priority
          className="h-auto w-full max-w-[320px] rounded-full object-contain opacity-85 shadow-xl shadow-[#1f4f8f]/10 transition duration-300 hover:opacity-95 sm:max-w-[420px] lg:max-w-[460px]"
        />
      </div>
    </section>
  );
}

