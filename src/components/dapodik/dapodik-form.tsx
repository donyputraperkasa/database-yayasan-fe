"use client";

import { Check, ClipboardList, Copy, ExternalLink, KeyRound, School } from "lucide-react";
import { useState } from "react";

type DapodikLinkItem = {
  title: string;
  category: string;
  description: string;
  href: string;
  password?: string;
};

const DAPODIK_LINKS: DapodikLinkItem[] = [
  {
    title: "Usulan Dapodik PTK Baru Swasta",
    category: "Jenjang SMA & SMK",
    description:
      "Formulir usulan dan pengajuan data pendidik serta tenaga kependidikan baru jenjang SMA/SMK.",
    href: "https://bit.ly/usulandapodikptkbaruswasta",
  },
  {
    title: "Formulir Dapodik PTK",
    category: "Jenjang TK, SD & SMP",
    description:
      "Formulir pengisian data Dapodik untuk unit TK, SD, dan SMP Yayasan BOPKRI.",
    href: "https://forms.gle/pwwQ7xmxMuRxqxu96",
    password: "22992212",
  },
];

export function DapodikForm() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="rounded-xl border border-[#dbe5f4] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#f1f5f9] pb-4">
        <h3 className="text-base font-bold text-[#172033] sm:text-lg">
          Tautan Formulir Dapodik Online
        </h3>
        <p className="text-xs text-[#748299] sm:text-sm">
          Pilih formulir pengisian data sesuai dengan jenjang unit sekolah Anda.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DAPODIK_LINKS.map((item, idx) => (
          <div
            key={item.title}
            className="group flex flex-col justify-between rounded-xl border border-[#dbe5f4] bg-[#f8fbff] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#a8c4e8] hover:bg-white hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#eaf2ff] px-2.5 py-1 text-xs font-bold text-[#1f4f8f]">
                  <School size={13} />
                  {item.category}
                </span>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1f4f8f] transition hover:text-[#0f2a4f]"
                >
                  Buka Form
                  <ExternalLink size={13} />
                </a>
              </div>

              <h4 className="mt-3 text-sm font-bold text-[#172033] sm:text-base">
                {item.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e2eaf6]">
              {item.password ? (
                <div className="mb-3 flex items-center justify-between rounded-lg border border-[#fde68a] bg-[#fffbeb] px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <KeyRound size={14} className="text-[#b45309]" />
                    <span className="text-[#78350f]">Password:</span>
                    <code className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-[#92400e]">
                      {item.password}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(item.password!, idx, e)}
                    className="inline-flex items-center gap-1 font-semibold text-[#b45309] transition hover:text-[#78350f]"
                    title="Salin password"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check size={13} className="text-emerald-600" />
                        <span className="text-[11px] text-emerald-700">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span className="text-[11px]">Salin</span>
                      </>
                    )}
                  </button>
                </div>
              ) : null}

              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1f4f8f] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0f2a4f]"
              >
                <ClipboardList size={15} />
                <span>Buka Formulir {item.category}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}