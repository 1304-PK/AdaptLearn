import { useState, useRef, useCallback } from "react";

export default function FileUpload({file, setFile}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleFiles = useCallback((files) => {
    setError("");
    const picked = files[0];
    if (!picked) return;
    if (picked.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    setFile(picked);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');

        .upload-box {
          font-family: 'DM Mono', monospace;
          width: 100%;
          max-width: 420px;
          background: #111111;
          border: 1px dashed #2e2e2e;
          border-radius: 6px;
          padding: 36px 28px;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.2s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          user-select: none;
        }

        .upload-box:hover {
          border-color: #444;
        }

        .upload-box.dragging {
          border-color: #666;
          background: #161616;
          transform: scale(1.012);
        }

        .upload-box.has-file {
          border-style: solid;
          border-color: #2a2a2a;
          cursor: default;
        }

        .upload-box.error-state {
          border-color: #3a1a1a;
        }

        .upload-icon {
          color: #333;
          transition: color 0.25s;
        }
        .upload-box:hover .upload-icon,
        .upload-box.dragging .upload-icon {
          color: #555;
        }

        .upload-hint {
          font-size: 12px;
          color: #4a4a4a;
          letter-spacing: 0.03em;
          text-align: center;
          line-height: 1.6;
        }

        .browse-span {
          color: #666;
          border-bottom: 1px solid #333;
          transition: color 0.2s, border-color 0.2s;
        }
        .upload-box:hover .browse-span {
          color: #aaa;
          border-color: #666;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        .file-name {
          font-size: 13px;
          color: #d0d0d0;
          letter-spacing: 0.02em;
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }

        .file-size {
          font-size: 11px;
          color: #444;
          letter-spacing: 0.04em;
        }

        .remove-btn {
          margin-top: 6px;
          font-size: 10px;
          color: #3a3a3a;
          background: none;
          border: 1px solid #252525;
          border-radius: 3px;
          padding: 3px 10px;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.06em;
          transition: color 0.2s, border-color 0.2s;
        }
        .remove-btn:hover {
          color: #c0392b;
          border-color: #3a1515;
        }

        .error-text {
          font-size: 11px;
          color: #c0392b;
          letter-spacing: 0.03em;
          text-align: center;
          animation: popIn 0.18s ease forwards;
        }

        .pdf-tag {
          font-size: 9px;
          letter-spacing: 0.14em;
          color: #2e2e2e;
          position: absolute;
          top: 10px;
          right: 12px;
          font-family: 'DM Mono', monospace;
        }
      `}</style>

      <div
        className={`upload-box ${isDragging ? "dragging" : ""} ${file ? "has-file" : ""} ${error ? "error-state" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !file && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <span className="pdf-tag">PDF ONLY</span>

        {!file ? (
          <>
            <svg
              className="upload-icon"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>

            <p className="upload-hint">
              {isDragging ? (
                <span style={{ color: "#888" }}>Release to upload</span>
              ) : (
                <>
                  Drag & drop or <span className="browse-span">choose file</span>
                </>
              )}
            </p>

            {error && <p className="error-text">⚠ {error}</p>}
          </>
        ) : (
          <div className="file-info">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#484848"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>

            <p className="file-name" title={file.name}>{file.name}</p>
            <p className="file-size">{formatSize(file.size)}</p>

            <button className="remove-btn" onClick={handleRemove}>
              remove
            </button>
          </div>
        )}
      </div>
    </>
  );
}