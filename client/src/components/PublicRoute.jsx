import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PublicRoute = ({children}) => {

    const {session, loading} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && session){
            console.log("session exists")
        }
        else{
            console.log("session doesn't exist")
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