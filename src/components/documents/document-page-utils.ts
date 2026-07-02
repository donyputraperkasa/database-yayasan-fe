import type { DocumentFilters, DocumentItem } from "@/types";

export function cleanDocumentFilters(filters: DocumentFilters) {
  return {
    schoolId: filters.schoolId || undefined,
  };
}

export function filterDocuments(documents: DocumentItem[], query?: string) {
  const keyword = query?.toLowerCase().trim();
  if (!keyword) return documents;

  return documents.filter((document) =>
    [document.name, document.school.name]
      .some((value) => value.toLowerCase().includes(keyword)),
  );
}

export function groupDocumentsBySchool(documents: DocumentItem[]) {
  return documents.reduce<Record<string, DocumentItem[]>>((groups, document) => {
    const schoolName = document.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), document];
    return groups;
  }, {});
}

export function upsertDocument(
  documents: DocumentItem[],
  savedDocument: DocumentItem,
) {
  const exists = documents.some((document) => document.id === savedDocument.id);
  if (!exists) return [savedDocument, ...documents];

  return documents.map((document) =>
    document.id === savedDocument.id ? savedDocument : document,
  );
}

export function getDocumentErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Dokumen gagal diproses.";
}
