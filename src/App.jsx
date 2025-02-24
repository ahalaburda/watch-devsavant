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

  // To update the time every second
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

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Validate input format using regex
      const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
      if (!timeRegex.test(inputTime)) {
        throw new Error(
          "Invalid time format. Please use HH:MM:SS (e.g., 15:30:45)",
        );
      }

      // Parse input time
      const [hours, minutes, seconds] = inputTime.split(":").map(Number);

      // Create new date with input time
      const newTime = new Date();
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      newTime.setSeconds(seconds);

      // Update time state
      setTime(newTime);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app">
      <div className="watches-container">
        <div className="watch-container">
          <h2>Current Time</h2>
          <Watch time={time} />
          <p>Time: {formatTime(time)}</p>
        </div>

        <div className="watch-container">
          <h2>(+1h +15m +30s)</h2>
          <Watch time={getSecondWatchTime(1, 15, 30)} />
          <p>Time: {formatTime(getSecondWatchTime(1, 15, 30))}</p>
        </div>
      </div>

      <div className="time-input">
        <form onSubmit={handleSubmit}>
          <label htmlFor="timeInput">Set Time (HH:MM:SS): </label>
          <input
            id="timeInput"
            type="text"
            value={inputTime}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
              let formattedValue = "";

              if (value.length > 0) {
                formattedValue = value.slice(0, 2);
                if (value.length > 2) {
                  formattedValue += ":" + value.slice(2, 4);
                  if (value.length > 4) {
                    formattedValue += ":" + value.slice(4, 6);
                  }
                }
              }

              // Limit to 6 digits total
              if (value.length <= 6) {
                handleInputChange({ target: { value: formattedValue } });
              }
            }}
            placeholder="e.g., 14:30:00"
            pattern="([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
            title="Time format: HH:MM:SS (e.g., 15:30:45)"
            maxLength={8}
          />
          <button
            type="submit"
            disabled={
              !/^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(inputTime)
            }
          >
            Set Time
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
