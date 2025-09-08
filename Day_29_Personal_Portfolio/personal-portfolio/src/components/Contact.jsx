import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [state, handleSubmit] = useForm("mldwavww"); // <-- Your Formspree ID

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>
        <p className="contact-subtitle">I'd love to hear from you! Reach out below.</p>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:samarthsaketh@outlook.com">samarthsaketh@outlook.com</a>
              </div>
            </div>

            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <a href="tel:+917207300329">+91 72073 00329</a>
              </div>
            </div>

            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>Kadapa, Andhra Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            {state.succeeded ? (
              <p className="success-message">
                🎉 Thank you for reaching out! I'll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required placeholder="Your name" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" required placeholder="you@example.com" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required placeholder="Your message"></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button type="submit" disabled={state.submitting} className="submit-btn">
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
