import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <BootstrapNavbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      expand="lg"
      fixed="top"
      className="shadow-sm"
    >
      <Container fluid className="d-flex justify-content-between align-items-center px-3">
        {/* Brand Name - Left */}
        <BootstrapNavbar.Brand href="#home" className="fw-bold fs-4 navbar-brand">
          Vuppaladhadium Sai Samarth Saketh
        </BootstrapNavbar.Brand>

        {/* Navigation Links and Theme Toggle - Right */}
        <div className="d-flex align-items-center">
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="#about" className="mx-2">About</Nav.Link>
              <Nav.Link href="#skills" className="mx-2">Skills</Nav.Link>
              <Nav.Link href="#experience" className="mx-2">Experience</Nav.Link> 
              <Nav.Link href="#projects" className="mx-2">Projects</Nav.Link>
              <Nav.Link href="#certifications" className="mx-2">Certifications</Nav.Link>
              <Nav.Link href="#contact" className="mx-2">Contact</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>

          {/* Theme toggle */}
          <div className="theme-toggle-wrapper ms-3">
            <input
              type="checkbox"
              id="themeSwitch"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <label htmlFor="themeSwitch" className="toggle-label">
              <span className="toggle-icon"></span>
            </label>
          </div>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
