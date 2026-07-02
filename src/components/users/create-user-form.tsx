"use client";

import { createUser } from "@/lib/api/users";
import type { CreateUserPayload, Role, School, User } from "@/types";
import { FormEvent, useState } from "react";
import { SchoolSelect, UserInput } from "./user-form-fields";

type CreateUserFormProps = {
  onCreated: (user: User) => void;
  schools: School[];
  token: string;
};

export function CreateUserForm(props: CreateUserFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>("office");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = buildPayload(new FormData(form), role);

    if (role === "school" && !payload.schoolId) {
      setError("Pilih sekolah untuk akun role school.");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const user = await createUser(props.token, payload);
      props.onCreated(user);
      form.reset();
      setRole("office");
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Gagal membuat user.",
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
      <h2 className="text-lg font-semibold">Form Akun Baru</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <UserInput label="Nama" name="name" placeholder="Nama lengkap" />
        <UserInput label="Email" name="email" placeholder="nama@email.com" />
        <UserInput
          label="Password"
          name="password"
          placeholder="Minimal 6 karakter"
        />
        <label className="block">
          <span className="text-sm font-semibold">Role</span>
          <select
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
            className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
          >
            <option value="office">Office</option>
            <option value="school">School</option>
          </select>
        </label>
      </div>

      {role === "school" ? <SchoolSelect schools={props.schools} /> : null}
      {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white transition hover:bg-[#173b6b] disabled:bg-[#7f98bd]"
      >
        {isLoading ? "Menyimpan..." : "Buat Akun"}
      </button>
    </form>
  );
}

function buildPayload(formData: FormData, role: Role): CreateUserPayload {
  const schoolId = String(formData.get("schoolId") ?? "");

  return {
    email: String(formData.get("email") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    role,
    ...(role === "school" && schoolId ? { schoolId } : {}),
  };
}
