import { ItemDocument } from './items'

export type Folders = {
  results: number
  data: ItemDocument[]
  totalPages: number
  page: number
  totalUsers: number
}
