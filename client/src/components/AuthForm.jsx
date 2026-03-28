import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/AuthForm.css"

export default function AuthForm({ mode, title, btnText, googleAuthText, bottomText, bottomTextLink, handleSubmit, role, setRole, formData, onChange }) {

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Subtle radial glow in center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 100%)",
                }}
            />

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-md mx-4 rounded-2xl p-8"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(30,30,30,0.95) 0%, rgba(15,15,15,0.98) 100%)",
                    border: "1px solid transparent",
                    backgroundClip: "padding-box",
                    boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08),
            0 2px 0 0 rgba(255,255,255,0.13),
            0 -1px 0 0 rgba(0,0,0,0.8),
            4px 0 0 0 rgba(255,255,255,0.04),
            -4px 0 0 0 rgba(255,255,255,0.04),
            0 24px 64px rgba(0,0,0,0.7),
            0 4px 16px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.4)
          `,
                }}
            >
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1
                            style={{
                                fontFamily: "'Georgia', 'Times New Roman', serif",
                                fontSize: "2rem",
                                fontWeight: "300",
                                letterSpacing: "0.04em",
                                color: "rgba(255,255,255,0.92)",
                                textShadow: "0 1px 12px rgba(255,255,255,0.12)",
                                margin: 0,
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            style={{
                                width: "32px",
                                height: "1px",
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                margin: "10px auto 0",
                            }}
                        />
                    </div>
                    {/* Role Selector - sliding pill */}
                    {mode === "login" && <div
                        className="relative flex rounded-xl mb-6 p-1"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        {/* Sliding pill indicator */}
                        <div
                            style={{
                                position: "absolute",
                                top: "4px",
                                bottom: "4px",
                                width: "calc(50% - 4px)",
                                left: role === "employee" ? "4px" : "calc(50%)",
                                transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.07) 100%)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "8px",
                                boxShadow:
                                    "0 1px 0 rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.07), 0 2px 8px rgba(0,0,0,0.3)",
                                pointerEvents: "none",
                            }}
                        />
                        {["employee", "hr"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className="flex-1 py-2 rounded-lg text-sm font-medium"
                                style={{
                                    fontFamily: "'Georgia', serif",
                                    letterSpacing: "0.06em",
                                    fontSize: "0.78rem",
                                    textTransform: "uppercase",
                                    background: "transparent",
                                    color:
                                        role === r
                                            ? "rgba(255,255,255,0.92)"
                                            : "rgba(255,255,255,0.35)",
                                    border: "1px solid transparent",
                                    cursor: "pointer",
                                    position: "relative",
                                    zIndex: 1,
                                    transition: "color 0.25s ease",
                                }}
                            >
                                {r === "hr" ? "HR" : "Employee"}
                            </button>
                        ))}
                    </div>}

                    {/* Name Field */}
                    {mode=="signup" && <div className="mb-4">
                        <label
                            style={{
                                display: "block",
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.72rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.4)",
                                marginBottom: "6px",
                            }}
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="John Doe"
                            id="name"
                            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-200"
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.9rem",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.09)",
                                color: "rgba(255,255,255,0.85)",
                                caretColor: "rgba(255,255,255,0.7)",
                                boxShadow:
                                    "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                            onFocus={(e) => {
                                e.target.style.border = "1px solid rgba(255,255,255,0.22)";
                                e.target.style.background = "rgba(255,255,255,0.06)";
                            }}
                            onBlur={(e) => {
                                e.target.style.border = "1px solid rgba(255,255,255,0.09)";
                                e.target.style.background = "rgba(255,255,255,0.04)";
                            }}
                        />
                    </div>}
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            style={{
                                display: "block",
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.72rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.4)",
                                marginBottom: "6px",
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={onChange}
                            id="email"
                            placeholder="you@company.com"
                            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-200"
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.9rem",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.09)",
                                color: "rgba(255,255,255,0.85)",
                                caretColor: "rgba(255,255,255,0.7)",
                                boxShadow:
                                    "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                            onFocus={(e) => {
                                e.target.style.border = "1px solid rgba(255,255,255,0.22)";
                                e.target.style.background = "rgba(255,255,255,0.06)";
                            }}
                            onBlur={(e) => {
                                e.target.style.border = "1px solid rgba(255,255,255,0.09)";
                                e.target.style.background = "rgba(255,255,255,0.04)";
                            }}
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-6">
                        <label
                            style={{
                                display: "block",
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.72rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.4)",
                                marginBottom: "6px",
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={onChange}
                            id="password"
                            placeholder="••••••••"
                            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-200"
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.9rem",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.09)",
                                color: "rgba(255,255,255,0.85)",
                                caretColor: "rgba(255,255,255,0.7)",
                                boxShadow:
                                    "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                            onFocus={(e) => {
                                e.target.style.border = "1px solid rgba(255,255,255,0.22)";
                                e.target.style.background = "rgba(255,255,255,0.06)";
                            }}
                            onBlur={(e) => {
                                e.target.style.border = "1px solid rgba(255,255,255,0.09)";
                                e.target.style.background = "rgba(255,255,255,0.04)";
                            }}
                        />
                    </div>
                    {/* Auth Button */}
                    <button
                        className="w-full py-3 rounded-xl text-sm font-semibold tracking-widest mb-6"
                        type="submit"
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: "0.85rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "rgba(0,0,0,0.88)",
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(210,210,210,0.92) 100%)",
                            border: "none",
                            boxShadow:
                                "0 1px 0 rgba(255,255,255,1) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 4px 16px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)",
                            cursor: "pointer",
                        }}
                    >
                        {btnText}
                    </button>
                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="flex-1"
                            style={{
                                height: "1px",
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "0.7rem",
                                color: "rgba(255,255,255,0.25)",
                                letterSpacing: "0.08em",
                            }}
                        >
                            or
                        </span>
                        <div
                            className="flex-1"
                            style={{
                                height: "1px",
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                            }}
                        />
                    </div>
                    {/* Google Sign Up */}
                    <button
                        className="w-full py-3 rounded-xl flex items-center justify-center gap-3 mb-6"
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: "0.85rem",
                            letterSpacing: "0.04em",
                            color: "rgba(255,255,255,0.7)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow:
                                "0 1px 0 rgba(255,255,255,0.07) inset, 0 2px 8px rgba(0,0,0,0.3)",
                            cursor: "pointer",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                            <path
                                d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.2-2.7-.5-4z"
                                fill="rgba(255,255,255,0.5)"
                            />
                        </svg>
                        {googleAuthText}
                    </button>
                    {/* Bottom Text */}
                    <p
                        className="text-center"
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.28)",
                            letterSpacing: "0.02em",
                        }}
                    >
                        {bottomText}{" "}
                        <span
                            className="auth-form-bottom-text"
                        >
                            <NavLink to={bottomTextLink}>{mode === "signup" ? "Log In" : "Sign Up"}</NavLink>
                        </span>
                    </p>
                </form>

            </div>
        </div>
    );
}