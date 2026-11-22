import { requireUser } from "@/lib/session";
import RentalDetails from "@/components/rental-details";

export default async function Page({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ book?: string | string[] }>;
}) {
  const { id } = await params;
  const openBooking = (await searchParams).book === "1";
  const path = "/browse_equipment/" + id + (openBooking ? "?book=1" : "");
  const user = await requireUser(undefined, path);
  return <RentalDetails key={id + (openBooking ? "-booking" : "")} id={id} openBooking={openBooking} phone={user.phone || undefined} address={user.address || undefined} canBook={!user.role || user.role === "Customer"} />;
}
