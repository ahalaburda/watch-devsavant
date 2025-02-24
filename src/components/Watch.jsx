import PropTypes from "prop-types";

/**
 * Watch Face Component
 * Renders an SVG watch face with hour, minute, and second hands
 * @param {Object} props - Component props
 * @param {Date} props.time - Time to display on the watch
 */

export default function WatchFace2({ time }) {
  const size = 200;
  const center = size / 2;
  const radius = size * 0.4;

  // // Calculate hand angles
  const secondAngle = time.getSeconds() * 6 - 90; // 6 degrees per second, -90 to start from 12 o'clock
  const minuteAngle = time.getMinutes() * 6 + time.getSeconds() * 0.1 - 90; // 6 degrees per minute + 0.1 degree per second
  const hourAngle = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5 - 90; // 30 degrees per hour + 0.5 degree per minute

  /**
   * Calculate the endpoint of a hand based on its angle and length
   * @param {number} angle - Angle in degrees
   * @param {number} length - Length of the hand relative to the radius
   * @returns {Object} x and y coordinates of the endpoint
   */
  const calculateHandEndpoint = (angle, length) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * length * Math.cos(radians),
      y: center + radius * length * Math.sin(radians),
    };
  };

  // Calculate hand endpoints
  const hourHand = calculateHandEndpoint(hourAngle, 0.5);
  const minuteHand = calculateHandEndpoint(minuteAngle, 0.7);
  const secondHand = calculateHandEndpoint(secondAngle, 0.85);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* CIRCLE */}
      <path
        d="M191.567 99.945l-.13-4.792-.374-4.782-.625-4.758-.875-4.714-1.121-4.664-1.36-4.598-1.601-4.524-1.836-4.43-2.067-4.331-2.289-4.215-2.504-4.09-2.718-3.953-2.918-3.805-3.117-3.648-3.301-3.477-3.48-3.3-3.645-3.118-3.809-2.918-3.953-2.719-4.09-2.507-4.215-2.286-4.328-2.066-4.43-1.836-4.523-1.601-4.598-1.364-4.664-1.117-4.718-.875-4.754-.625-4.782-.379-4.797-.125-4.792.125-4.782.379-4.758.625-4.714.875-4.664 1.117-4.598 1.364-4.524 1.601-4.43 1.836-4.331 2.066-4.215 2.286-4.09 2.507-3.953 2.72-3.805 2.917-3.648 3.117-3.477 3.301-3.3 3.477-3.118 3.648-2.918 3.805-2.719 3.953-2.507 4.09-2.286 4.215-2.066 4.332-1.836 4.43-1.601 4.523-1.364 4.598-1.117 4.664-.875 4.714-.625 4.758-.379 4.782-.125 4.792.125 4.797.379 4.782.625 4.754.875 4.718 1.117 4.664 1.364 4.598 1.601 4.523 1.836 4.43 2.066 4.328 2.286 4.215 2.507 4.09 2.72 3.953 2.917 3.809 3.117 3.644 3.301 3.48 3.477 3.302 3.648 3.117 3.805 2.918 3.953 2.718 4.09 2.504 4.215 2.29 4.332 2.066 4.43 1.836 4.523 1.601 4.598 1.36 4.664 1.12 4.714.876 4.758.625 4.782.375 4.792.129 4.797-.13 4.782-.374 4.754-.625 4.718-.875 4.664-1.121 4.598-1.36 4.523-1.601 4.43-1.836 4.328-2.067 4.215-2.289 4.09-2.504 3.953-2.718 3.809-2.918 3.644-3.117 3.48-3.301 3.302-3.48 3.117-3.645 2.918-3.809 2.718-3.953 2.504-4.09 2.29-4.215 2.066-4.328 1.836-4.43 1.601-4.523 1.36-4.598 1.12-4.664.876-4.718.625-4.754.375-4.782.125-4.886"
        fill="none"
        strokeWidth={2.66525}
        stroke="#000"
      />
      {/* WATCH SECONDS */}
      <path
        d="M108.567 17.941l.476-4.554M117.09 19.293l.953-4.48M125.426 21.527l1.418-4.359M133.485 24.621l1.863-4.187M141.176 28.54l2.29-3.97M148.414 33.238l2.692-3.707M155.121 38.672l3.067-3.406M161.223 44.774l3.406-3.067M166.657 51.48l3.703-2.69M171.356 58.719l3.969-2.29M175.274 66.41l4.183-1.863M178.368 74.465l4.355-1.414M180.602 82.805l4.48-.953M181.95 91.328l4.558-.48M182.403 99.945h4.582M181.95 108.567l4.558.476M180.602 117.09l4.48.953M178.368 125.426l4.355 1.418M175.274 133.485l4.183 1.863M171.356 141.176l3.969 2.29M166.657 148.414l3.703 2.692M161.223 155.121l3.406 3.067M155.121 161.223l3.067 3.406M148.414 166.657l2.692 3.703M141.176 171.356l2.29 3.969M133.485 175.274l1.863 4.183M125.426 178.368l1.418 4.355M117.09 180.602l.953 4.48M108.567 181.95l.476 4.558M99.945 182.403v4.582M91.328 181.95l-.48 4.558M82.805 180.602l-.953 4.48M74.465 178.368l-1.414 4.355M66.41 175.274l-1.863 4.183M58.719 171.356l-2.29 3.969M51.48 166.657l-2.69 3.703M44.774 161.223l-3.067 3.406M38.672 155.121l-3.406 3.067M33.238 148.414l-3.707 2.692M28.54 141.176l-3.97 2.29M24.621 133.485l-4.187 1.863M21.527 125.426l-4.359 1.418M19.293 117.09l-4.48.953M17.941 108.567l-4.554.476M17.492 99.945H12.91M17.941 91.328l-4.554-.48M19.293 82.805l-4.48-.953M21.527 74.465l-4.359-1.414M24.621 66.41l-4.187-1.863M28.54 58.719l-3.97-2.29M33.238 51.48l-3.707-2.69M38.672 44.774l-3.406-3.067M44.774 38.672l-3.067-3.406M51.48 33.238l-2.69-3.707M58.719 28.54l-2.29-3.97M66.41 24.621l-1.863-4.187M74.465 21.527l-1.414-4.359M82.805 19.293l-.953-4.48M91.328 17.941l-.48-4.554M99.945 17.492V12.91"
        fill="none"
        strokeWidth={2.1322}
        stroke="#000"
      />
      {/* WATCH HOURS */}
      <path
        d="M134.305 40.438l9.16-15.868M159.453 65.59l15.872-9.16M168.66 99.945h18.325M159.453 134.305l15.872 9.16M134.305 159.453l9.16 15.872M99.945 168.66v18.325M65.59 159.453l-9.16 15.872M40.438 134.305l-15.868 9.16M31.234 99.945H12.91M40.438 65.59L24.57 56.43M65.59 40.438L56.43 24.57M99.945 31.234V12.91"
        fill="none"
        strokeWidth={3.1982999999999997}
        stroke="#000"
      />
      {/* HOUR HAND */}
      <line
        x1={center}
        y1={center}
        x2={hourHand.x}
        y2={hourHand.y}
        fill="none"
        strokeWidth={5.3305}
        stroke="#000"
      />

      {/* MINUTE HAND */}
      <line
        x1={center}
        y1={center}
        x2={minuteHand.x}
        y2={minuteHand.y}
        fill="none"
        strokeWidth={3.1982999999999997}
        stroke="#000"
      />
      {/* SECOND HAND */}
      <line
        x1={center}
        y1={center}
        x2={secondHand.x}
        y2={secondHand.y}
        fill="none"
        strokeWidth={2.1322}
        stroke="#000"
      />
    </svg>
  );
}

WatchFace2.propTypes = {
  time: PropTypes.instanceOf(Date),
};
