export const apiEndpoints = {
  auth: {
    changePassword: "/auth/change-password",
    login: "/auth/login",
    me: "/auth/me",
  },
  dashboard: {
    summary: "/dashboard/summary",
  },
  employees: {
    create: "/employees",
    list: "/employees",
    photo: (id: string) => `/employees/${id}/photo`,
    remove: (id: string) => `/employees/${id}`,
    update: (id: string) => `/employees/${id}`,
  },
  schools: {
    create: "/schools",
    editAccess: (id: string) => `/schools/${id}/edit-access`,
    list: "/schools",
    remove: (id: string) => `/schools/${id}`,
    update: (id: string) => `/schools/${id}`,
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
