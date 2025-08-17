import React, { useRef, useEffect } from "react";

function TextDisplay({ text, input }) {
  const containerRef = useRef(null);
  const words = text.split(" ");
  const inputWords = input.trim().split(" ");

  // Scroll so the active word stays in view
  useEffect(() => {
    if (containerRef.current) {
      const active = containerRef.current.querySelector(".active-word");
      if (active) {
        active.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [input]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "180px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        textAlign: "left",
        lineHeight: "2",
        fontSize: "20px",
        background: "transparent"
      }}
    >
      {words.map((word, i) => {
        let className = "";
        if (i < inputWords.length) {
          className =
            inputWords[i] === word ? "correct-word" : "incorrect-word";
        }
        if (i === inputWords.length) {
          className = "active-word";
        }
        return (
          <span key={i} className={className} style={{ marginRight: "10px" }}>
            {word}
          </span>
        );
      })}
    </div>
  );
}

export default TextDisplay;
