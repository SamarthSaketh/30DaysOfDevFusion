import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import { ReactTyped } from "react-typed";
import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa"; 
import "./App.css";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-to-top ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowCircleUp size={28} /> {/* Icon size adjustable */}
    </button>
  );
}

function App() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero-section text-center mt-5 pt-5">
        <div className="container">
          <h1 className="hero-heading">
            Hi <span className="wave-hand">👋</span>, I am{" "}
            <span className="name">Vuppaladhadium Sai Samarth Saketh</span>
          </h1>

          <article className="typing-article">
            <span className="animated-gradient typed-text">
              <ReactTyped
                strings={[
                  "a Full Stack Developer",
                  "a Python Enthusiast",
                  "a Tech Explorer",
                  "a Problem Solver",
                ]}
                typeSpeed={60}
                backSpeed={80}
                loop
              />
            </span>
          </article>
        </div>
      </section>

      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <ScrollToTop />
    </>
  );
}

export default App;
