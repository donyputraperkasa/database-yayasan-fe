import type { AuthUser, User } from "./user";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type MeResponse = AuthUser;

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
