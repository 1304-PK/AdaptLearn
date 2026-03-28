import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import supabase from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadDocuments = () => {

    const {session} = useAuth()
    const navigate = useNavigate()

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData()

        formData.append("resume", resume)
        formData.append("jobDescription", jobDescription)
        try{
            const res = await fetch("http://localhost:3000/api/get-analysis", {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            console.log(data)
            const {data: mData, error: mError} = await supabase
            .from('employee_metrics')
            .insert([{
                user_id: session.user.id,
                resume_metrics: data
            }])

            if (mError) throw mError

            navigate("/employee/metrics")

        }
        catch(err){
            console.error(err.message)
        }

    }

  return (
    <div>
      {/* Only keep what Tailwind can't handle */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');

        .font-mono-custom {
          font-family: 'DM Mono', monospace;
        }

        .font-bebas {
          font-family: 'Bebas Neue', sans-serif;
        }

        .divider-gradient {
          background: linear-gradient(
            to bottom,
            transparent,
            #1e1e1e 30%,
            #1e1e1e 70%,
            transparent
          );
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-12 font-mono-custom">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-bebas text-[52px] tracking-[0.1em] text-[#e0e0e0] leading-none max-sm:text-[38px]">
            UPLOAD DOCUMENTS
          </h1>
        </div>

        {/* Upload Grid */}
        <div className="flex gap-8 items-start flex-wrap justify-center max-sm:gap-10">
          
          {/* Resume */}
          <div className="flex flex-col gap-2.5">
            <p className="font-bebas text-[22px] tracking-[0.12em] text-[#888] leading-none">
              YOUR RESUME
            </p>
            <FileUpload file={resume} setFile={setResume} />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-[220px] divider-gradient shrink-0 self-center" />

          {/* Job Description */}
          <div className="flex flex-col gap-2.5">
            <p className="font-bebas text-[22px] tracking-[0.12em] text-[#888] leading-none">
              JOB DESCRIPTION
            </p>
            <FileUpload file={jobDescription} setFile={setJobDescription} />
          </div>
        </div>

        <button

        onClick={handleSubmit}

          className="
            mt-12!
            font-bebas
            text-[16px]
            tracking-[0.22em]
            text-[#0a0a0a]
            bg-[#d0d0d0]
            px-12! py-3!
            rounded-[3px]
            transition-all duration-150
            hover:bg-white hover:-translate-y-[1px]
            active:translate-y-0 active:bg-[#b0b0b0]
          "
        >
          ANALYZE
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;