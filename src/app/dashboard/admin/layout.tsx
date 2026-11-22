import { requireUser } from "@/lib/session";

export default async function RoleLayout({ children }: { children: React.ReactNode }) {
  await requireUser("Admin", "/dashboard/admin");
  return children;
}
