"use client";

import {
  ArrowUpRight,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/equipment" },
  { label: "How it works", href: "/how-it-works" },
  { label: "For owners", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
            href="/equipment"
            aria-label="Search equipment"
            className="mr-2 grid h-10 w-10 place-items-center rounded-full text-[#c2ccc0] transition-colors hover:bg-white/[0.06] hover:text-[#c8e889]"
          >
            <Search size={18} strokeWidth={2} />
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="mr-2 flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-bold text-[#e2e8de] transition-colors hover:text-[#c8e889]"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="h-10 rounded-full border border-white/15 px-4 text-[13px] font-bold text-[#e2e8de] transition-colors hover:border-[#c8e889]/40 hover:text-[#c8e889]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="mr-1 flex h-10 items-center gap-2 px-3 text-[13px] font-bold text-[#c2ccc0] transition-colors hover:text-white"
              >
                <UserRound size={16} />
                Login
              </Link>
              <Link
                href="/register"
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

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/10 text-[#e2e8de] transition-colors hover:border-[#c8e889]/40 hover:text-[#c8e889] lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
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
            <div className="mt-5 grid grid-cols-2 gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-bold text-[#e2e8de]"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(false);
                      closeMenu();
                    }}
                    className="h-12 rounded-xl bg-[#c8e889] text-sm font-bold text-[#1c281e]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center rounded-xl border border-white/10 text-sm font-bold text-[#e2e8de]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center rounded-xl bg-[#c8e889] text-sm font-black text-[#1c281e]"
                  >
                    Join MACHORA
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
