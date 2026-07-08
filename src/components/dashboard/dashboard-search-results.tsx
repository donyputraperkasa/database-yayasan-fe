import type { DashboardSearchResult } from "@/lib/search/dashboard-search";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

type DashboardSearchResultsProps = {
  isLoading: boolean;
  message?: string | null;
  query: string;
  results: DashboardSearchResult[];
};

const badgeClasses = {
  Dokumen: "bg-[#eef3ff] text-[#1f4f8f]",
  Pegawai: "bg-[#fef7df] text-[#9a6200]",
  Sekolah: "bg-[#eaf8f2] text-[#12734f]",
  Siswa: "bg-[#f1efff] text-[#29328f]",
};

export function DashboardSearchResults(props: DashboardSearchResultsProps) {
  if (props.isLoading) {
    return <SearchNotice icon={<Loader2 className="h-4 w-4 animate-spin" />} text="Mencari data..." />;
  }

  if (props.message) {
    return <SearchNotice text={props.message} />;
  }

  if (!props.query) {
    return null;
  }

  if (props.results.length === 0) {
    return <SearchNotice text={`Tidak ada hasil untuk "${props.query}".`} />;
  }

  return (
    <div className="grid gap-3 border-t border-[#e8eef8] pt-4 md:grid-cols-2 xl:grid-cols-4">
      {props.results.map((result) => (
        <Link
          key={`${result.type}-${result.title}-${result.subtitle}`}
          href={result.href}
          className="group rounded-lg border border-[#dbe5f4] bg-[#f8fbff] p-3 transition hover:-translate-y-0.5 hover:border-[#9fb8df] hover:bg-white hover:shadow-md"
        >
          <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${badgeClasses[result.type]}`}>
            {result.type}
          </span>
          <h3 className="mt-3 line-clamp-1 text-sm font-bold text-[#13213a]">
            {result.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-[#748299]">
            {result.subtitle}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1f4f8f]">
            Buka data
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function SearchNotice({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 border-t border-[#e8eef8] pt-4 text-sm font-semibold text-[#617089]">
      {icon}
      <span>{text}</span>
    </div>
  );
}
