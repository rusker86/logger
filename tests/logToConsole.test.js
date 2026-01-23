import assert from "assert"
import { test } from "node:test"
import { logToConsole } from "../utils/logToConsole.js"

test("Console Logging Utilities", async (t) => {
	await t.test("logToConsole() should call console.log", () => {
		let logCalled = false
		const originalLog = console.log
		console.log = () => { logCalled = true }
		
		logToConsole("[INFO]", "Test message")
		
		console.log = originalLog
		assert(logCalled, "Should call console.log")
	})

	await t.test("logToConsole() should include tag in output", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[INFO]", "Test message")
		
		console.log = originalLog
		assert(output.includes("[INFO]"), "Should include tag in output")
		assert(output.includes(";"), "Should separate with semicolon")
	})

	await t.test("logToConsole() should include message in output", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[INFO]", "Test message")
		
		console.log = originalLog
		assert(output.includes("Test message"), "Should include message in output")
		assert(output.includes(";"), "Should separate with semicolon")
	})

	await t.test("logToConsole() should handle INFO level", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[INFO]", "Info test")
		
		console.log = originalLog
		assert(output.includes("[INFO]"), "Should handle INFO level")
	})

	await t.test("logToConsole() should handle WARNING level", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[WARNING]", "Warning test")
		
		console.log = originalLog
		assert(output.includes("[WARNING]"), "Should handle WARNING level")
	})

	await t.test("logToConsole() should handle ERROR level", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[ERROR]", "Error test")
		
		console.log = originalLog
		assert(output.includes("[ERROR]"), "Should handle ERROR level")
	})

	await t.test("logToConsole() should handle DEBUG level", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[DEBUG]", "Debug test")
		
		console.log = originalLog
		assert(output.includes("[DEBUG]"), "Should handle DEBUG level")
	})

	await t.test("logToConsole() should handle metadata", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		const meta = { userId: 123 }
		logToConsole("[INFO]", "Test", meta)
		
		console.log = originalLog
		assert(output.includes("userId"), "Should include metadata in output")
		assert(output.includes(";"), "Should separate with semicolon")
	})

	await t.test("logToConsole() should format metadata as JSON", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		const meta = { userId: 123, action: "test" }
		logToConsole("[INFO]", "Test", meta)
		
		console.log = originalLog
		assert(output.includes(JSON.stringify(meta)), 
			"Should format metadata as JSON string")
	})

	await t.test("logToConsole() should handle undefined metadata", () => {
		const originalLog = console.log
		console.log = () => {}
		
		assert.doesNotThrow(() => {
			logToConsole("[INFO]", "Test", undefined)
		}, "Should handle undefined metadata")
		
		console.log = originalLog
	})

	await t.test("logToConsole() should handle empty metadata object", () => {
		const originalLog = console.log
		console.log = () => {}
		
		assert.doesNotThrow(() => {
			logToConsole("[INFO]", "Test", {})
		}, "Should handle empty metadata")
		
		console.log = originalLog
	})

	await t.test("logToConsole() should handle null metadata", () => {
		const originalLog = console.log
		console.log = () => {}
		
		assert.doesNotThrow(() => {
			logToConsole("[INFO]", "Test", null)
		}, "Should handle null metadata without throwing")
		
		console.log = originalLog
	})

	await t.test("logToConsole() should format message correctly without metadata", () => {
		let output = ""
		const originalLog = console.log
		console.log = (msg) => { output = msg }
		
		logToConsole("[INFO]", "Simple message")
		
		console.log = originalLog
		assert(output.includes("[INFO]"), "Should include tag")
		assert(output.includes("Simple message"), "Should include message")
		assert(output.includes(";"), "Should separate with semicolon")
	})
})
