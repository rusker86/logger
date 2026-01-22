export function getCallerInfo() {
	const stack = new Error().stack?.split("\n") || []

	const parts = stack[3].split("/")
	const last = parts[parts.length - 1]?.split(":") || []

	const file = last[0] ||"unknow"
	const line = last[1] || 0

	return { file, line }
}
