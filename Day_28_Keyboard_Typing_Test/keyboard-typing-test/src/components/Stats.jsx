import React from "react";

function Stats({ stats }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>WPM: {stats.wpm}</h3>
      <h3>Accuracy: {stats.accuracy}%</h3>
      <h3>Errors: {stats.errors}</h3>
    </div>
  );
}

export default Stats;
