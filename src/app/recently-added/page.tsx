import {
  EquipmentCard,
  PageIntro,
  PrimaryLink,
  SectionHeading,
} from "@/components/marketplace-ui";
import { equipmentListings } from "@/lib/marketplace-data";

export default function RecentlyAddedPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="Recently added"
        title="Fresh equipment, ready for your next job."
        description="Take a look at the latest sample listings and discover more options for your project."
      >
        <PrimaryLink href="/browse_equipment">Browse all equipment</PrimaryLink>
      </PageIntro>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionHeading
          eyebrow="New to MACHORA"
          title="Recently listed machines"
          description="Example listings are shown here while live inventory is being connected."
        />
        <div className="mb-6 inline-flex h-9 items-center rounded-full border border-[#c8e889]/20 bg-[#c8e889]/[0.07] px-3 text-xs font-semibold text-[#d9efaa]">
          Newest first
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentListings.map((listing) => (
            <EquipmentCard key={listing.name} listing={listing} />
          ))}
        </div>
      </section>
    </main>
  );
}
