import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

function getYouTubeId(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function NodeContent() 
{

  const navigate = useNavigate()
    const {id} = useParams()
    const [content, setContent] = useState(null)
    useEffect(() => {
        const getContent = async() => {
            try{
                const {data: nData, error: nError} = await supabase
            .from("nodes")
            .select("title")
            .eq("id", id)
            .single()

            if (nError) throw nError
            setContent(prev => ({...prev, title: nData.title}))

            const {data: cData, error: cError} = await supabase
            .from("node_content")
            .select("youtube_videos")
            .eq("node_id", id)
            .single()

            if (cError) throw cError
            setContent(prev => ({...prev, videos: cData.youtube_videos}))
        }
        catch(error){
            console.error(error.message)
        }
        }

        getContent()
    }, [])

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (content) return (
    <>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm-mono   { font-family: 'DM Mono', monospace; }

        .heading-clamp { font-size: clamp(38px, 7vw, 88px); }

        .aspect-16-9 { position: relative; padding-top: 56.25%; }
        .aspect-16-9 iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%; border: none;
        }

        .blob {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none;
          opacity: 0; transition: opacity 1.2s ease;
        }
        .blob.show { opacity: 1; }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,80,40,0.10) 0%, transparent 70%);
          top: -120px; left: -100px;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,180,40,0.07) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }

        /* Parent hover drives both card border + button together */
        .video-col:hover .vc-border { border-color: rgba(255,100,50,0.25); }
        .video-col:hover .vc-btn    { color: #fff; border-color: rgba(255,100,50,0.25); }
        .video-col:hover .vc-btn::before { opacity: 1; }

        /* Shimmer pseudo on button */
        .vc-btn { position: relative; overflow: hidden; }
        .vc-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,100,50,0.06);
          opacity: 0; transition: opacity 0.3s ease;
        }
      `}</style>

      <div className="relative h-screen bg-[#080808] flex flex-col items-center justify-center px-6 py-20 overflow-hidden font-dm-mono">

        <div className="text-white self-start">
          <button
          onClick={() => {navigate("/employee/roadmap")}}
          className="bg-gray-800 p-3 rounded-xl cursor-pointer border-2 border-gray-600"
          >Back to Roadmap</button>
        </div>

        {/* Ambient blobs */}
        <div className={`blob blob-1 ${mounted ? "show" : ""}`} />
        <div className={`blob blob-2 ${mounted ? "show" : ""}`} />

        {/* Corner accents */}
        <div className="absolute top-7 left-7 w-8 h-8 border-t border-l border-white/[0.15] hidden sm:block" />
        <div className="absolute bottom-7 right-7 w-8 h-8 border-b border-r border-white/[0.15] hidden sm:block" />

        {/* Vertical decorative rule */}
        <div
          className={`w-px h-12 mb-10 bg-gradient-to-b from-transparent via-white/[0.15] to-transparent transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`}
        />

        {/* Heading */}
        <h1
          className={`font-cormorant heading-clamp font-light leading-[1.08] tracking-tight text-[#f5f0ea] text-center max-w-3xl mb-16 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {content.title}
        </h1>

        {/* Video grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-5xl transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {content.videos && content.videos.map((video, i) => {
            const vid = getYouTubeId(video.url);
            return (
              <div key={i} className="video-col flex flex-col">

                {/* Video card */}
                <div className="vc-border rounded-t border border-white/[0.06] border-b-0 bg-[#111] overflow-hidden transition-colors duration-300">
                  <div className="aspect-16-9">
                    {vid ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&color=white`}
                        title={`Video ${i + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[11px] tracking-widest font-dm-mono">
                        Invalid URL
                      </div>
                    )}
                  </div>
                </div>

                {/* Watch on YouTube button */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc-btn vc-border flex items-center justify-center gap-2.5 py-3.5 border border-white/[0.12] rounded-b bg-transparent text-white/75 font-dm-mono text-[11px] tracking-[0.2em] uppercase no-underline transition-colors duration-300"
                >
                  <svg className="w-4 h-4 shrink-0 fill-[rgba(255,100,50,0.8)]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch on YouTube
                </a>

              </div>
            );
          })}
        </div>
      </div>
    </>
  )

  return(
    <div className="bg-[#080808] min-h-screen min-w-full text-white flex items-center justify-center text-2xl">
      <p className="">Loading Content...</p>
    </div>
  )
}

// export default function App() {
//   return (
//     <VideoShowcase
//       heading="Watch Our Latest Films"
//       videos={[
//         { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
//         { url: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
//       ]}
//     />
//   );
// }