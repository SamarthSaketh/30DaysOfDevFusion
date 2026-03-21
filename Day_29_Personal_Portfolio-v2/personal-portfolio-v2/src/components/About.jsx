import React, { useEffect, useRef, useState } from "react";
import { FiDownload, FiEye, FiCalendar, FiMapPin, FiAward } from "react-icons/fi";
import "./About.css";

/* Animated counter — counts from 0 to target when active */
function useCounter(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [target, active, duration]);
  return value;
}

function StatCard({ stat, index }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.unobserve(e.target); } },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const numericTarget = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
  const suffix = stat.value.replace(/[0-9.]/g, '');
  const counted = useCounter(numericTarget, active);
  return (
    <div className="stat-card tilt-card" ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
      <span className="stat-value">{active ? `${counted}${suffix}` : stat.value}</span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "SCSVMV University, Kanchipuram, Tamil Nadu",
    year: "2021 – 2025",
    grade: "CGPA: 8.7 / 10",
    icon: "🎓",
  },
  {
    degree: "Intermediate (12th Grade)",
    institution: "Krishna Teja Junior College, Tirupati, Andhra Pradesh",
    year: "2019 – 2021",
    grade: "Percentage: 69%",
    icon: "📚",
  },
  {
    degree: "10th Grade",
    institution: "Maharishi Vidyanikethan High School, Kadapa, Andhra Pradesh",
    year: "2018 – 2019",
    grade: "Percentage: 97%",
    icon: "⭐",
  },
];

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "3",   label: "Internships" },
  { value: "8.7", label: "CGPA" },
  { value: "1+",  label: "Year of Experience" },
];

function About() {
  const revealRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    revealRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); };

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <p className="section-label" ref={addRef} style={{opacity:0, animation:"none"}}>
          — Who I am
        </p>
        <h2 className="section-title reveal" ref={addRef}>About Me</h2>
        <div className="section-divider reveal delay-100" ref={addRef} />

        {/* Bio + Stats */}
        <div className="about-grid">
          <div className="about-bio reveal-left" ref={addRef}>
            <p className="about-text">
              Hi, I'm <strong>Vuppaladhadium Sai Samarth Saketh</strong> — a passionate
              Full Stack Developer and <span className="highlight">.NET Engineer</span> with a strong
              foundation in building scalable web applications.
            </p>
            <p className="about-text">
              My journey started with pure curiosity for how things work, and has evolved into
              a professional career spanning frontend, backend, databases, and cloud fundamentals.
              I'm currently a <span className="highlight">Junior Software Developer at eMudhra</span>,
              where I work with C#, .NET MVC, Blazor, and REST APIs.
            </p>
            <p className="about-text">
              I love clean architecture, thoughtful UI/UX, and continuous learning — always chasing
              that next skill to add to my toolkit.
            </p>

            <div className="about-meta">
              <span className="meta-item">
                <FiMapPin size={14} />
                Kadapa, Andhra Pradesh, India
              </span>
              <span className="meta-item">
                <FiAward size={14} />
                B.Tech CSE — SCSVMV University
              </span>
            </div>

            <div className="about-buttons">
              <a href="/resume.pdf" className="btn-gold" download="Samarth_Saketh_Resume.pdf">
                <FiDownload size={15} /> Download Resume
              </a>
              <a href="/resume.pdf" className="btn-outline" target="_blank" rel="noopener noreferrer">
                <FiEye size={15} /> View Resume
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats reveal-right" ref={addRef}>
            {stats.map((s, i) => (
              <StatCard stat={s} index={i} key={i} />
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="education-block">
          <h3 className="sub-section-title reveal" ref={addRef}>
            <FiCalendar size={18} /> Education
          </h3>
          <div className="edu-timeline">
            {education.map((edu, i) => (
              <div className="edu-item reveal" ref={addRef} style={{ transitionDelay: `${i * 0.15}s` }} key={i}>
                <div className="edu-icon">{edu.icon}</div>
                <div className="edu-content">
                  <h4 className="edu-degree">{edu.degree}</h4>
                  <p className="edu-institution">{edu.institution}</p>
                  <div className="edu-meta">
                    <span className="edu-year">{edu.year}</span>
                    <span className="edu-grade">{edu.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
