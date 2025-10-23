import { useQuery } from '@tanstack/react-query'
import { getUsersForContract } from '@shared/api'

const useUsersForContract = () => {
  const query = useQuery({
    queryKey: ['usersForContract'],
    queryFn: async () => await getUsersForContract(),
    staleTime: 60 * 1000 * 10, // 10 minutes
    throwOnError: true,
  })

  return query
}

export default useUsersForContract
