import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../lib/supabaseClient"

const PublicRoute = ({children}) => {

    const {session, loading, user} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const getRole = async () => {
    if (!user) return;

          let role;

    const { data, error } = await supabase
      .from('hr_table')
      .select('role')
      .eq('id', user.id)
      .single();

    if (data) role = "hr"
    else{
      const { data: eData, error: eError } = await supabase
      .from('employees')
      .select('role')
      .eq('id', user.id)
      .single();
      role = "employees"
    }

    if (role === 'hr') {
      navigate("/admin/dashboard", {replace: true})
    } else if (data?.role === 'employee') {
      console.log("employee"); 
    }
  };
        if (!loading && session){
            getRole()
        }
    }, [session, loading, navigate])

  if (loading){
    return(
        <h1>Loading</h1>
    )
  }

  if (session){
    return null
  }

  return children
}

export default PublicRoute