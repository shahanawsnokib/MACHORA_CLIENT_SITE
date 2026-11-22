"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { showToast } from "@/lib/toast";

export default function AuthNotice() {
  const status = useSearchParams().get("auth");

  useEffect(() => {
    if (status !== "registered" && status !== "signed-in") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("auth") !== status) return;
    // Remove the flag so refreshing the page does not show the toast again.
    url.searchParams.delete("auth");
    window.history.replaceState(null, "", url);
    showToast(status === "registered" ? "Account created." : "Signed in successfully.");
  }, [status]);

  return null;
}
