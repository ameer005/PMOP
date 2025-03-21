import { object, string, TypeOf } from 'zod'

export const createFolderSchema = object({
  body: object({
    name: string({
      required_error:
        'Please provide a folder name. This field cannot be empty.',
    }).min(3, 'Folder name must be at least 3 characters long.'),
    parentID: string().optional(),
  }),
})

export const fetchFoldersSchema = object({
  params: object({
    folderID: string().optional(),
  }),
})

export type CreateFolderInput = TypeOf<typeof createFolderSchema>
export type FetchFolderInput = TypeOf<typeof fetchFoldersSchema>
