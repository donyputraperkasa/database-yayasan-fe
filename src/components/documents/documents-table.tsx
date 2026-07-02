import { TableActions } from "@/components/ui/table-actions";
import { getMediaUrl } from "@/lib/api/media";
import type { DocumentItem } from "@/types";
import { ExternalLink } from "lucide-react";
import { groupDocumentsBySchool } from "./document-page-utils";

type DocumentsTableProps = {
  canManage: boolean;
  documents: DocumentItem[];
  onDelete: (document: DocumentItem) => void;
  onEdit: (document: DocumentItem) => void;
};

export function DocumentsTable(props: DocumentsTableProps) {
  const entries = Object.entries(groupDocumentsBySchool(props.documents));

  return (
    <section className="space-y-4">
      {entries.map(([schoolName, documents]) => (
        <article key={schoolName} className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{schoolName}</h2>
              <p className="mt-1 text-sm text-[#748299]">
                {documents.length} dokumen terunggah.
              </p>
            </div>
            <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
              {documents.length} file
            </span>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[#dbe5f4] text-[#748299]">
                <tr>
                  <th className="py-3 font-semibold">Nama Dokumen</th>
                  <th className="py-3 font-semibold">Update</th>
                  <th className="py-3 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef3fb]">
                {documents.map((document) => (
                  <tr key={document.id}>
                    <td className="py-3 font-semibold text-[#172033]">
                      {document.name}
                    </td>
                    <td className="py-3 text-[#526078]">
                      {new Date(document.updatedAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 text-center">
                      <DocumentActions document={document} {...props} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}
      {props.documents.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm">
          Dokumen belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function DocumentActions(props: DocumentsTableProps & { document: DocumentItem }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <a
        href={getMediaUrl(props.document.fileUrl) ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-[#cfe0f5] bg-[#eaf2ff] px-3 py-2 text-xs font-semibold text-[#0f2a4f]"
      >
        <ExternalLink size={14} aria-hidden="true" />
        Buka
      </a>
      <TableActions
        canManage={props.canManage}
        onDelete={() => props.onDelete(props.document)}
        onDetail={() => window.open(getMediaUrl(props.document.fileUrl) ?? "#", "_blank")}
        onEdit={() => props.onEdit(props.document)}
      />
    </div>
  );
}
