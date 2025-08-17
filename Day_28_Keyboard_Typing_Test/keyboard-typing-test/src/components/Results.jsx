import React from "react";

function Results({ stats, restart }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>✅ Test Completed!</h2>
      <p>WPM: {stats.wpm}</p>
      <p>Accuracy: {stats.accuracy}%</p>
      <p>Errors: {stats.errors}</p>
      <button onClick={restart}>🔄 Restart Test</button>
    </div>
  );
}

export default Results;
