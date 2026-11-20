import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const groups = [
  {
    title: "Explore",
    links: [
      ["Browse equipment", "/browse_equipment"],
      ["How it works", "/how_it_works"],
      ["Popular categories", "/popular_categories"],
      ["Recently added", "/recently-added"],
    ],
  },
  {
    title: "MACHORA",
    links: [
      ["About us", "/about-us"],
      ["List equipment", "/list_equipement"],
      ["Contact", "/contact"],
      ["Rental terms", "/rental-tearms"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.07] bg-[#111713] text-[#edf2e6]">
      <div className="mx-auto max-w-[1240px] px-5 pb-8 pt-14 sm:pt-18">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_0.55fr_0.55fr_1fr]">
          <div>
            <Link href="/" className="flex w-fit items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-[13px] border border-[#c8e889]/15 bg-[#202b23]">
                <span className="absolute bottom-[10px] h-[7px] w-[27px] rotate-[-38deg] rounded-full bg-[#c8e889]" />
                <span className="absolute left-[12px] top-[11px] h-[18px] w-[18px] rounded-full border-[3px] border-[#c8e889]" />
              </span>
              <span className="text-[20px] font-black tracking-[0.14em]">MACHORA</span>
            </Link>
            <p className="mt-5 max-w-[330px] text-sm leading-7 text-[#9eaa9f]">
              The direct route from available equipment to productive work,
              across Bangladesh.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c8e889]">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[#9eaa9f] transition-colors hover:text-[#eef1e8]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c8e889]">
              Get updates
            </h2>
            <form className="mt-5 flex rounded-full border border-white/[0.1] bg-white/[0.035] p-1.5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#eef1e8] outline-none placeholder:text-[#77827a]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#c8e889] text-[#1c281e] transition-transform hover:rotate-6"
              >
                <ArrowUpRight size={17} />
              </button>
            </form>
            <div className="mt-5 space-y-2 text-xs text-[#89978b]">
              <a href="tel:+8801700000000" className="flex items-center gap-2 hover:text-[#eef1e8]">
                <Phone size={12} />
                +880 1700-000000
              </a>
              <a href="mailto:hello@machora.com" className="flex items-center gap-2 hover:text-[#eef1e8]">
                <Mail size={12} />
                hello@machora.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={12} />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-[#77827a] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MACHORA Marketplace</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#eef1e8]">Privacy</Link>
            <Link href="/rental-tearms" className="hover:text-[#eef1e8]">Terms</Link>
            <span>Built for Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
