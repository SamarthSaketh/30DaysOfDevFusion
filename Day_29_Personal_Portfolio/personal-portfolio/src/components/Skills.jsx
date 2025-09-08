import React, { useEffect, useRef, useState } from "react";
import "./Skills.css";

function Skills() {
  const [visibleBars, setVisibleBars] = useState({});
  const progressRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleBars((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      category: "Frontend & Backend ",
      items: [
        { name: "HTML", svg: "/icons/html.svg", color: "#E34F26" },
        { name: "CSS", svg: "/icons/css.svg", color: "#1572B6" },
        { name: "JavaScript", svg: "/icons/javascript.svg", color: "#F7DF1E" },
        { name: "React", svg: "/icons/react.svg", color: "#61DAFB" },
        { name: "Bootstrap", svg: "/icons/bootstrap.svg", color: "#7952B3" },
        { name: "Python", svg: "/icons/python.svg", color: "#3776AB" },
        { name: "Node.js", svg: "/icons/nodejs.svg", color: "#339933" },
        { name: "Django", svg: "/icons/django.svg", color: "#092E20" },
        { name: ".NET", svg: "/icons/dotnet.svg", color: "#512BD4" },
        { name: "C#", svg: "/icons/csharp.svg", color: "#9B4F96" },
      ],
    },
    {
      category: "Databases & Tools",
      items: [
        { name: "MySQL", svg: "/icons/mysql.svg", color: "#4479A1" },
        { name: "MongoDB", svg: "/icons/mongodb.svg", color: "#47A248" },
        { name: "Git", svg: "/icons/git.svg", color: "#F05032" },
        { name: "GitHub", svg: "/icons/github.svg", color: "#171716" },
        { name: "VS Code", svg: "/icons/vscode.svg", color: "#007ACC" },
        { name: "Visual Studio", svg: "/icons/visualstudio.svg", color: "#5C2D91" },
        { name: "Postman", svg: "/icons/postman.svg", color: "#FF6C37" },
      ],
    },
  ];

  const skillLevels = [
    { name: "HTML", level: 90, color: "#E34F26" },
    { name: "VS Code", level: 90, color: "#007ACC" },
    { name: "CSS", level: 85, color: "#1572B6" },
    { name: "Git", level: 85, color: "#F05032" },
    { name: "JavaScript", level: 80, color: "#F7DF1E" },
    { name: "MySQL", level: 80, color: "#4479A1" },
    { name: "React", level: 75, color: "#61DAFB" },
    { name: "Visual Studio", level: 75, color: "#5C2D91" },
    { name: "Python", level: 70, color: "#3776AB" },
    { name: "MongoDB", level: 70, color: "#47A248" },
    { name: "Node.js", level: 70, color: "#339933" },
    { name: "C#", level: 70, color: "#9B4F96" },
    { name: ".NET", level: 70, color: "#512BD4" },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="skills-title">Skills</h2>

        {skillCategories.map((group, index) => (
          <div key={index} className="skill-category-wrapper">
            <h3 className="category-heading">{group.category}</h3>
            <div className="scroll-wrapper">
              <div className="scroll-inner">
                {/* First set of items */}
                {group.items.map((skill, idx) => (
                  <div key={`first-${idx}`} className="scroll-item">
                    <div className="icon-wrapper" style={{ color: skill.color }}>
                      <img src={skill.svg} alt={skill.name} className="skill-svg" />
                    </div>
                    <p className="skill-name">{skill.name}</p>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {group.items.map((skill, idx) => (
                  <div key={`second-${idx}`} className="scroll-item">
                    <div className="icon-wrapper" style={{ color: skill.color }}>
                      <img src={skill.svg} alt={skill.name} className="skill-svg" />
                    </div>
                    <p className="skill-name">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="skills-progress mt-5">
          <h3 className="progress-title">Proficiency Levels</h3>
          {skillLevels.map((skill, index) => (
            <div
              key={index}
              className="progress-item"
              ref={(el) => (progressRefs.current[index] = el)}
              data-index={index}
            >
              <div className="progress-label">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: visibleBars[index] ? `${skill.level}%` : "0%",
                    backgroundColor: skill.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;