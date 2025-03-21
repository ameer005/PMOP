import { Response, NextFunction, Request } from 'express'
import { AnyZodObject } from 'zod'
import { CustomError } from './error-handler.middleware'

const validate =
  (schema: AnyZodObject, async?: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (async) {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        })
      } else {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        })
      }

      next()
    } catch (e: any) {
      let message = ''
      e.errors.forEach((err: any, i: number) => {
        message += i === 0 ? `${err.message}` : `, ${err.message}`
      })

      // console.log(e.errors);
      return next(new CustomError(message, 400))
    }
  }

export { validate as validateReq }
