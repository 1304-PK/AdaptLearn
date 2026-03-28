import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.jsx"
import { TooltipProvider } from "@/components/ui/tooltip" 
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"

export default function EmployeeDashboard() {
  return (
    <TooltipProvider>
        <SidebarProvider>
          {/* 1. Sidebar */}
          <AppSidebar />

          {/* Main Content */}
          <main className="flex-1">
                {/* Sidebar toggle */}
              <SidebarTrigger />
                <Outlet />

          </main>
        </SidebarProvider>
    </TooltipProvider>
  )
}