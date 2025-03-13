import morgan, { StreamOptions } from 'morgan'
import Logger from '../lib/logger'
import { config } from '..//config'

// Define Morgan stream to use custom logger
const stream: StreamOptions = {
  write: (message: string) => Logger.http(message.trim()),
}

// Skip logs in production except for warnings & errors
const skip = () => config.https.isProduction && Logger.level !== 'http'

// Build the Morgan middleware
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

export default morganMiddleware
