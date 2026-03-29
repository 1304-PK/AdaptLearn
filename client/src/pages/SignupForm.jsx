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
        try{const {data, error} = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.name,
                    role: "hr"
                }
            }
        })

        if (error) throw error
        console.log(data)
      
      }
      catch(error){
        console.error(error.message)
      }
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