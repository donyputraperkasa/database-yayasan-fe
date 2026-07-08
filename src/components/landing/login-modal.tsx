"use client";

import { LoginForm } from "@/components/auth/login-form";
import { X } from "lucide-react";
import Image from "next/image";

type LoginModalProps = {
  onClose: () => void;
};

export function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div
      className="modal-backdrop-enter fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/45 px-5 py-8 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onMouseDown={onClose}
    >
      <section
        className="modal-panel-enter w-full max-w-md rounded-lg border border-white/70 bg-white p-6 shadow-2xl shadow-[#0f172a]/20"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-yayasan.png"
              alt="Logo Yayasan BOPKRI Yogyakarta"
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-contain"
            />
            <div>
              <h2 id="login-title" className="text-xl font-semibold">
                Masuk Dashboard
              </h2>
              <p className="mt-1 text-sm text-[#6c788f]">
                Gunakan akun yayasan atau sekolah.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#5f6f87] transition hover:bg-[#eef3fb] hover:text-[#1f4f8f]"
            aria-label="Tutup modal login"
          >
            <X size={20} aria-hidden="true" />
            </button>
          </div>

        <LoginForm />
      </section>
    </div>
  );
}
