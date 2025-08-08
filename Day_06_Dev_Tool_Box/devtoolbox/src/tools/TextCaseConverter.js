import { useState } from "react";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const convertCase = (type) => {
    let result = "";
    switch (type) {
      case "UPPERCASE":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "Title Case":
        result = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
        break;
      case "camelCase":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "snake_case":
        result = text.toLowerCase().replace(/\s+/g, "_");
        break;
      default:
        result = text;
    }
    setOutput(result);
  };

  const clear = () => {
    setText("");
    setOutput("");
  };

  return (
    <ToolLayout title="📚 Text Case Converter">
      <textarea
        rows={4}
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="tool-textarea"
      />
      <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <button onClick={() => convertCase("UPPERCASE")}>🔠 UPPERCASE</button>
        <button onClick={() => convertCase("lowercase")}>🔡 lowercase</button>
        <button onClick={() => convertCase("Title Case")}>🔤 Title Case</button>
        <button onClick={() => convertCase("camelCase")}>🐫 camelCase</button>
        <button onClick={() => convertCase("snake_case")}>🐍 snake_case</button>
        <button onClick={clear}>🧹 Clear</button>
      </div>

      {output && (
        <>
          <h3 style={{ marginTop: "1rem" }}>✅ Converted:</h3>
          <pre className="output-box">{output}</pre>
        </>
      )}
    </ToolLayout>
  );
}
