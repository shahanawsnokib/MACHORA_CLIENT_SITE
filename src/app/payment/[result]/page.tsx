import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import PaymentResult from "@/components/payment-result";

export default async function Page({ params, searchParams }: {
  params: Promise<{ result: string }>;
  searchParams: Promise<{ booking?: string | string[] }>;
}) {
  const { result } = await params;
  const { booking } = await searchParams;
  if ((result !== "success" && result !== "cancel") || typeof booking !== "string" || !/^[a-f0-9]{24}$/.test(booking)) notFound();

  await requireUser("Customer", "/payment/" + result + "?booking=" + booking);
  return <PaymentResult bookingId={booking} result={result} />;
}
