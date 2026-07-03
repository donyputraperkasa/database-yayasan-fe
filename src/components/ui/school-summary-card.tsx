import { ArrowRight, Building2 } from "lucide-react";

type SchoolSummaryCardProps = {
  countLabel: string;
  description: string;
  onClick: () => void;
  title: string;
};

export function SchoolSummaryCard(props: SchoolSummaryCardProps) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="group relative w-full overflow-hidden rounded-lg border border-[#dbe5f4] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#b6cce8] hover:shadow-md"
    >
      <div className="absolute inset-y-0 left-0 w-1.5 bg-[#1f4f8f]" />
      <div className="absolute right-0 top-0 h-20 w-28 rounded-bl-full bg-[#f2d35f]/20" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
            <Building2 size={22} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-[#172033]">
              {props.title}
            </h2>
            <p className="mt-1 text-sm text-[#748299]">{props.description}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold text-[#172033]">
          {props.countLabel}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#1f4f8f]">
        Lihat detail sekolah
        <ArrowRight
          size={17}
          aria-hidden="true"
          className="transition group-hover:translate-x-1"
        />
      </div>
    </button>
  );
}
