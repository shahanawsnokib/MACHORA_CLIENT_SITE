import {
  BadgeCheck,
  Camera,
  HandCoins,
  MapPin,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import {
  PageIntro,
  PrimaryLink,
  SectionHeading,
} from "@/components/marketplace-ui";

const benefits = [
  {
    icon: UsersRound,
    title: "Meet local renters",
    description:
      "Make your equipment easier to discover among people planning projects nearby.",
  },
  {
    icon: HandCoins,
    title: "Set your own terms",
    description:
      "Share your rates, availability, delivery options, and requirements up front.",
  },
  {
    icon: Camera,
    title: "Show the details",
    description:
      "Use clear photos and accurate information to help renters choose with confidence.",
  },
];

const listingChecklist = [
  "Equipment name, type, and specifications",
  "Current photos and condition",
  "Location and delivery or pickup options",
  "Rental rate, availability, and terms",
];

export default function ListEquipmentPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="For equipment owners"
        title="Put your equipment to work."
        description="Create a clear listing, connect with people who need your machine, and agree on rental details directly."
      >
        <PrimaryLink href="/sign-up">Get started</PrimaryLink>
      </PageIntro>

      <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="A simple way to get listed"
            title="Your equipment deserves to be seen."
            description="A useful listing gives renters the information they need to understand whether your equipment fits their job."
          />
          <div className="space-y-3">
            {listingChecklist.map((item) => (
              <p key={item} className="flex items-center gap-3 text-sm text-[#cbd4c8]">
                <BadgeCheck size={17} className="shrink-0 text-[#c8e889]" />
                {item}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryLink href="/sign-up">Create an account</PrimaryLink>
            <Link
              href="/how_it_works"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-[#d3ddcf] transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              See how it works
            </Link>
          </div>
        </div>
        <div className="relative min-h-[330px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#1a231e] sm:min-h-[420px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(180deg,rgba(17,24,19,0.12),rgba(17,24,19,0.82)),url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85")',
            }}
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[#151d18]/85 p-4 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-[#edf1e8]">
              <MapPin size={15} className="text-[#c8e889]" />
              Share equipment with your local network
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="A better way to get discovered"
            title="Make a strong first impression."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-[22px] border border-white/[0.08] bg-[#171f1a] p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#c8e889]/10 text-[#c8e889]">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#edf1e8]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#9eaa9f]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="How listing works"
            title="Three steps to a stronger listing."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Describe your machine", "Add accurate details, photos, and its location."],
              ["02", "Set availability and terms", "Choose when it is available and what renters should know."],
              ["03", "Coordinate with renters", "Discuss the schedule, handoff, and final rental terms."],
            ].map(([number, title, description]) => (
              <article
                key={number}
                className="rounded-[22px] border border-white/[0.08] bg-[#171f1a] p-6"
              >
                <p className="text-xs font-bold tracking-[0.15em] text-[#c8e889]">
                  {number}
                </p>
                <h3 className="mt-5 text-lg font-semibold text-[#edf1e8]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#9eaa9f]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-5 rounded-[26px] border border-[#c8e889]/15 bg-[#202b23] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
              Ready to get started?
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#f0f2ec]">
              Join MACHORA and prepare your first listing.
            </h2>
          </div>
          <PrimaryLink href="/sign-up">
            Create an account
          </PrimaryLink>
        </div>
      </section>
    </main>
  );
}