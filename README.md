# Logger

Un sistema de logging simple y eficiente que guarda registros en formato CSV con timestamp y niveles de severidad.

## Descripción

Logger es una aplicación Node.js que proporciona un sistema de logging ligero y funcional. Registra mensajes con diferentes niveles de severidad (INFO, WARN, ERROR, DEBUG) en archivos CSV organizados por fecha.

## Características

- ✅ Logging con múltiples niveles (INFO, WARN, ERROR, DEBUG)
- ✅ Archivos CSV organizados por fecha
- ✅ Timestamps en formato ISO 8601
- ✅ Soporte para metadatos adicionales
- ✅ Manejo automático de directorios
- ✅ Formato CSV robusto con escape de caracteres especiales

## Estructura del Proyecto

```
logger/
├── logger.js             # Módulo principal de logging
├── package.json          # Dependencias y configuración del proyecto
├── logs/                 # Directorio donde se guardan los archivos de log
│   └── 2026-01-22.csv   # Archivo de log diario (formato: YYYY-MM-DD.csv)
└── utils/
    ├── csv.js            # Utilidades para formato CSV
    └── date.js           # Utilidades para manejo de fechas y timestamps
```

## Instalación

1. Clona o descarga el proyecto
2. Navega al directorio del proyecto:
   ```bash
   cd logger
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

### Iniciar la aplicación

```bash
npm run start
```

### Usar el logger en tu código

```javascript
import { logger } from "./logger.js"

// Registrar información
logger.info("Servidor iniciado")

// Registrar advertencias
logger.warn("Se detectó una condición inusual", { userId: 123 })

// Registrar errores
logger.error("Ocurrió un error", { code: 500 })

// Registrar información de depuración
logger.debug("Variable x = 42", { variable: 42 })
```

### Signature de métodos

Todos los métodos de logger aceptan un mensaje y metadatos opcionales:

```javascript
logger.info(message: string, meta?: object)
logger.warn(message: string, meta?: object)
logger.error(message: string, meta?: object)
logger.debug(message: string, meta?: object)
```

## Formato de logs

Los logs se guardan en archivos CSV en el directorio `logs/` con el nombre `YYYY-MM-DD.csv`.

Cada línea contiene:
- **Timestamp**: Hora exacta en formato ISO 8601
- **Nivel**: [INFO], [WARN], [ERROR] o [DEBUG]
- **Mensaje**: Texto descriptivo del evento
- **Metadatos**: Datos adicionales en formato JSON (opcional)

**Ejemplo:**
```
2026-01-22T15:30:45.123Z,[INFO],Servidor iniciado,
2026-01-22T15:30:46.456Z,[WARN],Se detectó una condición inusual,{"userId":123}
2026-01-22T15:30:47.789Z,[ERROR],Ocurrió un error,{"code":500}
```

## Dependencias

Este proyecto no tiene dependencias externas. Utiliza únicamente módulos nativos de Node.js.

## Módulos principales

### logger.js
Módulo central que exporta el objeto `logger` con los cuatro niveles de logging. Gestiona la creación de archivos de log diarios y la escritura de registros.

### utils/csv.js
Utilidad para convertir arrays de valores a formato CSV válido, con manejo automático de:
- Valores nulos o undefined
- Objetos (convertidos a JSON)
- Caracteres especiales (comas, comillas, saltos de línea)

### utils/date.js
Funciones para obtener:
- `getTodayDate()`: Fecha actual en formato YYYY-MM-DD
- `getTimeStamp()`: Timestamp actual en formato ISO 8601

## Licencia

MIT
