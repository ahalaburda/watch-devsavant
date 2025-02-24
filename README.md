# Wall Watches

## Overview

The Wall Watches application is a React-based project that displays two watches using SVG graphics. The first watch shows the current time, while the second watch displays a time offset by 1 hour, 15 minutes, and 30 seconds.

## Features

- Real-time time updates using the JavaScript `Date` object.
- SVG rendering for a clean and scalable visual representation of the watches.
- User input handling for setting the time with validation.
- Accurate time calculations for the watch hands based on polar coordinates.

## Run
```
    npm install && npm run dev
```

## Implementation Details

### 1. Time Management

The application uses the JavaScript `Date` object to manage time, updating every second with `setInterval` in a `useEffect` hook. This ensures that the watches reflect the current time accurately.

### 2. Watch Rendering

The watches are rendered using SVG, with mathematical calculations to position the hour, minute, and second hands based on the current time. The angles for the hands are calculated as follows:

- **Hour hand:** `(hours % 12 * 30 + minutes * 0.5) - 90`
- **Minute hand:** `(minutes * 6 + seconds * 0.1) - 90`
- **Second hand:** `(seconds * 6) - 90`

The `-90` adjustment is necessary to align the 0° position to the top of the clock face.

### 3. User Input Handling

User input is captured through a controlled form input, with validation implemented using regex. The input string is parsed into hours, minutes, and seconds, and a new `Date` object is created accordingly.

### 4. Second Watch Offset

The second watch is derived from the first watch's time, with an additional offset of 1 hour, 15 minutes, and 30 seconds. This ensures that both watches remain synchronized in real-time.

## Alternative Approaches

- **Canvas Instead of SVG:** While using the HTML Canvas API could offer better performance for complex animations, it would complicate the code and reduce accessibility.
- **CSS Transforms for Hand Rotation:** This method could simplify the code by avoiding trigonometric calculations, but it may lead to less precise control over the appearance of the watch hands.

## Conclusion

The current implementation balances code readability, performance, and user experience. Future improvements could include unit tests, enhanced input validation, accessibility features, and customization options.