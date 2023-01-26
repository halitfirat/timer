import React, { useEffect, useState } from "react";

export const Timer: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [timerID, setTimerID] = useState<NodeJS.Timer | null>(null);

  // For debugging purposes
  useEffect(() => {
    console.log("-- Timer timer -", timer);
  }, [timer]);

  const onSetTimeout = (timerId: NodeJS.Timer, timer: number) => {
    setTimeout(() => {
      clearInterval(timerId);
      setTimerID(null);
      resetTimerInput();
    }, timer * 1000);
  };

  const resetTimerInput = () => {
    (document.getElementById("timer") as HTMLInputElement).value = "";
  };

  const start = () => {
    if (timerID === null) {
      const timerid = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      console.log("-- Timer timer", timer);
      onSetTimeout(timerid, timer);

      setTimerID(timerid);
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
  };

  const onTimerChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const timer = +e.currentTarget.value;
    setTimer(timer);

    if (timerID !== null) {
      onSetTimeout(timerID, timer);
    }
  };

  const format = (timer: number) => {
    return new Date(timer * 1000).toISOString().slice(11, 19);
  };

  return (
    <div>
      {format(timer)}
      <div>
        <input id="timer" type="text" onChange={onTimerChange} />
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset </button>
      </div>
    </div>
  );
};
