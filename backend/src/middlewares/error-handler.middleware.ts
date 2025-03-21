import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export class CustomError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, new.target.prototype) // Maintain correct prototype chain
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong! Try again later.'

  // Handle custom errors
  if (err instanceof CustomError) {
    statusCode = err.statusCode
    message = err.message
  }

  // Handle JWT errors
  if (err instanceof jwt.JsonWebTokenError) {
    statusCode = 401
    message = 'Invalid token! Please try again later.'
  }

  if (err instanceof jwt.TokenExpiredError) {
    statusCode = 401
    message = 'Your token has expired, Please log in again.'
  }

  // Log detailed error in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  res.status(statusCode).json({
    status: 'fail',
    message,
  })
}

export default errorHandler
