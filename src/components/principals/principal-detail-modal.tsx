"use client";

import { getMediaUrl } from "@/lib/api/media";
import type { PrincipalDetailModalProps } from "@/types";
import { Mail, MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { PhotoPanel, PhotoPreviewModal, type PhotoPreviewState } from "./principal-photo-panel";

export function PrincipalDetailModal({ asset, onClose, school }: PrincipalDetailModalProps) {
  const [preview, setPreview] = useState<PhotoPreviewState | null>(null);
  if (!school) return null;

  const photoUrl = getMediaUrl(school.profile?.photoUrl) ?? "/logo-yayasan.png";
  const assetPhotoUrl = getMediaUrl(asset?.photoUrl);
  const whatsappUrl = buildWhatsappUrl(school.phone);

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-4 sm:p-6 shadow-2xl">
        <div className="grid items-stretch gap-6 lg:gap-8 lg:grid-cols-[340px_1fr]">
          <div className="grid content-start gap-4 rounded-2xl bg-[#f8fbff] p-3.5 sm:p-4">
            <PhotoPanel
              alt={school.name}
              label="Logo/Foto Sekolah"
              onOpen={setPreview}
              src={photoUrl}
            />
            <PhotoPanel
              alt={`Tanah atau bangunan ${school.name}`}
              label="Foto Tanah/Bangunan"
              onOpen={setPreview}
              src={assetPhotoUrl}
            />
          </div>

          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#748299]">
                  Biodata Sekolah
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#172033] sm:text-2xl lg:text-3xl">
                  {school.name}
                </h2>
                <p className="mt-1.5 max-w-3xl text-xs leading-5 text-[#64748b] sm:text-sm sm:leading-6">
                  {school.address || "Alamat sekolah belum diisi."}
                </p>
              </div>

              <button
                onClick={onClose}
                className="shrink-0 rounded-lg p-2 text-[#64748b] transition hover:bg-[#eef3fb] hover:text-[#0f2a4f]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className={actionClass}>
                  <MessageCircle size={15} aria-hidden="true" />
                  Hubungi WA
                </a>
              ) : null}
              {school.email ? (
                <a href={`mailto:${school.email}`} className={actionClass}>
                  <Mail size={15} aria-hidden="true" />
                  Kirim Email
                </a>
              ) : null}
            </div>

            {/* Kontak & Pimpinan */}
            <div className="mt-4 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
              <InfoBox label="Kepala Sekolah" value={school.principal} />
              <InfoBox label="Email Sekolah" value={school.email} />
              <InfoBox label="Nomor WA/Telepon" value={school.phone} />
              <InfoBox label="Alamat" value={school.address} />
            </div>

            {/* Sejarah Singkat - Full Width */}
            <div className="mt-3 rounded-xl border border-[#dbe5f4] bg-[#f8fbff] p-3.5 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#748299]">
                Sejarah Singkat
              </p>
              <div className="mt-1.5 text-xs leading-relaxed text-[#1e293b] sm:text-sm sm:leading-relaxed whitespace-pre-line break-words">
                {school.profile?.history || (
                  <span className="italic text-[#94a3b8]">Belum ada data sejarah singkat.</span>
                )}
              </div>
            </div>

            {/* Visi & Misi */}
            <div className="mt-3 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#dbe5f4] bg-[#f8fbff] p-3.5 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#748299]">Visi</p>
                <div className="mt-1.5 text-xs leading-relaxed text-[#1e293b] sm:text-sm sm:leading-relaxed whitespace-pre-line break-words">
                  {school.profile?.vision || (
                    <span className="italic text-[#94a3b8]">Belum ada visi.</span>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-[#dbe5f4] bg-[#f8fbff] p-3.5 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#748299]">Misi</p>
                <div className="mt-1.5 text-xs leading-relaxed text-[#1e293b] sm:text-sm sm:leading-relaxed whitespace-pre-line break-words">
                  {school.profile?.mission || (
                    <span className="italic text-[#94a3b8]">Belum ada misi.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Motto */}
            {school.profile?.motto ? (
              <div className="mt-3 rounded-xl border border-[#fef08a] bg-[#fefce8] p-3.5 sm:p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#854d0e]">Motto</p>
                <p className="mt-1 text-xs font-semibold italic text-[#713f12] sm:text-sm break-words">
                  &ldquo;{school.profile.motto}&rdquo;
                </p>
              </div>
            ) : null}

            {/* Aset Tanah & Bangunan */}
            <div className="mt-3 grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-3">
              <InfoBox label="Luas Tanah" value={asset?.landArea} />
              <InfoBox label="Luas Bangunan" value={asset?.buildingArea} />
              <InfoBox label="Status Kepemilikan Sertifikat" value={asset?.ownershipStatus} />
            </div>
          </div>
        </div>
      </section>
      <PhotoPreviewModal onClose={() => setPreview(null)} preview={preview} />
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fbff] p-3 sm:p-3.5">
      <p className="text-xs font-semibold text-[#748299]">{label}</p>
      <p className="mt-1 text-xs font-bold text-[#172033] sm:text-sm break-words">{value || "-"}</p>
    </div>
  );
}

function buildWhatsappUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}

const actionClass =
  "inline-flex h-10 items-center gap-2 rounded-md bg-[#eaf2ff] px-3 text-sm font-semibold text-[#0f2a4f]";

