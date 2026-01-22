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
npm install logger-js
```

Note: This project uses only Node.js built-in modules and has no external dependencies.

## Project Structure

```
logger/
├── createLogger.js       # Logger factory function
├── index.js              # Main entry point
├── package.json          # Project dependencies and configuration
└── utils/
    ├── csv.js            # CSV format utilities
    └── date.js           # Date and timestamp handling utilities
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

## Dependencies

This project has no external dependencies. It uses only native Node.js modules.

## Main Modules

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

## Licencia

MIT
