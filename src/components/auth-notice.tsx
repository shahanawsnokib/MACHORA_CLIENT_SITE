"use client";

import { useSearchParams } from "next/navigation";

export default function AuthNotice() {
  const status = useSearchParams().get("auth");
  if (status !== "registered" && status !== "signed-in") return null;

  function dismiss() {
    const url = new URL(window.location.href);
    url.searchParams.delete("auth");
    window.history.replaceState(null, "", url);
  }

  return (
    <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-4 rounded-xl border border-[#c8e889]/40 bg-[#19211c] px-4 py-3 text-[#eaf1e8] shadow-xl">
      <span>{status === "registered" ? "Account created." : "Signed in successfully."}</span>
      <button type="button" className="text-xs underline" onClick={dismiss}>Dismiss</button>
    </div>
  );
}
