import fs from "fs"
import path from "path"
import { getTodayDate, getTimeStamp } from "./utils/date.js"
import { toCSVRow } from "./utils/csv.js"

const LOG_DIR = path.join(process.cwd(), "logs")

if(!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR, { recursive: true })
}

function getLogFilePath() {
	const date = getTodayDate()
	return path.join(LOG_DIR, `${date}.csv`)
}

function writeLog(level, message, meta = {}) {
	const filePath = getLogFilePath()

	const row = toCSVRow([
		getTimeStamp(),
		level,
		message,
		meta
	])

	fs.appendFile(filePath, row, err => {
		if(err) console.error("Error escribiendo el log: ", err)
	})
}

export const logger = {
	info: (msg, meta) => writeLog("[INFO]", msg, meta),
	warn: (msg, meta) => writeLog("[WARN]", msg, meta),
	error: (msg, meta) => writeLog("[ERROR]", msg, meta),
	debug: (msg, meta) => writeLog("[DEBUG]", msg, meta)
}
