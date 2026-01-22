import fs from "fs"
import path from "path"

export function createWriter(fileToPath) {
	const stream = fs.createWriteStream(fileToPath, { flags: "a" })

	function write(line) {
		stream.write(line)
	}

	function close() {
		stream.close()
	}

	return { write, close }
}
