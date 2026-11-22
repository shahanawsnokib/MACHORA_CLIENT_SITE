import AnimatedSection from "@/components/animated-section";
import LiveEquipment from "@/components/live-equipment";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Clock3,
  HardHat,
  MapPin,
  MoveUpRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Earthmoving",
    count: "48 machines",
    mark: "01",
    icon: HardHat,
    tone: "from-[#26392e] to-[#1b2721]",
  },
  {
    name: "Lifting",
    count: "27 machines",
    mark: "02",
    icon: MoveUpRight,
    tone: "from-[#30342a] to-[#222720]",
  },
  {
    name: "Transport",
    count: "31 machines",
    mark: "03",
    icon: Truck,
    tone: "from-[#25333a] to-[#1b262b]",
  },
  {
    name: "Site essentials",
    count: "36 machines",
    mark: "04",
    icon: Building2,
    tone: "from-[#363126] to-[#25251f]",
  },
];

const assurances = [
  { icon: BadgeCheck, label: "Verified equipment" },
  { icon: ShieldCheck, label: "Protected bookings" },
  { icon: Clock3, label: "Flexible rental terms" },
];

function HomePage() {
  return (
    <main className="overflow-hidden">
      <AnimatedSection className="mx-auto max-w-[1320px] px-4 pb-14 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pb-20">
        <div className="relative isolate overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#19221d] sm:rounded-[34px]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_10%,rgba(119,153,95,0.17),transparent_42%),linear-gradient(115deg,#18211c_0%,#1b241f_52%,#202922_100%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-0 hidden w-[53%] bg-cover bg-center opacity-70 lg:block"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #1b241f 0%, rgba(27,36,31,0.26) 44%, rgba(18,25,21,0.12) 100%), url("https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1400&q=85")',
            }}
          />
          <div className="absolute right-[-130px] top-[-175px] z-0 h-[430px] w-[430px] rounded-full border border-[#d1ed91]/[0.09] sm:right-[-70px] sm:top-[-230px] sm:h-[600px] sm:w-[600px]" />
          <div className="absolute bottom-[-290px] right-[8%] z-0 h-[470px] w-[470px] rounded-full border border-[#d1ed91]/[0.08]" />

          <div className="relative z-10 grid min-h-[580px] items-center lg:grid-cols-[1.12fr_0.88fr]">
            <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#c8e889]/20 bg-[#c8e889]/[0.07] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c8e889] sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8e889] shadow-[0_0_12px_#c8e889]" />
                A better way to get to work
              </div>
              <h1 className="max-w-[680px] text-[46px] font-semibold leading-[0.99] tracking-[-0.055em] text-[#f3f5ef] sm:text-[64px] lg:text-[76px]">
                Good work
                <br />
                starts with the
                <br />
                <span className="text-[#c8e889]">right machine.</span>
              </h1>
              <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-[#b3beb4] sm:text-base">
                Find dependable equipment from people who know the job. Compare
                options, book with confidence, and keep your project moving.
              </p>

              <form
                action="/browse_equipment"
                className="mt-8 flex max-w-[570px] items-center gap-2 rounded-2xl border border-white/[0.1] bg-[#111814]/85 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.26)] backdrop-blur-md sm:rounded-full"
              >
                <MapPin className="ml-3 shrink-0 text-[#9eae99]" size={18} />
                <label htmlFor="equipment-search" className="sr-only">
                  Search equipment or location
                </label>
                <input
                  id="equipment-search"
                  name="search"
                  placeholder="What are you looking for?"
                  className="h-12 min-w-0 flex-1 bg-transparent px-2 text-sm text-[#eff2eb] outline-none placeholder:text-[#77827a]"
                />
                <button
                  type="submit"
                  className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c8e889] px-4 text-sm font-bold text-[#1c281e] transition-colors hover:bg-[#d7f39d] sm:rounded-full sm:px-5"
                >
                  <span className="hidden sm:inline">Find equipment</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                {assurances.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 text-xs font-medium text-[#c2ccc0]"
                  >
                    <Icon size={15} className="text-[#c8e889]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[580px] lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1b241f] via-[#1b241f]/20 to-transparent" />
              <div className="absolute bottom-8 left-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151c18]/85 px-4 py-3.5 shadow-xl backdrop-blur-xl xl:bottom-12 xl:left-0">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#c8e889]/10 text-[#c8e889]">
                  <BadgeCheck size={19} />
                </span>
                <span>
                  <span className="block text-xs font-bold text-[#f0f3eb]">
                    Ready when you are
                  </span>
                  <span className="mt-1 block text-[11px] text-[#aab5ab]">
                    Trusted local equipment owners
                  </span>
                </span>
              </div>
              <div className="absolute right-8 top-12 rounded-2xl border border-white/10 bg-[#151c18]/85 px-4 py-3 shadow-xl backdrop-blur-xl xl:right-12 xl:top-16">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9eaa9f]">
                  Built around your work
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    4.9
                  </span>
                  <span className="text-xs text-[#c8e889]">★★★★★</span>
                </div>
                <p className="mt-1 text-[11px] text-[#aab5ab]">Owner rating</p>
              </div>
              <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-[36px] bg-[#1b241f]/80" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 divide-x divide-white/[0.08] rounded-2xl border border-white/[0.07] bg-white/[0.025] py-5 sm:mt-8 sm:py-6">
          {[
            ["140+", "machines listed"],
            ["4.9 / 5", "average owner rating"],
            ["Every day", "projects moving forward"],
          ].map(([value, label]) => (
            <div key={label} className="px-3 text-center sm:px-6">
              <p className="text-base font-semibold tracking-tight text-[#eef1e8] sm:text-xl">
                {value}
              </p>
              <p className="mt-1.5 text-[9px] font-medium text-[#929f94] sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-[1320px] px-4 pb-20 pt-6 sm:px-6 sm:pb-24 lg:px-8 lg:pt-10">
        <div className="mb-7 flex items-end justify-between gap-5 sm:mb-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889] sm:text-[11px]">
              Find what fits the job
            </p>
            <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] text-[#f0f2ec] sm:text-[42px]">
              Explore equipment
            </h2>
            <p className="mt-2 text-sm text-[#9ca89e]">
              Start with a category. Find the right fit.
            </p>
          </div>
          <Link
            href="/browse_equipment"
            className="mb-1 hidden items-center gap-2 text-sm font-semibold text-[#d3e2ca] transition-colors hover:text-[#c8e889] sm:flex"
          >
            View all equipment
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, count, mark, icon: Icon, tone }) => (
            <Link
              key={name}
              href="/browse_equipment"
              className={`group relative min-h-[200px] overflow-hidden rounded-[22px] border border-white/[0.075] bg-gradient-to-br ${tone} p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e889]/30 sm:min-h-[235px] sm:rounded-[26px] sm:p-6`}
            >
              <span className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.15em] text-white/35">
                {mark}
              </span>
              <div className="absolute -right-7 -top-8 h-36 w-36 rounded-full border border-white/[0.07] transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -right-2 -top-3 h-24 w-24 rounded-full border border-white/[0.06]" />
              <span className="relative grid h-11 w-11 place-items-center rounded-[14px] border border-white/[0.08] bg-black/15 text-[#c8e889]">
                <Icon size={20} strokeWidth={1.7} />
              </span>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6">
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-[#f0f2ec]">
                    {name}
                  </span>
                  <span className="mt-1.5 block text-xs text-[#aeb9ad]">
                    {count}
                  </span>
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[#d2ddce] transition-all group-hover:border-[#c8e889]/30 group-hover:bg-[#c8e889] group-hover:text-[#1c281e]">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/browse_equipment"
          className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] py-3.5 text-sm font-semibold text-[#d3e2ca] sm:hidden"
        >
          Browse all equipment
          <ArrowDownRight size={16} />
        </Link>
      </AnimatedSection>

      <section className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-[#c8e889]/15 bg-[#202b23] px-6 py-10 sm:rounded-[30px] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-14">
          <div className="absolute -right-20 -top-36 h-80 w-80 rounded-full border border-[#c8e889]/10" />
          <div className="absolute -right-2 -top-28 h-56 w-56 rounded-full border border-[#c8e889]/10" />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
              For the people who build
            </p>
            <h2 className="mt-3 max-w-[620px] text-3xl font-semibold tracking-[-0.04em] text-[#f0f2ec] sm:text-[40px]">
              Put your equipment to work.
            </h2>
            <p className="mt-3 max-w-[530px] text-sm leading-6 text-[#aab6ab]">
              Join a growing network of owners helping projects move forward
              across Bangladesh.
            </p>
          </div>
          <Link
            href="/list_equipement"
            className="relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c8e889] px-5 text-sm font-bold text-[#1c281e] transition-colors hover:bg-[#d7f39d] lg:mt-0"
          >
            List your equipment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <AnimatedSection className="mx-auto max-w-7xl px-5 py-8">
        <h2 className="text-3xl font-bold">Featured equipment</h2>
        <LiveEquipment featured />
      </AnimatedSection>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-2">
        <div className="rounded-xl border border-white/15 p-6">
          <h2 className="text-2xl font-bold">Why rent with MACHORA?</h2>
          <p className="mt-3">Compare rates and choose daily, weekly, or monthly rentals. Listings are reviewed before they appear in the catalog.</p>
        </div>
        <div className="rounded-xl border border-white/15 p-6">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="mt-3">Find equipment, pick your dates and quantity, then confirm your booking. Arrange payment manually.</p>
          <Link className="mt-3 inline-block underline" href="/how_it_works">See rental steps</Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <h2 className="text-2xl font-bold">Sample customer reviews</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            ["Nusrat", 5, "The weekly option fit our project schedule."],
            ["Rahim", 5, "It was easy to find equipment near the site."],
            ["Farah", 4, "The listing gave me the terms before I booked."],
            ["Imran", 5, "I could compare rates in one place."],
          ].map(([name, rating, comment]) => <figure key={name} className="space-y-2 rounded-xl border border-white/15 p-5">
            <blockquote>{comment}</blockquote><figcaption>{name} · {rating}/5</figcaption>
          </figure>)}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
