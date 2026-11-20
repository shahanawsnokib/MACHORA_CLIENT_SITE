"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { EquipmentCard } from "@/components/marketplace-ui";
import { equipmentCategories, equipmentListings } from "@/lib/marketplace-data";

export default function EquipmentBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All equipment");

  const normalizedQuery = query.trim().toLowerCase();
  const results = equipmentListings.filter((listing) => {
    const matchesCategory =
      category === "All equipment" || listing.category === category;
    const searchableText =
      `${listing.name} ${listing.model} ${listing.category} ${listing.location}`.toLowerCase();
    const matchesQuery = searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-[#9eaa9f]">
            Explore a range of machines available for your next job.
          </p>
          <p className="mt-1 text-xs text-[#748176]">
            Example listings shown for the marketplace preview.
          </p>
        </div>
        <label className="relative block w-full lg:max-w-[390px]">
          <span className="sr-only">Search equipment, category, or location</span>
          <Search
            aria-hidden="true"
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89978b]"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search machines or locations"
            className="h-12 w-full rounded-full border border-white/[0.1] bg-[#171f1a] pl-11 pr-4 text-sm text-[#eef1e8] outline-none transition-colors placeholder:text-[#77827a] focus:border-[#c8e889]/45"
          />
        </label>
      </div>

      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
        <SlidersHorizontal
          aria-hidden="true"
          size={16}
          className="mr-1 shrink-0 text-[#9eaa9f]"
        />
        {["All equipment", ...equipmentCategories.map(({ name }) => name)].map(
          (name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                category === name
                  ? "border-[#c8e889]/30 bg-[#c8e889] text-[#1c281e]"
                  : "border-white/[0.1] bg-white/[0.025] text-[#aeb9ad] hover:border-white/20 hover:text-white"
              }`}
            >
              {name}
            </button>
          ),
        )}
      </div>

      <div className="mt-7 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <p className="text-sm font-semibold text-[#dce4d9]">
          {results.length} {results.length === 1 ? "machine" : "machines"}
        </p>
        <p className="text-xs text-[#849186]">Browse sample listings</p>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((listing) => (
            <EquipmentCard key={listing.name} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-[#eef1e8]">
            No equipment matched that search
          </h2>
          <p className="mt-2 text-sm text-[#9eaa9f]">
            Try a different name, category, or location.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All equipment");
            }}
            className="mt-5 text-sm font-bold text-[#c8e889] hover:text-[#e0f6b6]"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
