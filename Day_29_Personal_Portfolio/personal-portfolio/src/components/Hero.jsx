import React from "react";
import { ReactTyped } from "react-typed";;
import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero-section text-center">
      <div className="container hero-container">
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
              typeSpeed={80}
              backSpeed={80}
              loop
            />
          </span>
        </article>
      </div>
    </section>
  );
};

export default Hero;
