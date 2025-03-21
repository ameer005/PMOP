import { Request, Response, NextFunction } from 'express'
import { CreateFolderInput, FetchFolderInput } from './folder.schema'
import fs from 'fs'
import path from 'path'
import { prisma } from '../../db/connect'
import { CustomError } from '../../middlewares/error-handler.middleware'
import { Item, ItemType } from '@prisma/client'

export const CreateFolderHandler = async (
  req: Request<{}, {}, CreateFolderInput['body']>,
  res: Response,
  next: NextFunction
) => {
  // root folder
  let directory = path.resolve(__dirname, '../../../')

  let folder
  if (!req.body.parentID) {
    const isFolderExist = await prisma.item.findUnique({
      where: {
        path: `/uploads/${req.body.name}`,
      },
    })

    if (isFolderExist) {
      throw new CustomError(
        'Folder already exist.. please choose different name',
        400
      )
    }

    let folderPath = `/uploads/${req.body.name}`
    try {
      fs.mkdirSync(`${directory}${folderPath}`)

      folder = await prisma.item.create({
        data: {
          name: req.body.name,
          path: folderPath,
          type: ItemType.Folder,
        },
      })
    } catch (err) {
      throw new CustomError('Failed to create folder', 400)
    }

    //
  } else {
    console.log(req.body.parentID)
    let parentFolder = await prisma.item.findFirst({
      where: {
        id: req.body.parentID,
      },
    })

    if (!parentFolder) {
      throw new CustomError("Directory doesn't exist", 400)
    }

    let folderPath = `${parentFolder.path}/${req.body.name}`
    try {
      fs.mkdirSync(`${directory}${folderPath}`)

      folder = await prisma.item.create({
        data: {
          name: req.body.name,
          path: folderPath,
          type: ItemType.Folder,
          parentId: parentFolder.id,
        },
      })
    } catch (err) {
      throw new CustomError('Failed to create folder', 400)
    }
  }
  res.status(201).json({ status: 'success', data: folder })
}

export const fetchFolders = async (
  req: Request<FetchFolderInput['params']>,
  res: Response,
  next: NextFunction
) => {
  let folders: Item[] = []
  if (req.params.folderID) {
    folders = await prisma.item.findMany({
      where: { type: ItemType.Folder, parentId: req.params.folderID },
    })
  } else {
    folders = await prisma.item.findMany({
      where: { type: ItemType.Folder, parentId: null },
    })
  }

  res.status(200).json({ status: 'success', data: folders })
}
