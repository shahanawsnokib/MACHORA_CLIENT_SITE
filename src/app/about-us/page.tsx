import {
  BadgeCheck,
  HeartHandshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  PageIntro,
  PrimaryLink,
  SectionHeading,
} from "@/components/marketplace-ui";

const principles = [
  {
    icon: ShieldCheck,
    title: "Trust comes first",
    description:
      "Clear equipment details and direct communication help both sides make informed decisions.",
  },
  {
    icon: MapPin,
    title: "Built around local work",
    description:
      "We bring renters and equipment owners together in the communities where projects happen.",
  },
  {
    icon: HeartHandshake,
    title: "Better when shared",
    description:
      "Useful equipment should be easier to find, and valuable machines should have more chances to work.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="About MACHORA"
        title="A better connection between machines and the people who need them."
        description="MACHORA is an equipment rental marketplace built to help projects move forward by making local equipment easier to discover and share."
      >
        <PrimaryLink href="/browse_equipment">Explore the marketplace</PrimaryLink>
      </PageIntro>

      <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#202b23] sm:min-h-[420px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(180deg,rgba(17,24,19,0.06),rgba(17,24,19,0.72)),url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=85")',
            }}
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[#151d18]/80 p-4 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
            <p className="flex items-center gap-2 text-xs font-bold text-[#e7eee1]">
              <BadgeCheck size={16} className="text-[#c8e889]" />
              Built for the people who get the work done
            </p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Why we are here"
            title="Getting the right equipment should feel straightforward."
            description="Projects depend on the right tools being available at the right time. MACHORA is designed to make it easier for renters to discover equipment and for owners to connect with people who need it."
          />
          <p className="text-sm leading-7 text-[#aab6ab]">
            We believe a useful marketplace starts with clear information,
            dependable people, and a simple way to get in touch. Our goal is to
            make equipment rental more approachable for businesses, independent
            crews, and local owners across Bangladesh.
          </p>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="What guides us"
            title="A marketplace made for real work."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="rounded-[22px] border border-white/[0.08] bg-[#171f1a] p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#c8e889]/10 text-[#c8e889]">
                  <Icon size={20} />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#879489]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[#edf1e8]">
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
              Let&apos;s get to work
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#f0f2ec]">
              Find a machine or share one with your community.
            </h2>
          </div>
          <PrimaryLink href="/browse_equipment">Get started</PrimaryLink>
        </div>
      </section>
    </main>
  );
}
