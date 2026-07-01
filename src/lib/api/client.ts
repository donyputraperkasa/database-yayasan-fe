import type { ApiErrorBody, ApiRequestOptions } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const API_BASE_URL = API_URL.replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody | null;

  constructor(status: number, body: ApiErrorBody | null) {
    const message = formatApiMessage(body) ?? `Request gagal (${status})`;

    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { headers, token, ...requestOptions } = options;
  const response = await sendRequest(path, requestOptions, headers, token);

  if (!response.ok) {
    throw new ApiError(response.status, await parseApiError(response));
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

async function sendRequest(
  path: string,
  requestOptions: RequestInit,
  headers?: HeadersInit,
  token?: string | null,
) {
  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      ...requestOptions,
      headers: buildHeaders(headers, token, requestOptions.body),
    });
  } catch {
    throw new ApiError(0, {
      message:
        "Tidak bisa terhubung ke backend. Pastikan server berjalan dan CORS aktif.",
    });
  }
}

function buildHeaders(
  headers?: HeadersInit,
  token?: string | null,
  body?: BodyInit | null,
) {
  const nextHeaders = new Headers(headers);
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!nextHeaders.has("Content-Type") && !isFormData) {
    nextHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    nextHeaders.set("Authorization", `Bearer ${token}`);
  }

  return nextHeaders;
}

async function parseApiError(response: Response) {
  try {
    return (await response.json()) as ApiErrorBody;
  } catch {
    return null;
  }
}

function formatApiMessage(body: ApiErrorBody | null) {
  if (Array.isArray(body?.message)) {
    return body.message.join(", ");
  }

  return body?.message ?? body?.error;
}
