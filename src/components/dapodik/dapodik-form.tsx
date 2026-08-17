"use client";

import { ExternalLink, ClipboardList } from "lucide-react";

type DapodikLinkItem = {
  title: string;
  description: string;
  href: string;
};

// Ganti href dengan link dapodik yang sebenarnya jika sudah tersedia
const DAPODIK_LINKS: DapodikLinkItem[] = [
  {
    title: "Formulir Pengajuan Data PTK ",
    description:
      "Isi formulir data diri guru dan pegawai untuk input data PTK.",
    href: "#",
  },
];

export function DapodikForm() {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#1f2a44]">
          Pengisian Data Dapodik Online
        </h3>
        <p className="mt-1 text-sm text-[#748299]">
          Klik tautan di bawah ini untuk mengisi atau memperbarui data dapodik secara online.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {DAPODIK_LINKS.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href !== "#" ? "_blank" : undefined}
            rel={item.href !== "#" ? "noreferrer" : undefined}
            className="group flex items-start gap-4 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] p-4 transition hover:-translate-y-0.5 hover:border-[#a8c4e8] hover:shadow-md"
          >
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f] transition group-hover:bg-[#1f4f8f] group-hover:text-white">
              <ClipboardList size={18} aria-hidden="true" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1f2a44]">{item.title}</p>
              <p className="mt-0.5 text-xs text-[#748299]">{item.description}</p>
            </div>
            <ExternalLink
              size={16}
              className="mt-0.5 shrink-0 text-[#a8c4e8] transition group-hover:text-[#1f4f8f]"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>

      <p className="mt-4 rounded-md bg-[#fffbea] px-3 py-2.5 text-xs font-semibold text-[#7a5c00]">
        ⚠️ Link formulir akan diaktifkan setelah URL resmi tersedia dari operator dapodik.
      </p>
    </section>
  );
}