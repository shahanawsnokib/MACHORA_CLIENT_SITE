import {
  AlertCircle,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  PageIntro,
  SectionHeading,
} from "@/components/marketplace-ui";

const termsSections = [
  {
    icon: CalendarDays,
    title: "Before you confirm a rental",
    points: [
      "Review the equipment description, condition, location, and availability.",
      "Agree on the rental period, total price, delivery or pickup, and any deposit directly with the owner.",
      "Ask about operating requirements, included accessories, and site access before the start date.",
    ],
  },
  {
    icon: BadgeCheck,
    title: "During the rental",
    points: [
      "Use the equipment only for its intended purpose and follow the owner’s operating guidance.",
      "Keep the equipment in the agreed condition and report issues or damage promptly.",
      "Do not transfer the rental to another person or location without the owner’s agreement.",
    ],
  },
  {
    icon: Handshake,
    title: "At the end of the rental",
    points: [
      "Return the equipment at the agreed time and location, unless both sides agree to an extension.",
      "Review its condition together and settle any agreed outstanding charges.",
      "Contact the owner promptly if plans change or a return may be delayed.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Clear communication and safety",
    points: [
      "Both sides should keep a written record of agreed dates, rates, handoff details, and special conditions.",
      "Only appropriately trained people should operate equipment, and required protective measures should be followed.",
      "Discuss insurance, damage responsibility, and applicable permits before the rental begins.",
    ],
  },
];

export default function RentalTermsPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="Rental terms"
        title="Clear expectations make better rentals."
        description="Use these marketplace guidelines to prepare for a rental. Confirm the final terms directly with the equipment owner before work begins."
      />

      <section className="mx-auto max-w-[980px] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-9 flex gap-3 rounded-2xl border border-[#c8e889]/20 bg-[#c8e889]/[0.06] p-4 sm:p-5">
          <AlertCircle size={19} className="mt-0.5 shrink-0 text-[#c8e889]" />
          <p className="text-sm leading-6 text-[#cbd4c8]">
            These are general marketplace guidelines, not a substitute for a
            written rental agreement. Rental prices, deposits, insurance, and
            responsibilities must be agreed between the renter and owner.
          </p>
        </div>

        <SectionHeading
          eyebrow="Marketplace guidelines"
          title="A few things to agree on up front."
        />
        <div className="space-y-4">
          {termsSections.map(({ icon: Icon, title, points }, index) => (
            <article
              key={title}
              className="rounded-[22px] border border-white/[0.08] bg-[#19211c] p-5 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#c8e889]/10 text-[#c8e889]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#879489]">
                    Section 0{index + 1}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-[#edf1e8]">
                    {title}
                  </h2>
                </div>
              </div>
              <ul className="mt-5 space-y-3 pl-1">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-6 text-[#aab6ab]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8e889]" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-[#edf1e8]">
              Need help understanding a rental?
            </h2>
            <p className="mt-1 text-sm text-[#9eaa9f]">
              Contact the MACHORA team before confirming your plans.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#c8e889] hover:text-[#e0f6b6]"
          >
            Contact us
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}