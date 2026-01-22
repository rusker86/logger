import { createLogger } from "./createLogger.js";

const logger = createLogger({ logDir: "logs" })

logger.info("Hola mundo desde INFO", {msg : "Hola mundo"})
logger.debug("Hola mundo desde DEBUG", {msg : "Hola mundo"})
logger.warn("Hola mundo desde WARNING", {msg : "Hola mundo"})
logger.error("Hola mundo desde ERROR", {msg : "Hola mundo"})
