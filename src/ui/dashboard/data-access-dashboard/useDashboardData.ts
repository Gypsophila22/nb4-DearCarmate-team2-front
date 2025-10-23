import { getDashboardData } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

const useDashboardData = () => {
  const query = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => await getDashboardData(),
    throwOnError: true,
  })

  return query
}

export default useDashboardData
