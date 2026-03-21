import React, { useEffect, useState } from "react";
import "./PageLoader.css";

function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState("enter"); // enter | exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1800);
    const t2 = setTimeout(() => onComplete?.(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={`page-loader ${phase}`} aria-hidden="true">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="loader-initials">SS</span>
          <div className="loader-ring" />
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
        <p className="loader-text">Loading portfolio...</p>
      </div>
    </div>
  );
}

export default PageLoader;
