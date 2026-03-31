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

  const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
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
      
      }
      catch(error){
        console.error(error.message)
      }
      finally{
        setLoading(false)
      }
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

  return (
    <AuthForm 
    mode={"signup"}
    title={"Create Your Account"}
    btnText={"Sign Up"}
    googleAuthText={"Sign Up Using Google"}
    bottomText={"Already have an account?"}
    bottomTextLink={"/auth/login"}
    handleSubmit={handleSubmit}
    formData={formData}
    onChange={onChange}
    loading={loading}
    />
  )
}

export default SignupForm