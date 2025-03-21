'use client'
import { Button } from '@/components/ui/button'
import { useFetchFolders } from '@/hooks/queries/useFolder'
import { FolderCard } from './folder-card'
//

const Homepage = () => {
  const {
    data: folderData,
    isLoading: folderDataLoading,
    isSuccess: folderDataSuccess,
  } = useFetchFolders()

  const renderFolderCards = () => {
    return folderData?.data.map((data) => <FolderCard key={data.id} />)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold yo">Folders</h2>

        <Button className="cursor-pointer" size={'lg'}>
          New Folder
        </Button>
      </div>

      <div>{renderFolderCards()}</div>
    </div>
  )
}

export default Homepage
