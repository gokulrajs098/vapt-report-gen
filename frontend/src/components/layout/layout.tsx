import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import Cookies from 'js-cookie';

export default function Layout() {

    const savedState = Cookies.get("sidebar_state") === "true";
    return (
    <SidebarProvider defaultOpen={savedState}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}