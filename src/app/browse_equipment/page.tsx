import LiveEquipment from "@/components/live-equipment";
import { PageIntro, PrimaryLink } from "@/components/marketplace-ui";

export default function BrowseEquipmentPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="Browse equipment"
        title="Find the right machine for the work ahead."
        description="Explore equipment from local owners, compare your options, and choose what fits your job, location, and schedule."
      >
        <PrimaryLink href="/popular_categories">Explore categories</PrimaryLink>
      </PageIntro>
      <LiveEquipment />
      <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-[26px] border border-[#c8e889]/15 bg-[#202b23] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
              Have equipment to share?
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#f0f2ec]">
              Put your machines to work.
            </h2>
            <p className="mt-2 max-w-[540px] text-sm leading-6 text-[#aab6ab]">
              Create a listing and connect with people looking for reliable
              equipment.
            </p>
          </div>
          <PrimaryLink href="/list_equipement">List your equipment</PrimaryLink>
        </div>
      </section>
    </main>
  );
}