import assert from "assert"
import { test } from "node:test"
import { getTodayDate, getTimeStamp } from "../utils/date.js"

test("Date Utilities", async (t) => {
	await t.test("getTodayDate() should return date in YYYY-MM-DD format", () => {
		const date = getTodayDate()
		const regex = /^\d{4}-\d{2}-\d{2}$/
		assert.match(date, regex, "Date should be in YYYY-MM-DD format")
	})

	await t.test("getTodayDate() should return today's date", () => {
		const today = new Date().toISOString().split("T")[0]
		const date = getTodayDate()
		assert.strictEqual(date, today, "Should return today's date")
	})

	await t.test("getTodayDate() should return a string", () => {
		const date = getTodayDate()
		assert.strictEqual(typeof date, "string", "Should return a string")
	})

	await t.test("getTodayDate() should have valid date components", () => {
		const date = getTodayDate()
		const [year, month, day] = date.split("-").map(Number)
		
		assert(year >= 2020, "Year should be >= 2020")
		assert(month >= 1 && month <= 12, "Month should be between 1 and 12")
		assert(day >= 1 && day <= 31, "Day should be between 1 and 31")
	})

	await t.test("getTimeStamp() should return ISO 8601 format timestamp", () => {
		const timestamp = getTimeStamp()
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
		assert.match(timestamp, regex, "Timestamp should be in ISO 8601 format")
	})

	await t.test("getTimeStamp() should return a string", () => {
		const timestamp = getTimeStamp()
		assert.strictEqual(typeof timestamp, "string", "Should return a string")
	})

	await t.test("getTimeStamp() should be a valid Date when parsed", () => {
		const timestamp = getTimeStamp()
		const date = new Date(timestamp)
		assert(!isNaN(date.getTime()), "Should be parseable as a valid Date")
	})

	await t.test("getTimeStamp() should contain timezone indicator Z", () => {
		const timestamp = getTimeStamp()
		assert(timestamp.endsWith("Z"), "Should end with Z for UTC timezone")
	})

	await t.test("getTimeStamp() should have milliseconds precision", () => {
		const timestamp = getTimeStamp()
		const parts = timestamp.split(".")
		assert.strictEqual(parts.length, 2, "Should contain milliseconds separator")
		assert.strictEqual(parts[1].length, 4, "Should have 3 digits for milliseconds + Z")
	})
})
