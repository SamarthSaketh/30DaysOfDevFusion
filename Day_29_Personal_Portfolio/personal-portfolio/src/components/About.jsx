import React from "react";
import "./About.css";
import profileImg from "../assets/profile.jpeg";
import { FaDownload, FaEye } from "react-icons/fa";

function About() {
  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Sri Chandrasekharendra Saraswathi Viswa Mahavidyalaya (SCSVMV), Enathur, Kanchipuram, Tamil Nadu",
      year: "2021 - 2025",
      grade: "CGPA: 8.7",
    },
    {
      degree: "Intermediate (12th Grade)",
      institution: "Krishna Teja Junior College, Renigunta, Tirupati, Andhra Pradesh",
      year: "2019 - 2021",
      grade: "Percentage: 69%",
    },
    {
      degree: "10th Grade",
      institution: "Maharishi Vidyanikethan High School, Kadapa, Andhra Pradesh",
      year: "2018 - 2019",
      grade: "Percentage: 97%",
    },
  ];

  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        <h2 className="about-title">About Me</h2>

        <div className="about-content row align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={profileImg}
              alt="Saketh Profile"
              className="profile-img img-fluid rounded-circle shadow"
            />
          </div>
          <div className="col-md-8">
            <p className="about-text">
              Hi, I'm <strong>Vuppaladhadium Sai Samarth Saketh</strong>, a passionate
              <span className="highlight"> Full Stack Developer</span> and 
              <span className="highlight"> Python Enthusiast</span>. I love creating web
              applications, exploring new technologies, and solving challenging problems.
            </p>
            <p className="about-text">
              My journey in tech started with curiosity, and now I focus on building scalable, 
              user-friendly solutions while continuously learning and improving my skills.
            </p>

            <div className="mt-3 mb-4">
              <a
                href="/resume.pdf"
                className="btn btn-primary me-2"
                download="Vuppaladhadium_Sai_Samarth_Saketh_CV.pdf"
              >
                <FaDownload className="me-2" /> Download Resume
              </a>
              <a
                href="/resume.pdf"
                className="btn btn-outline-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEye className="me-2" /> View Resume
              </a>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <h3 className="education-title text-center">Education</h3>
        <div className="education-timeline mt-5">
          {educationData.map((edu, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h5 className="timeline-degree">{edu.degree}</h5>
                <p className="timeline-institution">{edu.institution}</p>
                <p className="timeline-year">{edu.year}</p>
                <p className="timeline-grade">{edu.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
