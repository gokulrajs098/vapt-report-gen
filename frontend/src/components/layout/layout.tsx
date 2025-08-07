import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import Cookies from 'js-cookie';
import Header from "../Header";

export default function Layout() {

    const savedState = Cookies.get("sidebar_state") === "true";
    return (
      <div className="flex flex-col h-screen">

      {/* --- HEADER --- */}
      {/* Apply sticky positioning and z-index here */}
      {/* The background color is important so content doesn't show through when scrolling */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Header />
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- SIDEBAR --- */}
    
          <SidebarProvider>
            <AppSidebar/>
          </SidebarProvider>
       

        {/* --- PAGE CONTENT ---
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main> */}

      </div>
    </div>
  )
}