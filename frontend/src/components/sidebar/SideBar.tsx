// import {Skull} from "lucide-react"

// export default function SideBar({reportData}){
//     if (!reportData) {
//     return (
//       <div className="p-4">
//         <p>Loading sidebar...</p>
//       </div>
//     );
//   }
//     return(
//         <aside className="flex flex-col bg-gray-300">
//             <nav className="overflow-y-contain">
//                 <h3 className="font-semibold">Header & Footer</h3>
//                 <h3 className="font-semibold">Front Matter</h3>
//                 {
//                         reportData.pages.filter(page=>page.type == "Front Matter")
//                         .map(page=>
//                             <div className="flex flex-row trunccate">
//                                 <Skull/><p key={page.pageId}>{page.title}</p>
//                             </div>   
//                         )
//                 }
//                 <h3 className="font-semibold">Vulnerabilities</h3>
//                 {
//                         reportData.pages.filter(page=>page.type == "Vulnerability")
//                         .map(page=>
//                             <div className="flex flex-row">
//                                 <Skull/><p key={page.pageId} className="truncate">{page.title}</p>
//                             </div> 
//                         )
//                 }
//                 <h3 className="font-semibold">Back Matter</h3>
//                 {
//                         reportData.pages.filter(page=>page.type == "Back Matter")
//                         .map(page=>
//                             <div className="flex flex-row">
//                                 <Skull/><p key={page.pageId} className="truncate">{page.title}</p>
//                             </div> 
//                         )
//                 }
//             </nav>
//         </aside>
//     );
// }

import { Skull } from 'lucide-react';

export default function SideBar({ reportData }) {
  if (!reportData) {
    return (
      <div className="p-4 bg-gray-900 text-gray-400">
        <p>Loading sidebar...</p>
      </div>
    );
  }

  return (
    <aside className="flex flex-col bg-gray-900 text-gray-200 w-64 h-full p-4 border-r border-gray-700">
      <nav className="overflow-y-auto space-y-4">
        {/* Header & Footer Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Header & Footer</h3>
        </div>

        {/* Front Matter Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Front Matter</h3>
          <div className="space-y-1">
            {reportData.pages
              .filter((page) => page.type === 'Front Matter')
              .map((page) => (
                <div
                  key={page.pageId}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Skull size={18} className="text-gray-400" />
                  <p className="truncate">{page.title}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Vulnerabilities Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Vulnerabilities</h3>
          <div className="space-y-1">
            {reportData.pages
              .filter((page) => page.type === 'Vulnerability')
              .map((page) => (
                <div
                  key={page.pageId}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Skull size={18} className="text-gray-400" />
                  <p className="truncate">{page.title}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Back Matter Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Back Matter</h3>
          <div className="space-y-1">
            {reportData.pages
              .filter((page) => page.type === 'Back Matter')
              .map((page) => (
                <div
                  key={page.pageId}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Skull size={18} className="text-gray-400" />
                  <p className="truncate">{page.title}</p>
                </div>
              ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}