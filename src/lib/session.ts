import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

// Read the cookie on the server so private routes work after a refresh.
export async function requireUser(role?: "Customer" | "Owner" | "Admin", next = "/dashboard") {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?next=" + encodeURIComponent(next));
  const user = session.user;
  if (role && (user.role || "Customer") !== role) redirect("/dashboard");
  return user;
}
