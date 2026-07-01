"use client";

import { LoginField } from "@/components/auth/login-field";
import { useLoginForm } from "@/hooks/use-login-form";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { error, handleSubmit, isLoading } = useLoginForm();

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <LoginField
        autoComplete="email"
        disabled={isLoading}
        icon={<Mail size={18} />}
        label="Email"
        name="email"
        placeholder="nama@email.com"
        type="email"
      />

      <LoginField
        action={
          <button
            type="button"
            onClick={() => setIsPasswordVisible((value) => !value)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#728199] transition hover:bg-[#eef3fb] hover:text-[#1f4f8f]"
            aria-label={
              isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        autoComplete="current-password"
        disabled={isLoading}
        icon={<LockKeyhole size={18} />}
        label="Password"
        name="password"
        placeholder="Masukkan password"
        type={isPasswordVisible ? "text" : "password"}
      />

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1f4f8f] text-sm font-semibold text-white shadow-lg shadow-[#1f4f8f]/20 transition hover:bg-[#193f72] disabled:cursor-not-allowed disabled:bg-[#7f98bd]"
      >
        {isLoading ? "Memproses..." : "Masuk"}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
