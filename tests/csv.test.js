import assert from "assert"
import { test } from "node:test"
import { toCSVRow } from "../utils/csv.js"

test("CSV Utilities", async (t) => {
	await t.test("toCSVRow() should convert simple values to CSV row", () => {
		const result = toCSVRow(["test", "value", "data"])
		assert.strictEqual(result, "test;value;data\n", "Should join values with semicolons and newline")
	})

	await t.test("toCSVRow() should handle null values", () => {
		const result = toCSVRow(["test", null, "data"])
		assert.strictEqual(result, "test;;data\n", "Should convert null to empty string")
	})

	await t.test("toCSVRow() should handle undefined values", () => {
		const result = toCSVRow(["test", undefined, "data"])
		assert.strictEqual(result, "test;;data\n", "Should convert undefined to empty string")
	})

	await t.test("toCSVRow() should handle empty objects", () => {
		const result = toCSVRow(["test", {}, "data"])
		assert.strictEqual(result, "test;;data\n", "Should convert empty objects to empty string")
	})

	await t.test("toCSVRow() should handle objects", () => {
		const obj = { name: "John", age: 30 }
		const result = toCSVRow([obj])
		// Note: quotes are removed from JSON strings by the CSV formatter
		assert(result.includes("John"), "Should include object content in output")
		assert(result.includes("30"), "Should include numeric values from objects")
	})

	await t.test("toCSVRow() should quote values containing commas", () => {
		const result = toCSVRow(["test,value", "data"])
		assert(result.includes('"test,value"'), "Should quote values with commas")
	})

	await t.test("toCSVRow() should handle values containing newlines", () => {
		const result = toCSVRow(["test\nvalue", "data"])
		assert(result.includes('"test\nvalue"'), "Should quote values with newlines")
	})

	await t.test("toCSVRow() should end with newline", () => {
		const result = toCSVRow(["test", "value"])
		assert(result.endsWith("\n"), "Should end with newline character")
	})

	await t.test("toCSVRow() should handle single value", () => {
		const result = toCSVRow(["single"])
		assert.strictEqual(result, "single\n", "Should handle single value")
	})

	await t.test("toCSVRow() should handle empty array", () => {
		const result = toCSVRow([])
		assert.strictEqual(result, "\n", "Should return just newline for empty array")
	})

	await t.test("toCSVRow() should convert numbers to strings", () => {
		const result = toCSVRow([123, 45.6, 0])
		assert.strictEqual(result, "123;45.6;0\n", "Should convert numbers to strings")
	})

	await t.test("toCSVRow() should handle booleans", () => {
		const result = toCSVRow([true, false])
		assert.strictEqual(result, "true;false\n", "Should convert booleans to strings")
	})

	await t.test("toCSVRow() should remove quotes from values with quotes", () => {
		const result = toCSVRow(['test"value'])
		assert(!result.includes('""'), "Should remove internal quotes")
	})

	await t.test("toCSVRow() should handle complex objects", () => {
		const obj = { nested: { data: "value" }, array: [1, 2, 3] }
		const result = toCSVRow([obj])
		// The CSV formatter removes quotes, but preserves the content
		assert(result.includes("nested"), "Should include nested object keys")
		assert(result.includes("array"), "Should include array keys")
	})
})
