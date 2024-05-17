import { useEffect, useRef, useState } from "react";
import "./solution.css";

const padDigits = (digit: number) => `${digit}`.padStart(2, "0");

export default function StopWatch() {
  const [paused, setPaused] = useState(true);
  const [elapsed, setElapsed] = useState<number>(0);

  const interval = useRef<number>();

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1);
    setPaused(false);
  };
  const stopTimer = () => {
    clearInterval(interval.current);
    setPaused(true);
  };

  const resetTimer = () => {
    clearInterval(interval.current);
    setElapsed(0);
    setPaused(true);
  };

  const seconds = Math.floor((elapsed / 1000) % 60);
  const miliseconds = Math.floor((elapsed / 10) % 100);

  const datetime = `${padDigits(seconds)}:${padDigits(miliseconds)}`;

  return (
    <div className="sw__container">
      {/* Watches */}
      <div className="sw__watches">
        <h1>
          <time dateTime={datetime}>{datetime}</time>
        </h1>

        <div className="sw__clock__container" aria-hidden>
          <div className="sw__clock">
            <div style={{ transform: `rotateZ(${(seconds / 60) * 360}deg)` }} />
          </div>
          <div className="sw__clock small">
            <div
              style={{ transform: `rotateZ(${(miliseconds / 100) * 360}deg)` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sw__controls">
        <button
          type="button"
          aria-label="start timer"
          onClick={!paused ? stopTimer : startTimer}
        >
          {!paused ? "Stop" : "Start"}
        </button>
        <button
          className="sw__controls__reset-button"
          type="button"
          aria-label="reset timer"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
