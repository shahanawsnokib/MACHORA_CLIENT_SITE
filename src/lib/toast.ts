export type ToastKind = "success" | "error" | "info";
export type ToastMessage = { message: string; kind: ToastKind };

export const toastEvent = "machora:toast";

// Forms send feedback here so every page can use the same notification.
export function showToast(message: string, kind: ToastKind = "success") {
  window.dispatchEvent(new CustomEvent<ToastMessage>(toastEvent, { detail: { message, kind } }));
}
