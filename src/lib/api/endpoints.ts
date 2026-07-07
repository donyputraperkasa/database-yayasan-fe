export const apiEndpoints = {
  auth: {
    changePassword: "/auth/change-password",
    login: "/auth/login",
    me: "/auth/me",
  },
  assets: {
    create: "/assets",
    list: "/assets",
    photo: (id: string) => `/assets/${id}/photo`,
    remove: (id: string) => `/assets/${id}`,
    update: (id: string) => `/assets/${id}`,
  },
  dashboard: {
    summary: "/dashboard/summary",
  },
  documents: {
    list: "/documents",
    remove: (id: string) => `/documents/${id}`,
    update: (id: string) => `/documents/${id}`,
    upload: "/documents/upload",
  },
  employees: {
    create: "/employees",
    decree: (id: string) => `/employees/${id}/decree`,
    list: "/employees",
    photo: (id: string) => `/employees/${id}/photo`,
    remove: (id: string) => `/employees/${id}`,
    update: (id: string) => `/employees/${id}`,
  },
  facilities: {
    create: "/facilities",
    list: "/facilities",
    remove: (id: string) => `/facilities/${id}`,
    update: (id: string) => `/facilities/${id}`,
  },
  finances: {
    create: "/finances",
    list: "/finances",
    remove: (id: string) => `/finances/${id}`,
    update: (id: string) => `/finances/${id}`,
  },
  schools: {
    create: "/schools",
    editAccess: (id: string) => `/schools/${id}/edit-access`,
    list: "/schools",
    remove: (id: string) => `/schools/${id}`,
    update: (id: string) => `/schools/${id}`,
  },
  schoolProfile: {
    detail: (schoolId: string) => `/school-profile/${schoolId}`,
    photo: (schoolId: string) => `/school-profile/${schoolId}/photo`,
    update: (schoolId: string) => `/school-profile/${schoolId}`,
  },
  students: {
    create: "/students",
    list: "/students",
    photo: (id: string) => `/students/${id}/photo`,
    remove: (id: string) => `/students/${id}`,
    update: (id: string) => `/students/${id}`,
  },
  users: {
    create: "/users",
    list: "/users",
    resetPassword: (id: string) => `/users/${id}/reset-password`,
  },
} as const;
