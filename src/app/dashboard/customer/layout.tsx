import { requireUser } from "@/lib/session";

export default async function RoleLayout({ children }: { children: React.ReactNode }) {
  await requireUser("Customer", "/dashboard/customer");
  return children;
}
