"use client";

import { toastEventName, type ToastPayload } from "@/lib/feedback/toast";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function Toaster() {
  const [toast, setToast] = useState<ToastPayload | null>(null);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const payload = (event as CustomEvent<ToastPayload>).detail;
      setToast(payload);
      window.setTimeout(() => setToast(null), 3200);
    };

    window.addEventListener(toastEventName, handleToast);
    return () => window.removeEventListener(toastEventName, handleToast);
  }, []);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className="fixed right-5 top-5 z-[120]">
      <div className={`notice-enter flex max-w-sm items-start gap-3 rounded-lg border bg-white p-4 shadow-xl ${
        isError ? "border-red-100 text-red-700" : "border-emerald-100 text-emerald-700"
      }`}>
        {isError ? <XCircle size={20} aria-hidden="true" /> : <CheckCircle2 size={20} aria-hidden="true" />}
        <p className="text-sm font-semibold">{toast.message}</p>
        <button onClick={() => setToast(null)} className="ml-2 text-[#748299]">
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
