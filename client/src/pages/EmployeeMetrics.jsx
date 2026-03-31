import SpiderGraph from "../components/SpiderGraph"
import SkillBars from "../components/Skillbars"
import MetricCircle from "../components/MetricCircle"
import { useEffect, useState } from "react"
import supabase from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const EmployeeMetrics = () => {

    const navigate = useNavigate()

    const [metrics, setMetrics] = useState(null)
    const session = useAuth()

    useEffect(() => {
        const getMetricData = async () => {
            const { data, error } = await supabase
                .from("employee_metrics")
                .select("resume_metrics, created_at")
                .eq("user_id", session.user.id)
                .order("created_at", {ascending: false})
                .limit(1)
                .single()

            if (error) throw error
            console.log(data)
            setMetrics(data)
        }

        getMetricData()
    }, [])

    function TransferabilityCircle({ percentage = 82 }) {
        const r = 40;
        const circ = 2 * Math.PI * r;
        const offset = circ - (percentage / 100) * circ;

        return (
            <div className="relative" style={{ width: 148, height: 148 }}>
                <div
                    className="absolute inset-0 rounded-full"
                />
                <svg width="148" height="148" viewBox="0 0 148 148" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="74" cy="74" r={r} fill="none" stroke="#0d1117" strokeWidth="10" />
                    <circle
                        cx="74"
                        cy="74"
                        r={r}
                        fill="none"
                        stroke="#00f5d4"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                        className="text-xl font-bold"
                        style={{
                            color: "#00f5d4",
                            fontFamily: "monospace"
                        }}
                    >
                        {percentage}%
                    </span>
                    <span className="text-[9px] text-gray-500 mt-0.5 tracking-widest uppercase">Score</span>
                </div>
            </div>
        );
    }

    if (metrics)
        return (
            <>
                <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap');
 
        @keyframes pulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.05)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
 
        .dash-card {
          background-color: #141414;
          border: 1px solid #333333;
          box-shadow: 0 4px 40px #0005, inset 0 1px 0 #2a2a5033;
          border-radius: 1rem;
          animation: fadeUp .55s ease both;
        }
 
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #2a2a5a; border-radius: 2px; }
      `}</style>

                <div
                    className="min-h-screen w-full px-6 py-10 relative overflow-hidden"
                    style={{ background: "black", fontFamily: "'Space Mono', monospace" }}
                >

                    {/* HEADING */}
                    <div className="relative mb-10 text-center">
                        <h1
                            className="text-4xl md:text-5xl font-white"
                            style={{
                                fontFamily: "monospace",
                                color: "white",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Resume Analytics
                        </h1>
                        <p className="text-gray-500 text-xs mt-3 tracking-widest uppercase">
                            AI-Powered Career Intelligence Platform
                        </p>
                    </div>

                    {/* MetricCirlce Section */}
                    <div className="dash-card p-8 mb-6" style={{ animationDelay: "0ms" }}>
                        <div className="flex flex-wrap justify-around gap-8">
                            <MetricCircle label={"Overall"} color={"#7c83fd"} percentage={Math.trunc(metrics.resume_metrics.overallScore)} />
                            <MetricCircle label={"Skill Score"} color={"#6699cc"} percentage={Math.trunc(metrics.resume_metrics.skillScore)} />
                            <MetricCircle label={"Experience Score"} color={"#ff6b6b"} percentage={Math.trunc(metrics.resume_metrics.experienceScore)} />
                            <MetricCircle label={"Keywords Score"} color={"#f9db7d"} percentage={Math.trunc(metrics.resume_metrics.keywordsScore)} />
                        </div>
                    </div>

                    {/* Sidebar and Spider Graph */}
                    <div className="flex h-[80vh] justify-around mb-8 overflow-y-hidden">
                        <SpiderGraph data={metrics.resume_metrics.spiderGraph} />
                        <div className="overflow-y-scroll">
                            <SkillBars skillBars={metrics.resume_metrics.skillBars} />
                        </div>
                    </div>

                    {/* Transferability Score */}
                    <div
                        className="dash-card p-8 flex flex-col items-center gap-6"
                        style={{ animationDelay: "240ms" }}
                    >
                        {/* Label */}
                        <div className="flex gap-20">
                            <div className="flex items-center">
                                <div className="flex items-center gap-3 self-stretch justify-center">
                                    <span
                                        className="text-lg font-semibold tracking-widest uppercase text-gray-400"
                                        style={{ fontFamily: "monospace" }}
                                    >
                                        Transferability Score
                                    </span>
                                </div>
                                {/* Circle — pass your percentage prop here */}
                                <TransferabilityCircle percentage={metrics.resume_metrics.transferabilityScore * 100} />
                            </div>
                            {/* Bottom text */}
                            <p
                                className="text-center text-white text-justify text-xs max-w-md leading-relaxed tracking-wide"
                                style={{ fontFamily: "'Space Mono', monospace" }}
                            >
                                {/* TODO: swap with your dynamic summary copy */}
                                {metrics.resume_metrics.transferabilityLogic}
                            </p>
                        </div>
                    </div>

                </div>
            </>
        )

        return(
            <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] p-6">
  <div className="flex flex-col items-center justify-center max-w-sm w-full p-12 border border-slate-700 border-dashed rounded-3xl bg-[#1a1a1a] backdrop-blur-sm text-center">
    <div className="mb-8">
      
      <h3 className="text-lg font-medium text-slate-100">No Metrics present</h3>
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

export default EmployeeMetrics