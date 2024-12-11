import React, { useState, useEffect } from 'react';

const Timer = () => {
  // State to keep track of time
  const [time, setTime] = useState(0);

  // State to toggle the timer
  const [isRunning, setIsRunning] = useState(false);

  // Effect to handle timer logic
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    // Cleanup function to stop the timer when the component unmounts
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React Hooks Example</h1>
      <h2>Time: {time} seconds</h2>
      <button onClick={() => setIsRunning(!isRunning)} style={{ marginRight: '10px' }}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setTime(0)} disabled={isRunning}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
