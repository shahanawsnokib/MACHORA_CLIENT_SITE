"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { rentalApi, type Equipment } from "@/lib/rental-api";

export default function RentalDetails({ id, canBook }: { id: string; canBook: boolean }) {
  const [item, setItem] = useState<Equipment>();
  const [message, setMessage] = useState("Loading equipment…");
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    rentalApi<Equipment>("/equipment/" + id, {}, true)
      .then((row) => { setItem(row); setMessage(""); })
      .catch((error) => setMessage(error.message));
  }, [id]);

  if (!item) return <p className="p-10" role="status">{message}</p>;

  return <main className="rental-form mx-auto max-w-4xl space-y-5 px-5 py-10">
    <div aria-hidden className="h-64 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url("${item.image}")` }} />
    <h1 className="text-4xl font-bold">{item.name}</h1>
    <p>{item.category} · {item.location} · {item.condition}</p>
    <p>{item.description}</p>
    <p>৳{item.price} · {item.rentalType} · {item.quantity} units · Listed by {item.ownerName}</p>
    <h2 className="text-xl font-bold">Rental terms</h2>
    <p>{item.terms}</p>
    {canBook && <div className="flex flex-wrap gap-3">
      <button onClick={() => rentalApi("/favorites/" + id, { method: "PUT" }, true).then(() => setMessage("Saved to favorites.")).catch((error) => setMessage(error.message))}>Add to favorites</button>
      <button disabled={!item.quantity} onClick={() => { setMessage(""); dialog.current?.showModal(); }}>Book now</button>
    </div>}
    {message && <p role="status">{message} <Link className="underline" href="/dashboard/customer">My rentals</Link></p>}
    <dialog ref={dialog} className="m-auto max-h-[90vh] w-[min(95vw,32rem)] rounded-xl bg-[#19211c] p-6 text-white backdrop:bg-black/70">
      <form className="grid gap-3" onSubmit={async (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.currentTarget));
        setBusy(true);
        setMessage("");
        try {
          await rentalApi("/bookings", { method: "POST", body: JSON.stringify({ ...fields, equipmentId: id }) }, true);
          dialog.current?.close();
          setMessage("Rental confirmed. Payment is arranged manually.");
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "Booking failed.");
        } finally { setBusy(false); }
      }}>
        <h2 className="text-xl font-bold">Book {item.name}</h2>
        <label>Start date <input required type="date" name="start" /></label>
        <label>End date <input required type="date" name="end" /></label>
        <label>Quantity <input required type="number" name="quantity" min="1" max={item.quantity} defaultValue="1" /></label>
        <label>Contact number <input required type="tel" name="phone" /></label>
        <label>Delivery address <input required name="address" /></label>
        <label>Notes <textarea name="notes" /></label>
        <p>Rental dates are inclusive. Payment is arranged manually.</p>
        {message && <p role="status">{message}</p>}
        <div className="flex gap-3"><button disabled={busy}>{busy ? "Booking…" : "Confirm booking"}</button><button type="button" onClick={() => { setMessage(""); dialog.current?.close(); }}>Close</button></div>
      </form>
    </dialog>
  </main>;
}
