import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import Cookies from 'js-cookie';
import Header from "../Header";
import {useState, useEffect } from "react";

export default function Layout() {

    const savedState = Cookies.get("sidebar_state") === "true";

    const [reportData, setReportData] = useState(null);
    useEffect(()=>{
      const id = 1;
  
      async function getReport(id){
        console.log("ran")
        try{
          const response = await fetch(`${process.env.API_BASE_URL}/api/reports/${id}`)
          if(!response.ok){
            throw new Error(`Error status: ${response.status}`);
          }
          const data = await response.json();
          setReportData(data);
          console.log(data.id);
        }catch(error){
          console.error("Error fetching data:", error)
        }
      }
      getReport(id)
    },[]);

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
            <AppSidebar reportData={reportData}/>
          </SidebarProvider>
       

        {/* --- PAGE CONTENT ---
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main> */}

      </div>
    </div>
  )
}