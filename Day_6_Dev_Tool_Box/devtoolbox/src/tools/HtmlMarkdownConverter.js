import { useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function HtmlMarkdownConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("htmlToMarkdown");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      if (!input.trim()) {
        setError("❌ Please enter some input.");
        setOutput("");
        return;
      }

      if (mode === "htmlToMarkdown") {
        if (!/<[a-z][\s\S]*>/i.test(input)) {
          throw new Error("Invalid HTML (missing tags like <p>, <div>, etc.)");
        }
        const turndownService = new TurndownService();
        setOutput(turndownService.turndown(input));
      } else {
        if (/<[a-z][\s\S]*>/i.test(input)) {
          throw new Error("Invalid Markdown (looks like HTML)");
        }
        setOutput(marked.parse(input));
      }

      setError("");
    } catch (e) {
      setOutput("");
      setError(`❌ Conversion error: ${e.message}`);
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout title="🧾 HTML ↔ Markdown Converter">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="tool-select"
      >
        <option value="htmlToMarkdown">HTML → Markdown</option>
        <option value="markdownToHtml">Markdown → HTML</option>
      </select>

      <textarea
        rows={8}
        placeholder="Enter HTML or Markdown here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="tool-textarea"
      ></textarea>

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={convert}>🔁 Convert</button>
        <button onClick={clear} style={{ marginLeft: "0.5rem" }}>🧹 Clear</button>
      </div>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      <h3 style={{ marginTop: "1rem" }}>🧾 Output:</h3>
      <pre className="output-box">{output}</pre>
    </ToolLayout>
  );
}
