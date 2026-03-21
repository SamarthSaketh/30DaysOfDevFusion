import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaHeart } from "react-icons/fa";
import "./Footer.css";

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/SamarthSaketh", label: "GitHub" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/vuppaladhadium-sai-samarth-saketh-036679201/", label: "LinkedIn" },
  { icon: <FaCode />, url: "https://leetcode.com/SamarthSaketh", label: "LeetCode" },
  { icon: <FaEnvelope />, url: "mailto:samarthsaketh@outlook.com", label: "Email" },
];

const navLinks = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top-gradient" />
      <div className="footer-container container">
        {/* Brand */}
        <div className="footer-brand">
          <h3 className="footer-brand-name">
            <span className="brand-grad">Samarth</span>
            <span className="brand-dot-f">.</span>
          </h3>
          <p className="footer-tagline">Building the web, one project at a time.</p>
          <div className="footer-socials">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Snapshot */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-nav-links">
            <li><a href="mailto:samarthsaketh@outlook.com">samarthsaketh@outlook.com</a></li>
            <li><span>Kadapa, Andhra Pradesh, India</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} Samarth Saketh. Made with <FaHeart className="heart-icon" /> All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
