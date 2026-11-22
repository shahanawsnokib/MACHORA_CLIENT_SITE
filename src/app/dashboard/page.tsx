import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";

export default async function Dashboard() {
  const { role } = await requireUser();
  redirect("/dashboard/" + (role || "Customer").toLowerCase());
}
