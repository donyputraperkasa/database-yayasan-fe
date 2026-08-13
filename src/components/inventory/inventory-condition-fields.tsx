"use client";

import type { Inventory } from "@/types";
import { useState } from "react";

type ConditionKey =
  | "goodQuantity"
  | "minorDamageQuantity"
  | "majorDamageQuantity";

const fields: Array<{ key: ConditionKey; label: string }> = [
  { key: "goodQuantity", label: "Kondisi Baik" },
  { key: "minorDamageQuantity", label: "Rusak Ringan" },
  { key: "majorDamageQuantity", label: "Rusak Berat" },
];

export function InventoryConditionFields(props: {
  inventory?: Inventory | null;
}) {
  const [values, setValues] = useState<Record<ConditionKey, string>>({
    goodQuantity: String((props.inventory as any)?.goodQuantity ?? 0),
    majorDamageQuantity: String((props.inventory as any)?.majorDamageQuantity ?? 0),
    minorDamageQuantity: String((props.inventory as any)?.minorDamageQuantity ?? 0),
  });
  const total = fields.reduce(
    (sum, field) => sum + Number(values[field.key] || 0),
    0,
  );

  return (
    <div className="md:col-span-2">
      <div className="grid gap-4 sm:grid-cols-3">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="text-sm font-semibold">{field.label}</span>
            <input
              className={inputClass}
              min={0}
              name={field.key}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
              placeholder="0"
              required
              type="number"
              value={values[field.key]}
            />
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-md bg-[#edf5ff] px-4 py-3 text-sm">
        <span className="font-semibold text-[#526078]">Total otomatis</span>
        <strong className="text-lg text-[#1f4f8f]">{total} unit</strong>
      </div>
    </div>
  );
}

const inputClass =
  "mt-2 h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]";
