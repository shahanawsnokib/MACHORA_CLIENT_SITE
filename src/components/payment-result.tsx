"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rentalApi } from "@/lib/rental-api";
import { showToast } from "@/lib/toast";

type BookingPayment = {
  equipmentId: string;
  equipmentName: string;
  paymentStatus: string;
  status: string;
};

export default function PaymentResult({ bookingId, result }: { bookingId: string; result: "success" | "cancel" }) {
  const [booking, setBooking] = useState<BookingPayment>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const path = "/bookings/" + bookingId + "/payment";

  useEffect(() => {
    let stopped = false;
    let timer: number | undefined;
    let attempts = 0;

    async function load() {
      try {
        const row = await rentalApi<BookingPayment>(path, {}, true);
        if (stopped) return;
        setError("");
        setBooking(row);
        if (result === "success" && row.status === "Awaiting payment" && ++attempts < 12) {
          timer = window.setTimeout(load, 1800);
        }
      } catch (error) {
        if (!stopped) setError(error instanceof Error ? error.message : "Could not check the payment.");
      }
    }

    void load();
    return () => { stopped = true; window.clearTimeout(timer); };
  }, [path, result, refresh]);

  async function cancel() {
    setBusy(true);
    try {
      await rentalApi(path + "/cancel", { method: "POST" }, true);
      setRefresh((previous) => previous + 1);
      showToast("Checkout cancelled.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Could not cancel checkout.", "error");
    } finally {
      setBusy(false);
    }
  }

  const paid = booking?.paymentStatus === "Paid";
  const cancelled = booking?.status === "Cancelled";
  const title = paid ? "Payment confirmed" : cancelled ? "Checkout cancelled" : result === "cancel" ? "Checkout incomplete" : "Confirming your payment";

  return (
    <main className="rental-form mx-auto w-full max-w-xl px-5 py-12">
      <section className="space-y-5 rounded-2xl border border-white/10 bg-[#19231c] p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {booking && <p>{booking.equipmentName}</p>}
        {error && <p role="alert" className="text-red-300">{error}</p>}
        {!error && <p role="status" className="text-[#bac8b9]">
          {paid ? "Your rental is confirmed." : cancelled ? "The reservation has been released." : result === "cancel" ? "You can cancel this reservation if you’re finished with checkout." : "Your booking will be confirmed after Stripe verifies the payment."}
        </p>}
        <div className="flex flex-wrap items-center gap-4">
          {booking?.status === "Awaiting payment" && result === "cancel" && <button type="button" disabled={busy} onClick={cancel}>{busy ? "Cancelling…" : "Cancel reservation"}</button>}
          {!paid && !cancelled && (result === "success" || error) && <button type="button" onClick={() => setRefresh((previous) => previous + 1)}>Check status</button>}
          <Link href={cancelled && booking ? "/browse_equipment/" + booking.equipmentId + "?book=1" : "/dashboard/customer/my-rentals"}>
            {cancelled && booking ? "Return to booking" : "My rentals"}
          </Link>
        </div>
      </section>
    </main>
  );
}
