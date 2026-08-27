"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { SchoolEditAccessNotice } from "@/components/schools/school-edit-access-notice";
import { PageState } from "@/components/ui/page-state";
import { deleteInventory, listInventory } from "@/lib/api/inventory";
import { listSchools } from "@/lib/api/schools";
import { canManageSchoolData, getCurrentSchool } from "@/lib/auth/permissions";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import { useEffect, useState } from "react";
import { InventoryDetailModal } from "./inventory-detail-modal";
import { InventoryFormModal } from "./inventory-form-modal";
import { cleanInventoryFilters, filterInventory, getInventoryErrorMessage, upsertInventory,} from "./inventory-page-utils";
import { InventoryStats } from "./inventory-stats";
import { InventoryFilter } from "./inventory-filter";
import { InventoryHeader } from "./inventory-header";
import { InventoryTable } from "./inventory-table";
import type { Inventory, InventoryFilters, School, User } from "@/types";

export function InventoryPage() {
  const [detailInventory, setDetailInventory] = useState<Inventory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [filters, setFilters] = useState<InventoryFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  const loadInventory = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setInventory(await listInventory(token, cleanInventoryFilters(nextFilters)));
    } catch (loadError) {
      setError(getInventoryErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (inventory: Inventory | null) => {
    setSelectedInventory(inventory);
    setIsFormOpen(true);
  };

  const handleDelete = async (inventory: Inventory) => {
    if (!confirm(`Hapus inventaris ${inventory.name}?`)) return;
    await deleteInventory(token, inventory.id);
    setInventory((current) => current.filter((item) => item.id !== inventory.id));
  };

  useEffect(() => {
    if (!token) return;
    Promise.all([
        listSchools(token), 
        listInventory(token)
      ]).then(([
        schoolData, 
        inventoryData
      ]) => {
        setSchools(schoolData);
        setInventory(inventoryData);
      })
      .catch((loadError) => setError(getInventoryErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const currentSchool = getCurrentSchool(user, schools);
  const canManage = canManageSchoolData(user, schools);
  const activeSchoolName =
    user?.role === "school" ? currentSchool?.name : selectedSchoolName;
  const visibleInventory = filterInventory(
    inventory,
    filters.query,
    filters.level,
    filters.schoolId,
  );

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat data inventaris..." />;
  if (error) return <PageState text={error} action={() => void loadInventory()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          ...(selectedSchoolName
            ? [
                {
                  href: "/inventory",
                  label: selectedSchoolName,
                  onClick: () => setSelectedSchoolName(null),
                },
                { label: "Inventaris" },
              ]
            : [{ label: "Inventaris" }]),
        ]}
      />
      <InventoryHeader canManage={canManage} onCreate={() => openForm(null)} />
      <SchoolEditAccessNotice school={currentSchool} user={user} />
      <InventoryStats inventory={visibleInventory} />
      <InventoryFilter
        filters={filters}
        isSchoolUser={user?.role === "school"}
        onChange={setFilters}
        onSubmit={() => void loadInventory()}
        schools={schools}
      />
      <InventoryTable
        canBackToSchools={user?.role !== "school"}
        canManage={canManage}
        inventory={visibleInventory}
        onBackToSchools={() => setSelectedSchoolName(null)}
        onDelete={handleDelete}
        onDetail={setDetailInventory}
        onEdit={openForm}
        onSelectSchool={setSelectedSchoolName}
        selectedSchoolName={activeSchoolName}
      />
      <InventoryDetailModal
        inventory={detailInventory}
        onClose={() => setDetailInventory(null)}
      />
      <InventoryFormModal
        inventory={selectedInventory}
        isOpen={isFormOpen}
        isSchoolUser={user?.role === "school"}
        onClose={() => setIsFormOpen(false)}
        onSaved={(inventory) =>
          setInventory((current) => upsertInventory(current, inventory))
        }
        schools={schools}
        token={token}
      />
    </div>
  );
}
