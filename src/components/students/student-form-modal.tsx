"use client";

import {
  createStudent,
  updateStudent,
  uploadStudentPhoto,
} from "@/lib/api/students";
import type { School, Student } from "@/types";
import { X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { StudentFormFields } from "./student-form-fields";
import {
  buildStudentPayload,
  getStudentPhotoFile,
} from "./student-form-payload";

type StudentFormModalProps = {
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (student: Student) => void;
  schools: School[];
  student?: Student | null;
  token: string;
};

export function StudentFormModal(props: StudentFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!props.isOpen) return null;

  const isEdit = Boolean(props.student);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = buildStudentPayload(formData, props.isSchoolUser);
      const savedStudent = isEdit
        ? await updateStudent(props.token, props.student!.id, payload)
        : await createStudent(props.token, payload);
      const photoFile = getStudentPhotoFile(formData);
      const nextStudent = photoFile
        ? await uploadStudentPhoto(props.token, savedStudent.id, photoFile)
        : savedStudent;

      props.onSaved(nextStudent);
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
        key={props.student?.id ?? "create-student"}
        onSubmit={handleSubmit}
        className="modal-panel-enter max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Siswa" : "Tambah Siswa"}
            </h2>
            <p className="mt-1 text-sm text-[#748299]">
              Lengkapi data utama siswa sesuai kebutuhan sekolah.
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
          <StudentFormFields
            isSchoolUser={props.isSchoolUser}
            schools={props.schools}
            student={props.student}
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
            {isLoading ? "Menyimpan..." : "Simpan Siswa"}
          </button>
        </div>
      </form>
    </div>
  );
}
