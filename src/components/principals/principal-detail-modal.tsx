"use client";

import { getMediaUrl } from "@/lib/api/media";
import type { PrincipalDetailModalProps } from "@/types";
import { Mail, MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function PrincipalDetailModal({ asset, onClose, school }: PrincipalDetailModalProps) {
  const [preview, setPreview] = useState<PhotoPreviewState | null>(null);
  if (!school) return null;

  const photoUrl = getMediaUrl(school.profile?.photoUrl) ?? "/logo-yayasan.png";
  const assetPhotoUrl = getMediaUrl(asset?.photoUrl);
  const whatsappUrl = buildWhatsappUrl(school.phone);
  const details = [
    ["Kepala Sekolah", school.principal],
    ["Email Sekolah", school.email],
    ["Nomor WA/Telepon", school.phone],
    ["Alamat", school.address],
    ["Sejarah Singkat", school.profile?.history],
    ["Visi", school.profile?.vision],
    ["Misi", school.profile?.mission],
    ["Motto", school.profile?.motto],
    ["Luas Tanah", asset?.landArea],
    ["Luas Bangunan", asset?.buildingArea],
    ["Status Kepemilikan Sertifikat", asset?.ownershipStatus],
  ];

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="grid items-stretch gap-8 lg:grid-cols-[380px_1fr]">
          <div className="grid content-start gap-4 rounded-2xl bg-[#f8fbff] p-4">
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#748299]">
                  Biodata Sekolah
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#172033]">{school.name}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#748299]">
                  {school.address}
                </p>
              </div>

              <button onClick={onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className={actionClass}>
                  <MessageCircle size={16} aria-hidden="true" />
                  Hubungi WA
                </a>
              ) : null}
              {school.email ? (
                <a href={`mailto:${school.email}`} className={actionClass}>
                  <Mail size={16} aria-hidden="true" />
                  Kirim Email
                </a>
              ) : null}
            </div>

            <dl className="mt-5 grid gap-3 md:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#f8fbff] p-4">
                  <dt className="text-xs font-semibold text-[#748299]">{label}</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-semibold text-[#172033]">
                    {formatValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <PhotoPreviewModal onClose={() => setPreview(null)} preview={preview} />
    </div>
  );
}

function formatValue(value?: number | string | null) {
  if (value === null || value === undefined || value === "") return "-";
  return value;
}

function buildWhatsappUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}

type PhotoPreviewState = {
  alt: string;
  label: string;
  src: string;
};

function PhotoPanel(props: {
  alt: string;
  label: string;
  onOpen: (preview: PhotoPreviewState) => void;
  src: string | null;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#748299]">
        {props.label}
      </p>
      <button
        type="button"
        disabled={!props.src}
        onClick={() =>
          props.src &&
          props.onOpen({ alt: props.alt, label: props.label, src: props.src })
        }
        className="flex min-h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#dbe5f4] bg-white p-4 text-left shadow-md transition enabled:hover:border-[#1f4f8f] enabled:hover:shadow-lg"
      >
        {props.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={props.src} alt={props.alt} className="max-h-[340px] w-full object-contain" />
        ) : (
          <span className="text-sm font-semibold text-[#748299]">Belum ada foto</span>
        )}
      </button>
    </div>
  );
}

function PhotoPreviewModal(props: {
  onClose: () => void;
  preview: PhotoPreviewState | null;
}) {
  if (!props.preview) return null;

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="fixed inset-0 z-[90] grid place-items-center bg-[#071529]/70 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#dbe5f4] px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#748299]">
              {props.preview.label}
            </p>
            <h3 className="text-lg font-semibold text-[#172033]">{props.preview.alt}</h3>
          </div>
          <button onClick={props.onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex max-h-[78vh] items-center justify-center bg-[#f8fbff] p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={props.preview.src} alt={props.preview.alt} className="max-h-[72vh] w-full object-contain" />
        </div>
      </section>
    </div>
  );
}

const actionClass =
  "inline-flex h-10 items-center gap-2 rounded-md bg-[#eaf2ff] px-3 text-sm font-semibold text-[#0f2a4f]";
