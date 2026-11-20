import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { equipmentCategories, equipmentListings } from "@/lib/marketplace-data";

type Category = (typeof equipmentCategories)[number];
type Listing = (typeof equipmentListings)[number];

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.07] bg-[#19221d]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(119,153,95,0.19),transparent_40%),linear-gradient(115deg,#18211c_0%,#1b241f_55%,#202922_100%)]"
      />
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 py-14 sm:px-6 sm:py-18 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-20">
        <div className="max-w-[760px]">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8e889]" />
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[38px] font-semibold leading-[1.04] tracking-[-0.05em] text-[#f3f5ef] sm:text-[52px] lg:text-[60px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[650px] text-sm leading-7 text-[#b3beb4] sm:text-base">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-[650px]">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889] sm:text-[11px]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-0.045em] text-[#f0f2ec] sm:text-[40px]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-6 text-[#9eaa9f]">{description}</p>
      )}
    </div>
  );
}

export function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const Icon = category.icon;

  return (
    <Link
      href="/browse_equipment"
      className="group relative isolate flex min-h-[245px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#1a231e] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e889]/30 sm:min-h-[280px] sm:p-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-45 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url("${category.image}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101713] via-[#111713]/55 to-[#111713]/10"
      />
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] border border-white/10 bg-[#151d18]/80 text-[#c8e889] backdrop-blur-md">
          <Icon size={20} strokeWidth={1.7} />
        </span>
        <span className="text-[10px] font-bold tracking-[0.16em] text-white/65">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[#f0f2ec]">
            {category.name}
          </h3>
          <p className="mt-2 max-w-[250px] text-xs leading-5 text-[#b8c2b8]">
            {category.description}
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-[#e2e8de] transition-all group-hover:border-[#c8e889] group-hover:bg-[#c8e889] group-hover:text-[#1c281e]">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export function EquipmentCard({ listing }: { listing: Listing }) {
  return (
    <article className="group overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#19211c] transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e889]/25">
      <div className="relative h-[210px] overflow-hidden bg-[#222c25]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url("${listing.image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111713]/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#111713]/75 px-3 py-1.5 text-[10px] font-bold text-[#e2e8de] backdrop-blur-md">
          {listing.category}
        </span>
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#f0f2ec]">
          <MapPin size={13} className="text-[#c8e889]" />
          {listing.location}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-[#95a196]">{listing.model}</p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[#edf1e8]">
          {listing.name}
        </h3>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
          <p className="text-xs text-[#95a196]">
            From{" "}
            <span className="text-base font-bold text-[#d9efaa]">
              ৳{listing.dailyRate}
            </span>
            <span> / day</span>
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c8e889] transition-colors hover:text-[#e0f6b6]"
          >
            View details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c8e889] px-5 text-sm font-bold text-[#1c281e] transition-all hover:-translate-y-0.5 hover:bg-[#d7f39d]"
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
