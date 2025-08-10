import {Skull} from "lucide-react"

export default function SideBar({reportData}){
    if (!reportData) {
    return (
      <div className="p-4">
        <p>Loading sidebar...</p>
      </div>
    );
  }
    return(
        <aside className="flex flex-col bg-gray-300">
            <nav className="overflow-y-contain">
                <h3 className="font-semibold">Header & Footer</h3>
                <h3 className="font-semibold">Front Matter</h3>
                {
                        reportData.pages.filter(page=>page.type == "Front Matter")
                        .map(page=>
                            <div className="flex flex-row trunccate">
                                <Skull/><p key={page.pageId}>{page.title}</p>
                            </div>   
                        )
                }
                <h3 className="font-semibold">Vulnerabilities</h3>
                {
                        reportData.pages.filter(page=>page.type == "Vulnerability")
                        .map(page=>
                            <div className="flex flex-row">
                                <Skull/><p key={page.pageId} className="truncate">{page.title}</p>
                            </div> 
                        )
                }
                <h3 className="font-semibold">Back Matter</h3>
                {
                        reportData.pages.filter(page=>page.type == "Back Matter")
                        .map(page=>
                            <div className="flex flex-row">
                                <Skull/><p key={page.pageId} className="truncate">{page.title}</p>
                            </div> 
                        )
                }
            </nav>
        </aside>
    );
}