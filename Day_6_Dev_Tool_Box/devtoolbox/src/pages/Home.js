import { Link } from "react-router-dom";
import "./Home.css"; // Link external CSS

const tools = [
  {
    name: "JSON Formatter",
    path: "/json-formatter",
    description: "Validate and pretty-print your JSON instantly.",
    emoji: "🧩",
  },
  {
    name: "JWT Decoder",
    path: "/jwt-decoder",
    description: "Decode JSON Web Tokens (JWT) without verifying.",
    emoji: "🔐",
  },
  {
    name: "UUID Generator",
    path: "/uuid-generator",
    description: "Generate universally unique identifiers (UUID v4).",
    emoji: "🔑",
  },
  {
    name: "Base64 Encoder/Decoder",
    path: "/base64-tool",
    description: "Convert text to and from Base64 format easily.",
    emoji: "🧪",
  },
  {
    name: "Regex Tester",
    path: "/regex-tester",
    description: "Test and debug regular expressions with live match results.",
    emoji: "🔍",
  },
  {
    name: "HTML ↔ Markdown",
    path: "/html-markdown",
    description: "Convert HTML code to Markdown and vice versa.",
    emoji: "🧾",
  },
  {
    name: "JSON → CSV Converter",
    path: "/json-to-csv",
    description: "Convert JSON arrays into CSV format quickly.",
    emoji: "📤",
  },
  {
    name: "Color Picker",
    path: "/color-picker",
    description: "Pick and copy hex/rgb color codes.",
    emoji: "🎨",
  },
  {
    name: "Text Case Converter",
    path: "/text-case-converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case and more.",
    emoji: "📚",
  },
  {
    name: "File → Base64 Encoder",
    path: "/file-to-base64",
    description: "Upload any file and convert it to Base64 format.",
    emoji: "📁",
  }
];

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">🛠️ DevToolbox – All-in-One Developer Toolkit</h1>
      <p className="home-subtitle">
        Supercharge your productivity with essential developer tools — all in one place.
      </p>
      <div className="tool-grid">
        {tools.map((tool) => (
          <Link key={tool.name} to={tool.path} className="tool-card">
            <h3>{tool.emoji} {tool.name}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
