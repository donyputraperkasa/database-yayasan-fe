import { UserRoundCheck } from "lucide-react";

export function PrincipalsHeader({ count }: { count: number }) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
          <UserRoundCheck size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Profil Sekolah</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Daftar unit sekolah beserta informasi kepala sekolah, email, dan WhatsApp resmi.
          </p>
        </div>
      </div>
      <span className="inline-flex w-fit items-center rounded-full bg-[#f2d35f] px-3.5 py-1 text-xs font-semibold text-[#2d2a16]">
        {count} unit sekolah
      </span>
    </section>
  );
}
