
import {useState, useEffect } from "react";
import Input from "../main_content/Input";
import Preview from "../main_content/Preview";
import SideBar from "../sidebar/SideBar";
import Header from "../Header";



export default function Layout() {

    // const savedState = Cookies.get("sidebar_state") === "true";
    const BASE_URL = "http://192.168.0.106:5000"


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
        <Header/>
        <div className="flex flex-row flex-1 overflow-hidden">
          <div className="flex-none w-65 overflow-y-auto">
            <SideBar reportData={reportData}/>
          </div>
          <div className="flex-1 p-6 overflow-y-auto grid grid-cols-2 gap-6"> 
            <Input/>
            <Preview/>
          </div>
        </div>
      </div>
    );
}