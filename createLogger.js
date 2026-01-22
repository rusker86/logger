import fs from "fs"
import path from "path"
import { getTodayDate, getTimeStamp } from "./utils/date.js"
import { toCSVRow } from "./utils/csv.js"
import { logToConsole } from "./utils/logToConsole.js"
import { getCallerInfo } from "./utils/callerInfo.js"
import { create } from "domain"

export function createLogger({logDir = "logs"}) {
	const resolveDir = path.isAbsolute(logDir)
		? logDir
		: path.join(process.cwd(), logDir)


	if(!fs.existsSync(resolveDir)) {
		fs.mkdirSync(resolveDir, { recursive: true })
	}

	function getLogFilePath() {
		const date = getTodayDate()
		return path.join(resolveDir, `${date}.csv`)
	}

	function writeLog(level, message, meta = {}) {
		const filePath = getLogFilePath()

		let row = ""

		if(Object.keys(meta).kength === 0) {
			row = toCSVRow([
				getTimeStamp(),
				level,
				message
			])
		} else {
			row = toCSVRow([
				getTimeStamp(),
				level,
				message,
				meta
			])
		}


		fs.appendFile(filePath, row, err => {
			if(err) console.error("Error escribiendo el log: ", err)
		})
	}

	let tag = ""
	
	return {
		info: (msg, meta) => {
			tag = "[INFO]"

			const caller = getCallerInfo()
			const fullMsg = `${msg} (${caller.file}:${caller.line})`

			logToConsole(tag, fullMsg, meta)
			writeLog(tag, fullMsg, meta)
		},
		warn: (msg, meta) => {
			tag = "[WARNING]"

			const caller = getCallerInfo()
			const fullMsg = `${msg} (${caller.file}:${caller.line})`
			
			logToConsole(tag, fullMsg, meta)
			writeLog(tag, fullMsg, meta)
		},
		error: (msg, meta) => {
			tag = "[ERROR]"

			const caller = getCallerInfo()
			const fullMsg = `${msg} (${caller.file}:${caller.line})`


			logToConsole(tag, fullMsg, meta)
			writeLog(tag, fullMsg, meta)
		},
		debug: (msg, meta) => {
			tag = "[DEBUG]"

			const caller = getCallerInfo()
			const fullMsg = `${msg} (${caller.file}:${caller.line})`

			logToConsole(tag, fullMsg, meta)
			writeLog(tag, fullMsg, meta)
		}
	}
}
