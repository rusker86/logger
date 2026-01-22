export function toCSVRow(values) {
	return values.map(value => {
		if(value === null || value === undefined) return ""

		const stringValue =
			typeof value === "object"
				? JSON.stringify(value)
				: String(value)

		
		if(stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
			return `"${stringValue.replace(/"/g, '')}"`
		}
		
		return stringValue
	}).join(",") + "\n"
}