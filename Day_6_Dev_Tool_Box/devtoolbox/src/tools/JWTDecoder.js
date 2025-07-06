import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
      setError("");
    } catch (e) {
      setError("❌ Invalid JWT Token");
      setDecoded(null);
    }
  };

  const clear = () => {
    setToken("");
    setDecoded(null);
    setError("");
  };

  return (
    <ToolLayout title="🔐 JWT Decoder">
      <textarea
        rows={6}
        className="tool-textarea"
        placeholder="Paste your JWT token here..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
      ></textarea>

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={handleDecode}>Decode</button>
        <button onClick={clear} style={{ marginLeft: "0.5rem" }}>🧹 Clear</button>
      </div>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      {decoded && (
        <>
          <h3 style={{ marginTop: "1rem" }}>✅ Decoded Payload:</h3>
          <pre className="output-box">{JSON.stringify(decoded, null, 2)}</pre>
          <CopyToClipboard text={JSON.stringify(decoded, null, 2)}>
            <button style={{ marginTop: "0.5rem" }}>📋 Copy JSON</button>
          </CopyToClipboard>
        </>
      )}
    </ToolLayout>
  );
}
