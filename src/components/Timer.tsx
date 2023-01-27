import React, { useState } from "react";

export const Timer: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [timerID, setTimerID] = useState<NodeJS.Timer | null>(null);
  const [timerInputDisabled, setTimerInputDisabled] = useState<boolean>(false);

  const resetTimerInput = () => {
    (document.getElementById("timer") as HTMLInputElement).value = "";
  };

  const start = () => {
    if (timerID === null) {
      const timerid = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timerid);
        setTimerID(null);
        resetTimerInput();
        setTimerInputDisabled(false);
      }, timer * 1000);

      setTimerID(timerid);
      setTimerInputDisabled(true);
    }
  };

  const stop = () => {
    if (timerID !== null) {
      clearInterval(timerID);
      setTimerID(null);
    }
  };

  const reset = () => {
    if (timerID !== null) {
      clearInterval(timerID);
    }

    setTimer(0);
    resetTimerInput();
    setTimerID(null);
    setTimerInputDisabled(false);
  };

  const onTimerChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const timer = +e.currentTarget.value;
    setTimer(timer);
  };

  const format = (timer: number) => {
    return new Date(timer * 1000).toISOString().slice(11, 19);
  };

  return (
    <div>
      {format(timer)}
      <div>
        <div>
          <input
            id="timer"
            type="text"
            onChange={onTimerChange}
            disabled={timerInputDisabled ? true : false}
          />
        </div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset </button>
      </div>
    </div>
  );
};
