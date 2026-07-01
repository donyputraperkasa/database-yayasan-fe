import { LoginForm } from "@/components/auth/login-form";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8ff] px-6 py-10 text-[#172033]">
      <section className="w-full max-w-md rounded-lg border border-[#d8e3f4] bg-white p-6 shadow-xl shadow-[#1f4f8f]/10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#617089] hover:text-[#1f4f8f]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <Image
            src="/logo-yayasan.png"
            alt="Logo Yayasan BOPKRI Yogyakarta"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-contain"
          />
          <div>
            <h1 className="text-2xl font-semibold">Masuk Dashboard</h1>
            <p className="mt-2 text-sm leading-6 text-[#617089]">
              Gunakan akun yayasan atau sekolah.
            </p>
          </div>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
