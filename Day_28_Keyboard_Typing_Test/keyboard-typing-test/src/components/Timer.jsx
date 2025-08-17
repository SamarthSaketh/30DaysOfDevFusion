import React, { useEffect } from "react";

function Timer({ timeLeft, started, setStarted, setTimeLeft, duration }) {
  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [started, timeLeft]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return <h2>⏳ Time Left: {timeLeft}s</h2>;
}

export default Timer;
