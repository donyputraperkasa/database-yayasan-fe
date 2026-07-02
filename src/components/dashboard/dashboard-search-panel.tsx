import { Search } from "lucide-react";

type DashboardSearchPanelProps = {
  errorMessage?: string | null;
  onRetry?: () => void;
};

export function DashboardSearchPanel({
  errorMessage,
  onRetry,
}: DashboardSearchPanelProps) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-lg font-semibold">Cari Data</h2>
        <p className="mt-1 text-sm text-[#748299]">
          Pantau kondisi data yayasan dan aktivitas unit sekolah.
        </p>
        {errorMessage ? (
          <p className="mt-2 text-sm font-semibold text-[#c2410c]">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex h-11 w-full items-center gap-3 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 sm:min-w-72">
          <Search size={17} className="text-[#748299]" aria-hidden="true" />
          <input
            placeholder="Cari sekolah, siswa, dokumen..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8b98ad]"
          />
        </label>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white transition hover:bg-[#173b6b]">
          <Search size={16} aria-hidden="true" />
          Cari
        </button>
        {errorMessage && onRetry ? (
          <button
            onClick={onRetry}
            className="h-11 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
          >
            Muat ulang
          </button>
        ) : null}
      </div>
    </section>
  );
}
