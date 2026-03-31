import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";

export default function IntroAnimation() {
  const introRef = useRef(null);

  return (
    <>
      <style>{`
        /* Initial states + animations — keeps Tailwind translate classes off
           so they don't fight the keyframe transforms */
        .intro-svg {
          opacity: 0;
          transform: translateY(40px);
          animation: svgRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }
        .intro-text {
          opacity: 0;
          transform: translateX(-30px);
          animation: textSlide 0.7s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
        }
        .intro-screen {
          animation: introExit 0.7s ease-in 1.5s forwards;
        }

        @keyframes svgRise {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes textSlide {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes introExit {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-60px); visibility: hidden; pointer-events: none; }
        }
      `}</style>

      {/* black overlay */}
      <div
        ref={introRef}
        className="intro-screen fixed inset-0 z-9999 bg-black flex items-center justify-center"
      >
        {/* Row */}
        <div className="flex flex-row items-center gap-5">

          {/* SVG — initial  */}
          <div className="intro-svg flex items-center justify-center">
            <GraduationCap color="white" size={100}/>
          </div> 

          {/* Text — initial state */}
          <p className="intro-text text-white text-6xl font-semibold tracking-widest whitespace-nowrap font-monospace leading-none">
            Adapt Learn
          </p>

        </div>
      </div>
    </>
  );
}