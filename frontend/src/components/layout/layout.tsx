
import {useState, useEffect } from "react";
import EditableTitle from "../EditableReportName";


export default function Layout() {

    // const savedState = Cookies.get("sidebar_state") === "true";
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
      <div className="flex flex-col">
        <header className="flex-none w-70">
          <EditableTitle/>
        </header>

        <div className="flex flex-row">
          <div className="flex-none">
            <h1>scroll bar</h1>
          </div>
          <div> 
            <h1>main content</h1>
          </div>  
        </div>
      </div>
    );
}