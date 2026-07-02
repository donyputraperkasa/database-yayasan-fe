"use client";

import { createSchool } from "@/lib/api/schools";
import type { CreateSchoolPayload, School, SchoolLevel } from "@/types";
import { FormEvent, useState } from "react";
import { schoolLevelLabel } from "./school-level-label";

type CreateSchoolFormProps = {
  onCreated: (school: School) => void;
  token: string;
};

export function CreateSchoolForm({ onCreated, token }: CreateSchoolFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = buildPayload(new FormData(form));

    try {
      setError(null);
      setIsLoading(true);
      const school = await createSchool(token, payload);
      onCreated(school);
      form.reset();
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Gagal membuat sekolah.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold">Form Sekolah Baru</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Input label="Nama Sekolah" name="name" placeholder="SMA BOPKRI ..." />
        <LevelSelect />
        <Input label="Email" name="email" placeholder="sekolah@email.com" />
        <Input label="Telepon" name="phone" placeholder="0274..." />
        <Input label="Kepala Sekolah" name="principal" placeholder="Nama kepala sekolah" />
        <Input label="Alamat" name="address" placeholder="Alamat sekolah" />
      </div>

      {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white transition hover:bg-[#173b6b] disabled:bg-[#7f98bd]"
      >
        {isLoading ? "Menyimpan..." : "Tambah Sekolah"}
      </button>
    </form>
  );
}

function buildPayload(formData: FormData): CreateSchoolPayload {
  return {
    address: getOptionalValue(formData, "address"),
    email: getOptionalValue(formData, "email"),
    level: String(formData.get("level") ?? "sma_smk") as SchoolLevel,
    name: String(formData.get("name") ?? "").trim(),
    phone: getOptionalValue(formData, "phone"),
    principal: getOptionalValue(formData, "principal"),
  };
}

function getOptionalValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

function Input(props: { label: string; name: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{props.label}</span>
      <input
        name={props.name}
        placeholder={props.placeholder}
        required={props.name === "name"}
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      />
    </label>
  );
}

function LevelSelect() {
  return (
    <label className="block">
      <span className="text-sm font-semibold">Jenjang</span>
      <select
        name="level"
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      >
        {Object.entries(schoolLevelLabel).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
