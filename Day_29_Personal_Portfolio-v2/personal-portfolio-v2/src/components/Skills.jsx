import React, { useEffect, useRef, useState } from "react";
import "./Skills.css";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend & Backend",
    items: [
      { name: "HTML",       svg: "/icons/html.svg",       color: "#E34F26" },
      { name: "CSS",        svg: "/icons/css.svg",        color: "#1572B6" },
      { name: "JavaScript", svg: "/icons/javascript.svg", color: "#F7DF1E" },
      { name: "React",      svg: "/icons/react.svg",      color: "#61DAFB" },
      { name: "Bootstrap",  svg: "/icons/bootstrap.svg",  color: "#7952B3" },
      { name: "Python",     svg: "/icons/python.svg",     color: "#3776AB" },
      { name: "Node.js",    svg: "/icons/nodejs.svg",     color: "#339933" },
      { name: "Django",     svg: "/icons/django.svg",     color: "#092E20" },
      { name: ".NET",       svg: "/icons/dotnet.svg",     color: "#512BD4" },
      { name: "C#",         svg: "/icons/csharp.svg",     color: "#9B4F96" },
    ],
  },
  {
    id: "tools",
    label: "Databases & Tools",
    items: [
      { name: "MySQL",         svg: "/icons/mysql.svg",        color: "#4479A1" },
      { name: "MongoDB",       svg: "/icons/mongodb.svg",      color: "#47A248" },
      { name: "Git",           svg: "/icons/git.svg",          color: "#F05032" },
      { name: "GitHub",        svg: "/icons/github.svg",       color: "#e0e8f8" },
      { name: "VS Code",       svg: "/icons/vscode.svg",       color: "#007ACC" },
      { name: "Visual Studio", svg: "/icons/visualstudio.svg", color: "#5C2D91" },
      { name: "Postman",       svg: "/icons/postman.svg",      color: "#FF6C37" },
    ],
  },
];

const proficiency = [
  { name: "HTML / CSS",   level: 90, color: "#E34F26" },
  { name: "JavaScript",   level: 80, color: "#F7DF1E" },
  { name: "React",        level: 75, color: "#61DAFB" },
  { name: "Python",       level: 70, color: "#3776AB" },
  { name: "C# / .NET",    level: 75, color: "#9B4F96" },
  { name: "Node.js",      level: 70, color: "#339933" },
  { name: "MySQL",        level: 80, color: "#4479A1" },
  { name: "MongoDB",      level: 70, color: "#47A248" },
  { name: "Git / GitHub", level: 85, color: "#F05032" },
];

/* Animated counter hook */
function useCounter(target, active) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = (target / (duration / step));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [target, active]);
  return value;
}

function ProgItem({ skill, index }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible"); // triggers reveal fade-in
          setActive(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const counter = useCounter(skill.level, active);

  return (
    <div
      className="prog-item reveal"
      ref={ref}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="prog-header">
        <span className="prog-name">{skill.name}</span>
        <span className="prog-pct" style={{ color: skill.color }}>{counter}%</span>
      </div>
      <div className="prog-track">
        <div
          className="prog-fill"
          style={{
            width: active ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: active ? `0 0 14px ${skill.color}66` : "none",
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const revealRef = useRef([]);

  useEffect(() => {
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRef.current.forEach((el) => el && revealObs.observe(el));
    return () => revealObs.disconnect();
  }, []);

  const addRef = (el) => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); };
  const activeCategory = skillCategories.find((c) => c.id === activeTab);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <p className="section-label">— What I work with</p>
        <h2 className="section-title reveal" ref={addRef}>Technical Skills</h2>
        <div className="section-divider reveal delay-100" ref={addRef} />

        {/* Tabs */}
        <div className="skill-tabs reveal delay-200" ref={addRef}>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`skill-tab ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrolling Marquee */}
        <div className="marquee-wrapper reveal delay-300" ref={addRef}>
          <div className="marquee-track">
            {[...activeCategory.items, ...activeCategory.items].map((skill, i) => (
              <div className="marquee-item" key={i}>
                <div className="skill-icon-wrap" style={{ "--skill-color": skill.color }}>
                  <img src={skill.svg} alt={skill.name} className="skill-svg" />
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proficiency Bars — each with counter */}
        <div className="proficiency-section">
          <h3 className="sub-section-title reveal" ref={addRef}>Proficiency Levels</h3>
          <div className="proficiency-grid">
            {proficiency.map((skill, i) => (
              <ProgItem key={i} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
