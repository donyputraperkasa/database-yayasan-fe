"use client";

import {
  createEmployee,
  updateEmployee,
  uploadEmployeeDecree,
  uploadEmployeePhoto,
} from "@/lib/api/employees";
import type { Employee, School } from "@/types";
import { X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { EmployeeFormFields } from "./employee-form-fields";
import {
  buildEmployeePayload,
  getEmployeeDecreeFile,
  getEmployeePhotoFile,
} from "./employee-form-payload";

type EmployeeFormModalProps = {
  employee?: Employee | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (employee: Employee) => void;
  schools: School[];
  token: string;
};

export function EmployeeFormModal(props: EmployeeFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!props.isOpen) return null;

  const isEdit = Boolean(props.employee);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = buildEmployeePayload(formData, props.isSchoolUser);
      const savedEmployee = isEdit
        ? await updateEmployee(props.token, props.employee!.id, payload)
        : await createEmployee(props.token, payload);
      const photoFile = getEmployeePhotoFile(formData);
      const employeeWithPhoto = photoFile
        ? await uploadEmployeePhoto(props.token, savedEmployee.id, photoFile)
        : savedEmployee;
      const decreeFile = getEmployeeDecreeFile(formData);
      const employee = decreeFile
        ? await uploadEmployeeDecree(props.token, employeeWithPhoto.id, decreeFile)
        : employeeWithPhoto;

      props.onSaved(employee);
      props.onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Data gagal disimpan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) props.onClose();
      }}
      className="modal-backdrop-enter fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <form
        key={props.employee?.id ?? "create-employee"}
        onSubmit={handleSubmit}
        className="modal-panel-enter max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Pegawai" : "Tambah Pegawai"}
            </h2>
            <p className="mt-1 text-sm text-[#748299]">
              Tanggal dan masa kerja dihitung otomatis oleh backend.
            </p>
          </div>
          <button
            type="button"
            onClick={props.onClose}
            className="rounded-md p-2 text-[#617089] hover:bg-[#eef3fb]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5">
          <EmployeeFormFields
            employee={props.employee}
            isSchoolUser={props.isSchoolUser}
            schools={props.schools}
          />
        </div>

        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={props.onClose}
            className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold"
          >
            Batal
          </button>
          <button
            disabled={isLoading}
            className="h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white disabled:bg-[#7f98bd]"
          >
            {isLoading ? "Menyimpan..." : "Simpan Pegawai"}
          </button>
        </div>
      </form>
    </div>
  );
}
