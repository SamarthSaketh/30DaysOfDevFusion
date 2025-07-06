import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setEncoded(btoa(text));
    setDecoded("");
    setError("");
  };

  const handleDecode = () => {
    try {
      setDecoded(atob(text));
      setEncoded("");
      setError("");
    } catch {
      setError("❌ Invalid Base64 input");
      setDecoded("");
      setEncoded("");
    }
  };

  const clear = () => {
    setText("");
    setEncoded("");
    setDecoded("");
    setError("");
  };

  return (
    <ToolLayout title="🧪 Base64 Encoder / Decoder">
      <textarea
        placeholder="Enter text or Base64 here..."
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <button onClick={handleEncode}>🔐 Encode</button>
        <button onClick={handleDecode}>🔓 Decode</button>
        <button onClick={clear}>🧹 Clear</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {encoded && (
        <>
          <h3>✅ Encoded:</h3>
          <pre className="output-box">{encoded}</pre>
          <CopyToClipboard text={encoded}>
            <button>📋 Copy Encoded</button>
          </CopyToClipboard>
        </>
      )}

      {decoded && (
        <>
          <h3>✅ Decoded:</h3>
          <pre className="output-box">{decoded}</pre>
          <CopyToClipboard text={decoded}>
            <button>📋 Copy Decoded</button>
          </CopyToClipboard>
        </>
      )}
    </ToolLayout>
  );
}
