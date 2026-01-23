import assert from "assert"
import { test } from "node:test"
import fs from "fs"
import path from "path"
import { createLogger } from "../createLogger.js"
import { getTodayDate } from "../utils/date.js"

const testLogDir = ".test-logs"

// Cleanup helper
function cleanupTestDir() {
	if (fs.existsSync(testLogDir)) {
		const files = fs.readdirSync(testLogDir)
		files.forEach(file => {
			fs.unlinkSync(path.join(testLogDir, file))
		})
		fs.rmdirSync(testLogDir)
	}
}

test("Logger Creation", async (t) => {
	await t.test("should create logger with default log directory", () => {
		const logger = createLogger({})
		assert(logger !== null, "Logger should be created")
		cleanupTestDir()
	})

	await t.test("should create logger with custom log directory", () => {
		const logger = createLogger({ logDir: testLogDir })
		assert(fs.existsSync(testLogDir), "Custom log directory should be created")
		cleanupTestDir()
	})

	await t.test("should return object with logging methods", () => {
		const logger = createLogger({ logDir: testLogDir })
		assert(typeof logger.info === "function", "Should have info method")
		assert(typeof logger.warn === "function", "Should have warn method")
		assert(typeof logger.error === "function", "Should have error method")
		assert(typeof logger.debug === "function", "Should have debug method")
		cleanupTestDir()
	})

	await t.test("should create logs directory if it doesn't exist", () => {
		const logger = createLogger({ logDir: testLogDir })
		assert(fs.existsSync(testLogDir), "Logs directory should be created")
		cleanupTestDir()
	})

	await t.test("should use absolute path when provided", () => {
		const absolutePath = path.resolve(testLogDir)
		const logger = createLogger({ logDir: absolutePath })
		assert(fs.existsSync(absolutePath), "Should create logs at absolute path")
		cleanupTestDir()
	})

	await t.test("should support callerInfo option as true (default)", () => {
		const logger = createLogger({ logDir: testLogDir, callerInfo: true })
		assert(logger !== null, "Logger should be created with callerInfo enabled")
		cleanupTestDir()
	})

	await t.test("should support callerInfo option as false", () => {
		const logger = createLogger({ logDir: testLogDir, callerInfo: false })
		assert(logger !== null, "Logger should be created with callerInfo disabled")
		cleanupTestDir()
	})
})

test("Logger Methods", async (t) => {
	await t.test("info() should create a log file", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test info message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				assert(fs.existsSync(logFile), "Log file should be created")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("info() should write to log file", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test info message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes("[INFO]"), "Log should contain [INFO] level")
				assert(content.includes("Test info message"), "Log should contain message")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("warn() should write warning logs", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.warn("Test warning message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes("[WARNING]"), "Log should contain [WARNING] level")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("error() should write error logs", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.error("Test error message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes("[ERROR]"), "Log should contain [ERROR] level")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("debug() should write debug logs", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.debug("Test debug message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes("[DEBUG]"), "Log should contain [DEBUG] level")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should handle metadata in logs", async () => {
		const logger = createLogger({ logDir: testLogDir })
		const metadata = { userId: 123, action: "test" }
		logger.info("Test with metadata", metadata)
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes("userId"), "Log should contain metadata")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should include caller information in logs", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test caller info")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes(".js:"), "Log should include caller file and line")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should NOT include caller information when disabled", async () => {
		const logger = createLogger({ logDir: testLogDir, callerInfo: false })
		logger.info("Test without caller info")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(!content.includes(".js:"), "Log should NOT include caller file and line")
				assert(content.includes("Test without caller info"), "Log should include message")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should handle multiple log calls", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("First message")
		logger.warn("Second message")
		logger.error("Third message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				const lines = content.trim().split("\n")
				assert(lines.length >= 3, "Should have at least 3 log lines")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should handle empty metadata", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test with empty metadata", {})
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(content.includes("[INFO]"), "Should handle empty metadata")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should format logs in CSV format", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				const lines = content.trim().split("\n")
				assert(lines.length > 0, "Should have log lines")
				assert(lines[0].includes(";"), "Should be in CSV format with semicolons")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should include ISO 8601 timestamps", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test timestamp")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
				const content = fs.readFileSync(logFile, "utf8")
				assert(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(content), 
					"Should include ISO 8601 timestamp")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})
})

test("Log File Organization", async (t) => {
	await t.test("should create daily log files", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const files = fs.readdirSync(testLogDir)
				assert(files.length > 0, "Should create at least one log file")
				assert(files[0].match(/\d{4}-\d{2}-\d{2}\.csv/), 
					"Log file should be named YYYY-MM-DD.csv")
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should use today's date for log filename", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("Test message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				const todayFile = `${getTodayDate()}.csv`
				const files = fs.readdirSync(testLogDir)
				assert(files.includes(todayFile), `Should create file named ${todayFile}`)
				cleanupTestDir()
				resolve()
			}, 100)
		})
	})

	await t.test("should append to existing log file", async () => {
		const logger = createLogger({ logDir: testLogDir })
		logger.info("First message")
		
		return new Promise(resolve => {
			setTimeout(() => {
				logger.info("Second message")
				
				setTimeout(() => {
					const logFile = path.join(testLogDir, `${getTodayDate()}.csv`)
					const content = fs.readFileSync(logFile, "utf8")
					const lines = content.trim().split("\n")
					assert(lines.length >= 2, "Should append new logs to existing file")
					cleanupTestDir()
					resolve()
				}, 50)
			}, 50)
		})
	})
})
