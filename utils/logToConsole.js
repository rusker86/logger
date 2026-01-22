import chalk, { Chalk } from "chalk"

const colors = {
	"[INFO]": chalk.blue,
	"[DEBUG]": chalk.gray,
	"[WARNING]": chalk.yellow,
	"[ERROR]": chalk.red
}

export function logToConsole(tag, msg, meta) {
	const colorFn = colors[tag] || ((x) => x)


	console.log(meta ? colorFn(`${tag}, ${msg}, ${JSON.stringify(meta)}`) : colorFn(`${tag}, ${msg},`))
}