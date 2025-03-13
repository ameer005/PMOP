import { Response, NextFunction, Request } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { CustomError } from './error-handler.middleware'

export const validateReq =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (e: any) {
      if (e instanceof ZodError) {
        throw new CustomError('Invalid Request', 403)
      }

      throw new CustomError('Internal Server Error', 500)
    }
  }
