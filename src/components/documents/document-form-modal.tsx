"use client";

import { updateDocument, uploadDocument } from "@/lib/api/documents";
import type { DocumentItem, School } from "@/types";
import { X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type DocumentFormModalProps = {
  document?: DocumentItem | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (document: DocumentItem) => void;
  schools: School[];
  token: string;
};

export function DocumentFormModal(props: DocumentFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!props.isOpen) return null;

  const isEdit = Boolean(props.document);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get("name") ?? "").trim();
      const schoolId = props.isSchoolUser
        ? undefined
        : String(formData.get("schoolId") ?? "").trim();
      const file = formData.get("file");
      const saved = isEdit
        ? await updateDocument(props.token, props.document!.id, { name, schoolId })
        : await uploadDocument(props.token, { name, schoolId }, file as File);

      props.onSaved(saved);
      props.onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Dokumen gagal disimpan.");
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
        key={props.document?.id ?? "create-document"}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Dokumen" : "Upload Dokumen"}
            </h2>
            <p className="mt-1 text-sm text-[#748299]">
              File maksimal 10 MB sesuai batas backend.
            </p>
          </div>
          <button type="button" onClick={props.onClose} className="rounded-md p-2">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {!props.isSchoolUser ? <SchoolSelect {...props} /> : null}
          <Input label="Nama Dokumen" name="name" value={props.document?.name} />
          {!isEdit ? <FileInput /> : null}
        </div>
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={props.onClose} className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold">Batal</button>
          <button disabled={isLoading} className="h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white disabled:bg-[#7f98bd]">
            {isLoading ? "Menyimpan..." : isEdit ? "Simpan Dokumen" : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SchoolSelect(props: DocumentFormModalProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">Sekolah</span>
      <select name="schoolId" defaultValue={props.document?.schoolId ?? ""} required className={inputClass}>
        <option value="">Pilih sekolah</option>
        {props.schools.map((school) => (
          <option key={school.id} value={school.id}>{school.name}</option>
        ))}
      </select>
    </label>
  );
}

function Input(props: { label: string; name: string; value?: string | null }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{props.label}</span>
      <input name={props.name} required defaultValue={props.value ?? ""} className={inputClass} />
    </label>
  );
}

function FileInput() {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-semibold">File Dokumen</span>
      <input name="file" required type="file" className={`${inputClass} pt-2`} />
    </label>
  );
}

const inputClass =
  "mt-2 h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]";
