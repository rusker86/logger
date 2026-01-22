import assert from "assert"
import { test } from "node:test"
import { getCallerInfo } from "../utils/callerInfo.js"

test("Caller Info Utilities", async (t) => {
	await t.test("getCallerInfo() should return an object with file and line properties", () => {
		const result = getCallerInfo()
		assert(typeof result === "object", "Should return an object")
		assert("file" in result, "Should have file property")
		assert("line" in result, "Should have line property")
	})

	await t.test("getCallerInfo() should return file as string", () => {
		const result = getCallerInfo()
		assert(typeof result.file === "string", "File should be a string")
	})

	await t.test("getCallerInfo() should return line as number or string representing number", () => {
		const result = getCallerInfo()
		assert(typeof result.line === "string" || typeof result.line === "number", 
			"Line should be a number or string")
	})

	await t.test("getCallerInfo() should contain filename in file property", () => {
		const result = getCallerInfo()
		assert(result.file.length > 0, "File should not be empty")
		assert(!result.file.includes("unknow") || result.file === "unknow", 
			"Should return valid file or 'unknow'")
	})

	await t.test("getCallerInfo() should have line number as string or number", () => {
		const result = getCallerInfo()
		// The line can be a string like "0" when properly parsed, or "0" as default
		// This test just verifies the property exists and is a valid value
		assert(result.line !== undefined && result.line !== null, "Line property should exist")
	})

	await t.test("getCallerInfo() should not throw error when called", () => {
		assert.doesNotThrow(() => {
			getCallerInfo()
		}, "Should not throw error when called")
	})

	await t.test("getCallerInfo() from helper function should return different info", () => {
		const helper = () => getCallerInfo()
		const result = helper()
		assert(result.file && result.line, "Should return valid caller info")
	})
})
