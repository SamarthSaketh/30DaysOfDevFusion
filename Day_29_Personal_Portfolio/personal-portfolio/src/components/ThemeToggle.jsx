import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <div className={`toggle-circle ${theme === "dark" ? "dark" : "light"}`}>
        {theme === "light" ? <FaSun className="icon sun" /> : <FaMoon className="icon moon" />}
      </div>
    </div>
  );
}

export default ThemeToggle;
