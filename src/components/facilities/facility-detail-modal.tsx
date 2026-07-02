"use client";

import type { Facility } from "@/types";
import { X } from "lucide-react";
import { facilityConditionLabel, facilityConditionTone } from "./facility-labels";

type FacilityDetailModalProps = {
  facility: Facility | null;
  onClose: () => void;
};

export function FacilityDetailModal({ facility, onClose }: FacilityDetailModalProps) {
  if (!facility) return null;

  const details = [
    ["Sekolah", facility.school.name],
    ["Nama Fasilitas", facility.name],
    ["Jumlah", facility.quantity.toString()],
    ["Kondisi", facilityConditionLabel[facility.condition]],
  ];

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="w-full max-w-3xl rounded-xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${facilityConditionTone[facility.condition]}`}
            >
              {facilityConditionLabel[facility.condition]}
            </span>
            <h2 className="mt-4 text-2xl font-semibold">{facility.name}</h2>
            <p className="mt-1 text-sm text-[#748299]">
              Detail fasilitas milik {facility.school.name}.
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
                {value}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
