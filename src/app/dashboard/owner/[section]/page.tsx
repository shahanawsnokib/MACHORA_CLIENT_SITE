import { renderDashboardPage } from "../../render-dashboard-page";

export default function Page({ params }: { params: Promise<{ section: string }> }) {
  return renderDashboardPage("Owner", params);
}
