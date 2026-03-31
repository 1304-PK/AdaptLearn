import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PublicRoute = ({children}) => {

    const {session, loading, user} = useAuth()
    const navigate = useNavigate()
    console.log(user)
    useEffect(() => {
        const getRole = async () => {
    if (!user) return;


    if (user.user_metadata.role === 'hr') {
      navigate("/admin/dashboard", {replace: true})
    } else if (user.user_metadata.role === 'employee') {
      navigate("/employee"); 
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