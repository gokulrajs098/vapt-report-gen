import { Calendar, Home, Inbox, Search, Settings, Skull, Plus, MoreHorizontal, Eye} from "lucide-react"
import LetterIcon from "./LetterIcon"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction
} from "@/components/ui/sidebar"

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
 } from "@radix-ui/react-dropdown-menu"





export function AppSidebar(reportData){
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Header & Footer</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem key="Header">
                        <SidebarMenuButton asChild>
                            <a href="#" className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-x-2 ml-1">
                                    <LetterIcon letter="H"/>
                                    <span className="text-right">Header</span>
                                </div>
                                {/* <Eye className="text-align-right -mr-1"/> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction>
                                            <MoreHorizontal />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="right" align="start" className="bg-white border border-slate-200 rounded-lg shadow-md">
                                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm ">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem key="Footer">
                        <SidebarMenuButton asChild>
                            <a href="#" className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-x-2 ml-1">
                                    <LetterIcon letter="F"/>
                                    <span className="text-right">Footer</span>
                                </div>
                                {/* <Eye className="text-align-right -mr-1"/> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction>
                                            <MoreHorizontal />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="right" align="start" className="bg-white border border-slate-200 rounded-lg shadow-md">
                                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm ">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Front Matter</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {reportData.pages.filter(page=>page.type == "Front Matter").map((page) => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                      <span>{page.title}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                            <MoreHorizontal />
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="bg-white border border-slate-200 rounded-lg shadow-md">
                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm">Edit</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm ">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Vulnerabilities</SidebarGroupLabel>
            <SidebarGroupAction title="Add Vulnerability">
                <Plus /> <span className="sr-only">Add Vulnerability</span>
            </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportData.pages.filter(page=>page.type=="Vulnerability").map((page) => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                    <a href={"#"}>
                      <Skull />
                      <span>{page.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                            <MoreHorizontal />
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="bg-white border border-slate-200 rounded-lg shadow-md">
                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm">Edit</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm ">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Front Matter</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {reportData.pages.filter(page=>page.type == "Back Matter").map((page) => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                      <span>{page.title}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                            <MoreHorizontal />
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="bg-white border border-slate-200 rounded-lg shadow-md">
                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm">Edit</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-1 px-3 text-sm ">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}