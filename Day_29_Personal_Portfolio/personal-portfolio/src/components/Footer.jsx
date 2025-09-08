import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand / Name */}
        <div className="footer-brand">
          <h3 className="brand-name">Samarth Saketh</h3>
          <p className="brand-tagline">Building the web, one project at a time.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>

        </div>

        {/* Social Icons with Tooltips */}
        <div className="footer-socials">
          <div className="tooltip-container">
            <a
              href="https://github.com/SamarthSaketh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaGithub />
              <span className="tooltip">GitHub</span>
            </a>
          </div>

          <div className="tooltip-container">
            <a
              href="https://www.linkedin.com/in/vuppaladhadium-sai-samarth-saketh-036679201/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin />
              <span className="tooltip">LinkedIn</span>
            </a>
          </div>

          <div className="tooltip-container">
            <a
              href="mailto:samarthsaketh@outlook.com"
              className="social-icon"
            >
              <FaEnvelope />
              <span className="tooltip">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">
        <p>© {currentYear} Samarth Saketh. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
