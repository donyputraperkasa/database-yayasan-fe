import { ArrowRight, ClipboardList, FileUp, School } from "lucide-react";

const quickActions = [
  { icon: FileUp, label: "Upload dokumen" },
  { icon: ClipboardList, label: "Cek data sekolah" },
  { icon: School, label: "Lihat unit sekolah" },
];

export function DashboardQuickActions() {
  return (
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
  );
}
