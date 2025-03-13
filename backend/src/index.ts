import dotenv from 'dotenv'
import { config } from './config'
import { app } from './app'
import logger from './lib/logger'
import { prisma } from './db/connect'
dotenv.config()

const start = async () => {
  try {
    await prisma.$connect()
    console.log('Connected to postgres')
  } catch (error) {
    logger.error(error)
  }

  if (config.https.isProduction) {
    app.listen(config.https.listenPort, () => {})
  } else {
    app.listen(config.https.listenPort, '0.0.0.0', () => {})
  }

  console.log(`Server is running on port ${config.https.listenPort}`)
}

start()
