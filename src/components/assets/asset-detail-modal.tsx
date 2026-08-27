"use client";

import type { Asset, AssetDetailModalProps } from "@/types";
import { X } from "lucide-react";

export function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
  if (!asset) return null;

  const details = [
    ["Sekolah", asset.school.name],
    ["Luas Tanah", asset.landArea ?? "-"],
    ["Luas Bangunan", asset.buildingArea ?? "-"],
    ["Status Kepemilikan", asset.ownershipStatus ?? "-"],
  ];

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Detail Aset Sekolah</h2>
              <p className="mt-1 text-sm text-[#748299]">
                Informasi tanah dan bangunan {asset.school.name}.
              </p>
            </div>
            <button type="button" onClick={onClose} className="rounded-md p-2">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
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
        </div>
      </section>
    </div>
  );
}
