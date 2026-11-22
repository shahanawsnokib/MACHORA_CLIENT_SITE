"use client";

import { showToast } from "@/lib/toast";

import { authClient } from "@/lib/auth-client";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/browse_equipment" },
  { label: "How it works", href: "/how_it_works" },
  { label: "For owners", href: "/list_equipement" },
];

type AccountMenuProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role?: "Customer" | "Owner" | "Admin";
  };
  isSigningOut: boolean;
  signOutError: string;
  onSignOut: () => void;
};

function AccountMenu({
  user,
  isSigningOut,
  signOutError,
  onSignOut,
}: AccountMenuProps) {
  const firstInitial = user.name.trim().charAt(0).toUpperCase();
  const dashboardHref =
    user.role === "Admin"
      ? "/dashboard/admin"
      : user.role === "Owner"
        ? "/dashboard/owner"
        : "/dashboard/customer";

  return (
    <details className="group relative">
      <summary
        aria-label="Open account menu"
        className="list-none cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#c8e889]/60 [&::-webkit-details-marker]:hidden"
      >
        <Avatar size="lg" className="border border-white/10 bg-[#202b23]">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className="bg-[#202b23] text-sm font-bold text-[#c8e889]">
            {firstInitial || <UserRound size={17} />}
          </AvatarFallback>
        </Avatar>
      </summary>

      <div className="absolute right-0 top-full z-[60] mt-3 w-64 rounded-2xl border border-white/10 bg-[#19211c] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.4)]">
        <div className="border-b border-white/[0.08] px-3 py-2.5">
          <p className="truncate text-sm font-semibold text-[#f0f2ec]">
            {user.name}
          </p>
          <p className="mt-1 truncate text-xs text-[#9eaa9f]">{user.email}</p>
        </div>
        <Link
          href="/profile"
          className="mt-1 flex h-10 items-center rounded-xl px-3 text-sm font-semibold text-[#dce4d9] transition-colors hover:bg-white/[0.06] hover:text-[#c8e889]"
        >
          Profile
        </Link>
        {user.role && (
          <Link
            href={dashboardHref}
            className="flex h-10 items-center rounded-xl px-3 text-sm font-semibold text-[#dce4d9] transition-colors hover:bg-white/[0.06] hover:text-[#c8e889]"
          >
            Dashboard
          </Link>
        )}
        <button
          type="button"
          onClick={onSignOut}
          disabled={isSigningOut}
          className="flex h-10 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-[#dce4d9] transition-colors hover:bg-white/[0.06] hover:text-[#c8e889] disabled:cursor-wait disabled:opacity-60"
        >
          {isSigningOut ? "Signing out..." : "Sign out"}
        </button>
        {signOutError && (
          <p role="alert" className="px-3 py-2 text-xs text-red-300">
            {signOutError}
          </p>
        )}
      </div>
    </details>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  // The Better Auth session is the source of truth for navbar account links.
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const closeMenu = () => setMenuOpen(false);

  function reportError(message: string) {
    setSignOutError(message);
    showToast(message, "error");
  }

  async function handleSignOut() {
    setSignOutError("");
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();
      if (result.error) {
        reportError(result.error.message || "Unable to sign out.");
        return;
      }

      closeMenu();
      showToast("Signed out.");
    } catch (error) {
      reportError(
        error instanceof Error ? error.message : "Unable to sign out.",
      );
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#141b17]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[82px] max-w-[1240px] items-center px-5">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3"
          aria-label="MACHORA home"
        >
          <span className="relative grid h-11 w-11 place-items-center rounded-[13px] border border-[#c8e889]/15 bg-[#202b23] shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
            <span className="absolute bottom-[10px] h-[7px] w-[27px] rotate-[-38deg] rounded-full bg-[#c8e889]" />
            <span className="absolute left-[12px] top-[11px] h-[18px] w-[18px] rounded-full border-[3px] border-[#c8e889]" />
            <span className="absolute bottom-[8px] left-[10px] h-[7px] w-[7px] rounded-full bg-[#202b23] ring-[2px] ring-[#c8e889]" />
            <span className="absolute bottom-[8px] right-[10px] h-[7px] w-[7px] rounded-full bg-[#202b23] ring-[2px] ring-[#c8e889]" />
          </span>
          <span>
            <span className="block text-[20px] font-black leading-none tracking-[0.14em] text-[#eef1e8]">
              MACHORA
            </span>
            <span className="mt-1.5 block text-[8px] font-bold uppercase tracking-[0.32em] text-[#929f94]">
              Equipment network
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2.5 text-[13px] font-bold transition-colors ${
                  active
                    ? "bg-[#c8e889]/10 text-[#d9efaa]"
                    : "text-[#a2aea3] hover:bg-white/[0.05] hover:text-[#f0f2ec]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-5 hidden items-center border-l border-white/[0.08] pl-5 lg:flex">
          <Link
            href="/browse_equipment"
            aria-label="Search equipment"
            className="mr-2 grid h-10 w-10 place-items-center rounded-full text-[#c2ccc0] transition-colors hover:bg-white/[0.06] hover:text-[#c8e889]"
          >
            <Search size={18} strokeWidth={2} />
          </Link>

          {session?.user && (
            <AccountMenu
              user={session.user}
              isSigningOut={isSigningOut}
              signOutError={signOutError}
              onSignOut={handleSignOut}
            />
          )}
          {!session?.user && !isSessionPending && (
            <>
              <Link
                href="/login"
                className="mr-1 flex h-10 items-center gap-2 px-3 text-[13px] font-bold text-[#c2ccc0] transition-colors hover:text-white"
              >
                <UserRound size={16} />
                Login
              </Link>
              <Link
                href="/sign-up"
                className="group flex h-11 items-center gap-2 rounded-full bg-[#c8e889] px-5 text-[13px] font-black text-[#1c281e] shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#d7f39d]"
              >
                Join MACHORA
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          {session?.user && (
            <AccountMenu
              user={session.user}
              isSigningOut={isSigningOut}
              signOutError={signOutError}
              onSignOut={handleSignOut}
            />
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-[#e2e8de] transition-colors hover:border-[#c8e889]/40 hover:text-[#c8e889]"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/[0.07] bg-[#171f1a] px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center justify-between border-b border-white/[0.07] py-3.5 text-sm font-bold ${
                  pathname === item.href
                    ? "text-[#c8e889]"
                    : "text-[#a2aea3]"
                }`}
              >
                {item.label}
                <ChevronDown size={14} className="-rotate-90" />
              </Link>
            ))}
            {!session?.user && !isSessionPending && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex h-12 items-center justify-center rounded-xl border border-white/10 text-sm font-bold text-[#e2e8de]"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="flex h-12 items-center justify-center rounded-xl bg-[#c8e889] text-sm font-black text-[#1c281e]"
                >
                  Join MACHORA
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
