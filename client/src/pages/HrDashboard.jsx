import EmployeePopupForm from "../components/EmployeePopupForm"
import { useState } from "react"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"
const HrDashboard = () => {
  const { session } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    employeeEmail: "",
    jobTitle: "",
    department: "",
    joiningDate: "",
  })

  const handleLogOut = async () => {
    const {error} = await supabase.auth.signOut()
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setBtnLoading(true)

    try {
    const response = await fetch("http://localhost:3000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_email: formData.employeeEmail,
        password: formData.fullName.split(' ')[0], 
        full_name: formData.fullName,
        employee_id: formData.employeeId,
        job_title: formData.jobTitle,
        department: formData.department,
        joining_date: formData.joiningDate,
        created_by: session.user.id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to create employee");
    }

    console.log("user created")
    
  } catch (error) {
    console.error("Error in frontend request:", error.message);
    alert(error.message);
  } finally{
    setBtnLoading(false)
  }

    // Send pdf and resume to server
    // const fileFormData = new FormData()
    // fileFormData.append("resume", formData.resume)
    // fileFormData.append("jobDescription", formData.jobDescription)

    // const res = await fetch("http://localhost:3000/api/get-analysis", {
    //   method: "POST",
    //   body: fileFormData
    // })

    // const data = await res.json()
    // console.log(data)

  

  }
  return (
    <div>
      <button onClick={() => { setShowForm(true) }}>Show Form</button>
      <EmployeePopupForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
        btnLoading={btnLoading}
      />

      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default HrDashboard