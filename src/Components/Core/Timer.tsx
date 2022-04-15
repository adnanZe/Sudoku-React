import React from "react";

interface TimerProps {
  onStartTimer(): void;
  time: number;
  timeOn: boolean;
}

function Timer(props: TimerProps) {
  const { onStartTimer, time, timeOn } = props;
  return (
    <section className="timer" onClick={onStartTimer}>
      <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
      {timeOn ? (
        <i className="fa-solid fa-pause"></i>
      ) : (
        <i className="fa-solid fa-play"></i>
      )}
    </section>
  );
}

export default Timer;
