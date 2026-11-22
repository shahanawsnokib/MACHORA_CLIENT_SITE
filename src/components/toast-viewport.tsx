"use client";

import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toastEvent, type ToastMessage } from "@/lib/toast";

const icons = { success: CheckCircle2, error: CircleAlert, info: Info };
const tones = { success: "text-[#c8e889]", error: "text-red-300", info: "text-sky-200" };

export default function ToastViewport() {
  const [toast, setToast] = useState<ToastMessage>();

  useEffect(() => {
    let timeout: number | undefined;
    function show(event: Event) {
      window.clearTimeout(timeout);
      setToast((event as CustomEvent<ToastMessage>).detail);
      timeout = window.setTimeout(() => setToast(undefined), 5500);
    }
    window.addEventListener(toastEvent, show);
    return () => {
      window.removeEventListener(toastEvent, show);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!toast) return null;

  const Icon = icons[toast.kind];
  return (
    <div className="fixed inset-x-4 bottom-5 z-[100] flex max-w-md items-start gap-3 rounded-xl border border-white/15 bg-[#19231c] px-4 py-3 text-[#edf2e6] shadow-xl sm:left-auto sm:right-5">
      <Icon className={"mt-0.5 shrink-0 " + tones[toast.kind]} size={19} aria-hidden="true" />
      <p role={toast.kind === "error" ? "alert" : "status"} className="min-w-0 flex-1 break-words text-sm">{toast.message}</p>
      <button type="button" aria-label="Dismiss notification" className="rounded p-0.5 text-[#bac8b9] hover:text-white" onClick={() => setToast(undefined)}>
        <X size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
