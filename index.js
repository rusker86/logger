export { createLogger } from "./createLogger.js"
import { createLogger } from "./createLogger.js"

const logger = createLogger({logDir: "logs"})

logger.warn("Hola mundo, que tal", {msg: true})
