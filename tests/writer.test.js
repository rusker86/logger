import assert from "assert"
import { test } from "node:test"
import fs from "fs"
import path from "path"
import { createWriter } from "../utils/writer.js"

const testFile = ".test-writer-file.txt"

test("Writer Utilities", async (t) => {
	await t.test("createWriter() should return object with write and close methods", () => {
		const writer = createWriter(testFile)
		assert(typeof writer.write === "function", "Should have write method")
		assert(typeof writer.close === "function", "Should have close method")
		writer.close()
		if (fs.existsSync(testFile)) fs.unlinkSync(testFile)
	})

	await t.test("write() should create file and write content", async () => {
		const writer = createWriter(testFile)
		writer.write("test line 1\n")
		writer.write("test line 2\n")
		
		return new Promise(resolve => {
			setTimeout(() => {
				writer.close()
				assert(fs.existsSync(testFile), "File should be created")
				const content = fs.readFileSync(testFile, "utf8")
				assert(content.includes("test line 1"), "Should contain first line")
				assert(content.includes("test line 2"), "Should contain second line")
				fs.unlinkSync(testFile)
				resolve()
			}, 50)
		})
	})

	await t.test("write() should append to existing file", async () => {
		const writer = createWriter(testFile)
		writer.write("first write\n")
		writer.close()

		return new Promise(resolve => {
			setTimeout(() => {
				const writer2 = createWriter(testFile)
				writer2.write("second write\n")
				
				setTimeout(() => {
					writer2.close()
					const content = fs.readFileSync(testFile, "utf8")
					assert(content.includes("first write"), "Should have first write")
					assert(content.includes("second write"), "Should have second write")
					fs.unlinkSync(testFile)
					resolve()
				}, 50)
			}, 50)
		})
	})

	await t.test("close() should close the stream", async () => {
		const writer = createWriter(testFile)
		writer.write("test\n")
		writer.close()
		
		return new Promise(resolve => {
			setTimeout(() => {
				assert(fs.existsSync(testFile), "File should exist after close")
				fs.unlinkSync(testFile)
				resolve()
			}, 50)
		})
	})

	await t.test("write() should handle multiple consecutive writes", async () => {
		const writer = createWriter(testFile)
		for (let i = 0; i < 5; i++) {
			writer.write(`line ${i}\n`)
		}
		
		return new Promise(resolve => {
			setTimeout(() => {
				writer.close()
				const content = fs.readFileSync(testFile, "utf8")
				const lines = content.split("\n").filter(l => l)
				assert(lines.length === 5, "Should have 5 lines")
				fs.unlinkSync(testFile)
				resolve()
			}, 50)
		})
	})

	await t.test("should handle absolute file paths", () => {
		const absolutePath = path.resolve(testFile)
		const writer = createWriter(absolutePath)
		writer.write("test\n")
		
		return new Promise(resolve => {
			setTimeout(() => {
				writer.close()
				assert(fs.existsSync(absolutePath), "Should create file at absolute path")
				fs.unlinkSync(absolutePath)
				resolve()
			}, 50)
		})
	})
})
