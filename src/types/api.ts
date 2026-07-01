export type ApiErrorBody = {
  error?: string;
  message?: string | string[];
  statusCode?: number;
};

export type ApiRequestOptions = RequestInit & {
  token?: string | null;
};
