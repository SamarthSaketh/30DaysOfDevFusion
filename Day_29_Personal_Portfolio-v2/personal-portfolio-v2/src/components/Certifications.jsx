import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiAward } from "react-icons/fi";
import "./Certifications.css";

const certifications = [
  {
    title: "Google AI Essentials",
    issuer: "Coursera × Google",
    icon: "/icons/google.svg",
    file: "/certs/google-ai-essentials-coursera.pdf",
    color: "#4285F4",
  },
  {
    title: "Google Prompting Essentials",
    issuer: "Coursera × Google",
    icon: "/icons/google.svg",
    file: "/certs/google-prompting-essentials-coursera.pdf",
    color: "#34A853",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    icon: "/icons/google.svg",
    file: "/certs/introduction-gen-ai-google.png",
    color: "#EA4335",
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    icon: "/icons/google.svg",
    file: "/certs/prompt-design-vertex-ai-google.jpg",
    color: "#FBBC04",
  },
  {
    title: "Azure Fundamentals AZ-900",
    issuer: "Microsoft",
    icon: "/icons/microsoft.svg",
    file: "/certs/microsoft-AZ-900.pdf",
    color: "#0078D4",
  },
  {
    title: "JavaScript Algorithms & DS",
    issuer: "Coursera",
    icon: "/icons/coursera.svg",
    file: "/certs/javascript-coursera.pdf",
    color: "#0056D2",
  },
  {
    title: "Python for Everybody",
    issuer: "Coursera",
    icon: "/icons/coursera.svg",
    file: "/certs/python-coursera.pdf",
    color: "#0056D2",
  },
  {
    title: "Gen AI on LinkedIn",
    issuer: "LinkedIn Learning",
    icon: "/icons/linkedin.svg",
    file: "/certs/gen-ai-linkedin.jpeg",
    color: "#0A66C2",
  },
  {
    title: "Communication Skills",
    issuer: "TCS iON",
    icon: "/icons/tcs.svg",
    file: "/certs/tcs-communication-skills.pdf",
    color: "#c9972a",
  },
];

function Certifications() {
  return (
    <section id="certifications" className="certs-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Certifications</h2>
          <div className="section-divider"><div className="section-divider-dot" /></div>
          <p className="section-subtitle">Credentials that validate my expertise</p>
        </motion.div>

        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card glass-card"
              style={{ "--cert-color": cert.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="cert-icon-wrap">
                <img src={cert.icon} alt={cert.issuer} className="cert-icon" />
              </div>
              <div className="cert-content">
                <h4 className="cert-title">{cert.title}</h4>
                <p className="cert-issuer">
                  <FiAward size={12} /> {cert.issuer}
                </p>
              </div>
              <FiExternalLink size={16} className="cert-ext" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
