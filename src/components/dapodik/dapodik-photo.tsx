"use client";

import { Download, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type DapodikPhotoItem = {
  title: string;
  description: string;
  src: string;
  filename: string;
};

const PHOTO_ITEMS: DapodikPhotoItem[] = [
  {
    title: "Panduan NUPTK",
    description: "Panduan NUPTK untuk Penajuan Data NUPTK.",
    src: "/nuptk.webp",
    filename: "panduan-nuptk.webp",
  },
  {
    title: "Panduan PTK",
    description: "Panduan PTK untuk Penajuan Data PTK.",
    src: "/ptk.webp",
    filename: "panduan-ptk.webp",
  },
  {
    title: "Dokumen NUPTK Kemendikbud",
    description: "Dokumen NUPTK Kemendikbud untuk kebutuhan administrasi.",
    src: "/nuptk-kemendikbud.pdf",
    filename: "dokumen-nuptk-kemendikbud.pdf",
  }
];

export function DapodikPhoto() {
  const [preview, setPreview] = useState<DapodikPhotoItem | null>(null);

  return (
    <>
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[#1f2a44]">
            Panduan Penajuan Data PTK dan NUPTK
          </h3>
          <p className="mt-1 text-sm text-[#748299]">
            Unduh gambar dibawah ini untuk panduan penajuan data PTK dan NUPTK
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PHOTO_ITEMS.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-lg border border-[#dbe5f4] bg-[#f8fbff]"
            >
              <button
                type="button"
                onClick={() => setPreview(item)}
                className="group relative w-full overflow-hidden"
                aria-label={`Preview ${item.title}`}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0f2a4f]/0 transition duration-300 group-hover:bg-[#0f2a4f]/30">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/0 text-white opacity-0 transition duration-300 group-hover:bg-white/20 group-hover:opacity-100">
                      <ImageIcon size={20} />
                    </span>
                  </div>
                </div>
              </button>

              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-semibold text-[#1f2a44]">{item.title}</p>
                  <p className="mt-0.5 text-xs text-[#748299]">{item.description}</p>
                </div>
                <a
                  href={item.src}
                  download={item.filename}
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-[#0f2a4f] px-3 text-xs font-semibold text-white transition hover:bg-[#1a3d6e]"
                >
                  <Download size={14} aria-hidden="true" />
                  Unduh
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {preview && (
        <div
          onMouseDown={(event) =>
            event.target === event.currentTarget && setPreview(null)
          }
          className="modal-backdrop-enter fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
        >
          <section className="modal-panel-enter max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#e4ecf7] px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1f2a44]">{preview.title}</h3>
                <p className="mt-0.5 text-xs text-[#748299]">{preview.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={preview.src}
                  download={preview.filename}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#0f2a4f] px-3 text-sm font-semibold text-white"
                >
                  <Download size={17} aria-hidden="true" />
                  Unduh
                </a>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="rounded-md p-2 hover:bg-[#eef3fb]"
                  aria-label="Tutup preview"
                >
                  <span className="block text-[#748299]" aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
            <div className="relative max-h-[75vh] overflow-auto bg-[#f8fbff] p-6">
              <div className="flex justify-center">
                {preview.src.toLowerCase().endsWith(".pdf") ? (
                  <iframe
                    src={preview.src}
                    title={preview.title}
                    className="h-[70vh] w-full rounded-lg border border-[#dbe5f4] bg-white"
                  />
                ) : (
                  <Image
                    src={preview.src}
                    alt={preview.title}
                    width={800}
                    height={600}
                    className="h-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}