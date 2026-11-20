import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ClipboardCheck,
  HandCoins,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";
import {
  PageIntro,
  PrimaryLink,
  SectionHeading,
} from "@/components/marketplace-ui";

const renterSteps = [
  {
    icon: Search,
    title: "Find your equipment",
    description:
      "Browse by category and location to see the kind of machines that fit your job.",
  },
  {
    icon: CalendarDays,
    title: "Plan the rental",
    description:
      "Review the listing details, rental rate, availability, and terms with the owner.",
  },
  {
    icon: ClipboardCheck,
    title: "Confirm the details",
    description:
      "Agree on dates, delivery or pickup, payment, and any site requirements before work begins.",
  },
  {
    icon: BadgeCheck,
    title: "Get the job moving",
    description:
      "Use the equipment as agreed and keep communication open through the rental.",
  },
];

const ownerSteps = [
  {
    icon: ClipboardCheck,
    title: "Create a clear listing",
    description:
      "Add the machine details, photos, location, daily rate, and rental requirements.",
  },
  {
    icon: HandCoins,
    title: "Connect with renters",
    description:
      "Answer questions and confirm the schedule and terms directly with the renter.",
  },
  {
    icon: Truck,
    title: "Coordinate the handoff",
    description:
      "Arrange delivery or pickup, explain safe operation, and agree on the return process.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="How it works"
        title="A clearer way to find and rent equipment."
        description="MACHORA brings renters and equipment owners together, so both sides can discuss the details and get ready for the job."
      >
        <PrimaryLink href="/browse_equipment">Find equipment</PrimaryLink>
      </PageIntro>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionHeading
          eyebrow="For renters"
          title="From search to site, step by step."
          description="Start with the machine you need and make sure the rental details are clear before you book."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {renterSteps.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="relative rounded-[22px] border border-white/[0.08] bg-[#19211c] p-5 sm:p-6"
            >
              <span className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#c8e889]/10 text-[#c8e889]">
                  <Icon size={20} />
                </span>
                <span className="text-xs font-bold tracking-[0.12em] text-[#718074]">
                  0{index + 1}
                </span>
              </span>
              <h3 className="mt-6 text-lg font-semibold text-[#edf1e8]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#9eaa9f]">
                {description}
              </p>
              {index < renterSteps.length - 1 && (
                <ArrowDown
                  aria-hidden="true"
                  size={15}
                  className="absolute -bottom-[11px] left-1/2 z-10 hidden rotate-[-90deg] text-[#c8e889] lg:block"
                />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="For equipment owners"
                title="Turn available equipment into new opportunities."
                description="A good listing helps renters understand what you offer and how to get started."
              />
              <Link
                href="/list_equipement"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#c8e889] hover:text-[#e0f6b6]"
              >
                Learn about listing equipment
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {ownerSteps.map(({ icon: Icon, title, description }, index) => (
                <article
                  key={title}
                  className="rounded-[20px] border border-white/[0.08] bg-[#171f1a] p-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#879489]">
                    Step 0{index + 1}
                  </p>
                  <Icon size={20} className="mt-4 text-[#c8e889]" />
                  <h3 className="mt-4 text-base font-semibold text-[#edf1e8]">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#9eaa9f]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-12 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="Good to know"
          title="A few helpful reminders."
        />
        <div className="space-y-3">
          {[
            [
              "Are rental prices shown per day?",
              "The sample listings show a daily rate. Always confirm the final price, minimum rental period, delivery costs, and any deposits with the equipment owner.",
            ],
            [
              "Who arranges delivery?",
              "Delivery or pickup should be agreed directly with the owner before the rental is confirmed.",
            ],
            [
              "What should I check before using a machine?",
              "Review the equipment condition, operating instructions, site requirements, and safety precautions with the owner.",
            ],
          ].map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-2xl border border-white/[0.08] bg-[#19211c] px-5 py-4"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#e7eee1] marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {question}
                  <ArrowDown
                    size={16}
                    className="shrink-0 text-[#9eaa9f] transition-transform group-open:rotate-180"
                  />
                </span>
              </summary>
              <p className="mt-3 pr-7 text-sm leading-6 text-[#9eaa9f]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}