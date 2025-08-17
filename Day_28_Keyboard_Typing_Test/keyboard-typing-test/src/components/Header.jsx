import React from "react";

function Header({ duration, setDuration, difficulty, setDifficulty, darkMode, setDarkMode }) {
  return (
    <div className="header-container" style={{ marginBottom: "20px" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: darkMode ? "#222" : "#1976d2",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold" }}>⚡ Typing Master</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: darkMode ? "#f1f1f1" : "#333",
            color: darkMode ? "#000" : "#fff",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      {/* Energetic sentence */}
      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
          fontSize: "18px",
          fontWeight: "600",
          color: darkMode ? "#f1f1f1" : "#333",
        }}
      >
        🚀 "Unleash your typing power – speed, accuracy, and focus in every keystroke!"
      </p>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label style={{ marginRight: "6px" }}>Duration:</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ padding: "5px", borderRadius: "6px" }}
          >
            <option value={30}>30s</option>
            <option value={60}>1 min</option>
            <option value={120}>2 min</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: "6px" }}>Mode:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ padding: "5px", borderRadius: "6px" }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="tricky">Tricky Spelling</option>
            <option value="story">Story Telling</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
