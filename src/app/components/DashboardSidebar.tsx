"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardPages, dashboardPath, type DashboardSection } from "@/lib/dashboard-routes";
import {
  Boxes,
  CalendarDays,
  LayoutDashboard,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sectionIcons: Record<DashboardSection, typeof Boxes> = {
  rentals: CalendarDays,
  listings: Boxes,
  "equipment-form": Wrench,
  users: Users,
  profile: UserRound,
};

export function DashboardSidebar() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  // Customer is the default when the session has no recognized role.
  const role =
    userRole === "Owner" || userRole === "Admin" ? userRole : "Customer";
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", url: dashboardPath(role), icon: LayoutDashboard },
    ...dashboardPages[role].map(({ slug, label, section }) => ({ name: label, url: dashboardPath(role, slug), icon: sectionIcons[section] })),
  ];
  if (role === "Customer") menuItems.push({ name: "Browse equipment", url: "/browse_equipment", icon: Search });
  const userName = session?.user?.name || "MACHORA member";

  return (
    <Sidebar className="border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#c8e889] text-lg font-black text-[#19211c]">
            M
          </span>
          <span>
            <span className="block text-base font-bold tracking-wide text-[#f0f2ec]">
              MACHORA
            </span>
            <span className="text-xs text-[#9eaa9f]">Rental workspace</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider">
            {role} menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                      size="lg"
                      className="px-3"
                    >
                      <Icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#29352c] text-sm font-bold text-[#c8e889]">
            {userName.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-[#f0f2ec]">
              {userName}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#9eaa9f]">
              {role === "Admin" && <ShieldCheck className="size-3" />}
              {role}
              {role === "Owner" && <Boxes className="size-3" />}
            </span>
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
