import { useState, useRef, useEffect } from "react";
import "../styles/EmployeePopupForm.css"

function UploadZone({ label, file, onChange, id }) {
  return (
    <div>
      <span className="label-text">{label}</span>
      <div className={`upload-zone ${file ? "has-file" : ""}`}>
        <input type="file" id={id} accept=".pdf" onChange={onChange} />
        {file ? (
          <div style={{ pointerEvents: "none" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 6px", display: "block" }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" />
              <polyline points="14 2 14 8 20 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" />
              <path d="M9 13h6M9 17h4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, margin: 0, lineHeight: 1.3, wordBreak: "break-all" }}>
              {file.name}
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "4px 0 0" }}>
              {(file.size / 1024).toFixed(1)} KB · PDF
            </p>
          </div>
        ) : (
          <div style={{ pointerEvents: "none" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 8px", display: "block", opacity: 0.3 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="17 8 12 3 7 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="12" y1="3" x2="12" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 4px" }}>
              Drop or click to upload
            </p>
            <span className="pill-tag">PDF only</span>
          </div>
        )}
      </div>
    </div>
  );
}


export default function EmployeePopupForm({ isOpen, onClose, onSubmit, formData, setFormData, btnLoading }) {
  const [hiding, setHiding] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) setHiding(false);
  }, [isOpen]);

  const closeModal = () => {
    setHiding(true);
    setTimeout(() => {
      setHiding(false);
      onClose?.();
    }, 380);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal();
  };

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    if (file) setFormData((f) => ({ ...f, [field]: file }));
  };

  const handleSubmit = async(e) => {
    setSubmitted(true)
    await onSubmit(e)
    setTimeout(() => {
      setSubmitted(false);
      closeModal();
      setFormData({ fullName: "", jobTitle: "", department: "", resume: null, jobDescription: null });
    }, 1200);
  };

  const isValid =
    formData.fullName && formData.jobTitle && formData.department && formData.resume && formData.jobDescription;

  if (!isOpen && !hiding) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className={`popup-overlay ${isOpen && !hiding ? "visible" : ""} ${hiding ? "hiding" : ""}`}
        onClick={handleOverlayClick}
      >
        <div
          className="popup-card noise-bg"
          style={{
            background: "linear-gradient(160deg, #141414 0%, #0e0e0e 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 20,
            padding: "32px 32px 28px",
            width: "100%",
            maxWidth: 520,
            margin: "0 16px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <span className="corner-dot" style={{ top: 14, left: 14 }} />
          <span className="corner-dot" style={{ top: 14, right: 14, opacity: 0.08 }} />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h2 className="formData-title" style={{ color: "#f5f5f5", fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                Add New<br />
                <span style={{ color: "rgba(255,255,255,0.35)" }}>Employee</span>
              </h2>
            </div>
            <button className="close-btn" onClick={closeModal} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="ep-divider" />

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="label-text" htmlFor="fullName">Full Name</label>
              <input
                className="input-field"
                id="fullName"
                name="fullName"
                placeholder="e.g. Alexandra Chen"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="label-text" htmlFor="fullName">Employee Id</label>
              <input
                className="input-field"
                id="employeeId"
                name="employeeId"
                placeholder="e.g. B-1023"
                value={formData.employeeId}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="label-text" htmlFor="fullName">Email Id</label>
              <input
                className="input-field"
                id="employeeEmail"
                name="employeeEmail"
                placeholder="e.g. alexandra@email.com"
                value={formData.employeeEmail}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="two-col">
              <div>
                <label className="label-text" htmlFor="jobTitle">Job Title</label>
                <input
                  className="input-field"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="e.g. Product Designer"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="label-text" htmlFor="department">Department</label>
                <input
                  className="input-field"
                  id="department"
                  name="department"
                  placeholder="e.g. Design"
                  value={formData.department}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

            </div>
            <div>
              <label className="label-text" htmlFor="joiningDate">Joining Date</label>
              <input
                className="input-field"
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                style={{ colorScheme: "dark" }}
              />
            </div>
            <div className="ep-divider" />
          </div>



          <div style={{ marginTop: 24 }}>
            <button
              className={`add-btn ${submitted ? "submit-success" : ""}`}
              onClick={handleSubmit}
              style={{ opacity: isValid ? 1 : 0.35, cursor: isValid ? "pointer" : "not-allowed" }}
            >
              {submitted ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Employee Added
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  {btnLoading ? "Loading" : "Add Employee"}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}