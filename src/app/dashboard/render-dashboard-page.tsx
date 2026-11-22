import { notFound } from "next/navigation";
import Profile from "@/components/profile-editor";
import RentalDashboard from "@/components/rental-dashboard";
import { dashboardPages, type DashboardRole } from "@/lib/dashboard-routes";

export async function renderDashboardPage(role: DashboardRole, params: Promise<{ section: string }>) {
  const { section } = await params;
  const page = dashboardPages[role].find(({ slug }) => slug === section);

  if (!page) notFound();

  // Each role's parent layout validates the session before this page can render.
  return page.section === "profile" ? <Profile embedded /> : <RentalDashboard role={role} section={page.section} />;
}
