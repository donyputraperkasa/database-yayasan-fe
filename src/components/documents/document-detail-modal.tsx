"use client";

import { getMediaUrl } from "@/lib/api/media";
import type { DocumentItem } from "@/types";
import { Download, FileText, X } from "lucide-react";
import { useState } from "react";

type DocumentDetailModalProps = {
  document: DocumentItem | null;
  onClose: () => void;
};

export function DocumentDetailModal({
  document: item,
  onClose,
}: DocumentDetailModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!item) return null;

  const fileUrl = getMediaUrl(item.fileUrl);
  const extension = getExtension(item.fileUrl);

  const handleDownload = async () => {
    if (!fileUrl) return;
    setError(null);
    setIsDownloading(true);

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("File gagal diunduh.");
      const blobUrl = URL.createObjectURL(await response.blob());
      const link = window.document.createElement("a");
      link.href = blobUrl;
      link.download = buildDownloadName(item.name, extension);
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error
          ? downloadError.message
          : "File gagal diunduh.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-[#dbe5f4] p-5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#748299]">
              {item.school.name}
            </p>
            <h2 className="mt-1 truncate text-2xl font-semibold text-[#172033]">
              {item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-[#526078] hover:bg-[#eef3fb]"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className="grid max-h-[calc(92vh-92px)] gap-4 overflow-y-auto p-5 lg:grid-cols-[1fr_260px]">
          <Preview fileUrl={fileUrl} extension={extension} name={item.name} />
          <aside className="rounded-lg border border-[#dbe5f4] bg-[#f8fbff] p-4">
            <p className="text-sm font-semibold text-[#748299]">Update</p>
            <p className="mt-1 font-semibold text-[#172033]">
              {new Date(item.updatedAt).toLocaleDateString("id-ID")}
            </p>
            <button
              type="button"
              onClick={() => void handleDownload()}
              disabled={isDownloading || !fileUrl}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-4 text-sm font-semibold text-white disabled:bg-[#7f98bd]"
            >
              <Download size={17} aria-hidden="true" />
              {isDownloading ? "Mengunduh..." : "Download"}
            </button>
            {error ? (
              <p className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  );
}

function Preview(props: {
  extension: string;
  fileUrl: string | null;
  name: string;
}) {
  if (!props.fileUrl) return <PreviewFallback text="File tidak tersedia." />;

  if (
    props.extension === "pdf" ||
    ["jpg", "jpeg", "png", "webp"].includes(props.extension)
  ) {
    return (
      <iframe
        title={props.name}
        src={props.fileUrl}
        className="h-[70vh] min-h-[520px] w-full rounded-lg border border-[#dbe5f4] bg-white"
      />
    );
  }

  return <PreviewFallback text="Preview belum tersedia untuk format ini." />;
}

function PreviewFallback({ text }: { text: string }) {
  return (
    <div className="grid min-h-[520px] place-items-center rounded-lg border border-[#dbe5f4] bg-[#f8fbff] p-6 text-center">
      <div>
        <FileText className="mx-auto text-[#748299]" size={48} />
        <p className="mt-3 text-sm font-semibold text-[#526078]">{text}</p>
        <p className="mt-1 text-sm text-[#748299]">
          Gunakan tombol download untuk menyimpan dokumen.
        </p>
      </div>
    </div>
  );
}

function getExtension(path: string) {
  return path.split(".").pop()?.toLowerCase() ?? "";
}

function buildDownloadName(name: string, extension: string) {
  const safeName = name.trim().replace(/[^a-zA-Z0-9-_]+/g, "-").toLowerCase();

  return extension ? `${safeName || "dokumen"}.${extension}` : safeName;
}
