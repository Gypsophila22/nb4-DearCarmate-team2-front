import { getDraftsForContractDocument } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

const useDrafts = () => {
  const query = useQuery({
    queryKey: ['draftsForContractDocument'],
    queryFn: async () => await getDraftsForContractDocument(),
    throwOnError: true,
  })

  return query
}

export default useDrafts
