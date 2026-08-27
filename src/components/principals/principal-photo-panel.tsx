"use client";

import { X } from "lucide-react";

export type PhotoPreviewState = {
  alt: string;
  label: string;
  src: string;
};

export function PhotoPanel(props: {
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
        className="flex min-h-[180px] sm:min-h-[240px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#dbe5f4] bg-white p-3 sm:p-4 text-left shadow-md transition enabled:hover:border-[#1f4f8f] enabled:hover:shadow-lg"
      >
        {props.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={props.src} alt={props.alt} className="max-h-[220px] sm:max-h-[320px] w-full object-contain" />
        ) : (
          <span className="text-sm font-semibold text-[#748299]">Belum ada foto</span>
        )}
      </button>
    </div>
  );
}

export function PhotoPreviewModal(props: {
  onClose: () => void;
  preview: PhotoPreviewState | null;
}) {
  if (!props.preview) return null;

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="fixed inset-0 z-[90] grid place-items-center bg-[#071529]/70 p-3 sm:p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#dbe5f4] px-4 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#748299]">
              {props.preview.label}
            </p>
            <h3 className="truncate text-base font-semibold text-[#172033] sm:text-lg">
              {props.preview.alt}
            </h3>
          </div>
          <button onClick={props.onClose} className="rounded-md p-2 text-[#64748b] hover:bg-[#eef3fb] hover:text-[#0f2a4f]">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex max-h-[76vh] items-center justify-center bg-[#f8fbff] p-3 sm:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={props.preview.src} alt={props.preview.alt} className="max-h-[70vh] w-full object-contain" />
        </div>
      </section>
    </div>
  );
}
