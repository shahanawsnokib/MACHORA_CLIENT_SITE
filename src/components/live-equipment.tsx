"use client";

import { showToast } from "@/lib/toast";

import { MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { equipmentCategories } from "@/lib/marketplace-data";
import { rentalApi, type Equipment } from "@/lib/rental-api";

export default function LiveEquipment({ featured = false }: { featured?: boolean }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Equipment[]>([]);
  const [message, setMessage] = useState("Loading equipment…");

  useEffect(() => {
    let current = true;
    rentalApi<Equipment[]>("/equipment?" + (featured ? "featured=true" : query))
      .then((rows) => {
        if (!current) return;
        setItems(rows);
        setMessage(rows.length ? "" : "No approved equipment found.");
        if (!featured && query) showToast(rows.length ? `${rows.length} equipment listings found.` : "No equipment matches those filters.", "info");
      })
      .catch(() => {
        if (!current) return;
        const message = "Could not load equipment. Check that the API is running.";
        setItems([]);
        setMessage(message);
        if (!featured && query) showToast(message, "error");
      });
    return () => { current = false; };
  }, [featured, query]);

  return (
    <section className="rental-form mx-auto max-w-7xl space-y-6 px-5 py-8">
      {!featured && <form className="flex flex-wrap gap-3" onSubmit={(event) => {
        event.preventDefault();
        setQuery(new URLSearchParams(Array.from(new FormData(event.currentTarget), ([key, value]) => [key, String(value)])).toString() || "search=");
      }}>
        <input name="search" aria-label="Search" placeholder="Name, category, or location" />
        <select name="category" aria-label="Category"><option value="">All categories</option>{equipmentCategories.map(({ name }) => <option key={name}>{name}</option>)}</select>
        <select name="rentalType" aria-label="Rental type"><option value="">All rental types</option><option>Daily</option><option>Weekly</option><option>Monthly</option></select>
        <input name="min" aria-label="Minimum price" type="number" min="0" placeholder="Min price" />
        <input name="max" aria-label="Maximum price" type="number" min="0" placeholder="Max price" />
        <select name="availability" aria-label="Availability"><option value="">Any availability</option><option value="available">Available</option><option value="unavailable">Unavailable</option></select>
        <select name="sort" aria-label="Sort"><option value="recent">Recently added</option><option value="low">Price low to high</option><option value="high">Price high to low</option></select>
        <button>Apply filters</button>
      </form>}
      {message && <p role="status">{message}</p>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const detailPath = "/browse_equipment/" + item._id;
          const available = item.quantity > 0;

          return (
            <article key={item._id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#19231c] transition-colors hover:border-[#c8e889]/40">
              <div className="relative aspect-video overflow-hidden bg-[#24342a]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#111812] px-2.5 py-1 text-xs font-medium text-[#edf2e6]">
                  <span aria-hidden="true" className={available ? "size-2 rounded-full bg-[#c8e889]" : "size-2 rounded-full bg-[#b0b9b0]"} />
                  {available ? "Available" : "Out of stock"}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-xs font-medium text-[#c8e889]">{item.category}</p>
                <h3 className="mt-1 break-words text-lg font-semibold leading-snug">{item.name}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#bac8b9]">
                  <MapPin size={15} aria-hidden="true" className="shrink-0" /> {item.location}
                </p>

                <div className="mt-auto pt-4">
                  <p className="border-t border-white/10 pt-3 text-xl font-semibold tabular-nums text-[#e2f3ca]">
                    ৳{item.price.toLocaleString("en-BD")}
                    <span className="ml-2 text-sm font-normal text-[#bac8b9]">{item.rentalType}</span>
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <Link href={detailPath} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/15 px-2 text-center font-medium !no-underline hover:bg-white/5">
                      View details<span className="sr-only"> for {item.name}</span>
                    </Link>
                    {available ? (
                      <Link href={detailPath + "?book=1"} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#c8e889] px-2 text-center font-semibold text-[#19211c] !no-underline hover:bg-[#d7eeac]">
                        Book now<span className="sr-only"> for {item.name}</span>
                      </Link>
                    ) : <button type="button" disabled className="min-h-10">Book now</button>}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
