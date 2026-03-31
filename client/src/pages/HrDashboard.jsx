import { LogOut, UserPlus, Users } from "lucide-react";
import EmployeePopupForm from "../components/EmployeePopupForm"
import { useState, useEffect } from "react"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

const HEADERS = ["#", "Name", "Employee ID", "Job Title", "Department"];

export default function EmployeeDashboard() {

  const { session, user } = useAuth()
  console.log(user)
  const [showForm, setShowForm] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [employeeData, setEmployeeData] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    employeeEmail: "",
    jobTitle: "",
    department: "",
    joiningDate: "",
  })


  const getEmployeesData = async () => {
      try{
        const {data, error} = await supabase
        .from("employees")
        .select("full_name, employee_id, job_title, department, created_at")
        .eq("created_by", session.user.id)
        .order("created_at", {ascending: false})
        .limit(5)

        if (error) throw error
        setEmployeeData(data)
      }
      catch(error){
        console.error(error.message)
      }
    }


  useEffect(() => {
    getEmployeesData()
  }, [])

   const handleLogOut = async () => {
    const {error} = await supabase.auth.signOut()
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setBtnLoading(true)

    try {
    const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_KEY || "http://localhost:3000"}/api/create-user`, {
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

    getEmployeesData()
    
  } catch (error) {
    console.error("Error in frontend request:", error.message);
    alert(error.message);
  } finally{
    setBtnLoading(false)
  }  

  }

return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-6 md:px-10 md:py-8 font-sans">
<EmployeePopupForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
        btnLoading={btnLoading}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade  { animation: fadeUp .4s ease both; }
        .xls   { border-collapse: collapse; width: 100%; table-layout: fixed; }
        .mono  { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Top Nav ── */}
      <header className="fade flex items-center justify-between mb-10">
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-0.5">Dashboard</p>
          <h1 className="text-2xl font-semibold text-white">
            Hey, <span className="text-neutral-300">{user.user_metadata.full_name.split(' ')[0]}</span> 
          </h1>
        </div>

        <button 
          onClick={handleLogOut}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 text-destructive text-sm font-medium transition-colors hover:bg-destructive hover:border-neutral-700 hover:text-white cursor-pointer">
          <LogOut size={15} strokeWidth={1.8} />
          Logout
        </button>
      </header>

      {/* ── Add Employee Bar ── */}
      <div
        className="fade flex items-center justify-between px-5 py-4 rounded-xl border border-neutral-800 bg-neutral-900 mb-6"
        style={{ animationDelay: "0.07s" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800">
            <Users size={15} className="text-neutral-400" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-200">Add a new employee</p>
            <p className="text-xs text-neutral-500 mt-0.5">Expand your team roster</p>
          </div>
        </div>

        <button
          onClick={() => {setShowForm(true)}}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-neutral-900 text-sm font-semibold transition-colors hover:bg-neutral-200 active:scale-95 cursor-pointer">
          <UserPlus size={14} strokeWidth={2} />
          Add New Employee
        </button>
        
      </div>

      {/* ── Grid ── */}
      <div
        className="fade rounded-xl overflow-hidden border border-neutral-800"
        style={{ animationDelay: "0.13s" }}
      >
        <div className="overflow-x-auto">
          {employeeData ? <table className="xls">
            <colgroup>
              <col className="w-14" />
              <col />
              <col style={{ width: "148px" }} />
              <col />
              <col style={{ width: "148px" }} />
            </colgroup>

            {/* Header */}
            <thead>
              <tr>
                {HEADERS.map((h, i) => (
                  <th
                    key={h}
                    className={`
                      mono border border-neutral-800 bg-neutral-900
                      px-3 py-2.5 text-left text-[11px] uppercase tracking-widest
                      text-neutral-500 font-medium select-none
                      ${i === 0 ? "text-center" : ""}
                    `}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {employeeData.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-neutral-800 bg-neutral-950 py-12 text-center text-sm text-neutral-600"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                employeeData.map((emp, i) => (
                  <tr
                    key={i}
                    className="fade group transition-colors"
                    style={{ animationDelay: `${0.16 + i * 0.05}s` }}
                  >
                    {/* # */}
                    <td className="mono border border-neutral-800 bg-neutral-900 group-hover:bg-neutral-800 px-3 py-2.5 text-center text-xs text-neutral-600 transition-colors">
                      {i + 1}
                    </td>

                    {/* Name */}
                    <td className="border border-neutral-800 bg-neutral-950 group-hover:bg-neutral-900 px-3 py-2.5 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-semibold text-neutral-300">
                          {emp.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-neutral-200 truncate">{emp.full_name}</span>
                      </div>
                    </td>

                    {/* Employee ID */}
                    <td className="mono border border-neutral-800 bg-neutral-950 group-hover:bg-neutral-900 px-3 py-2.5 text-xs text-neutral-600 transition-colors">
                      {emp.employee_id}
                    </td>

                    {/* Job Title */}
                    <td className="border border-neutral-800 bg-neutral-950 group-hover:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-400 truncate transition-colors">
                      {emp.job_title}
                    </td>

                    {/* Department */}
                    <td className="border border-neutral-800 bg-neutral-950 group-hover:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-400 truncate transition-colors">
                      {emp.department}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        :
        <div className=" min-w-full min-h-40 animate-pulse bg-[#565656]">
        </div>  
        }
        </div>
      </div>
    </div>
  )
}