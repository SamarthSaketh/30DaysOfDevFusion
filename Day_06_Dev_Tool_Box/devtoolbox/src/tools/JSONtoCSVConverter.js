import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function JSONtoCSVConverter() {
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");

  const convertToCSV = () => {
    try {
      const objArray = JSON.parse(json);
      if (!Array.isArray(objArray)) throw new Error("Must be an array of objects");

      const headers = Object.keys(objArray[0]);
      const csvRows = [
        headers.join(","),
        ...objArray.map(obj => headers.map(h => `"${obj[h] ?? ""}"`).join(","))
      ];
      setCsv(csvRows.join("\n"));
      setError("");
    } catch (e) {
      setError("❌ Invalid JSON or not an array of objects");
      setCsv("");
    }
  };

  const clear = () => {
    setJson("");
    setCsv("");
    setError("");
  };

  return (
    <ToolLayout title="📤 JSON → CSV Converter">
      <textarea
        rows={8}
        className="tool-textarea"
        placeholder='Paste JSON array here...'
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={convertToCSV}>🔁 Convert</button>
        <button onClick={clear} style={{ marginLeft: "0.5rem" }}>🧹 Clear</button>
      </div>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      {csv && (
        <>
          <h3 style={{ marginTop: "1rem" }}>✅ CSV Output:</h3>
          <pre className="output-box">{csv}</pre>
          <CopyToClipboard text={csv}>
            <button style={{ marginTop: "0.5rem" }}>📋 Copy CSV</button>
          </CopyToClipboard>
        </>
      )}
    </ToolLayout>
  );
}
