import { Folders } from '@/types/api/folder'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../useAxios'

export const useFetchFolders = (folderID?: string) => {
  const api = useAxios()

  const queryFnc = async () => {
    const { data } = await api.get<Folders>('folders', {
      params: folderID ? { folderID } : undefined, // Conditionally include folderID
    })
    return data
  }

  return useQuery({
    queryKey: ['folders', folderID ?? 'root'],
    queryFn: queryFnc,
  })
}
