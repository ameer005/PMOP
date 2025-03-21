import express from 'express'
import { validateReq } from '../middlewares/validate-req'
import {
  createFolderSchema,
  fetchFoldersSchema,
} from '../controllers/folder/folder.schema'
import {
  CreateFolderHandler,
  fetchFolders,
} from '../controllers/folder/folder.controller'

const router = express.Router()

router
  .route('/')
  .post(validateReq(createFolderSchema), CreateFolderHandler)
  .get(validateReq(fetchFoldersSchema), fetchFolders)

export { router as folderRouter }
