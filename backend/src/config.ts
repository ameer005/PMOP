import dotenv from 'dotenv'
dotenv.config()

export const config = {
  domain: process.env.DOMAIN || 'localhost',
  https: {
    listenIp: '0.0.0.0',
    listenPort: Number(process.env.PORT) || 5000,
    isProduction: process.env.NODE_ENV === 'production',
  },
} as const
