import React, { useState, useEffect, useCallback } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#about",          label: "About"          },
  { href: "#skills",         label: "Skills"         },
  { href: "#experience",     label: "Experience"     },
  { href: "#projects",       label: "Projects"       },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact",        label: "Contact"        },
];

function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy */
  useEffect(() => {
    const ids = ["home", "about", "skills", "experience", "projects", "certifications", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Close menu on ESC */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLinkClick = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Brand */}
        <a href="#home" className="navbar-brand">
          <span className="brand-icon">SS</span>
          <span className="brand-text">Samarth Saketh</span>
        </a>

        {/* Desktop Links */}
        <nav className="navbar-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`nav-link ${activeLink === href ? "active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`mobile-link ${activeLink === href ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
