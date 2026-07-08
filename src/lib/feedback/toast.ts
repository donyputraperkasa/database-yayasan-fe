export type ToastType = "error" | "success";

export type ToastPayload = {
  message: string;
  type?: ToastType;
};

export const toastEventName = "mybopkri:toast";

export function showToast(payload: ToastPayload) {
  window.dispatchEvent(new CustomEvent<ToastPayload>(toastEventName, { detail: payload }));
}
