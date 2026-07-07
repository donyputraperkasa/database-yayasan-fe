"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { SchoolEditAccessNotice } from "@/components/schools/school-edit-access-notice";
import { PageState } from "@/components/ui/page-state";
import { deleteFacility, listFacilities } from "@/lib/api/facilities";
import { listSchools } from "@/lib/api/schools";
import { canManageSchoolData, getCurrentSchool } from "@/lib/auth/permissions";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { Facility, FacilityFilters, School, User } from "@/types";
import { useEffect, useState } from "react";
import { FacilityDetailModal } from "./facility-detail-modal";
import { FacilityFormModal } from "./facility-form-modal";
import {
  cleanFacilityFilters,
  filterFacilities,
  getFacilityErrorMessage,
  upsertFacility,
} from "./facility-page-utils";
import { FacilityStats } from "./facility-stats";
import { FacilitiesFilter } from "./facilities-filter";
import { FacilitiesHeader } from "./facilities-header";
import { FacilitiesTable } from "./facilities-table";

export function FacilitiesPage() {
  const [detailFacility, setDetailFacility] = useState<Facility | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filters, setFilters] = useState<FacilityFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  const loadFacilities = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setFacilities(await listFacilities(token, cleanFacilityFilters(nextFilters)));
    } catch (loadError) {
      setError(getFacilityErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (facility: Facility | null) => {
    setSelectedFacility(facility);
    setIsFormOpen(true);
  };

  const handleDelete = async (facility: Facility) => {
    if (!confirm(`Hapus fasilitas ${facility.name}?`)) return;
    await deleteFacility(token, facility.id);
    setFacilities((current) => current.filter((item) => item.id !== facility.id));
  };

  useEffect(() => {
    if (!token) return;
    Promise.all([listSchools(token), listFacilities(token)])
      .then(([schoolData, facilityData]) => {
        setSchools(schoolData);
        setFacilities(facilityData);
      })
      .catch((loadError) => setError(getFacilityErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const currentSchool = getCurrentSchool(user, schools);
  const canManage = canManageSchoolData(user, schools);
  const activeSchoolName =
    user?.role === "school" ? currentSchool?.name : selectedSchoolName;
  const visibleFacilities = filterFacilities(facilities, filters.query);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat data fasilitas..." />;
  if (error) return <PageState text={error} action={() => void loadFacilities()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          ...(selectedSchoolName
            ? [
                {
                  href: "/facilities",
                  label: selectedSchoolName,
                  onClick: () => setSelectedSchoolName(null),
                },
                { label: "Fasilitas" },
              ]
            : [{ label: "Fasilitas" }]),
        ]}
      />
      <FacilitiesHeader canManage={canManage} onCreate={() => openForm(null)} />
      <SchoolEditAccessNotice school={currentSchool} user={user} />
      <FacilityStats facilities={visibleFacilities} />
      <FacilitiesFilter
        filters={filters}
        isSchoolUser={user?.role === "school"}
        onChange={setFilters}
        onSubmit={() => void loadFacilities()}
        schools={schools}
      />
      <FacilitiesTable
        canBackToSchools={user?.role !== "school"}
        canManage={canManage}
        facilities={visibleFacilities}
        onBackToSchools={() => setSelectedSchoolName(null)}
        onDelete={handleDelete}
        onDetail={setDetailFacility}
        onEdit={openForm}
        onSelectSchool={setSelectedSchoolName}
        selectedSchoolName={activeSchoolName}
      />
      <FacilityDetailModal
        facility={detailFacility}
        onClose={() => setDetailFacility(null)}
      />
      <FacilityFormModal
        facility={selectedFacility}
        isOpen={isFormOpen}
        isSchoolUser={user?.role === "school"}
        onClose={() => setIsFormOpen(false)}
        onSaved={(facility) =>
          setFacilities((current) => upsertFacility(current, facility))
        }
        schools={schools}
        token={token}
      />
    </div>
  );
}
