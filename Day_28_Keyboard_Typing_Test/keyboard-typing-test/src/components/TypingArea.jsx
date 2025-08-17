import React from "react";

function TypingArea({ input, setInput, text, started, setStarted, stats, setStats, timeLeft }) {
  const handleChange = (e) => {
    if (!started) setStarted(true);
    const val = e.target.value;
    setInput(val);

    const correctChars = val.split("").filter((ch, i) => ch === text[i]).length;
    const errors = val.length - correctChars;
    const words = val.trim().split(" ").length;

    const elapsed = 60 - timeLeft;
    const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
    const accuracy = ((correctChars / val.length) * 100 || 0).toFixed(1);

    setStats({ wpm, accuracy, errors });
  };

  return (
    <textarea
      value={input}
      onChange={handleChange}
      disabled={timeLeft === 0}
      rows="5"
      cols="70"
      placeholder="Start typing here..."
      style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
    />
  );
}

export default TypingArea;
