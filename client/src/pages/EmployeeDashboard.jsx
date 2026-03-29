import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.jsx"
import { TooltipProvider } from "@/components/ui/tooltip" 
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

export default function EmployeeDashboard() {

  const handleLogOut = async() => {
    try{
      const {error} = await supabase.auth.signOut()

      if (error) throw error
    } catch(error){
      console.error(error.message)
    }
  }

  return (
    <TooltipProvider>
        <SidebarProvider>
          {/* 1. Sidebar */}
          <AppSidebar handleLogOut={handleLogOut}/>

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