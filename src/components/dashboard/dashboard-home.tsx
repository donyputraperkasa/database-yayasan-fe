import { dashboardModules, dashboardStats } from "@/lib/constants/dashboard";
import {
  ArrowRight,
  ClipboardList,
  FileUp,
  School,
  Search,
} from "lucide-react";

const quickActions = [
  { icon: FileUp, label: "Upload dokumen" },
  { icon: ClipboardList, label: "Cek data sekolah" },
  { icon: School, label: "Lihat unit sekolah" },
];

export function DashboardHome() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Cari Data</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Pantau kondisi data yayasan dan aktivitas unit sekolah.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 min-w-72 items-center gap-3 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3">
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
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-[#748299]">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
            <p className="mt-2 text-xs text-[#8b98ad]">Periode berjalan</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Kelengkapan Data</h2>
              <p className="mt-1 text-sm text-[#748299]">
                Ringkasan progres input dari sekolah.
              </p>
            </div>
            <button className="text-sm font-semibold text-[#0f2a4f]">
              Detail
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {dashboardModules.map((item) => (
              <div key={item.title}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#334155]">
                    {item.title}
                  </span>
                  <span className="text-[#748299]">{item.progress}%</span>
                </div>
                <div className="h-2.5 rounded-sm bg-[#e8edf6]">
                  <div
                    className="h-2.5 rounded-sm bg-[#0f2a4f]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#173b6b] bg-[#0f2a4f] p-5 text-white shadow-sm">
          <h2 className="text-lg font-semibold">Aksi Cepat</h2>
          <p className="mt-2 text-sm leading-6 text-[#c9d5ec]">
            Akses pekerjaan yang sering dilakukan dari satu tempat.
          </p>

          <div className="mt-5 space-y-3">
            {quickActions.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center justify-between rounded-md bg-white/8 px-4 py-3 text-sm font-semibold transition hover:bg-white/14"
              >
                <span className="flex items-center gap-3">
                  <item.icon size={17} aria-hidden="true" />
                  {item.label}
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
