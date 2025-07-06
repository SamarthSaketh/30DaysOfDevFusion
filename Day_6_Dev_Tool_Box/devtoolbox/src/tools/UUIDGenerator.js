import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState(uuidv4());

  const generateUUID = () => {
    setUuid(uuidv4());
  };

  return (
    <ToolLayout title="🔑 UUID Generator">
      <div className="output-box">{uuid}</div>

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={generateUUID}>🔄 Generate New UUID</button>
        <CopyToClipboard text={uuid}>
          <button style={{ marginLeft: "0.5rem" }}>📋 Copy to Clipboard</button>
        </CopyToClipboard>
      </div>
    </ToolLayout>
  );
}
