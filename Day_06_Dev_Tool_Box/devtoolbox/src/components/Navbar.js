import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const links = [
    { path: "/", label: "Home" },
    { path: "/json-formatter", label: "JSON" },
    { path: "/jwt-decoder", label: "JWT" },
    { path: "/uuid-generator", label: "UUID" },
    { path: "/base64-tool", label: "Base64" },
    { path: "/regex-tester", label: "Regex" },
    { path: "/html-markdown", label: "HTML ↔ MD" },
    { path: "/json-to-csv", label: "JSON → CSV" },
    { path: "/color-picker", label: "Color Picker" },
    { path: "/text-case-converter", label: "Text Case" },
    { path: "/file-to-base64", label: "File → Base64" }
  ];

  return (
    <nav>
      {links.map((link) => (
        <Link key={link.path} to={link.path}>
          <button
            style={{
              fontWeight: location.pathname === link.path ? "bold" : "normal",
            }}
          >
            {link.label}
          </button>
        </Link>
      ))}
      <button onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
}
