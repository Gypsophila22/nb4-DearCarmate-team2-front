import { getCustomersForContract } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

const useCustomersForContract = () => {
  const query = useQuery({
    queryKey: ['customersForContract'],
    queryFn: async () => await getCustomersForContract(),
    staleTime: 60 * 1000 * 3, // 3 minutes
    throwOnError: true,
  })

  return query
}

export default useCustomersForContract
