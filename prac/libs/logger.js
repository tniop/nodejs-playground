import { format as _format, createLogger, transports as _transports } from 'winston'

const format = _format.combine(
  _format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  _format.colorize(),
  _format.printf(
    info => `[${info.timestamp}][${info.level}][${info.statusCode} ${info.status}]: ${info.message}`
  )
)

const logger = createLogger({
  level: 'info',
  format: process.env.NODE_ENV !== 'production' ? format : _format.json(),
  transports: [
    new _transports.Console()
  ]
})

export default logger
