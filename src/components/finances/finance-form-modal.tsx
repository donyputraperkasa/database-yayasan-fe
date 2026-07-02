"use client";

import { createFinance, updateFinance } from "@/lib/api/finances";
import type { Finance, School } from "@/types";
import { X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { FinanceFormFields } from "./finance-form-fields";
import { buildFinancePayload } from "./finance-form-payload";

type FinanceFormModalProps = {
  finance?: Finance | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (finance: Finance) => void;
  schools: School[];
  token: string;
};

export function FinanceFormModal(props: FinanceFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!props.isOpen) return null;

  const isEdit = Boolean(props.finance);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = buildFinancePayload(
        new FormData(event.currentTarget),
        props.isSchoolUser,
      );
      const saved = isEdit
        ? await updateFinance(props.token, props.finance!.id, payload)
        : await createFinance(props.token, payload);

      props.onSaved(saved);
      props.onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Keuangan gagal disimpan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) props.onClose();
      }}
      className="fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <form
        key={props.finance?.id ?? "create-finance"}
        onSubmit={handleSubmit}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Keuangan" : "Tambah Keuangan"}
            </h2>
            <p className="mt-1 text-sm text-[#748299]">
              Isi data keuangan sesuai kategori dan sekolah.
            </p>
          </div>
          <button type="button" onClick={props.onClose} className="rounded-md p-2">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5"><FinanceFormFields {...props} /></div>
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={props.onClose} className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold">Batal</button>
          <button disabled={isLoading} className="h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white disabled:bg-[#7f98bd]">
            {isLoading ? "Menyimpan..." : "Simpan Keuangan"}
          </button>
        </div>
      </form>
    </div>
  );
}
