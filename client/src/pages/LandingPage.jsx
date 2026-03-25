import "../styles/LandingPage.css";

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
  return (
    <div
      className="min-h-screen text-white overflow-x-hidden relative"
      style={{ background: "#080808" }}
    >
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
      <section
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

          <button className="cta-btn">Get Started →</button>
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
      </section>

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
              Coursify<span style={{ color: "#444" }}>.ai</span>
            </span>
            <p className="mono" style={{ fontSize: "0.78rem", color: "#3a3a3a" }}>
              AI-powered training for modern teams.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {["Product", "Pricing", "Docs", "Blog", "Contact"].map((l) => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>

          <p className="mono" style={{ fontSize: "0.72rem", color: "#2e2e2e" }}>
            © {new Date().getFullYear()} Coursify.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}