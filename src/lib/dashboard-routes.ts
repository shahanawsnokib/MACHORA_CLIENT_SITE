export type DashboardRole = "Customer" | "Owner" | "Admin";
export type DashboardSection = "rentals" | "listings" | "equipment-form" | "users" | "profile";

type DashboardPage = { slug: string; label: string; section: DashboardSection };

export const dashboardPages: Record<DashboardRole, DashboardPage[]> = {
  Customer: [
    { slug: "my-rentals", label: "My rentals", section: "rentals" },
    { slug: "favorites", label: "Favorites", section: "listings" },
    { slug: "profile", label: "My profile", section: "profile" },
  ],
  Owner: [
    { slug: "add-equipment", label: "Add equipment", section: "equipment-form" },
    { slug: "my-equipment", label: "My equipment", section: "listings" },
    { slug: "my-equipment-rentals", label: "My equipment rentals", section: "rentals" },
    { slug: "profile", label: "My profile", section: "profile" },
  ],
  Admin: [
    { slug: "all-users", label: "All users", section: "users" },
    { slug: "all-equipment", label: "All equipment", section: "listings" },
    { slug: "all-rentals", label: "All rentals", section: "rentals" },
    { slug: "profile", label: "My profile", section: "profile" },
  ],
};

export function dashboardPath(role: DashboardRole, slug?: string) {
  const base = "/dashboard/" + role.toLowerCase();
  return slug ? base + "/" + slug : base;
}

export function isDashboardPath(path: string) {
  return (Object.keys(dashboardPages) as DashboardRole[]).some((role) =>
    path === dashboardPath(role) || dashboardPages[role].some(({ slug }) => path === dashboardPath(role, slug)),
  );
}
