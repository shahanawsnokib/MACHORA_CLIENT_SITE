"use client";

import { showToast } from "@/lib/toast";

import { ArrowLeft, CalendarDays, Heart, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { rentalApi, type Equipment } from "@/lib/rental-api";

export default function RentalDetails({ id, canBook, openBooking, phone, address }: { id: string; canBook: boolean; openBooking: boolean; phone?: string; address?: string }) {
  const [item, setItem] = useState<Equipment>();
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [booked, setBooked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [onlineNotice, setOnlineNotice] = useState(false);

  useEffect(() => {
    let current = true;
    rentalApi<Equipment>("/equipment/" + id, {}, true)
      .then((row) => { if (current) setItem(row); })
      .catch((error) => { if (current) setNotice(error.message); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [id]);

  const quantity = item?.quantity ?? 0;

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setBookingError("");
    setOnlineNotice(false);
    try {
      await rentalApi("/bookings", {
        method: "POST",
        body: JSON.stringify({ ...fields, equipmentId: id, paymentMethod: "Cash on delivery" }),
      }, true);
      setBooked(true);
      showToast("Booking confirmed. Pay on delivery.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Booking failed.";
      setBookingError(message);
      showToast(message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function saveFavorite() {
    try {
      await rentalApi("/favorites/" + id, { method: "PUT" }, true);
      setNotice("Saved to favorites.");
      showToast("Saved to favorites.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save this favorite.";
      setNotice(message);
      showToast(message, "error");
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
  const detailPath = "/browse_equipment/" + id;

  if (openBooking && canBook && quantity > 0) {
    return (
      <main className="rental-form mx-auto w-full max-w-2xl px-5 py-8 sm:py-12">
        <Link href={detailPath} className="mb-5 inline-flex items-center gap-2 text-sm text-[#c8e889]">
          <ArrowLeft size={16} aria-hidden="true" /> Back to equipment details
        </Link>
        <section className="rounded-2xl border border-white/10 bg-[#19231c] p-5 sm:p-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">Book {item.name}</h1>
          <p className="mt-2 text-sm text-[#bac8b9]">৳{price} · {item.rentalType} · {quantity} available</p>

          {booked ? (
            <div className="mt-6 space-y-3">
              <p role="status" className="font-medium text-[#c8e889]">Booking confirmed. Pay when the equipment is delivered.</p>
              <Link href="/dashboard/customer/my-rentals">View my rentals</Link>
            </div>
          ) : (
            <form onSubmit={submitBooking} className="mt-6 space-y-5">
              <fieldset disabled={busy} className="grid gap-4 text-sm sm:grid-cols-2">
                <label>Start date<input required type="date" name="start" /></label>
                <label>End date<input required type="date" name="end" /></label>
                <label>Quantity<input required type="number" name="quantity" min="1" max={quantity} defaultValue="1" /></label>
                <label>Contact number<input required type="tel" name="phone" autoComplete="tel" defaultValue={phone} /></label>
                <label className="sm:col-span-2">Delivery address<textarea required rows={2} name="address" autoComplete="street-address" defaultValue={address} /></label>
                <label className="sm:col-span-2">Notes <span className="text-[#bac8b9]">(optional)</span><textarea rows={2} name="notes" /></label>
              </fieldset>
              {bookingError && <p role="alert" className="text-sm text-red-300">{bookingError}</p>}
              {onlineNotice && <p role="status" className="text-sm text-[#bac8b9]">Online payment is not available yet. You can choose cash on delivery.</p>}
              <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
                <button type="submit" disabled={busy}>{busy ? "Booking…" : "Cash on delivery"}</button>
                <button type="button" disabled={busy} className="border border-white/15 !bg-transparent !text-[#c8e889]" onClick={() => {
                  setOnlineNotice(true);
                  showToast("Online payment is not available yet.", "info");
                }}>
                  Pay online
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    );
  }


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
          <div className="mt-5 grid gap-3">
            {quantity < 1 ? (
              <button type="button" disabled>Book now</button>
            ) : (
              <Link href={canBook ? detailPath + "?book=1" : "/login?next=" + encodeURIComponent(detailPath + "?book=1")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c8e889] px-3 py-2 font-semibold text-[#19211c] !no-underline hover:bg-[#d7eeac]">
                <CalendarDays size={17} aria-hidden="true" /> Book now
              </Link>
            )}
            {canBook && (
              <button type="button" className="inline-flex items-center justify-center gap-2 border border-white/15 !bg-transparent !text-[#c8e889]" onClick={saveFavorite}>
                <Heart size={17} aria-hidden="true" /> Save to favorites
              </button>
            )}
          </div>
          {!canBook && quantity > 0 && <p className="mt-3 text-sm text-[#bac8b9]">Use a Customer account to book this equipment.</p>}
          {notice && <p role="status" className="mt-4 text-sm text-[#e2f3ca]">{notice}</p>}
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

    </main>
  );
}
