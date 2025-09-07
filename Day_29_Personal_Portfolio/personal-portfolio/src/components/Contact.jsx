import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>
        <p className="contact-subtitle">
          Reach out via email, phone, or see my location on the map.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <p><FaEnvelope className="contact-icon" /> 
              <a href="mailto:samarthsaketh@outlook.com">samarthsaketh@outlook.com</a>
            </p>
            <p><FaPhone className="contact-icon" /> 
              <a href="tel:+917207300329">+91 72073 00329</a>
            </p>
            <p><FaMapMarkerAlt className="contact-icon" /> Kadapa, Andhra Pradesh, India - 516002</p>
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d608.4174844751395!2d78.8374145573595!3d14.47261183082794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDI4JzIxLjYiTiA3OMKwNTAnMTYuMiJF!5e0!3m2!1sen!2sin!4v1757268324388!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="My House Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
