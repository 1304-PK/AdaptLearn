import { useState } from "react"
import AuthForm from "../components/AuthForm"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

const SignupForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {data, error} = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.name,
                    role: "hr"
                }
            }
        })
        console.log(data)
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

  return (
    <AuthForm 
    mode={"signup"}
    title={"Sign Up"}
    btnText={"Sign Up"}
    googleAuthText={"Sign Up Using Google"}
    bottomText={"Already have an account?"}
    bottomTextLink={"/auth/login"}
    handleSubmit={handleSubmit}
    formData={formData}
    onChange={onChange}
    />
  )
}

export default SignupForm