import { useState } from "react";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function FileToBase64() {
  const [base64, setBase64] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBase64(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout title="📁 File → Base64 Encoder">
      <input type="file" onChange={handleFile} />
      {base64 && (
        <>
          <h3 style={{ marginTop: "1rem" }}>✅ Base64 Output:</h3>
          <pre className="output-box" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {base64}
          </pre>
        </>
      )}
    </ToolLayout>
  );
}
