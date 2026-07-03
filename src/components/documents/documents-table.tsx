import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import { TableActions } from "@/components/ui/table-actions";
import { getMediaUrl } from "@/lib/api/media";
import type { DocumentItem } from "@/types";
import { ExternalLink } from "lucide-react";
import { groupDocumentsBySchool } from "./document-page-utils";

type DocumentsTableProps = {
  canManage: boolean;
  documents: DocumentItem[];
  onBackToSchools: () => void;
  onDelete: (document: DocumentItem) => void;
  onEdit: (document: DocumentItem) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export function DocumentsTable(props: DocumentsTableProps) {
  const entries = Object.entries(groupDocumentsBySchool(props.documents));
  const selectedEntry = entries.find(
    ([schoolName]) => schoolName === props.selectedSchoolName,
  );

  if (props.selectedSchoolName && selectedEntry) {
    const [schoolName, documents] = selectedEntry;

    return (
      <section className="space-y-4">
        <DetailHeader
          count={documents.length}
          onBack={props.onBackToSchools}
          schoolName={schoolName}
        />
        <DocumentGroupTable documents={documents} tableProps={props} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {entries.map(([schoolName, documents]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${documents.length} file`}
          description="Dokumen sekolah yang sudah terunggah."
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.documents.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm lg:col-span-2">
          Dokumen belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function DetailHeader(props: {
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <article className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#172033]">
            {props.schoolName}
          </h2>
          <p className="mt-1 text-sm text-[#748299]">
            Dokumen sekolah yang sudah tercatat.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
            {props.count} file
          </span>
          <button
            type="button"
            onClick={props.onBack}
            className="rounded-md border border-[#dbe5f4] px-4 py-2 text-sm font-semibold text-[#0f2a4f]"
          >
            Semua sekolah
          </button>
        </div>
      </div>
    </article>
  );
}

function DocumentGroupTable(props: {
  documents: DocumentItem[];
  tableProps: DocumentsTableProps;
}) {
  return (
    <article className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#dbe5f4] text-[#748299]">
            <tr>
              <th className="py-3 font-semibold">Nama Dokumen</th>
              <th className="py-3 font-semibold">Update</th>
              <th className="py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef3fb]">
            {props.documents.map((document) => (
              <tr key={document.id}>
                <td className="py-3 font-semibold text-[#172033]">
                  {document.name}
                </td>
                <td className="py-3 text-[#526078]">
                  {new Date(document.updatedAt).toLocaleDateString("id-ID")}
                </td>
                <td className="py-3 text-center">
                  <DocumentActions
                    document={document}
                    {...props.tableProps}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
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
