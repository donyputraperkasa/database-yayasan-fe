import type { CreateUserPayload, ResetPasswordPayload, User } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listUsers(token: string) {
  return apiRequest<User[]>(apiEndpoints.users.list, { token });
}

export function createUser(token: string, payload: CreateUserPayload) {
  return apiRequest<User>(apiEndpoints.users.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function resetUserPassword(
  token: string,
  id: string,
  payload: ResetPasswordPayload,
) {
  return apiRequest(apiEndpoints.users.resetPassword(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}
