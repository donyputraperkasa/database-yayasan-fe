import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import { TableActions } from "@/components/ui/table-actions";
import type { DocumentItem, DocumentsTableProps } from "@/types";
import { groupDocumentsBySchool } from "./document-page-utils";

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
          canBackToSchools={props.canBackToSchools ?? true}
          count={documents.length}
          onBack={props.onBackToSchools}
          schoolName={schoolName}
        />
        <DocumentGroupTable documents={documents} tableProps={props} />
      </section>
    );
  }

  return (
    <section className="grid gap-3.5 sm:gap-4 grid-cols-1 md:grid-cols-2">
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
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm md:col-span-2">
          Dokumen belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function DetailHeader(props: {
  canBackToSchools: boolean;
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <article className="rounded-xl border border-[#dbe5f4] bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
            {props.schoolName}
          </h2>
          <p className="mt-0.5 text-xs text-[#748299] sm:text-sm">
            Dokumen sekolah yang sudah tercatat.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-xs sm:text-sm font-semibold text-[#172033]">
            {props.count} file
          </span>
          {props.canBackToSchools ? (
            <button
              type="button"
              onClick={props.onBack}
              className="rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#0f2a4f] transition hover:bg-[#eaf2ff]"
            >
              Semua sekolah
            </button>
          ) : null}
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
    <article className="rounded-xl border border-[#dbe5f4] bg-white p-3.5 sm:p-5 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#dbe5f4] text-xs font-bold uppercase tracking-wider text-[#748299]">
            <tr>
              <th className="pb-3 pr-2 font-semibold">Nama Dokumen</th>
              <th className="pb-3 px-2 font-semibold whitespace-nowrap">Update</th>
              <th className="pb-3 pl-2 text-right sm:text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef3fb]">
            {props.documents.map((document) => (
              <tr key={document.id} className="hover:bg-[#f8fbff]/60 transition-colors">
                <td className="py-3 pr-2 font-semibold text-[#172033]">
                  <div className="line-clamp-2 max-w-[150px] text-xs sm:max-w-none sm:text-sm">
                    {document.name}
                  </div>
                </td>
                <td className="py-3 px-2 text-xs sm:text-sm text-[#526078] whitespace-nowrap">
                  {new Date(document.updatedAt).toLocaleDateString("id-ID")}
                </td>
                <td className="py-3 pl-2 text-right sm:text-center">
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
    <TableActions
      canManage={props.canManage}
      onDelete={() => props.onDelete(props.document)}
      onDetail={() => props.onDetail(props.document)}
      onEdit={() => props.onEdit(props.document)}
    />
  );
}
