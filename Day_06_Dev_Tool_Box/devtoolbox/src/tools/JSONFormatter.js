import { useState } from "react";
import jsonlint from "jsonlint-mod";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      const parsed = jsonlint.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout title="🧩 JSON Formatter & Validator">
      <textarea
        rows={10}
        className="tool-textarea"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={formatJSON}>✅ Validate & Format</button>
        <button onClick={clear} style={{ marginLeft: "0.5rem" }}>
          🧹 Clear
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>❌ {error}</p>}

      {output && (
        <>
          <h3 style={{ marginTop: "1rem" }}>✅ Formatted JSON:</h3>
          <pre className="output-box">{output}</pre>
          <CopyToClipboard text={output}>
            <button style={{ marginTop: "0.5rem" }}>📋 Copy to Clipboard</button>
          </CopyToClipboard>
        </>
      )}
    </ToolLayout>
  );
}
