import LinearFlow from "../components/LinearFlow"
import { useState, useEffect } from "react"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"
import { useAsyncError } from "react-router-dom"

const EmployeeRoadmap = () => {

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

    const myData = ["Step A", "Step B", "Step C", "Step D"];
  if(list) return (
    <LinearFlow items={list} height={"100%"} />
  )
}

export default EmployeeRoadmap