import React, { useEffect, useRef } from "react";
import { FiBriefcase, FiWifi, FiMapPin } from "react-icons/fi";
import "./Experience.css";

const experiences = [
  {
    title: "Junior Software Developer",
    company: "eMudhra",
    date: "June 2025 – Present",
    description:
      "Building enterprise-grade software solutions using C#, .NET MVC, Razor Pages, Blazor, and Web API. Contributing to PKI and digital trust infrastructure products.",
    current: true,
    mode: "Offline",
    tech: ["C#", ".NET", "Blazor", "Web API"],
  },
  {
    title: ".NET Developer Intern",
    company: "eMudhra",
    date: "September 2024 – June 2025",
    description:
      "Gained hands-on experience in C#, .NET MVC, Razor Pages, Blazor, and Web API through real-world enterprise projects and code reviews.",
    current: false,
    mode: "Offline",
    tech: ["C#", ".NET MVC", "Razor Pages", "Blazor"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Exposys Data Labs",
    date: "June 2024 – August 2024",
    description:
      "Built a Blog app with PDF export, developed a Burger Customization website, and implemented a DDoS Packet Monitor tool using HTML, CSS, and JavaScript.",
    current: false,
    mode: "Online",
    tech: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Bharat Intern",
    date: "March 2024 – April 2024",
    description:
      "Developed a Money Tracker app with budget summaries, a secure responsive registration form, and a Blog app with post categorization and commenting features.",
    current: false,
    mode: "Online",
    tech: ["HTML", "CSS", "Node.js", "MongoDB"],
  },
];

function Experience() {
  const revealRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); };

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <p className="section-label">— My journey</p>
        <h2 className="section-title reveal" ref={addRef}>Experience</h2>
        <div className="section-divider reveal delay-100" ref={addRef} />

        <div className="exp-timeline">
          {experiences.map((exp, i) => (
            <div
              className="exp-item reveal"
              ref={addRef}
              style={{ transitionDelay: `${i * 0.12}s` }}
              key={i}
            >
              {/* Timeline dot */}
              <div className={`exp-dot ${exp.current ? "current" : ""}`}>
                <FiBriefcase size={14} />
              </div>

              {/* Card */}
              <div className={`exp-card tilt-card ${exp.current ? "current-card" : ""}`}>
                {/* Header */}
                <div className="exp-header">
                  <div>
                    <h4 className="exp-title">{exp.title}</h4>
                    <p className="exp-company">{exp.company}</p>
                  </div>
                  <div className="exp-meta-right">
                    <span className="exp-date">{exp.date}</span>
                    <div className="exp-badges">
                      {exp.current && (
                        <span className="badge-current">
                          <span className="pulse-dot" /> Current
                        </span>
                      )}
                      <span className={`badge-mode ${exp.mode.toLowerCase()}`}>
                        {exp.mode === "Online" ? <FiWifi size={11} /> : <FiMapPin size={11} />}
                        {exp.mode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="exp-description">{exp.description}</p>

                {/* Tech Stack */}
                <div className="exp-tech">
                  {exp.tech.map((t, j) => (
                    <span className="exp-tech-tag" key={j}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
