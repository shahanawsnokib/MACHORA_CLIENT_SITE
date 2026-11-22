import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="min-w-0 flex-1">
        <SidebarTrigger className="ml-4 mt-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}
