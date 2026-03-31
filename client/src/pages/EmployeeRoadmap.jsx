import LinearFlow from "../components/LinearFlow"
import { useState, useEffect } from "react"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const EmployeeRoadmap = () => {

  const navigate = useNavigate()

    const {session} = useAuth()
    const [list, setList] = useState(null)

    useEffect(() => {
        const getMetricData = async () => {
            const { data, error } = await supabase
                .from("nodes")
                .select("title, node_order, id")
                .eq("user_id", session.user.id)
                .order("node_order", {ascending: true})

            if (error) throw error
            console.log(data)
            setList(data)
        }

        getMetricData()
    }, [])

  if(list?.length) return (
    <><LinearFlow items={list} height={"100vh"} />
    {console.log(list)}</>
  )
  return(
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] p-6 ">
  <div className="flex flex-col items-center justify-center max-w-sm w-full p-12 border border-slate-700 border-dashed rounded-3xl bg-[#1a1a1a] backdrop-blur-sm text-center">
    <div className="mb-8">
      
      <h3 className="text-lg font-medium text-slate-100">No Roadmap present</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        Upload your resume to get one
      </p>
    </div>

    <button onClick={() => {navigate("/employee/upload-documents")}} className="w-full py-3 px-6 bg-slate-100 hover:bg-white text-slate-950 text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out transform active:scale-[0.98] cursor-pointer">
      Upload Resume
    </button>
  </div>
</div>
  )
}

export default EmployeeRoadmap