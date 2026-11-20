import {
  CategoryCard,
  PageIntro,
  PrimaryLink,
  SectionHeading,
} from "@/components/marketplace-ui";
import { equipmentCategories } from "@/lib/marketplace-data";

export default function PopularCategoriesPage() {
  return (
    <main className="flex-1">
      <PageIntro
        eyebrow="Popular categories"
        title="Start with the kind of work you do."
        description="Browse a clear collection of equipment types and find a good fit for your next project."
      >
        <PrimaryLink href="/browse_equipment">Browse all equipment</PrimaryLink>
      </PageIntro>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionHeading
          eyebrow="Explore the marketplace"
          title="What does your job need?"
          description="Choose a category to explore the equipment available on MACHORA."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {equipmentCategories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#19221d] p-7 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 h-72 w-72 rounded-full border border-[#c8e889]/10"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[620px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8e889]">
                Not sure where to start?
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#f0f2ec] sm:text-3xl">
                Browse every machine in one place.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#9eaa9f]">
                Compare equipment by type and location to find the right option
                for your project.
              </p>
            </div>
            <PrimaryLink href="/browse_equipment">Browse equipment</PrimaryLink>
          </div>
        </div>
      </section>
    </main>
  );
}