export type ItemDocument = {
  path: string
  type: ItemType
  name: string
  id: string
  parentId: string | null
  size: bigint | null
  duration: number | null
  resolution: string | null
  createdAt: Date
  updatedAt: Date
}

enum ItemType {
  Folder = 'Folder',
  Video = 'Video',
}
