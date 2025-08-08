import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import Cookies from 'js-cookie';
import Header from "../Header";
import {useState, useEffect } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Layout() {

    const savedState = Cookies.get("sidebar_state") === "true";
    const BASE_URL = "http://localhost:5000"


    const [reportData, setReportData] = useState(null);
    useEffect(()=>{
      const id = 1;
  
      async function getReport(id){
        
        try{
          const response = await fetch(`${BASE_URL}/api/reports/${id}`)
          if(!response.ok){
            throw new Error(`Error status: ${response.status}`);
          }
          const data = await response.json();
          setReportData(data);
          console.log("data_in_layout:", data);
        }catch(error){
          console.error("Error fetching data:", error)
        }
      }
      getReport(id)
    },[]);

    return (

      <div className="flex flex-col h-screen">

        {/* --- VISUAL DEBUG: HEADER ---
            I've replaced your Header component with a simple div.
            It has a RED background. It should appear as a solid red bar at the top. */}
        <header className="sticky top-0 z-30 h-16 flex-shrink-0 flex items-center px-4">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                    <MenubarItem>
                        New Tab 
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <img src="https://placehold.co/600x400" className="h-5 w-5"></img>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                </MenubarMenu>
            </Menubar>
        </header>

        {/* This div holds the sidebar and main content. It should take up the rest of the screen height. */}
        <div className="flex flex-1 overflow-hidden">

          {/* --- VISUAL DEBUG: SIDEBAR ---
              This has a BLUE background. It should start IMMEDIATELY BELOW the red header bar.
              If the blue area is starting from the very top of the screen (behind the red bar),
              then we know a style is breaking the vertical flex layout. */}
          <aside className="w-64 flex-shrink-0 bg-blue-500 flex flex-col">
            <div className="flex flex-col h-full text-white">
              <div className="flex-shrink-0 p-4 border-b border-blue-400">
                <h2 className="font-bold">Fixed Top Part</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <h2 className="font-bold">Scrollable Part</h2>
              </div>
              
              <SidebarProvider className="flex-1 overflow-y-auto p-4">
                <AppSidebar reportData={reportData}/>
              </SidebarProvider>
              
            </div>
          </aside>  
          {/* --- VISUAL DEBUG: MAIN CONTENT ---
              This has a GREEN background. It should be to the right of the blue sidebar. */}
          <main className="flex-1 p-6 overflow-y-auto bg-green-500">
            <h1 className="text-2xl font-bold">Main Content Area</h1>
          </main>

        </div>
      </div>
      // <div className="flex flex-col h-screen">
      //   <header className="sticky top-0 z-30 h-16 bg-red-500 flex-shrink-0 flex items-center px-4">
      //       <h1 className="text-white font-bold text-lg">Header Area</h1>
      //   </header>

      //   <div className="flex flex-1 overflow-hidden"></div>
      //   <aside className="w-64 flex-shrink-0 bg-blue-500 flex flex-col">
      //   <SidebarProvider>
      //     <AppSidebar reportData={reportData}/>
      //   </SidebarProvider>
      //   </aside>

      //   <main className="flex-1 p-6 overflow-y-auto bg-green-500">
      //       <h1 className="text-2xl font-bold">Main Content Area</h1>
      //   </main>
      // </div>
    );
}