import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ReactTyped } from "react-typed";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from "react-icons/fi";
import profileImg from "../assets/profile.jpeg";
import "./Hero.css";

const techChips = [
  { label: "React", color: "#61DAFB" },
  { label: ".NET", color: "#9B59D0" },
  { label: "Python", color: "#3776AB" },
  { label: "Node.js", color: "#339933" },
  { label: "C#", color: "#9B4F96" },
  { label: "MongoDB", color: "#47A248" },
];

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* tsParticles */}
      <Particles
        id="hero-particles"
        init={particlesInit}
        className="hero-particles-canvas"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 160, links: { opacity: 0.3 } } },
          },
          particles: {
            color: { value: ["#c9972a", "#4a90d9", "#e8b84b"] },
            links: { color: "#4a78c8", distance: 140, enable: true, opacity: 0.12, width: 1 },
            move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 900 }, value: 55 },
            opacity: { value: { min: 0.15, max: 0.5 } },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* Existing CSS orbs + grid */}
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-grid" />
      </div>

      <div className="hero-container">
        {/* ── Text Block ── */}
        <div className="hero-text">
          <p className="hero-greeting">Hello, World! 👋</p>

          <h1 className="hero-name">
            Vuppaladhadium Sai<br />
            <span className="name-accent">Samarth Saketh</span>
          </h1>

          <div className="hero-typed-line">
            <span className="typed-prefix">I am </span>
            <span className="typed-text">
              <ReactTyped
                strings={[
                  "a Full Stack Developer",
                  "a .NET Engineer",
                  "a Python Enthusiast",
                  "a Problem Solver",
                  "a Tech Explorer",
                ]}
                typeSpeed={65}
                backSpeed={45}
                loop
              />
            </span>
          </div>

          <p className="hero-bio">
            Building scalable, user-centric web applications with a passion for
            clean code and elegant design. Currently a <strong>Junior Software Developer</strong> at eMudhra.
          </p>

          {/* Tech Chips */}
          <div className="hero-chips">
            {techChips.map((chip, i) => (
              <span
                key={i}
                className="hero-chip"
                style={{ "--chip-color": chip.color, animationDelay: `${1.1 + i * 0.1}s` }}
              >
                {chip.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-cta">
            <a href="/resume.pdf" download="Samarth_Saketh_Resume.pdf" className="btn-gold">
              <FiDownload size={16} />
              Download Resume
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <a href="https://github.com/SamarthSaketh" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vuppaladhadium-sai-samarth-saketh-036679201/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:samarthsaketh@outlook.com" className="social-link" aria-label="Email">
              <FiMail size={20} />
            </a>
          </div>
        </div>

        {/* ── Profile Image ── */}
        <div className="hero-image">
          <div className="image-glow" aria-hidden="true" />
          <div className="image-ring" aria-hidden="true">
            <span className="ring-dot ring-dot-1" />
            <span className="ring-dot ring-dot-2" />
            <span className="ring-dot ring-dot-3" />
          </div>
          <div className="image-frame">
            <img src={profileImg} alt="Samarth Saketh" className="profile-photo" />
          </div>
          {/* <div className="hero-badge hero-badge-role">
            <span className="badge-dot" />
            <span>Junior Developer</span>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About">
        <span>Scroll</span>
        <FiArrowDown size={16} />
      </a>
    </section>
  );
};

export default Hero;
