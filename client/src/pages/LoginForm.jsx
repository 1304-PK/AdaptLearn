import { useState } from "react"
import AuthForm from "../components/AuthForm"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"
const LoginForm = () => {
    const [role, setRole] = useState("employee");
const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          const {data, error} = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password
        })

        console.log("logged in successfully")

        if (error) throw error
      }
      catch(err){
        console.error(err.message)
      }
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

  return (
    <AuthForm 
    mode={"login"}
    title={"Log In"}
    btnText={"Log In"}
    googleAuthText={"Log In Using Google"}
    bottomText={"Don't have an account?"}
    bottomTextLink={"/auth/signup"}
    role={role}
    setRole={setRole}
    handleSubmit={handleSubmit}
    formData={formData}
    onChange={onChange}
    />
  )
}

export default LoginForm