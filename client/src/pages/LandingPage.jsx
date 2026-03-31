import "../styles/LandingPage.css";
import {useNavigate} from "react-router-dom"
import IntroAnimation from "../components/IntroAnimation";

const problems = [
  {
    title: "Time-Consuming Onboarding",
    desc: "Traditional training programs take weeks or months, draining manager bandwidth and slowing productivity.",
  },
  {
    title: "One-Size-Fits-All Training",
    desc: "Generic training materials ignore individual skill gaps, leaving employees underprepared for their specific roles.",
  },
  {
    title: "Unmeasured Skill Gaps",
    desc: "Companies struggle to identify and track exactly where knowledge deficiencies exist across their workforce.",
  },
  {
    title: "High Knowledge Drop-Off",
    desc: "Static training content leads to poor retention, forcing repetitive retraining cycles that waste resources.",
  },
];

const benefits = [
  {
    label: "10x Faster Onboarding",
    desc: "Cut training time from weeks to days with AI-curated paths that focus only on what each employee needs.",
  },
  {
    label: "Personalized Learning",
    desc: "Every course path is uniquely generated based on role, skill level, and organizational requirements.",
  },
  {
    label: "Real-Time Skill Analytics",
    desc: "Track progress and identify gaps with a live dashboard that gives managers clear visibility at a glance.",
  },
  {
    label: "Consistent Quality",
    desc: "Standardize the quality of training across all departments without relying on individual trainers.",
  },
  {
    label: "Adaptive Content",
    desc: "The AI adjusts the course path as the employee progresses, ensuring always-relevant and engaging content.",
  },
  {
    label: "Scalable Across Teams",
    desc: "Whether onboarding 5 or 500 employees, the system scales effortlessly without additional overhead.",
  },
];

export default function LandingPage() {

  const navigate = useNavigate()

  return (
    <>
    <IntroAnimation />
    <div
      className="min-h-screen text-white overflow-x-hidden relative"
      style={{ background: "#080808" }}
    >
      <div
  className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
  style={{ background: "#0a0a0a" }}
>
  {/* Radial glow - top center (greenish-white bloom) */}
  <div
    className="absolute pointer-events-none"
    style={{
      top: "-10%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "700px",
      height: "700px",
      background:
        "radial-gradient(ellipse at center, rgba(180,210,185,0.38) 0%, rgba(140,175,150,0.18) 35%, transparent 70%)",
      filter: "blur(8px)",
    }}
  />

  {/* Radial glow - bottom right */}
  <div
    className="absolute pointer-events-none"
    style={{
      bottom: "-5%",
      right: "-5%",
      width: "500px",
      height: "500px",
      background:
        "radial-gradient(ellipse at center, rgba(160,195,170,0.22) 0%, rgba(120,160,135,0.1) 40%, transparent 70%)",
      filter: "blur(12px)",
    }}
  />

  {/* Play button - top center */}
  <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
    <button
      className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
      style={{ width: "44px", height: "44px" }}
    >
      <svg width="14" height="16" viewBox="0 0 14 16" fill="white">
        <path d="M2 1.5l10 6.5-10 6.5V1.5z" />
      </svg>
    </button>
  </div>

  {/* Notification pill - top center below play button */}
  <div className="absolute z-10" style={{ top: "160px", left: "50%", transform: "translateX(-50%)" }}>
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/80 text-sm whitespace-nowrap"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <span>One-click for Instant Training Roadmap</span>
      <span className="text-white/50">→</span>
    </div>
  </div>

  {/* Main headline */}
  <div className="relative z-10 text-center px-6" style={{ marginTop: "32px" }}>
    <h1
      className="text-white leading-none tracking-tight"
      style={{
        fontFamily: "'Sora', 'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(52px, 8vw, 70px)",
        letterSpacing: "-0.03em",
        lineHeight: 1.0,
      }}
    >
      Reduce Weeks of Training to a Single Upload
    </h1>

    {/* Subheadline */}
    <p
      className="mt-5 text-white/55"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "clamp(14px, 1.4vw, 18px)",
        fontWeight: 400,
        letterSpacing: "0.01em",
      }}
    >
      Upload a resume and job description and get a personalized AI-powered training plan ready before day one.{" "}
      <span className="text-white/80 italic">expertise</span>
    </p>

    {/* CTA buttons */}
    <div className="flex items-center justify-center gap-3 mt-10">
      {/* Open App */}
      <button
      onClick={() => {navigate("/auth/login")}}
        className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        Get Started
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>

  {/* Bottom vertical chart lines */}
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1.5 z-10"
    style={{ paddingBottom: "0px" }}
  >
    {[60, 90, 130, 170, 140, 100, 70].map((h, i) => (
      <div
        key={i}
        className="rounded-t-sm"
        style={{
          width: "5px",
          height: `${h}px`,
          background: "rgba(255,255,255,0.18)",
        }}
      />
    ))}
  </div>

  {/* Bottom left - scroll indicator */}
  <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
    <div
      className="flex items-center justify-center rounded-full border border-white/25 bg-black/40"
      style={{ width: "32px", height: "32px" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2v10M3 8l4 4 4-4" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <span
      className="text-white/40 text-xs tracking-widest"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      Scroll down
    </span>
  </div>

  {/* Bottom right - DeFi horizons label + progress bar */}
  <div className="absolute bottom-6 right-6 z-10">
    <p
      className="text-white/50 text-xs mb-2 text-right tracking-wider"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      Adapt Learn
    </p>
    <div className="flex gap-1">
      <div className="rounded-full bg-white/90" style={{ width: "28px", height: "3px" }} />
      <div className="rounded-full bg-white/25" style={{ width: "50px", height: "3px" }} />
      <div className="rounded-full bg-white/25" style={{ width: "50px", height: "3px" }} />
    </div>
  </div>
</div>
      {/* GLOBAL GRID BACKGROUND */}
      <div className="grid-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* HERO SECTION */}
      {/* <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "#080808", zIndex: 1 }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "420px",
            background: "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="hero-animate relative z-10 max-w-3xl mx-auto">
          <h1
            className="font-extrabold leading-none tracking-tight mb-6"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              letterSpacing: "-0.04em",
              color: "#f5f5f5",
              lineHeight: 1.05,
            }}
          >
            Train smarter, close skill gaps, and scale fast.
          </h1>

          <p
            className="mb-10 mx-auto"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#666",
              maxWidth: "520px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Replace manual onboarding with AI-generated course paths tailored to
            each employee — cutting training time and eliminating skill gaps automatically.
          </p>

          <button className="cta-btn" onClick={() => {navigate("/auth/signup")}}>Get Started →</button>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, #080808, transparent)",
            pointerEvents: "none",
          }}
        />
      </section> */}

      {/* PROBLEM STATEMENT SECTION */}
      <section className="relative py-28 px-6" style={{ zIndex: 1 }}>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="section-label">// The Problem</p>
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15, color: "#f0f0f0" }}
            >
              Manual training is broken.
            </h2>
            <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Companies waste thousands of hours on outdated training processes
              that fail to address real skill gaps. The result? Slower teams,
              disengaged employees, and missed business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p) => (
              <div key={p.title} className="card">
                <h3 className="font-semibold mb-3" style={{ fontSize: "1rem", color: "#e0e0e0", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p className="mono" style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-16 p-8 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-8"
            style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}
          >
            <div>
              <h3 className="font-bold mb-2" style={{ fontSize: "1.25rem", color: "#f0f0f0", letterSpacing: "-0.02em" }}>
                AI does the heavy lifting
              </h3>
              <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Our AI engine analyzes each employee's role, existing knowledge,
                and your company's skill requirements — then automatically generates
                a personalized, optimized course path. No more manual curriculum
                building, no more wasted time on irrelevant content.
              </p>
            </div>
            <div className="shrink-0">
              <button
                className="cta-btn"
                style={{ background: "transparent", color: "#fff", border: "1px solid #2e2e2e", padding: "11px 28px", fontSize: "0.88rem" }}
              >
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* BENEFITS SECTION */}
      <section className="relative py-28 px-6" style={{ zIndex: 1 }}>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="section-label">// Why Coursify.ai</p>
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15, color: "#f0f0f0" }}
            >
              Everything your team needs to grow.
            </h2>
            <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.7 }}>
              From day one to mastery — Coursify.ai gives every employee
              an intelligent, adaptive path built specifically for them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b.label} className="benefit-card">
                <h3 className="font-semibold mb-2" style={{ fontSize: "1rem", color: "#e0e0e0", letterSpacing: "-0.01em" }}>
                  {b.label}
                </h3>
                <p className="mono" style={{ fontSize: "0.82rem", color: "#505050", lineHeight: 1.65 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden"
            style={{ border: "1px solid #1a1a1a" }}
          >
            {[
              { val: "80%", label: "Reduction in Training Time" },
              { val: "3x",  label: "Faster Skill Acquisition" },
              { val: "95%", label: "Employee Satisfaction" },
              { val: "60%", label: "Lower Training Costs" },
            ].map((s) => (
              <div key={s.label} className="p-8 text-center" style={{ background: "#0c0c0c" }}>
                <div className="font-extrabold mb-1" style={{ fontSize: "2.4rem", color: "#f0f0f0", letterSpacing: "-0.04em" }}>
                  {s.val}
                </div>
                <div className="mono" style={{ fontSize: "0.72rem", color: "#444", letterSpacing: "0.08em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CTA BANNER */}
      <section className="relative py-28 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-label mb-4">// Get Started Today</p>
          <h2
            className="font-extrabold mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.04em", color: "#f5f5f5", lineHeight: 1.1 }}
          >
            Stop guessing.
            <br />
            Start training smarter.
          </h2>
          <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "32px" }}>
            Join forward-thinking companies using AI to build better teams — faster.
          </p>
          <button className="cta-btn" style={{ padding: "16px 48px", fontSize: "1.05rem" }}>
            Get Started for Free
          </button>
        </div>
      </section>

      <hr className="divider" />

      {/* FOOTER */}
      <footer className="py-12 px-8 relative" style={{ background: "#080808", zIndex: 1 }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-bold block mb-2" style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Adapt Learn<span style={{ color: "#444" }}></span>
            </span>
            <p className="mono" style={{ fontSize: "0.78rem", color: "#3a3a3a" }}>
              AI-powered roadmap for new recruits.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {["Product", "Pricing", "Docs", "Blog", "Contact"].map((l) => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>

          <p className="mono" style={{ fontSize: "0.72rem", color: "#2e2e2e" }}>
            © {new Date().getFullYear()} Adapt Learn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}