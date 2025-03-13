import express from 'express'
import { validateReq } from '../middlewares/validate-req'
import { createFolderSchema } from '../controllers/folder/folder.schema'
import { CreateFolderHandler } from '../controllers/folder/folder.controller'

const router = express.Router()

router.route('/').post(validateReq(createFolderSchema), CreateFolderHandler)

export { router as folderRouter }
