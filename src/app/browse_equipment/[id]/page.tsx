import { requireUser } from "@/lib/session";
import RentalDetails from "@/components/rental-details";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(undefined, "/browse_equipment/" + id);
  return <RentalDetails id={id} canBook={!user.role || user.role === "Customer"} />;
}
