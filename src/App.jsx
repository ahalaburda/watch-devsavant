import { useState, useEffect } from "react";
import Watch from "./components/Watch";
import "./App.css";

/**
 * Watches App
 * This application renders two watches using SVG.
 * The first watch shows the current time or a time set by the user.
 * The second watch shows the time of the first watch plus 1 hour, 15 minutes, and 30 seconds.
 */
function App() {
  const [time, setTime] = useState(new Date());
  const [inputTime, setInputTime] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // To update the time every second if the user isn't editing
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime);
        newTime.setSeconds(newTime.getSeconds() + 1);
        return newTime;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setInputTime(formatTime(time));
    }
  }, [time, isEditing]);
  /**
   * Format time as HH:MM:SS
   * @param {Date} date - Date object to format
   * @returns {string} Formatted time string
   */
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  /**
   * Handle user input change for the first watch
   * @param {Event} event - Input change event
   */
  const handleInputChange = (event) => {
    let value = event.target.value;
  
    // Allow only numbers
    value = value.replace(/\D/g, '');
  
    // Add colons at the right places
    if (value.length >= 3) {
      value = value.slice(0, 2) + ':' + value.slice(2);
    }
    if (value.length >= 6) {
      value = value.slice(0, 5) + ':' + value.slice(5, 8);
    }
  
    // Update the input state and check the validity
    setInputTime(value);
    setIsEditing(true); // User is editing the time
  
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    const match = value.match(timePattern);
  
    if (match) {
      const [hours, minutes, seconds] = match;
      const newTime = new Date();
      newTime.setHours(parseInt(hours, 10));
      newTime.setMinutes(parseInt(minutes, 10));
      newTime.setSeconds(parseInt(seconds, 10));
  
      setTime(newTime);
      setError('');
    } else {
      setError('Invalid time format. Use HH:MM:SS.');
    }
  };
  

  /**
   * Get the time for the second watch
   * @returns {Date} Date object with time for the second watch
   */
  const getSecondWatchTime = (
    additionalHours,
    additionalMinutes,
    additionalSeconds,
  ) => {
    const secondWatchTime = new Date(time);
    secondWatchTime.setHours(secondWatchTime.getHours() + additionalHours);
    secondWatchTime.setMinutes(
      secondWatchTime.getMinutes() + additionalMinutes,
    );
    secondWatchTime.setSeconds(
      secondWatchTime.getSeconds() + additionalSeconds,
    );
    return secondWatchTime;
  };

  return (
    <div className="app">
      <div className="watches-container">
        <div className="watch-container">
          <h2>Current Time</h2>
          <Watch time={time} />
          <input
            type="text"
            value={inputTime}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)} // Stop editing when input loses focus
          />
          {error && <p className="error">{error}</p>}
        </div>

        <div className="watch-container">
          <h2>(+1h +15m +30s)</h2>
          <Watch time={getSecondWatchTime(1, 15, 30)} />
          <input
            type="text"
            value={formatTime(getSecondWatchTime(1, 15, 30))}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;
