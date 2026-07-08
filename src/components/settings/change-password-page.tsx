"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { changePassword } from "@/lib/api/auth";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import { showToast } from "@/lib/feedback/toast";
import { KeyRound } from "lucide-react";
import { useState, type FormEvent } from "react";

export function ChangePasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState(() => getStoredUser());

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (user?.role === "owner") return <PageState text="Halaman ini untuk office dan school." />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setError(null);
    setSuccess(null);
    const formData = new FormData(form);
    const oldPassword = String(formData.get("oldPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword.length < 6) {
      setError("Password baru minimal 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password belum sama.");
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(token, { newPassword, oldPassword });
      form.reset();
      setSuccess("Password berhasil diganti.");
      showToast({ message: "Password berhasil diganti." });
    } catch (changeError) {
      const message = changeError instanceof Error ? changeError.message : "Password gagal diganti.";
      setError(message);
      showToast({ message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Pengaturan" }]}
      />
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
            <KeyRound size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#748299]">Keamanan Akun</p>
            <h1 className="mt-1 text-2xl font-semibold">Ganti Password</h1>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="max-w-2xl rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <PasswordInput label="Password Lama" name="oldPassword" />
        <PasswordInput label="Password Baru" name="newPassword" />
        <PasswordInput label="Konfirmasi Password Baru" name="confirmPassword" />
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {success ? <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p> : null}
        <button disabled={isLoading} className="mt-5 h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white disabled:bg-[#8aa0bf]">
          {isLoading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </form>
    </div>
  );
}

function PasswordInput(props: { label: string; name: string }) {
  return (
    <label className="mb-4 block">
      <span className="text-sm font-semibold text-[#172033]">{props.label}</span>
      <input
        name={props.name}
        required
        type="password"
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]"
      />
    </label>
  );
}
