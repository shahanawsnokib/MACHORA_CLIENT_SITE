"use client";

import { ArrowLeft, CalendarDays, Heart, MapPin, Package, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { rentalApi, type Equipment } from "@/lib/rental-api";

export default function RentalDetails({ id, canBook, openBooking }: { id: string; canBook: boolean; openBooking: boolean }) {
  const [item, setItem] = useState<Equipment>();
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [booked, setBooked] = useState(false);
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let current = true;
    rentalApi<Equipment>("/equipment/" + id, {}, true)
      .then((row) => { if (current) setItem(row); })
      .catch((error) => { if (current) setNotice(error.message); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [id]);

  const quantity = item?.quantity ?? 0;
  useEffect(() => {
    const form = dialog.current;
    if (openBooking && canBook && quantity > 0 && form && !form.open) form.showModal();
  }, [openBooking, canBook, quantity, id]);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setBusy(true);
    setBookingError("");
    try {
      await rentalApi("/bookings", {
        method: "POST",
        body: JSON.stringify({ ...fields, equipmentId: id }),
      }, true);
      form.reset();
      dialog.current?.close();
      setBooked(true);
      setNotice("Rental confirmed. Payment is arranged manually.");
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Booking failed.");
    } finally {
      setBusy(false);
    }
  }

  async function saveFavorite() {
    try {
      await rentalApi("/favorites/" + id, { method: "PUT" }, true);
      setNotice("Saved to favorites.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save this favorite.");
    }
  }

  if (!item) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-4 px-5 py-12">
        <Link className="text-sm text-[#c8e889] underline" href="/browse_equipment">Back to equipment</Link>
        <p role={loading ? "status" : "alert"}>{loading ? "Loading equipment…" : notice}</p>
      </main>
    );
  }

  const price = item.price.toLocaleString("en-BD");
  const facts = [
    ["Brand", item.brand],
    ["Model", item.model],
    ["Condition", item.condition],
    ["Listed by", item.ownerName],
  ];

  return (
    <main className="rental-form mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <Link href="/browse_equipment" className="mb-6 inline-flex items-center gap-2 text-sm text-[#c8e889] !no-underline hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> All equipment
      </Link>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <header>
            <p className="mb-2 text-sm font-medium text-[#c8e889]">{item.category}</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{item.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#bac8b9]">
              <MapPin size={17} aria-hidden="true" /> {item.location}
            </p>
          </header>

          <div role="img" aria-label={item.name} className="aspect-[16/10] rounded-2xl border border-white/10 bg-[#253529] bg-cover bg-center" style={{ backgroundImage: `url("${item.image}")` }} />
        </div>

        <aside aria-label="Booking options" className="rounded-2xl border border-[#c8e889]/20 bg-[#202d23] p-5 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="text-sm text-[#bac8b9]">{item.rentalType} rate</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#e2f3ca]">৳{price}</p>
          <p className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-[#c8d3c7]">
            <Package size={17} aria-hidden="true" /> {quantity > 0 ? `${quantity} available` : "Out of stock"}
          </p>
          {canBook ? (
            <div className="mt-5 grid gap-3">
              <button className="inline-flex items-center justify-center gap-2" disabled={quantity < 1} onClick={() => { setBookingError(""); dialog.current?.showModal(); }}>
                <CalendarDays size={17} aria-hidden="true" /> Book now
              </button>
              <button className="inline-flex items-center justify-center gap-2 border border-white/15 !bg-transparent !text-[#c8e889]" onClick={saveFavorite}>
                <Heart size={17} aria-hidden="true" /> Save to favorites
              </button>
            </div>
          ) : openBooking && <p className="mt-4 text-sm">Sign in with a Customer account to book equipment.</p>}
          {notice && <p role="status" className="mt-4 text-sm text-[#e2f3ca]">{notice}</p>}
          {booked && <Link className="mt-2 inline-block text-sm text-[#c8e889]" href="/dashboard/customer#rentals">View my rentals</Link>}
        </aside>

        <div className="min-w-0 space-y-6 lg:col-start-1 lg:row-start-2">
          <section className="rounded-2xl border border-white/10 bg-[#19231c] p-5 sm:p-6">
            <h2 className="text-xl font-semibold">About this equipment</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-[#c8d3c7]">{item.description}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4">
              {facts.map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="text-xs text-[#a9b9a8]">{label}</dt>
                  <dd className="mt-1 break-words text-sm font-medium">{value || "—"}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#19231c] p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Rental terms</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-[#c8d3c7]">{item.terms}</p>
          </section>
        </div>
      </div>

      <dialog ref={dialog} aria-labelledby="booking-title" className="m-auto max-h-[90vh] w-[min(94vw,36rem)] overflow-y-auto rounded-2xl border border-white/15 bg-[#19231c] p-5 text-[#edf2e6] backdrop:bg-black/70 sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 id="booking-title" className="text-xl font-semibold">Book {item.name}</h2>
            <p className="mt-1 text-sm text-[#bac8b9]">৳{price} · {item.rentalType} · Payment arranged manually</p>
          </div>
          <button type="button" aria-label="Close booking form" disabled={busy} className="!bg-transparent !p-1 !text-[#c8e889]" onClick={() => dialog.current?.close()}>
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={submitBooking} className="space-y-4">
          <fieldset disabled={busy} className="grid gap-4 text-sm sm:grid-cols-2">
            <label>Start date<input required type="date" name="start" /></label>
            <label>End date<input required type="date" name="end" /></label>
            <label>Quantity<input required type="number" name="quantity" min="1" max={quantity} defaultValue="1" /></label>
            <label>Contact number<input required type="tel" name="phone" autoComplete="tel" /></label>
            <label className="sm:col-span-2">Delivery address<input required name="address" autoComplete="street-address" /></label>
            <label className="sm:col-span-2">Notes <span className="text-[#bac8b9]">(optional)</span><textarea rows={2} name="notes" /></label>
          </fieldset>
          {bookingError && <p role="alert" className="text-sm text-red-300">{bookingError}</p>}
          <button type="submit" className="w-full" disabled={busy}>{busy ? "Booking…" : "Confirm booking"}</button>
        </form>
      </dialog>
    </main>
  );
}
