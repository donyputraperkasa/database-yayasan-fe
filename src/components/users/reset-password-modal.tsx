"use client";

import { resetUserPassword } from "@/lib/api/users";
import type { User } from "@/types";
import { FormEvent, useState } from "react";

type ResetPasswordModalProps = {
  onClose: () => void;
  token: string;
  user: User;
};

export function ResetPasswordModal(props: ResetPasswordModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "");

    if (newPassword.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setIsLoading(true);
      await resetUserPassword(props.token, props.user.id, { newPassword });
      setSuccess("Password berhasil direset.");
      event.currentTarget.reset();
    } catch (resetError) {
      setError(
        resetError instanceof Error
          ? resetError.message
          : "Gagal reset password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0f172a]/45 px-5 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Reset Password</h2>
            <p className="mt-1 text-sm text-[#617089]">{props.user.email}</p>
          </div>
          <button
            type="button"
            onClick={props.onClose}
            className="rounded-md px-3 py-2 text-sm font-semibold text-[#617089] hover:bg-[#eef3fb]"
          >
            Tutup
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold">Password Baru</span>
            <input
              name="newPassword"
              placeholder="Minimal 6 karakter"
              required
              type="password"
              className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
            />
          </label>

          {error ? <Message color="red" text={error} /> : null}
          {success ? <Message color="green" text={success} /> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-md bg-[#0f2a4f] text-sm font-semibold text-white disabled:bg-[#7f98bd]"
          >
            {isLoading ? "Memproses..." : "Reset Password"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Message({ color, text }: { color: "green" | "red"; text: string }) {
  const className =
    color === "green"
      ? "rounded-md bg-green-50 p-3 text-sm text-green-700"
      : "rounded-md bg-red-50 p-3 text-sm text-red-700";

  return <p className={className}>{text}</p>;
}
