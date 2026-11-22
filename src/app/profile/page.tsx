"use client";

import { showToast } from "@/lib/toast";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const { data: session, refetch } = authClient.useSession();
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string }>();

  function reportFeedback(result: { ok: boolean; text: string }) {
    setFeedback(result);
    showToast(result.text, result.ok ? "success" : "error");
  }

  if (!session) return <p role="status" className="p-8">Loading profile…</p>;

  const { user } = session;
  const dashboard = "/dashboard/" + (user.role || "Customer").toLowerCase();

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const value = (name: string) => String(fields.get(name) ?? "").trim();
    const name = value("name");
    if (!name) {
      reportFeedback({ ok: false, text: "Enter your name." });
      return;
    }

    setFeedback(undefined);
    setSaving(true);
    try {
      // Better Auth updates the signed-in account using its session cookie.
      const { error } = await authClient.updateUser({
        name,
        image: value("image") || null,
        phone: value("phone"),
        address: value("address"),
      });
      if (error) {
        reportFeedback({ ok: false, text: error.message || "Could not save your profile." });
        return;
      }
      reportFeedback({ ok: true, text: "Profile saved." });
      // Refresh the session so the new name and photo appear in navigation.
      void refetch();
    } catch {
      reportFeedback({ ok: false, text: "Could not save your profile. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="rental-form mx-auto w-full max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <Link href={dashboard} className="mb-5 inline-flex items-center gap-2 text-sm text-[#c8e889]">
        <ArrowLeft size={16} aria-hidden="true" /> Back to dashboard
      </Link>
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#19231c]">
        <div className="flex items-center gap-4 border-b border-white/10 bg-[#202d23] p-5 sm:p-8">
          <Avatar className="size-14 border border-white/15 sm:size-16">
            <AvatarImage src={user.image || undefined} alt="" />
            <AvatarFallback className="bg-[#304035] text-[#c8e889]">
              <UserRound aria-hidden="true" size={24} />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold sm:text-3xl">My profile</h1>
            <p className="truncate text-sm text-[#b4c0b4]">{user.email}</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="space-y-5 p-5 sm:p-8">
          <fieldset disabled={saving} className="grid gap-5 text-sm font-medium sm:grid-cols-2">
            <label>Full name<input name="name" autoComplete="name" defaultValue={user.name} maxLength={100} required /></label>
            <label>Sign-in email<input type="email" value={user.email} readOnly className="opacity-70" /></label>
            <label>Phone number<input name="phone" type="tel" autoComplete="tel" defaultValue={user.phone || ""} maxLength={40} /></label>
            <label>Profile photo URL<input name="image" type="url" placeholder="https://…" defaultValue={user.image || ""} /></label>
            <label className="sm:col-span-2">Address<textarea name="address" autoComplete="street-address" rows={3} defaultValue={user.address || ""} maxLength={400} /></label>
          </fieldset>
          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
            <button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
            {feedback && (
              <p role={feedback.ok ? "status" : "alert"} className={feedback.ok ? "flex items-center gap-2 text-sm text-[#c8e889]" : "text-sm text-red-300"}>
                {feedback.ok && <CheckCircle2 size={16} aria-hidden="true" />}
                {feedback.text}
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
