import { useState } from "react"
import AuthForm from "../components/AuthForm"

const LoginForm = () => {

    const [role, setRole] = useState("employee");
const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [signupHovered, setSignupHovered] = useState(false);

  const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData.email)
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
    signupHovered={signupHovered}
    setSignupHovered={setSignupHovered}
    handleSubmit={handleSubmit}
    formData={formData}
    onChange={onChange}
    />
  )
}

export default LoginForm