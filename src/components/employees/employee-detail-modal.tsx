import { useState } from "react";
import type { Employee } from "@/types";
import { Download, FileText, ImageIcon, X } from "lucide-react";
import {
  birthPlaceDateValue,
  employeeStatusLabel,
  employeeTypeLabel,
  formatDate,
  genderLabel,
} from "./employee-labels";

type EmployeeDetailModalProps = {
  employee: Employee | null;
  onClose: () => void;
};

export function EmployeeDetailModal({ employee, onClose }: EmployeeDetailModalProps) {
  const [preview, setPreview] = useState<{ title: string; url: string } | null>(null);
  if (!employee) return null;
  const fileSrc = (url: string) => {
    if (url.startsWith("http")) return url;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

    return `${apiBaseUrl}${normalizedUrl}`;
  };
  const details = [
    ["Nama", employee.name],
    ["Tempat/Tanggal Lahir", birthPlaceDateValue(employee.birthPlaceDate, employee.birthDate)],
    ["Agama", employee.religion],
    ["Alamat", employee.address],
    ["Jenis Kepegawaian", employeeTypeLabel[employee.type]],
    ["Sekolah", employee.school.name],
    ["Jabatan", employee.position],
    ["Jabatan Lain", employee.otherPosition],
    ["Status Kepegawaian", employee.status ? employeeStatusLabel[employee.status] : null],
    ["Jenis Kelamin", genderLabel(employee.gender)],
    ["Tanggal Masuk", formatDate(employee.joinDate)],
    ["Pendidikan Terakhir", employee.lastEducation],
    ["Nomor Telepon", employee.phone],
    ["Email", employee.email],
    ["Nomor SK", employee.decreeNumber],
    ["Honor/Gaji", employee.fee],
    ["Masa Kerja", employee.workingPeriod],
    ["Usia Pensiun", employee.retirementAge ? `${employee.retirementAge} tahun` : null],
    ["Tanggal Pensiun", formatDate(employee.retirementDate)],
  ];

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
        <div className="grid gap-5 md:grid-cols-[460px_1fr]">
          <div className="rounded-xl border border-[#e4ecf7] bg-[#f8fbff] p-4">
            <p className="text-sm font-semibold text-[#1f2a44]">Dokumen Pegawai</p>
            <p className="mt-1 text-xs text-[#748299]">
              Foto dan scan SK akan muncul setelah tombol preview diklik.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <button
                type="button"
                disabled={!employee.photoUrl}
                onClick={() =>
                  employee.photoUrl &&
                  setPreview({ title: "Foto Pegawai", url: employee.photoUrl })
                }
                className="flex items-center justify-between gap-3 rounded-lg border border-[#dbe7f5] bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
              >
                <span>
                  <span className="block text-sm font-semibold text-[#1f2a44]">Lihat Foto</span>
                  <span className="mt-0.5 block text-xs text-[#748299]">
                    {employee.photoUrl ? "Preview foto pegawai" : "Foto belum tersedia"}
                  </span>
                </span>
                <ImageIcon size={20} className="text-[#2563eb]" aria-hidden="true" />
              </button>

              <button
                type="button"
                disabled={!employee.decreeUrl}
                onClick={() =>
                  employee.decreeUrl &&
                  setPreview({ title: "Scan SK Terakhir", url: employee.decreeUrl })
                }
                className="flex items-center justify-between gap-3 rounded-lg border border-[#dbe7f5] bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
              >
                <span>
                  <span className="block text-sm font-semibold text-[#1f2a44]">Lihat Scan SK</span>
                  <span className="mt-0.5 block text-xs text-[#748299]">
                    {employee.decreeUrl ? "Preview scan SK terakhir" : "Scan SK belum tersedia"}
                  </span>
                </span>
                <FileText size={20} className="text-[#2563eb]" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="mt-1 text-sm text-[#748299]">Detail data pegawai.</p>
              </div>
              <button onClick={onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#f8fbff] p-3">
                  <dt className="text-xs font-semibold text-[#748299]">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{value ?? "-"}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      
      {preview && (
        <div
          onMouseDown={(event) => event.target === event.currentTarget && setPreview(null)}
          className="fixed inset-0 z-[80] grid place-items-center bg-[#071529]/70 p-4 backdrop-blur-md"
        >
          <section className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#e4ecf7] px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1f2a44]">{preview.title}</h3>
                <p className="mt-0.5 text-xs text-[#748299]">Preview dokumen pegawai.</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={fileSrc(preview.url)}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#0f2a4f] px-3 text-sm font-semibold text-white"
                >
                  <Download size={17} aria-hidden="true" />
                  Download
                </a>
                <button onClick={() => setPreview(null)} className="rounded-md p-2 hover:bg-[#eef3fb]">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-auto bg-[#f8fbff] p-6">
              {preview.url.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={fileSrc(preview.url)}
                  title={preview.title}
                  className="h-[75vh] w-full rounded-lg border border-[#dbe7f5] bg-white"
                />
              ) : (
                <div className="flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fileSrc(preview.url)}
                    alt={preview.title}
                    className="h-auto max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
