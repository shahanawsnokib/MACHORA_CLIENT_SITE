import { requireUser } from "@/lib/session";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  await requireUser(undefined, "/profile");
  return children;
}
