import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import "./Contact.css";

const socialLinks = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    handle: "@SamarthSaketh",
    url: "https://github.com/SamarthSaketh",
    color: "#6366f1",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    handle: "Samarth Saketh",
    url: "https://www.linkedin.com/in/vuppaladhadium-sai-samarth-saketh-036679201/",
    color: "#0077b5",
  },
  {
    icon: <FaCode />,
    label: "LeetCode",
    handle: "@SamarthSaketh",
    url: "https://leetcode.com/SamarthSaketh",
    color: "#f59e0b",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

function Contact() {
  const [state, handleSubmit] = useForm("mldwavww");

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp()}
        >
          <h2 className="section-heading">Contact Me</h2>
          <div className="section-divider"><div className="section-divider-dot" /></div>
          <p className="section-subtitle">I'd love to hear from you — let's build something great together!</p>
        </motion.div>

        {/* Availability chip */}
        {/* <div className="contact-availability">
          <span className="avail-dot" />
          Open to Work · Available for Opportunities
        </div> */}

        {/* Social Quick Links */}
        <div className="contact-socials">
          {socialLinks.map((s, i) => (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-quick-card glass-card"
              style={{ "--soc-color": s.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <span className="social-icon-wrap">{s.icon}</span>
              <div>
                <p className="social-label">{s.label}</p>
                <p className="social-handle">{s.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1)}
          >
            <h3 className="contact-info-title">Get In Touch</h3>
            <div className="info-items">
              <div className="info-item glass-card">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:samarthsaketh@outlook.com">samarthsaketh@outlook.com</a>
                </div>
              </div>
              <div className="info-item glass-card">
                <FaPhone className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+917207300329">+91 72073 00329</a>
                </div>
              </div>
              <div className="info-item glass-card">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Kadapa, Andhra Pradesh, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.2)}
          >
            {state.succeeded ? (
              <div className="success-card glass-card">
                <div className="success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form glass-card">
                <div className="float-group">
                  <input type="text" id="name" name="name" required placeholder=" " autoComplete="off" />
                  <label htmlFor="name">Your Name</label>
                </div>
                <div className="float-group">
                  <input type="email" id="email" name="email" required placeholder=" " autoComplete="off" />
                  <label htmlFor="email">Email Address</label>
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div className="float-group">
                  <textarea id="message" name="message" required placeholder=" " rows={5} />
                  <label htmlFor="message">Your Message</label>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <button type="submit" disabled={state.submitting} className="submit-btn btn-primary">
                  {state.submitting ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <><FaEnvelope /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
