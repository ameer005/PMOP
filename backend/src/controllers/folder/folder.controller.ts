import { Request, Response, NextFunction } from 'express'
import { CreateFolderInput } from './folder.schema'

export const CreateFolderHandler = async (
  req: Request<{}, {}, CreateFolderInput['body']>,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json()
}
