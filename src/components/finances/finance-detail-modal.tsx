"use client";

import type { Finance } from "@/types";
import { X } from "lucide-react";
import { financeTypeLabel, formatRupiah } from "./finance-labels";

type FinanceDetailModalProps = {
  finance: Finance | null;
  onClose: () => void;
};

export function FinanceDetailModal({ finance, onClose }: FinanceDetailModalProps) {
  if (!finance) return null;

  const details = [
    ["Sekolah", finance.school.name],
    ["Jenis", financeTypeLabel[finance.type]],
    ["Kelas", finance.className],
    ["Nominal", formatRupiah(finance.amount)],
    ["Nomor Rekening", finance.accountNo],
    ["Saldo", formatRupiah(finance.balance)],
    ["Tanggal", finance.date ? new Date(finance.date).toLocaleDateString("id-ID") : "-"],
    ["Catatan", finance.note],
  ];

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Detail Keuangan</h2>
            <p className="mt-1 text-sm text-[#748299]">
              Catatan keuangan milik {finance.school.name}.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-2">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {details.map(([label, value]) => (
            <article key={label} className="rounded-lg bg-[#f8fbff] p-4">
              <p className="text-sm font-semibold text-[#748299]">{label}</p>
              <p className="mt-2 text-lg font-semibold text-[#172033]">
                {value || "-"}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
