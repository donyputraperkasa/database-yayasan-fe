import { TableActions } from "@/components/ui/table-actions";
import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { Facility } from "@/types";
import {
  facilityConditionLabel,
  facilityConditionTone,
} from "./facility-labels";
import { groupFacilitiesBySchool } from "./facility-page-utils";

type FacilitiesTableProps = {
  canManage: boolean;
  facilities: Facility[];
  onBackToSchools: () => void;
  onDelete: (facility: Facility) => void;
  onDetail: (facility: Facility) => void;
  onEdit: (facility: Facility) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export function FacilitiesTable(props: FacilitiesTableProps) {
  const groups = groupFacilitiesBySchool(props.facilities);
  const entries = Object.entries(groups);
  const selectedGroup = entries.find(([name]) => name === props.selectedSchoolName);

  if (selectedGroup) {
    const [schoolName, facilities] = selectedGroup;

    return (
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <DetailHeader
          count={facilities.length}
          onBack={props.onBackToSchools}
          schoolName={schoolName}
          totalUnit={sumQuantity(facilities)}
        />
        <FacilityGroupTable {...props} facilities={facilities} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {entries.map(([schoolName, facilities]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${sumQuantity(facilities)} unit`}
          description={`${facilities.length} jenis fasilitas tercatat.`}
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.facilities.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm">
          Data fasilitas belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function DetailHeader(props: {
  count: number;
  onBack: () => void;
  schoolName: string;
  totalUnit: number;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">{props.schoolName}</h2>
        <p className="mt-1 text-sm text-[#748299]">
          {props.count} jenis fasilitas, {props.totalUnit} unit.
        </p>
      </div>
      <button
        type="button"
        onClick={props.onBack}
        className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
      >
        Kembali ke sekolah
      </button>
    </div>
  );
}

function FacilityGroupTable(props: FacilitiesTableProps) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="border-b border-[#dbe5f4] text-[#748299]">
          <tr>
            <th className="py-3 font-semibold">Fasilitas</th>
            <th className="py-3 font-semibold">Jumlah</th>
            <th className="py-3 font-semibold">Kondisi</th>
            <th className="py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef3fb]">
          {props.facilities.map((facility) => (
            <tr key={facility.id}>
              <td className="py-3 font-semibold text-[#172033]">{facility.name}</td>
              <td className="py-3 text-[#526078]">{facility.quantity}</td>
              <td className="py-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${facilityConditionTone[facility.condition]}`}>
                  {facilityConditionLabel[facility.condition]}
                </span>
              </td>
              <td className="py-3 text-center">
                <TableActions
                  canManage={props.canManage}
                  onDelete={() => props.onDelete(facility)}
                  onDetail={() => props.onDetail(facility)}
                  onEdit={() => props.onEdit(facility)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function sumQuantity(facilities: Facility[]) {
  return facilities.reduce((sum, facility) => sum + facility.quantity, 0);
}
