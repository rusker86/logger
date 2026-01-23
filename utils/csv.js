export function toCSVRow(values) {
	let string
	return values.map(value => {
		let stringValue

		if(value === null || value === undefined) return ""

		if(typeof value === "object" && Object.keys(value).length === 0) {
			stringValue = ""
		} else {
			stringValue =
				typeof value === "object"
					? JSON.stringify(value)
					: String(value)
		}


		
		if(stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
			return `"${stringValue.replace(/"/g, '')}"`
		}
		
		return stringValue
	}).join(";") + "\n"
}