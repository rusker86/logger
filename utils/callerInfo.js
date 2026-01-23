export function getCallerInfo() {
	const stack = new Error().stack?.split("\n") || []

	let file = "unknow"
	let line = 0

	// Buscar la primera línea que no sea de callerInfo.js
	let callerLine = ""
	for (let i = 2; i < stack.length; i++) {
		if (!stack[i].includes("callerInfo.js") && !stack[i].includes("createLogger.js")) {
//			console.log(stack[i])
			callerLine = stack[i]
			break
		}
	}

	// Extraer ruta y línea usando regex para mayor precisión
	const match = callerLine.match(/(?:\()?(.*?):(\d+):(\d+)(?:\))?$/)
	
	if (match) {
		const fullPath = match[1]
		const line = parseInt(match[2], 10)
		
		// Obtener solo el nombre del archivo
		const parts = fullPath.split(/[\\\/]/)
		const file = parts[parts.length - 1] || "unknown"
		
		return { file, line }
	}

	return { file, line }
}
