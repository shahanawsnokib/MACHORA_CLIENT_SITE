"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Send signed-out visitors to login after the session check finishes.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, router, session]);

  if (isPending || !session) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <p className="text-sm text-[#9eaa9f]">Loading your profile...</p>
      </main>
    );
  }

  const { user } = session;
  const firstInitial = user.name.trim().charAt(0).toUpperCase();

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-white/[0.08] bg-[#19211c] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:p-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
          Account
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#f0f2ec]">
          My profile
        </h1>

        <div className="mt-8 flex items-center gap-4 border-b border-white/[0.08] pb-7">
          <Avatar size="lg" className="size-16 border border-white/10 bg-[#202b23]">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="bg-[#202b23] text-xl font-bold text-[#c8e889]">
              {firstInitial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-[#f0f2ec]">
              {user.name}
            </h2>
            <p className="mt-1 truncate text-sm text-[#9eaa9f]">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold text-[#849186]">Role</dt>
            <dd className="mt-1 text-sm font-medium text-[#dce4d9]">
              {user.role || "Not set"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[#849186]">Email</dt>
            <dd className="mt-1 truncate text-sm font-medium text-[#dce4d9]">
              {user.email}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
