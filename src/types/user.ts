import type { Role } from "./role";
import type { School } from "./school";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthUser = {
  sub: string;
  email: string;
  role: Role;
  schoolId?: string | null;
};

export type CreateUserPayload = {
  email: string;
  name: string;
  password: string;
  role: Role;
  schoolId?: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
};

export type UsersTableProps = {
  onDelete?: (user: User) => void;
  onResetPassword: (user: User) => void;
  schools: School[];
  users: User[];
};

export type CreateUserFormProps = {
  onCreated: (user: User) => void;
  schools: School[];
  token: string;
};

export type ResetPasswordModalProps = {
  onClose: () => void;
  token: string;
  user: User;
};


