import { useState } from "react";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, "g");
      const result = text.match(regex);
      setMatches(result || []);
      setError("");
    } catch (e) {
      setError("❌ Invalid Regular Expression");
      setMatches([]);
    }
  };

  const clear = () => {
    setPattern("");
    setText("");
    setMatches([]);
    setError("");
  };

  return (
    <ToolLayout title="🔍 Regex Tester">
      <input
        type="text"
        placeholder="Enter RegExp pattern (e.g. \\b\\w{4}\\b)"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        className="tool-textarea"
        style={{ marginBottom: "0.5rem" }}
      />

      <textarea
        rows={6}
        placeholder="Enter text to test against..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="tool-textarea"
      />

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={testRegex}>▶️ Test</button>
        <button onClick={clear} style={{ marginLeft: "0.5rem" }}>
          🧹 Clear
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      {matches.length > 0 && (
        <>
          <h3 style={{ marginTop: "1rem" }}>✅ Matches Found:</h3>
          <ul className="output-box">
            {matches.map((match, index) => (
              <li key={index}>
                <code>{match}</code>
              </li>
            ))}
          </ul>
        </>
      )}

      {matches.length === 0 && !error && text && (
        <p style={{ marginTop: "1rem" }}>⚠️ No matches found for this pattern.</p>
      )}
    </ToolLayout>
  );
}
