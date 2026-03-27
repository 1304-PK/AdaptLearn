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
    resume: null,
    jobDescription: null,
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setBtnLoading(true)
    try {const {data, error} = await supabase
    .from("employees")
    .insert([{
      full_name: formData.fullName,
      employee_id: formData.employeeId,
      job_title: formData.jobTitle,
      department: formData.department,
      joining_date: formData.joiningDate,
      created_by: session.user.id,
      employee_email: formData.employeeEmail
    }])

    if (error) throw error

    console.log("successfully registered")
  } 
  catch(err){
    console.error(err.message)
  }
  finally{
    setBtnLoading(false)
  }

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
    </div>
  )
}

export default HrDashboard