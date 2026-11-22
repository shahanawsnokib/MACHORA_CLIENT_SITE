"use client";

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
      })
      .catch(() => {
        if (current) { setItems([]); setMessage("Could not load equipment. Check that the API is running."); }
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
        {items.map((item) => <article className="overflow-hidden rounded-xl border border-white/15" key={item._id}>
          <div aria-hidden className="h-44 bg-cover bg-center" style={{ backgroundImage: `url("${item.image}")` }} />
          <div className="space-y-2 p-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.category} · {item.location}</p>
            <p>৳{item.price} · {item.rentalType} · {item.quantity ? "Available" : "Unavailable"}</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href={"/browse_equipment/" + item._id}>View details</Link>
              {item.quantity > 0 ? (
                <Link className="rounded-lg bg-[#c8e889] px-3 py-2 text-sm font-semibold text-[#19211c] !no-underline hover:bg-[#d7eeac]" href={"/browse_equipment/" + item._id + "?book=1"}>Book now</Link>
              ) : <button type="button" disabled>Book now</button>}
            </div>
          </div>
        </article>)}
      </div>
    </section>
  );
}
