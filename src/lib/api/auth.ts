import type {
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
  MeResponse,
} from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>(apiEndpoints.auth.login, {
    body: JSON.stringify(payload),
    method: "POST",
  });
}

export function getMe(token: string) {
  return apiRequest<MeResponse>(apiEndpoints.auth.me, { token });
}

export function changePassword(
  token: string,
  payload: ChangePasswordPayload,
) {
  return apiRequest(apiEndpoints.auth.changePassword, {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}
