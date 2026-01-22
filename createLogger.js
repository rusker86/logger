import fs from "fs"
import path from "path"
import { getTodayDate, getTimeStamp } from "./utils/date.js"
import { toCSVRow } from "./utils/csv.js"
import { logToConsole } from "./utils/logToConsole.js"
import { getCallerInfo } from "./utils/callerInfo.js"
import { createWriter } from "./utils/writer.js"

let handlersRegistered = false

export function createLogger({logDir = "logs", callerInfo = true}) {
	const resolveDir = path.isAbsolute(logDir)
	? logDir
	: path.join(process.cwd(), logDir)
	
	
	let closed = false
	

	if(!fs.existsSync(resolveDir)) {
		fs.mkdirSync(resolveDir, { recursive: true })
	}

	const writer = createWriter(getLogFilePath())

	function closeLogger() {
		if(closed) return
		closed = true

		writer.close()
	}
	
	function getLogFilePath() {
		const date = getTodayDate()
		return path.join(resolveDir, `${date}.csv`)
	}

	
	function writeLog(level, message, meta) {
		writer.write(
			toCSVRow([
				getTimeStamp(),
				level,
				message,
				meta
			])
		)
	}

	let tag = ""
	if(!handlersRegistered) {
		process.on("SIGINT", () => {
			closeLogger()
			process.exit()
		})

		process.on("exit", closeLogger)

		handlersRegistered = true
	}
	

	function log(tag, msg, meta) {
		const caller = callerInfo ? getCallerInfo() : null

		const fullMsg = 
		callerInfo ? `${msg} (${caller.file}:${caller.line})` : `${msg}`
	
		logToConsole(tag, fullMsg, meta)
		writeLog(tag, fullMsg, meta)
	}

	return {
		info: (msg, meta) => log("[INFO]", msg, meta),
		warn: (msg, meta) => log("[WARNING]", msg, meta),
		error: (msg, meta) => log("[ERROR]", msg, meta),
		debug: (msg, meta) => log("[DEBUG]", msg, meta)
	}
}
