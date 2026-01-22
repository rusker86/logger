# Logger

A simple and efficient logging system that saves records in CSV format with timestamps and severity levels.

## Description

Logger is a Node.js application that provides a lightweight and functional logging system. It records messages with different severity levels (INFO, WARN, ERROR, DEBUG) in CSV files organized by date.

## Features

- ✅ Logging with multiple levels (INFO, WARN, ERROR, DEBUG)
- ✅ CSV files organized by date
- ✅ Timestamps in ISO 8601 format
- ✅ Support for additional metadata
- ✅ Automatic directory handling
- ✅ Robust CSV format with special character escaping
- ✅ **NEW v2.0.0**: Colored console output with Chalk library
- ✅ **NEW v2.0.0**: Real-time console logging while writing to CSV files
- ✅ **NEW v2.0.0**: Color-coded log levels (blue for INFO, gray for DEBUG, yellow for WARNING, red for ERROR)
- ✅ **NEW v2.1.0**: Caller information tracking (file name and line number)

## Installation

### Prerequisites

- Node.js 12 or higher
- npm (included with Node.js)

### Steps

1. Clone or download this repository:

```bash
git clone <repository-url>
cd logger
```

2. Install dependencies (if any):

```bash
npm install
```

#### OR
```bash
npm install git+https://github.com/rusker86/logger.git
```

### Dependencies

The project uses the following dependencies:
- **chalk**: ^5.6.2 - For colored terminal output

## Testing

The project includes a comprehensive test suite using Node.js built-in testing framework.

### Running Tests

Run all tests:
```bash
npm test
```

Run tests with verbose output:
```bash
npm run test:verbose
```

### Test Coverage

The test suite includes **69 tests** covering:
- ✅ Date utilities (getTodayDate, getTimeStamp)
- ✅ CSV formatting (toCSVRow)
- ✅ Caller information extraction (getCallerInfo)
- ✅ Console logging with colors
- ✅ Logger creation and initialization
- ✅ All logging methods (info, warn, error, debug)
- ✅ File operations and organization
- ✅ Metadata handling
- ✅ Edge cases and error handling

See [tests/README.md](tests/README.md) for detailed test documentation.


## Project Structure

```
logger/
├── createLogger.js           # Logger factory function
├── index.js                  # Main entry point
├── package.json              # Project dependencies and configuration
└── utils/
    ├── csv.js                # CSV format utilities
    ├── date.js               # Date and timestamp handling utilities
    ├── logToConsole.js       # Console output with color formatting
    └── callerInfo.js         # Caller information extraction
```

## Usage

### Starting the application

```bash
npm run start
```

### Using the logger in your code

```javascript
import { logger } from "./index.js"

// Log information
logger.info("Server started")

// Log warnings
logger.warn("Unusual condition detected", { userId: 123 })

// Log errors
logger.error("An error occurred", { code: 500 })

// Log debug information
logger.debug("Variable x = 42", { variable: 42 })
```

### Method Signature

All logger methods accept a message and optional metadata:

```javascript
logger.info(message: string, meta?: object)
logger.warn(message: string, meta?: object)
logger.error(message: string, meta?: object)
logger.debug(message: string, meta?: object)
```

## Log Format

Logs are saved in CSV files in the `logs/` directory with the filename `YYYY-MM-DD.csv`.

Each line contains:
- **Timestamp**: Exact time in ISO 8601 format
- **Level**: [INFO], [WARN], [ERROR], or [DEBUG]
- **Message**: Descriptive text of the event
- **Metadata**: Additional data in JSON format (optional)

**Example:**
```
2026-01-22T15:30:45.123Z,[INFO],Server started,
2026-01-22T15:30:46.456Z,[WARN],Unusual condition detected,{"userId":123}
2026-01-22T15:30:47.789Z,[ERROR],An error occurred,{"code":500}
```
Console Output

Starting from v2.0.0, logs are displayed in the console with color coding for better visibility:

- 🔵 **[INFO]** - Blue
- 🟡 **[WARNING]** - Yellow  
- 🔴 **[ERROR]** - Red
- ⚫ **[DEBUG]** - Gray

Example console output:
```
[INFO], Server started,
[WARNING], Unusual condition detected, {"userId":123}
[ERROR], An error occurred, {"code":500}
```

Logs are simultaneously written to CSV files and displayed in the console with real-time color formatting
This project has no external dependencies. It uses only native Node.js modules.

## Main Modules

### utils/logToConsole.js
Utility for displaying logs in the terminal with color formatting using Chalk:
- Maps log levels to specific colors
- Automatically formats messages and metadata for console display
- Enhances log visibility with color-coded severity levels

### createLogger.js / index.js
Central module that exports the `logger` object with four logging levels. It manages the creation of daily log files and record writing.

### utils/csv.js
Utility for converting arrays of values to valid CSV format, with automatic handling of:
- Null or undefined values
- Objects (converted to JSON)
- Special characters (commas, quotes, line breaks)

### utils/date.js
Functions to get:
- `getTodayDate()`: Current date in YYYY-MM-DD format
- `getTimeStamp()`: Timestamp actual en formato ISO 8601

### utils/callerInfo.js
Extracts caller information from the call stack:
- `getCallerInfo()`: Returns an object with `file` and `line` properties
- Useful for debugging to identify the exact location where a log was called
- Returns `{file: string, line: number}`

## Licencia

MIT
