export const apiEndpoints = {
  auth: {
    changePassword: "/auth/change-password",
    login: "/auth/login",
    me: "/auth/me",
  },
  dashboard: {
    summary: "/dashboard/summary",
  },
  schools: {
    create: "/schools",
    list: "/schools",
    remove: (id: string) => `/schools/${id}`,
    update: (id: string) => `/schools/${id}`,
  },
  users: {
    create: "/users",
    list: "/users",
    resetPassword: (id: string) => `/users/${id}/reset-password`,
  },
} as const;
