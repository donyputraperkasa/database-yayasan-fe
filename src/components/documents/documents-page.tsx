"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { deleteDocument, listDocuments } from "@/lib/api/documents";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { DocumentFilters, DocumentItem, School, User } from "@/types";
import { useEffect, useState } from "react";
import {
  cleanDocumentFilters,
  filterDocuments,
  getDocumentErrorMessage,
  upsertDocument,
} from "./document-page-utils";
import { DocumentDetailModal } from "./document-detail-modal";
import { DocumentFormModal } from "./document-form-modal";
import { DocumentStats } from "./document-stats";
import { DocumentsFilter } from "./documents-filter";
import { DocumentsHeader } from "./documents-header";
import { DocumentsTable } from "./documents-table";

export function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DocumentFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [schools, setSchools] = useState<School[]>([]);
  const [detailDocument, setDetailDocument] = useState<DocumentItem | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  const loadDocuments = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setDocuments(await listDocuments(token, cleanDocumentFilters(nextFilters)));
    } catch (loadError) {
      setError(getDocumentErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (document: DocumentItem | null) => {
    setSelectedDocument(document);
    setIsFormOpen(true);
  };

  const handleDelete = async (document: DocumentItem) => {
    if (!confirm(`Hapus dokumen ${document.name}?`)) return;
    await deleteDocument(token, document.id);
    setDocuments((current) =>
      current.filter((item) => item.id !== document.id),
    );
  };

  useEffect(() => {
    if (!token) return;
    Promise.all([listSchools(token), listDocuments(token)])
      .then(([schoolData, documentData]) => {
        setSchools(schoolData);
        setDocuments(documentData);
      })
      .catch((loadError) => setError(getDocumentErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const canManage = user?.role === "owner" || user?.role === "school";
  const visibleDocuments = filterDocuments(documents, filters.query);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat dokumen..." />;
  if (error) return <PageState text={error} action={() => void loadDocuments()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          ...(selectedSchoolName
            ? [
                {
                  href: "/documents",
                  label: selectedSchoolName,
                  onClick: () => setSelectedSchoolName(null),
                },
                { label: "Dokumen" },
              ]
            : [{ label: "Dokumen" }]),
        ]}
      />
      <DocumentsHeader canManage={canManage} onCreate={() => openForm(null)} />
      <DocumentStats documents={visibleDocuments} />
      <DocumentsFilter filters={filters} isSchoolUser={user?.role === "school"} onChange={setFilters} onSubmit={() => void loadDocuments()} schools={schools} />
      <DocumentsTable
        canManage={canManage}
        documents={visibleDocuments}
        onBackToSchools={() => setSelectedSchoolName(null)}
        onDelete={handleDelete}
        onDetail={setDetailDocument}
        onEdit={openForm}
        onSelectSchool={setSelectedSchoolName}
        selectedSchoolName={selectedSchoolName}
      />
      <DocumentDetailModal document={detailDocument} onClose={() => setDetailDocument(null)} />
      <DocumentFormModal document={selectedDocument} isOpen={isFormOpen} isSchoolUser={user?.role === "school"} onClose={() => setIsFormOpen(false)} onSaved={(document) => setDocuments((current) => upsertDocument(current, document))} schools={schools} token={token} />
    </div>
  );
}
