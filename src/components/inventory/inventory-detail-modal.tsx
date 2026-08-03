"use client";

import type { Inventory } from "@/types";
import { DetailPhoto } from "@/components/ui/detail-photo";
import { X } from "lucide-react";

type InventoryDetailModalProps = {
  inventory: Inventory | null;
  onClose: () => void;
};

export function InventoryDetailModal({ inventory, onClose }: InventoryDetailModalProps) {
  if (!inventory) return null;

  const details = [
    ["Sekolah", inventory.school.name],
    ["Total Unit", inventory.quantity.toString()],
    ["Kondisi Baik", inventory.goodQuantity.toString()],
    ["Rusak Ringan", inventory.minorDamageQuantity.toString()],
    ["Rusak Berat", inventory.majorDamageQuantity.toString()],
  ];

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
        <div className="grid gap-6 md:grid-cols-[minmax(260px,0.8fr)_1.2fr]">
          <DetailPhoto fill label="Foto inventaris" photoUrl={inventory.photoUrl} />
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-[#fff4c7] px-3 py-1 text-xs font-semibold text-[#8a6500]">
                  {inventory.quantity} unit
                </span>
                <h2 className="mt-4 text-2xl font-semibold">{inventory.name}</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-md p-2">
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 text-sm text-[#748299]">
              Detail inventaris milik {inventory.school.name}.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <article key={label} className="rounded-lg bg-[#f8fbff] p-4">
                  <p className="text-sm font-semibold text-[#748299]">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-[#172033]">
                    {value}
                  </p>
                </article>
              ))}
            </div>
            <article className="mt-4 rounded-lg bg-[#f8fbff] p-4">
              <p className="text-sm font-semibold text-[#748299]">Keterangan</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#172033]">
                {inventory.description || "Belum ada keterangan."}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
