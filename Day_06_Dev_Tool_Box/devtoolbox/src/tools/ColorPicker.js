import { useState } from "react";
import ToolLayout from "../components/ToolLayouts.jsx";
import "../ToolStyles.css";

export default function ColorPicker() {
  const [color, setColor] = useState("#3498db");

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
        case g: h = ((b - r) / d + 2); break;
        case b: h = ((r - g) / d + 4); break;
      }
      h *= 60;
    }

    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <ToolLayout title="🎨 Color Picker">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: "100px", height: "50px", border: "none", marginBottom: "1rem" }}
      />
      <div className="output-box">
        <p><strong>HEX:</strong> {color}</p>
        <p><strong>RGB:</strong> {hexToRgb(color)}</p>
        <p><strong>HSL:</strong> {hexToHsl(color)}</p>
      </div>
    </ToolLayout>
  );
}
