# Logger - Test Suite

Complete test suite for the Logger application using Node.js built-in testing framework.

## Test Structure

The test suite is organized into 6 test files covering all modules:

### 1. `date.test.js` - Date Utilities Tests
Tests for date and timestamp functions:
- `getTodayDate()` - Returns date in YYYY-MM-DD format
  - Format validation
  - Correct date retrieval
  - Type checking
  - Date component validation

- `getTimeStamp()` - Returns ISO 8601 timestamp
  - Format validation
  - Type checking
  - Date parsing validity
  - Timezone indicator
  - Milliseconds precision

### 2. `csv.test.js` - CSV Utilities Tests
Tests for CSV row formatting:
- `toCSVRow()` - Converts values to CSV format
  - Simple values conversion
  - Null/undefined handling
  - Empty object handling
  - Object to JSON conversion
  - Comma quoting
  - Newline handling
  - Number and boolean conversion
  - Complex object handling
  - Quote removal

### 3. `callerInfo.test.js` - Caller Info Tests
Tests for caller information extraction:
- `getCallerInfo()` - Extracts file and line information
  - Object structure validation
  - Property type checking
  - Valid filename extraction
  - Line number validation
  - Error handling

### 4. `logToConsole.test.js` - Console Logging Tests
Tests for console output with color formatting:
- `logToConsole()` - Displays formatted logs
  - Console output verification
  - Tag inclusion
  - Message inclusion
  - Level handling (INFO, WARNING, ERROR, DEBUG)
  - Metadata handling
  - JSON formatting
  - Color coding

### 5. `writer.test.js` - Writer Utilities Tests (NEW)
Tests for file stream writing:
- `createWriter()` - Creates file stream writer
  - Method availability (write, close)
  - File creation and writing
  - Append mode functionality
  - Stream closing
  - Multiple writes handling
  - Absolute path support

### 6. `createLogger.test.js` - Logger Creation Tests
Tests for logger factory and logging methods:
- `createLogger()` - Creates logger instance
  - Logger creation with default options
  - Custom directory support
  - Method availability
  - Directory creation
  - Absolute path handling
  - callerInfo option (true/false) - NEW
  - Logger with caller information disabled - NEW

- Logger methods: `info()`, `warn()`, `error()`, `debug()`
  - Log file creation
  - Content writing
  - CSV format compliance
  - Metadata support
  - Caller information inclusion
  - Caller information optional
  - Multiple log handling
  - ISO 8601 timestamp inclusion

- Log file organization
  - Daily file creation
  - Date-based naming
  - Append functionality

## Running Tests

### Run all tests
```bash
npm test
```

### Run with verbose output
```bash
npm run test:verbose
```

### Run specific test file
```bash
node --test tests/date.test.js
```

## Test Coverage

- **Date Utilities**: 9 tests
- **CSV Utilities**: 14 tests
- **Caller Info**: 7 tests
- **Console Logging**: 13 tests
- **Writer Utilities**: 6 tests (NEW)
- **Logger Creation**: 29 tests (updated with new tests)

**Total: 79 tests**

## Test Results

All tests verify:
- ✅ Correct input/output handling
- ✅ Type validation
- ✅ Edge case handling
- ✅ File system operations
- ✅ Async operations
- ✅ Error handling
- ✅ CSV format compliance
- ✅ Timestamp accuracy
- ✅ Metadata support
- ✅ Directory creation and management
- ✅ Stream management (NEW)
- ✅ Optional caller information (NEW)

## Notes

- Tests use Node.js built-in `assert` module and `test` function
- Test files use ES6 modules (matching project type)
- Async tests use Promises
- Temporary test directory `.test-logs` is created and cleaned up automatically
- Tests wait for asynchronous operations (50-100ms timeout for file operations)

