import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import morganMiddleware from './middlewares/morgan.middleware'
import { createServer } from 'http'
import { config } from './config'
import errorHandler, {
  CustomError,
} from './middlewares/error-handler.middleware'
import { folderRouter } from './routes/folder.routes'
import { videoRouter } from './routes/video.routes'

dotenv.config()

const app = express()
const server = createServer(app)

app.use(
  cors({
    credentials: true,
    origin: config.https.isProduction ? [process.env.FRONTEND_URL!] : true,
  })
)

app.use(morganMiddleware)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(helmet())
app.use(mongoSanitize())

app.get('/', (_, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This is working',
  })
})

app.use('/api/v1/folders', folderRouter)
app.use('/api/v1/videos', videoRouter)

app.use((_, res) => {
  throw new CustomError("Route doesn't exist", 404)
})

app.use(errorHandler)

export { server as app }
