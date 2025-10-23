import { getContracts } from '@shared/api'
import { SearchByContract } from '@shared/types'
import { useQuery } from '@tanstack/react-query'

const useContracts = ({ searchBy, keyword }: { searchBy: SearchByContract, keyword: string }) => {
  const query = useQuery({
    queryKey: ['contracts', { searchBy, keyword }],
    queryFn: async () => await getContracts({ searchBy, keyword }),
    throwOnError: true,
  })

  return query
}

export default useContracts
